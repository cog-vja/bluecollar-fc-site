# 現場仕事と独立ラボ：第一弾修正版（2026年10月19日）

## 対象
公開URL: https://cog-vja.github.io/bluecollar-fc-site/
元ZIP: bluecollar-fc-site-priority-update-20261011.zip （2026年10月11日版）

## 変更点
1. index.html / guide.js / style.css: 3条件（経験・自己資金・働き方）から「最初に読む記事」を案内する機能を実装。適性・利益を判定せず、低予算で店舗志望の場合は資金計画を先に案内。未送信・未保存。
2. 優先5記事（what-business-to-start, field-work-business-list, independent-without-experience, cleaning-business-independent, bluecollar-independent）：既存の本文・根拠・比較表・計算機を維持し、「この記事の役割」と固有の「読後の判断」を追加。目次と実際のセクションを対応させる。
3. 全13記事：検索意図に合わせて末尾広告の見出し・説明・ボタンを調整。元のA8トラッキングURLをそのまま保持し、rel=sponsored nofollowを追加。
4. analytics.js: 既存GA4のaffiliate_clickに記事ごとのCTA段階と位置を追加。計算機の入力値やガイドの選択値は送信しない。guide.jsは推薦先のページ名だけを送信。
5. style.css: スマホでのフォーム・CTA・比較表・見出し・ナビの使い勝手とフォーカス表示を改善。

## 公開方法（ZIPの中のフォルダーではなく、中身をアップロード）
GitHub の cog-vja/bluecollar-fc-site リポジトリ > Add file > Upload files。
ZIPを解凍し、bluecollar-fc-site フォルダーの **中のファイル一式** をリポジトリのルートに上書きアップロードしてコミットしてください。
新規ファイル `guide.js` も必ずアップロードしてください。
公開前に `index.html` のガイドが3条件で正しく結果を出すか、A8のリンクが `px.a8.net` のままか、GA4で `affiliate_click` が届くか確認してください。
公開URLやA8案件の実際の計測成果、Search Consoleの順位・登録状況まではローカルでは検証できません。

## 意図的に変更しないもの
公開URL・記事数13・canonical / sitemap / robots / Googleサイト所有権確認ファイル・計算機の計算仕様・GA4 Measurement ID・A8 href・source-register.json・編集方針／プライバシーの本文。

## ローカルテスト
フォルダ内で `python3 -m http.server 8000` を実行し、 `http://localhost:8000/` をブラウザで開く。`file://` ではなくHTTPで確認してください。

## 今後（第二弾）
任意の複数候補比較、入力値に応じた収支診断、深い事業シミュレーションは未実装。今回のガイドは初めに読む記事への案内に限定しています。
