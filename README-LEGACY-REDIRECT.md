# 旧GitHub Pages専用・ページ別転送ZIP

**重要：このZIPをmainブランチにアップロードしないでください。**

使用先：cog-vja/bluecollar-fc-site の **legacy-redirect** ブランチのみ。

1. 本番用修正版ZIPをGitHub mainに反映し、Cloudflareで正常デプロイされることを確認する。
2. GitHubで main から `legacy-redirect` という新しいブランチを作る。
3. **legacy-redirectブランチ**にこのZIP内のHTMLを同名で上書きアップロード（各記事のファイル名を保つ）。
4. GitHubリポジトリの Settings → Pages → Build and deployment → Deploy from a branch を選ぶ。
5. Branch `legacy-redirect`、Folder `/ (root)` を設定して保存。
6. 古い `https://cog-vja.github.io/bluecollar-fc-site/` から新URLへ転送されることを確認する。
7. 最低1年間は旧URLへの転送ページを維持する。

301 HTTPレスポンスではありません。GitHub Pagesの制約のため、Googleが恒久転送として扱いうる0秒meta refreshを使用しています。
JavaScriptが利用できる環境ではクエリ文字列とフラグメントも保持します。
**既存のCloudflare Pagesプロダクションブランチ main は変更しないでください。**

HTML転送対象：20 URL（トップ含む）
補助：404.html、旧Google検証HTML、.nojekyll
