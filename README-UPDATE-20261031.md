# 現場仕事と独立ラボ｜更新・導入ガイド（2026-10-31）

## 重要：このZIPの使い方

- GitHubの `cog-vja/bluecollar-fc-site` の **`main` ブランチ直下に配置するためのサイト一式**です。
- ZIPは **ルートにサイトファイルが並ぶ構成**です。ZIPそのものをGitHubに置くのではなく、**展開して中身のファイル**をアップロードしてください。
- 既存の同名ファイルは上書きし、**これまでのGitHub上のファイルを先に一括削除しないでください**。このZIPにない外部管理ファイルが後から追加されている場合は保持してください。
- 現行 `main` の基準：`9f2252567d6a0a6d93d3d19c3720e69545634fe2`（2026-10-25）。アップロード前に、この基準以降の追加変更がGitHubにないか確認してください。
- 保存用に現在の `main` をブランチまたはZIPでバックアップすると復旧しやすくなります。

## 今回の主な内容

### 追加ファイル

| ファイル | 内容 |
|---|---|
| `cleaning-business-failure-cashflow.html` | 清掃業の失敗を「受注不足、低単価、移動費、入金遅延、固定費、撤退」に分け、90日資金繰り検討手順を追加。架空の体験談・実績なし。 |
| `cleaning-scenario-calculator.html` | 清掃の個人開業とFC加盟を同条件で比べる無料ツール。件数、単価、時間、移動、資材、月固定費、ロイヤリティ、初期投資、入金遅延の仮定を入力。 |
| `cleaning-finance.mjs` | 上記ツールの試算・入力検証と計算式。PIIの取得なし。 |
| `test-cleaning-finance.mjs` | 正常・ゼロ・異常・境界等の計算単体テスト。 |
| `URL-MAP-20261031.csv` | 全20公開URLの検索意図／対象キーワード／遷移先／サイトマップ更新日。 |
| `QA-STATIC-20261031.json` / `QA-BROWSER-20261031.json` | 自動QAの結果。実公開における品質保証ではありません。 |

### 変更ファイル

| ファイル | 変更点 |
|---|---|
| `index.html` | 記事表記を13→16に整合。清掃業の費用、無料収支ツール、失敗・資金繰り、FC比較、契約前チェックリストへ役割別リンク。 |
| `cleaning-business-independent.html` | 既存計算機・A8コードは維持。ロイヤリティや移動時間まで比較するツールと失敗記事へのリンク、最新更新表記を追加。 |
| `house-cleaning-franchise-compare.html` | 清掃専業と便利屋・店舗メンテナンスの違いを明示。2026-10-25時点のBMポータル掲載値を「過去の掲載情報」として出典・基準日付きで整理し、契約期間や支援の未確認点を明示。 |
| `fc-comparison-checklist.html` | 加盟金、毎月の費用、研修、集客支援、解約条件、個人開業との支出比較を実行可能な確認手順へ整理。 |
| `style.css` | 新しい比較表・導線用スタイルを追加。既存の追従広告スタイルを維持。 |
| `sitemap.xml` | 既存URLを維持したうえで新記事とツールを追加。公開対象20URLを掲載。 |
| `source-register.json` | 新規ページで参照した公式資料・確認日を追記。古い費用・掲載値の鮮度を捏造しない。 |
| `README.md` | 今回の追加と配置方針を追記。 |

### 変更していない重要ファイル

`analytics.js`, `app.js`, `floating-ads.js`, `affiliate-config.js`, `guide.js`, `privacy.html`, `about.html`、清掃・ラーメン・カフェ以外を含む元13記事のA8コード。広告のリンク、画像URL、計測ピクセルを変更していません。

## 三段階レビュー結果

1. **SEO／技術品質**：20 HTML・20 sitemap URL、title・canonical・H1、内部リンクとアンカーを静的検査。すべての静的チェック合格。GitHub Pagesの `/bluecollar-fc-site/robots.txt` はドメイン直下 `robots.txt` ではないため、サイトマップはGSCのURLプレフィックスプロパティへ直接提出。
2. **検索意図／読者価値／収益導線**：検索意図を「費用を知る→件数を計算→個人/FCを比較→契約条件を確認→任意で資料請求」に整理。FCモデル収支は仮定・出典・時点を区別し、広告のための架空ランキングを作成しない。
3. **実装後回帰／Google方針**：既存13記事のA8広告アンカー・1pxピクセル原本との同一性をチェック。JS構文検証と計算単体テスト16ケースが合格。主要6ページ×スマホ390px/PC1365pxで横はみ出し0、描画エラー0。検索流入のための記事量産より、読者が開業判断できる独自計算機・比較手順を中心にした設計。

## QAの範囲と限界

- **確認済み**：静的リンク・フラグメント・sitemap整合、JS構文、計算16ケース、主要6ページのChromium HTML/CSS描画12条件、既存A8コードの変更なし、既存計測ID `G-XGMNP7Q9VK` の保全。
- **未検証**：本番のHTTP応答・Googleのインデックス登録、iPhone実機Safari、A8の外部画像表示／最終遷移／成果承認、GA4管理画面でのイベント着信、資料請求実行、最新の各FC加盟条件。
- Chromeブラウザは環境制約でローカルHTTP接続が拒否されたため、HTML・CSS・JSをインライン配置するテスト方式に変更。`cleaning-finance.mjs` の本番HTTP経由モジュール読込は公開後に確認が必要。追従広告の実URLパス判定とスクロール条件は**今回のブラウザでは再実施していません**。既存 JS はバイト同一、10月25日のQA記録にある動作確認を引き継ぎます。
- 本レポートの「合格」は当該テスト対象と環境についての結果であり、実成果やSEO順位の改善を意味しません。

## Google Search Console 提出・検査

サイトマップ： `https://cog-vja.github.io/bluecollar-fc-site/sitemap.xml`

URL検査の優先対象：

1. `https://cog-vja.github.io/bluecollar-fc-site/`
2. `https://cog-vja.github.io/bluecollar-fc-site/cleaning-business-independent.html`
3. `https://cog-vja.github.io/bluecollar-fc-site/cleaning-scenario-calculator.html`（新規）
4. `https://cog-vja.github.io/bluecollar-fc-site/cleaning-business-failure-cashflow.html`（新規）
5. `https://cog-vja.github.io/bluecollar-fc-site/house-cleaning-franchise-compare.html`
6. `https://cog-vja.github.io/bluecollar-fc-site/fc-comparison-checklist.html`

サイトマップ提出やインデックス登録の申請が掲載順位の上昇を保証するわけではありません。

## 28日／90日KPIと判断ルール

| 期間 | 主に見る指標 | 判断と次の作業 |
|---|---|---|
| 0～28日 | GSCクエリ別表示回数・クリック・CTR・平均掲載順位・登録済みページ | 新2URLが実際にクロール可能か、既存の清掃記事との重複クエリがないか、まず実測確認。低表示ではCTRだけで結論を出さない。 |
| 0～28日 | GA4 organic ランディング、`calculator_use`・`internal_link_click`・`affiliate_cta_view`・`affiliate_click` | 新しい収支比較ツールが認知されているか・表示後の操作かを確認。ボタンの表示イベントは読了を意味しない。 |
| 0～28日 | A8のクリック数、発生成果、確定成果と確定報酬 | GA4と計測方式が異なるため完全一致を前提にしない。成果未確定期はゼロや率を評価しすぎない。 |
| 29～90日 | 主力KW別クリック・掲載ページ、記事→ツール→比較の内部回遊 | 実データで検索意図が競合していればタイトル・内部リンク・本文の役割を調整。順位だけでなく意図一致を見る。 |
| 29～90日 | A8実EPC（確定報酬÷ASPクリック数）、発生成果率、承認率 | 承認ラグを踏まえて比較。十分なクリック数が得られるまでA/Bの断定は避ける。 |

**最終判断**：検索流入が増えても、読者価値・収支試算の利用・適切な資料請求・**A8確定報酬**が改善しなければ設計を再検討します。

## 残る作業と必要データ

- GSC：過去28日と直近28日の「ページ×検索クエリ」CSV、インデックス状況、CTR、平均掲載順位。
- GA4：流入経路別ランディング、`calculator_use` / `affiliate_click` / `affiliate_cta_view` / `internal_link_click` / `floating_ad_show` / `floating_ad_close`。
- A8：案件のクリック、発生成果、確定成果、否認、確定報酬、成果条件と条件更新。契約・プログラムの情報は公開に掲載しない。
- 比較FCの公式募集要項：募集地域、費用の税込税別、費用内訳、契約年数、競業避止、支援保証の有無。未取得の欄には推測値を入れない。

## 公開後の最低限の手動テスト

GitHub Pages反映後、(1)トップの「16記事」、(2)清掃記事から新計算機への移動、(3)計算機で初期値・0件・空欄・極端な件数を入力した動作、(4)新しい失敗記事とFC比較のリンク、(5)スマホの追従広告が従来の対象5記事にのみ30%スクロール後に出て閉じられる、(6)既存A8バナーが見える、(7)GA4 DebugViewで `calculator_use` が着信する、(8)GSCのURL検査とサイトマップ確認、の順にチェックしてください。A8成果計測の確認は規約に従ってください。

2026-10-31 時点。公式リンク： <https://developers.google.com/search/docs/fundamentals/creating-helpful-content>、<https://www.jftc.go.jp/dk/guideline/unyoukijun/franchise.html>、<https://www.jfc.go.jp/n/finance/sougyou/business-plan/>。
