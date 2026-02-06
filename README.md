# 歯科医院向け税務ダッシュボード

医療DX × Bluetax For Dental のダッシュボードデモです。

## 🚀 CodeSandboxで開く方法

### 方法1: 新規プロジェクトとして作成

1. [CodeSandbox](https://codesandbox.io) にアクセス
2. 「Create Sandbox」をクリック
3. 「Import Project」を選択
4. このフォルダの中身をすべてアップロード

### 方法2: StackBlitzで開く

1. [StackBlitz](https://stackblitz.com) にアクセス
2. 「New Project」→「React」を選択
3. 以下のファイルを置き換え・追加:
   - `package.json`
   - `src/App.jsx`
   - `src/main.jsx`
   - `src/index.css`
   - その他設定ファイル

---

## 💻 ローカルで実行する場合

```bash
# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

ブラウザで `http://localhost:5173` を開きます。

---

## ✨ 機能

### データ編集機能
- 右上の「データ編集」ボタンをクリック
- 数値を直接変更可能
- グラフがリアルタイムで更新
- 「保存」で確定、「キャンセル」で元に戻る

### 表示内容
- **今月の経営速報**: 売上・経費・営業利益
- **納税見込み額**: 所得税・消費税・住民税
- **資金繰りアラート**: 3ヶ月先の予測
- **月次推移**: 直近12ヶ月のグラフ
- **診療分析**: 自費率推移、メニュー別売上
- **経費分析**: 経費構成比
- **To-Doリスト**: タスク管理
- **税理士アドバイス**: プロからの助言
- **設備投資計画**: ローン返済シミュレーション

---

## 📦 必要な依存関係

- React 18
- Recharts (グラフライブラリ)
- Lucide React (アイコン)
- Tailwind CSS (スタイリング)
- Vite (ビルドツール)

---

## 🎨 カスタマイズ

`src/App.jsx` の `data` オブジェクトを編集することで、初期データを変更できます。

```javascript
const [data, setData] = useState({
  currentMonth: {
    revenue: 8500000,  // ← ここを変更
    // ...
  }
});
```

---

## 📝 注意事項

- このデモはプロトタイプです
- データは保存されません（リロードすると初期値に戻ります）
- 本番環境では適切なバックエンドAPIとの連携が必要です

---

## 🆘 問題が発生した場合

1. 依存関係を再インストール: `npm install`
2. キャッシュをクリア: `npm run build` 後に `npm run dev`
3. Node.jsのバージョンを確認: 18.x 以上を推奨
