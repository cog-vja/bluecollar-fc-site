# 検索結果のサイト名・アイコン改善（2026-11-02）

## 結論：GitHub Pages のサブディレクトリ問題

検索結果の上段の「GitHub Pages documentation」は**ページタイトルではなく、Google が判断したサイト名**です。
現在の `https://cog-vja.github.io/bluecollar-fc-site/` は `cog-vja.github.io` というホストの**サブディレクトリ**なので、Google がサイト名を独立に設定する機能の対象外です。
同様に Google 検索のファビコンもホスト名単位で1つに制限されます。
**このZIPの変更だけでは、Google検索結果で表示されるサイト名とGitHubアイコンを確実には変えられません。**

公式仕様：
- https://developers.google.com/search/docs/appearance/site-names?hl=ja
- https://developers.google.com/search/docs/appearance/favicon-in-search?hl=ja

## 今回実施した範囲（GitHubリポジトリ内で完結）

- index.html の検索結果向け title と meta description を具体化。
- 全20ページにブランドfavicon.ico、96px PNG、180px iOSアイコンを追加。
- 全20ページにSNS共有画像のOGP（1200×630）と Twitter Card、テーマカラーを追加。
- 全20ページのヘッダーにロゴを表示。
- トップページに `WebSite` と `Organization`（logoを含む） の構造化データを追加。
- 既存のGA4 ID、A8リンク/ピクセル、canonical、内部リンク、sitemap.xml、既存URLは維持。

## 検索結果の上段を本当に変えるための推奨対応

**推奨：独自ドメインを取得してこのサイトに割り当てる。** サイトはGitHub Pagesに置いたままで構いません。GitHubの有料プランは不要です。

1. 独自ドメイン（例は未確定）を購入する。既存 `maker-career-lab` と混同しない独立したドメインが望ましい。
2. GitHub → `bluecollar-fc-site` → Settings → Pages → Custom domain に入力・保存。DNSに必要なCNAME/A等を設定し、HTTPSを有効化する。仕様: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
3. 新ドメインが正常に表示されることを確認してから、全ページの canonical/og:url/OG画像URL/構造化データの `https://cog-vja.github.io/bluecollar-fc-site/` 部分を新ドメインに変更。例示ドメインはこのZIP内では未設定。
4. 新ドメインに `WebSite.name = 現場仕事と独立ラボ`、faviconをサイトルートに置く。
5. 新ドメインをGoogle Search Consoleのプロパティに追加し、sitemap.xmlを送信。旧URLから新URLへの転送とインデックス状況を確認。
6. Googleが変更を反映するまで数日〜数週間以上かかり、最終表示はGoogleの判断に依存する。

**代替策**: `cog-vja.github.io` 直下を運用するユーザー/組織Pagesリポジトリを作り、ホストルートのサイト名とfaviconを整える方法もあります。ただし同一ホスト配下の `maker-career-lab` にも影響するため、こちらは本サイト専用の解決策としては勧めません。

## 今回の導入手順（iPhoneからも可）

- ZIP内の全ファイルを GitHub `cog-vja/bluecollar-fc-site` のリポジトリ**直下**にアップロードし、同名ファイルは上書き。
- フォルダを新たに一段作らないこと。
- GitHub Pagesがデプロイに成功したらトップページでロゴの表示を確認。
- Safariで開き、ホーム画面に追加してアイコンを確認。
- Facebook/X/LINE 等でURLをプレビューし、画像の表示を確認。古いキャッシュは更新まで残る場合があります。
- Google Search Consoleの「URL検査」→「インデックス登録をリクエスト」でトップページの再クロールを促す。ただしサイト名表示はこのURL構造のままでは変更を保証しません。

## Google Search Consoleでの評価方法

検索パフォーマンスのクエリ `現場仕事と独立ラボ` と、サイトのホームURLの **CTR、表示回数、平均順位**を改修前後28日で比較。クリック率は検索順位・クエリ構成で変わるため、HTML改修単独の因果と断定しない。

## QAと過去レポート

- QA-BRANDING-20261102.json：ブラウザでスマホ（390px）・デスクトップ（1365px）の主要4ページを静的表示テスト。画像・CSSは埋め込み検査であり、本番URLからの読み込みや外部計測は未検証。
- FILE-SHA256-20261102.txt：今回の更新ファイルのチェックサム。
- FILE-SHA256-20261031.txt、および2026年10月付QAレポートは**当時の履歴**であり、今回の更新済みHTMLのチェックサムではありません。

## 未検証事項

- Googleの検索結果に表示されるサイト名・ファビコンはホスト名単位なので、今回のサブディレクトリHTML改修では変更を確約できません。
- X/LINE等のカード更新は配信側キャッシュの期限に依存します。
- GitHub Actionsデプロイ後の本番URL、GA4とA8広告の外部サービス操作は未検証です。
