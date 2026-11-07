#!/usr/bin/env python3
"""Build a migration-safe release from the repository's ACTUAL current main checkout.
Read-only: never modifies the source checkout and never pushes to GitHub.
"""
import argparse
import hashlib
import html
import json
import re
import shutil
import tempfile
import zipfile
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse
import xml.etree.ElementTree as ET

OLD = 'https://cog-vja.github.io/bluecollar-fc-site'
NEW = 'https://bluecollar-fc-site.com'
ALLOWED_SUFFIXES = {'.html','.css','.js','.mjs','.xml','.png','.jpg','.jpeg','.webp','.svg','.ico','.txt'}
ALLOWED_NAMES = {'robots.txt','sitemap.xml','_headers','_redirects'}
REPLACE_SUFFIXES = {'.html','.css','.js','.mjs','.xml'}
EXCLUDE_PREFIXES = ('.git/','.github/','scripts/','tools/','dist/','_site/')
GA_ID = 'G-XGMNP7Q9VK'


def sha(data): return hashlib.sha256(data).hexdigest()

def include(rel):
    if any(rel.startswith(x) for x in EXCLUDE_PREFIXES): return False
    p=Path(rel)
    if len(p.parts)>1 and p.parts[0].startswith('.'): return False
    if p.name in ALLOWED_NAMES: return True
    if p.name.startswith('test-'): return False
    if p.name.startswith('README') or p.name.startswith('QA-') or p.name.startswith('AUDIT-') or p.name.startswith('FILE-') or p.name.startswith('URL-MAP'): return False
    if p.suffix.lower() not in ALLOWED_SUFFIXES:return False
    if p.suffix=='.txt' and p.name!='robots.txt': return False
    return True

def generate(src,dist):
    src=Path(src).resolve();dist=Path(dist).resolve();dist.mkdir(parents=True,exist_ok=True)
    if not (src/'index.html').is_file():raise RuntimeError('Repository root index.html is required')
    site=dist/'staging-site';shutil.rmtree(site,ignore_errors=True);site.mkdir()
    changes=[]; originals={}; outputs={}
    for p in sorted(src.rglob('*')):
        if not p.is_file():continue
        rel=p.relative_to(src).as_posix()
        if not include(rel):continue
        raw=p.read_bytes()
        originals[rel]=raw
        dest=site/rel;dest.parent.mkdir(parents=True,exist_ok=True)
        if p.suffix in REPLACE_SUFFIXES or p.name=='robots.txt':
            s=raw.decode('utf-8')
            if rel=='robots.txt':
                new='User-agent: *\nAllow: /\n\nSitemap: '+NEW+'/sitemap.xml\n'
            else:
                new=s.replace(OLD+'/',NEW+'/').replace(OLD,NEW)
            output=new.encode('utf-8')
            if output!=raw:changes.append({'path':rel,'old_url_count':s.count(OLD),'new_url_count':new.count(NEW)})
            # Only the fixed legacy site prefix may change: advertising and GA snippets must stay verbatim.
            if rel!='robots.txt' and new.replace(NEW,OLD)!=s:
                raise RuntimeError(f'Unexpected non-URL edit in {rel}')
        else: output=raw
        dest.write_bytes(output); outputs[rel]=output
    if 'sitemap.xml' not in outputs or 'robots.txt' not in outputs:raise RuntimeError('Required sitemap.xml and robots.txt missing')
    if not changes:raise RuntimeError('No legacy URLs found; source may already be migrated or branch is wrong')
    html_paths=[p for p in outputs if p.endswith('.html') and not p.startswith('google') and p!='404.html']
    if len(html_paths)<15:raise RuntimeError('Too few HTML pages, source not current main?')
    for rel in html_paths:
        s=outputs[rel].decode('utf-8')
        if OLD in s:raise RuntimeError('Old canonical or metadata URL remains: '+rel)
        expected=NEW+'/' if rel=='index.html' else NEW+'/'+rel
        canon=re.findall(r'<link\b[^>]*rel=["\']canonical["\'][^>]*>',s,re.I)
        canon+=re.findall(r'<link\b[^>]*href=["\'][^"\']+["\'][^>]*rel=["\']canonical["\'][^>]*>',s,re.I)
        canon=list(dict.fromkeys(canon))
        if not any(expected in c for c in canon):
            raise RuntimeError('Canonical URL missing/incorrect: '+rel+' expected '+expected)
    sitemap=ET.fromstring(outputs['sitemap.xml'])
    urls=[(e.text or '').strip() for e in sitemap.iter() if e.tag.endswith('loc')]
    if not urls or len(set(urls))!=len(urls):raise RuntimeError('Sitemap missing or has duplicate URLs')
    for u in urls:
        if not u.startswith(NEW+'/'):raise RuntimeError('Incorrect sitemap domain '+u)
    expected_urls={NEW+'/' if x=='index.html' else NEW+'/'+x for x in html_paths}
    missing=expected_urls-set(urls)
    if missing:raise RuntimeError('Sitemap missing pages: '+repr(sorted(missing)))
    if NEW+'/sitemap.xml' not in outputs['robots.txt'].decode():raise RuntimeError('Robots sitemap wrong')
    # Trust but verify: affiliate and GA code must be preserved byte-for-byte except site URL references.
    for rel,raw in originals.items():
        old=raw.decode('utf-8',errors='replace');new=outputs[rel].decode('utf-8',errors='replace')
        if old.count('px.a8.net')!=new.count('px.a8.net') or old.count('a8mat=')!=new.count('a8mat='):
            raise RuntimeError('A8 tag count changed: '+rel)
        if old.count(GA_ID)!=new.count(GA_ID):raise RuntimeError('GA4 measurement ID count changed: '+rel)
        if rel.endswith(('.js','.mjs')) and OLD not in old and raw!=outputs[rel]:
            raise RuntimeError('JS/calculator file modified without legacy URL: '+rel)
    # Check local static asset references within HTML. Warnings don't block deploying because some references may be generated by JS.
    asset_warnings=[]
    for rel in html_paths:
        body=outputs[rel].decode('utf-8')
        for ref in re.findall(r'(?:href|src)\s*=\s*["\']([^"\']+)["\']',body,re.I):
            if ref.startswith(('#','//','mailto:','tel:','data:','javascript:')):continue
            if ref.startswith('https://') or ref.startswith('http://'):
                if not ref.startswith(NEW+'/'):continue
                ref=ref[len(NEW+'/'):]
            ref=ref.split('#')[0].split('?')[0]
            if not ref or ref.startswith('/'):ref=ref.lstrip('/')
            if ref.startswith('./'):ref=ref[2:]
            if not ref or ref.endswith('/') or ref.startswith('../'):continue
            if (Path(rel).parent/ref).as_posix() not in outputs:
                asset_warnings.append({'page':rel,'link':ref})
    zip_path=dist/'bluecollar-fc-site-production-ready.zip'
    with zipfile.ZipFile(zip_path,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=9) as z:
        for rel in sorted(outputs):z.write(site/rel,arcname=rel)
    report={
        'source':'Repository checkout passed to script; no GitHub changes made',
        'old_domain':OLD,'new_domain':NEW,
        'site_files':len(outputs),'html_files':len(html_paths),
        'url_modified_files':len(changes),'modified':changes,
        'sitemap_urls':len(urls),'sitemap_missing':len(missing),
        'static_asset_warnings':asset_warnings,
        'ga4_id':GA_ID,'ga4_count_before':sum(v.decode('utf8','replace').count(GA_ID) for v in originals.values()),
        'ga4_count_after':sum(v.decode('utf8','replace').count(GA_ID) for v in outputs.values()),
        'a8_tags_before':sum(v.decode('utf8','replace').count('px.a8.net') for v in originals.values()),
        'a8_tags_after':sum(v.decode('utf8','replace').count('px.a8.net') for v in outputs.values()),
        'js_files_preserved':True, 'prod_zip_sha256':sha(zip_path.read_bytes()),'source_urls_remaining':sum(v.decode('utf8','replace').count(OLD) for v in outputs.values()),
    }
    (dist/'MIGRATION_QA_REPORT.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8')
    print(json.dumps({k:report[k] for k in ('site_files','html_files','url_modified_files','sitemap_urls','ga4_count_after','a8_tags_after','source_urls_remaining')},ensure_ascii=False,indent=2))
    print('ZIP:',zip_path)
    if asset_warnings:print('WARN: unresolved local references:',asset_warnings[:12])
    return report

if __name__=='__main__':
    a=argparse.ArgumentParser();a.add_argument('--repo',default='.');a.add_argument('--dist',default='dist');arg=a.parse_args();generate(arg.repo,arg.dist)
