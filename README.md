# 働き方と独立ノート（iPhone向け・フォルダなし版）

この8ファイルをGitHubリポジトリの一番上の階層にまとめてアップロードしてください。

- index.html
- bluecollar-independent.html
- bluecollar-income.html
- labor-shortage-business.html
- affiliate-config.js
- app.js
- style.css
- README.md

## アフィリエイトリンクの変更
`affiliate-config.js` のこの1行だけ変更します。

```js
window.AFFILIATE_URL = "ここにA8.net等で取得した広告リンク";
```

記事内のすべての対象CTAリンクに反映されます。

## GitHub Pages
Settings → Pages → Deploy from a branch → `main` / `/(root)` → Save

※ A8.net等の広告素材が単純なURLではなくHTML/JavaScriptタグ一式の場合は、その広告コードの仕様に合わせた組み込みが必要です。
