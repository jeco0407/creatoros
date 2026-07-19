# Creator OS

創作者的 AI 工作系統首頁 — React + Vite + Tailwind CSS + Supabase。

## 環境變數

複製 `.env.example` 為 `.env.local`，填入你的 Supabase 專案資訊（Project Settings → API）：

```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-publishable-or-anon-key
```

`supabase/migrations/` 內含資料庫 schema（profiles / tasks / projects / ideas，皆有 RLS 保護）。若要套用到你自己的 Supabase 專案：

```bash
supabase link --project-ref your-project-ref
supabase db push
```

## 開發

```bash
npm install
npm run dev       # http://localhost:5173
```

## 建置

```bash
npm run build      # 輸出到 dist/
npm run preview    # 預覽打包結果
```

## 部署

專案為標準 Vite 專案，於 [Vercel](https://vercel.com) 匯入此 repo 即可自動偵測（Framework Preset: Vite，Build Command: `npm run build`，Output Directory: `dist`）。

記得在 Vercel 專案的 Environment Variables 設定 `VITE_SUPABASE_URL` 與 `VITE_SUPABASE_ANON_KEY`，否則build會失敗（`.env.local` 不會被推到 GitHub）。
