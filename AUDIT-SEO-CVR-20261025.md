# SEO・広告クリック・資料請求CVR監査および改修記録

対象：現場仕事と独立ラボ（https://cog-vja.github.io/bluecollar-fc-site/）
改修基準：ユーザー提供の 2026-10-19 ZIP。監査・改修日：2026-10-25。
公開Web照合：記事一覧、BMフランチャイズの公式カテゴリ、資料請求リスト、会員登録案内、公的機関のFC契約注意事項。

## 結論と留意事項

- 元の13記事を維持し、検索意図の異なる2記事を追加（計15本）。読みやすさと申込前の理解を優先した段階的改修。
- 既存のFC案件誘導はA8の掲載コードを変更せず維持。広告は複数業種を扱うBMフランチャイズ。A8リンクのクエリには `a8ejpredirect` で BMフランチャイズの `/SP/` が指定されているが、A8経由の実ブラウザ遷移を再現していないため保証しない。
- BMのハウスクリーニングカテゴリに「おそうじ革命」「おそうじ本舗」「便利屋！お助け本舗」「まかせて屋」「マゴフル」が掲載されている検索結果を確認。5件すべてが清掃専業ではない。募集継続・実際の加盟可否は未確認。
- 公式の資料請求リスト・会員登録フォームを確認。入力項目や資料取得手順は会社/申込方法で異なる可能性がある。実際の資料請求手続き・申込送信は実施していない。
- 現行 `affiliate-config.js` の直リンク `https://bmfc.b-mall.ne.jp/` は他ファイルから参照されておらず、収益リンクとして使われていなかった。誤用予防として互換ファイルに無効化コメントを記載。
- 対象キーワードの厳密な月間検索ボリュームと広告成果数は提供されていないため、P0/P1/P2は競合SERPと検索意図、現在の記事構成による仮説。SEO順位・成約率の向上を保証しない。

## 全13記事の監査と改善先

| 優先 | 記事 | 主検索キーワード（仮説） | 読者・検索意図 | 既存の強み | 次のページ | 実施施策・重複整理 |
|---|---|---|---|---|---|---|
| P0 | `cleaning-business-independent.html` | ハウスクリーニング 独立 開業 費用 | 清掃開業の費用・顧客獲得・収支を知りたい | 収支計算機、公的出典、FCとの比較 | `house-cleaning-franchise-compare.html` | FC比較ページと資料請求前の説明を増補。FC専門比較との食い分け |
| P1 | `field-work-business-list.html` | 現場仕事 独立 業種 比較 | 何で独立できるか絞りたい | 設備・技能・仕事獲得の比較表 | `cleaning-business-independent.html` | 業種比較に限定、個別費用の深掘りは専門記事へ |
| P1 | `what-business-to-start.html` | 脱サラ 何をする 業種 | 退職前に候補を選びたい | 自己資金と経験の棚卸し | `field-work-business-list.html` | 業種未確定者は広告より比較記事へ |
| P1 | `independent-without-experience.html` | 未経験 独立 仕事 研修 | 仕事選びと研修を検討 | 実技・顧客獲得と研修条件 | `cleaning-business-independent.html` | 研修の範囲・集客保証の有無を強調 |
| P1 | `field-work-independent-options.html` | 現場経験 独立 受注 | 技能経験者が自分で受注する | 見積・資金・入金サイクル | `fc-comparison-checklist.html` | 独自開業とFCの費用差を考える補助リンク |
| P1 | `bluecollar-independent.html` | ブルーカラー 独立 方法 | 転職・副業・独立を比較 | 複数開業ルート | `field-work-business-list.html` | ルート検討から業種比較へ |
| P2 | `bluecollar-income.html` | ブルーカラー 年収 職種 | 転職や年収水準を知りたい | 公的職種年収の解説 | `field-work-business-list.html` | 給与と事業利益を分け、資料請求への直結を狙わない |
| P2 | `bluecollar-hot-ai.html` | AI ブルーカラー 将来性 | 仕事の自動化・将来性を知りたい | AIと現場作業の区別 | `bluecollar-ai-resistant-jobs.html` | 情報収集記事はまず職種比較 |
| P2 | `bluecollar-ai-resistant-jobs.html` | AI 代替されにくい 現場仕事 | 職種別の自動化範囲を知りたい | 現場作業の例外対応分析 | `bluecollar-income.html` | 将来性から仕事の経済条件へ |
| P2 | `labor-shortage-business.html` | 人手不足 業界 独立 | 需要と採算を区別したい | 求人倍率と客数の切り分け | `field-work-business-list.html` | 需要を業種比較へ接続 |
| P1 | `ramen-independent-beginner.html` | ラーメン 開業 未経験 費用 | 厨房・物件・客数を知りたい | 必要客数計算機と許可説明 | `fc-comparison-checklist.html` | FC追加費用は条件表で比較 |
| P1 | `cafe-independent-beginner.html` | カフェ 開業 初期費用 未経験 | 店舗の採算と設備を知りたい | 必要客数計算機と開業手順 | `fc-comparison-checklist.html` | 個人店とFCの比較軸を補助 |
| P2 | `restaurant-manager-independent.html` | 飲食店長 独立 開業 | 経験を経営に移したい | 居抜きと承継の検討 | `fc-comparison-checklist.html` | 契約方式の違いへ接続 |

## カニバリゼーションと見出しの分担

- `what-business-to-start.html` = 「何を始めるか未定」: 自己資金/経験/働き方を棚卸し。`field-work-business-list.html` = 「複数業種の比較」: 設備/技能/顧客を横並び。`independent-without-experience.html` = 「未経験と研修」: 作業の到達水準、初回受注方法。`field-work-independent-options.html` = 「現場経験の活用」: 提供サービス、見積もり、入金と運転資金。各記事が同じ「おすすめ業種ランキング」を競わない。
- `cleaning-business-independent.html` = 「清掃業での独立開業」: 必要受注件数と独自開業を含めた運営面。`house-cleaning-franchise-compare.html` = 「ハウスクリーニングFC候補の比較」: ポータル掲載案件と条件の横並び。`fc-comparison-checklist.html` = 「FC資料請求・加盟契約前の比較項目」: 業種横断の加盟金/ロイヤリティ/契約条件。検索意図を分担。
- FAQ: 既存清掃記事のよくある疑問を保存。新記事に資料請求前の実際的な確認手順・費用比較を用意。Schema.org FAQPage のリッチリザルトは狙わない。

## 優先検索キーワードと採否

- 高意図・P0：ハウスクリーニング フランチャイズ 比較 → **新設** `house-cleaning-franchise-compare.html`。同業種の募集候補を比較する別検索意図がある。
- 高意図・P0：フランチャイズ 資料請求 注意点 / フランチャイズ 契約前 確認事項 / フランチャイズ 加盟金 ロイヤリティ → **新設** `fc-comparison-checklist.html` に統合。単一の比較/確認記事として記事重複を避ける。
- P1：清掃業 フランチャイズ 初期費用 → 清掃専用比較 + 既存の独立費用記事へ分担。
- P1：個人開業 フランチャイズ 違い → `cleaning-business-independent.html` とチェックリストで比較を追加。
- P1：フランチャイズ 未経験 おすすめ → 誤認しやすい「おすすめ順位」を避け `independent-without-experience.html` を改修。
- P1：低資金 フランチャイズ 開業 → 単独記事を乱立せず `what-business-to-start.html` とチェックリストから予算での比較を案内。
- 検索候補はSERPの競合・公的情報を参考にした優先仮説であり、Search Consoleの実クエリ情報や検索ボリューム測定ではない。公開後にGSCで再優先付け。

## 施策（P0/P1/P2）

### P0 実装済み

- 全13記事の既存末尾A8 CTA手前に、広告先が複数業種のBMであること、資料請求リスト、入力や後日の連絡、契約ではないこと、比較項目を説明する小さな案内を追加。
- 清掃業については、広告先の掲載カテゴリーに清掃専業と関連サービスが混在すると明記。クリック前に期待の不一致を減らす。
- GA4 `affiliate_cta_view` を追加（CTAが半分以上表示されたとき1回）。既存 `affiliate_click`、`internal_link_click`、`floating_ad_show`、`floating_ad_close`、`calculator_use`、`reading_path_guide` は保持。
- A8の広告ID、リンク先のクエリ、広告画像URL/1px計測ピクセルは既存13記事でバイトレベル同一。追従広告は5記事・30%・閉じる・同セッション非表示仕様を維持。

### P1 実装済み

- 主力5記事の `<title>`、meta description、OG title/description、見出しを検索意図に合わせて更新。既存表・導入説明・出典・計算機・CTAは削除せず維持。
- トピック別の内部リンク導線、ホームから新設比較記事への導線を追加。
- 2新記事：資料請求前の費用・契約比較と、清掃FC掲載候補比較。
- XMLサイトマップへ2記事を追加し、実際に変更したページの lastmod を 2026-10-25 に設定。canonical は既存URLを維持。
- GitHub Pagesのプロジェクト直下の robots.txt はホストドメイン直下ではない。Google Search ConsoleのURLプレフィックス登録済みプロパティへ `https://cog-vja.github.io/bluecollar-fc-site/sitemap.xml` を直接送信。

### P2 実績を見て検討（未実装）

- 新しいASP・広告主案件との適合性比較（現在の固定A8コード変更には別途承認・規約確認が必要）。
- 追従広告の30%表示と控えめな表示（例：60%表示や特定セクション後）を実験可能な十分なPVが確保できた時点で比較。現段階では勝手なトラフィック分割をしない。
- 審査・承認実績による記事別の報酬最適化、GSC実クエリでの見出し微調整。

## 成果測定（4週間など同じ期間で比較する）

- 検索：GSC ページ×検索クエリの表示/クリック/CTR/掲載順位、登録済みページ数、非インデックス理由。
- サイト：GA4 organic sessions、ランディング別閲覧、内部遷移、`affiliate_cta_view`、`affiliate_click`、`floating_ad_show`、`floating_ad_close`、スマホ/PC分類。
- CTAクリック率（近似）＝ `affiliate_click`÷`affiliate_cta_view`。同一ユーザーの複数操作やイベント計測漏れがあり、セッションCTRとは別。追従クリックは `affiliate_click` の `cta_location=floating_mobile` / `floating_desktop`、本文は article_bottom。
- 追従バナー閉じる率＝ `floating_ad_close`÷`floating_ad_show`。表示数が小さい場合は判断を急がない。
- ASP成果：A8クリック・発生成果・確定成果・報酬を日付範囲に合わせ、発生成果率＝発生成果数÷ASPクリック数、承認率＝確定成果数÷発生成果数、実EPC＝確定報酬÷ASPクリック数 を追跡。
- クロスドメインの申込完了は本サイトGA4だけでは直接追跡できない。A8側の申込発生/否認/確定情報と照合。
- ASPのクリック時点と成果発生・承認時点にはラグがあるため、同一期間での見かけの成果率は暫定値として判断する。

## 未確認（運営者側での確認が必要）

1. A8リンクを実クリックした際の実際の最終ページ・計測有効性（不正なテストクリック防止のため直接試していない）。`a8ejpredirect` に `/SP/` が指定されていることはコード上確認できる。
2. 実際の資料請求入力・完了画面、募集年齢・地域・資金要件のすべて、FC本部ごとの成果可否。
3. A8管理画面での成果発生条件・否認条件・ディープリンク許可と利用条件。
4. GA4管理画面とGSCの実データ、広告クリック・資料請求/承認成果数（管理画面未連携）。
5. 実公開環境でのクロール・Search Console登録状況、外部リンクの将来的な有効性。

## 参考URL

- https://bmfc.b-mall.ne.jp/ （BMフランチャイズ）
- https://bmfc.b-mall.ne.jp/fc/list/?category=85&dm=pc （清掃関連5件が表示されたページ）
- https://bmfc.b-mall.ne.jp/material/list/ （資料請求リスト）
- https://bmfc.b-mall.ne.jp/regist/ （登録時の入力）
- https://www.chusho.meti.go.jp/shogyo/shogyo/franchise.html （中小企業庁）
- https://www.jftc.go.jp/dk/guideline/unyoukijun/franchise.html （公正取引委員会）
