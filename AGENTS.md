# Sean Web 開發規則

---

## 接手前必讀

最新進度、已完成內容、不要重做的項目與下次接手順序，統一記錄於：

- `docs/PROJECT_STATUS.md`

Codex、Claude Code 或其他工具開始工作前，必須先閱讀該文件。
每次完成重要內容、版面或技術決策後，也必須同步更新。

## 工作記錄（最新在上）

### 2026-06-07 — Claude Code（Sonnet 4.6）UI/UX 修改

**本次由 Claude Code 執行，Codex 下次開啟請從這裡接手。**

#### 已完成修改（均在 `src/styles.css`）

| # | 項目 | 改動說明 |
|---|------|---------|
| 1 | Section 垂直間距 | `.quick-nav, .content-section` padding-bottom 從 `clamp(6rem,10vw,10rem)` 縮至 `clamp(4rem,7vw,7rem)` |
| 2 | Hero 圖片下方間距 | `.hero-media` margin-bottom 從 `clamp(6rem,10vw,10rem)` 縮至 `clamp(4rem,7vw,7rem)` |
| 3 | About 區塊間距 | `.about-section` padding 及 gap 各減約 2rem，整體頁面節奏更緊湊 |
| 4 | 工具卡背景色 | `.tool-visual-audience` 從 `#e7e8ff`（紫）→ `var(--gray-100)`；`.tool-visual-image` 從 `#fff4c8`（黃）→ `#e4f7c0`（淡萊姆），拉回品牌色系 |
| 5 | disabled-action 按鈕 | 原為萊姆綠實心（視覺上像可點擊 CTA），現改為灰底灰字帶邊框 + `cursor:default`，明確傳達「尚未開放」 |
| 6 | 導覽列 CTA 按鈕 | `.header-action` padding 從 `1rem` 加寬至 `1.4rem`，視覺份量提升 |
| 7 | Principles 數字標記 | `.principles b` 改為萊姆圓形 badge（26×26px），從純文字數字升級為視覺元素 |
| 8 | Quick card 最小高度 | 從 `300px` 調整為 `320px`，確保三卡等高一致 |

### 2026-06-07 補充 — 中文斷行根治（同一 session）

**問題根因：** `text-wrap: balance`（全域 h1/h2/h3）以「視覺平衡」決定斷行，不懂中文語意，造成「Google 商 / 家實戰課程」、「看 / 見」、「夥 / 伴」等錯誤斷行。

**已修改（`src/styles.css`）：**
- 全域 `h1,h2,h3`：`text-wrap: balance` → `text-wrap: pretty` + 補上 `word-break: keep-all; line-break: strict; overflow-wrap: normal`
- 以下區塊同樣補上三行規則：`.card-body > p`、`.card-body dd`、`.about-content > p`、`.services-copy > p`、`.tool-card-body > p`、`.tool-card-body small`

**修後效果：** 中文字群不再被切斷，斷點移到 Latin/CJK 交界的空格或標點符號，大幅改善。

**CSS 做不到的事（須靠 JSX 手動 `<br>`）：**
- "Google 商家 / 實戰課程"（理想）→ CSS 無法辨識「商家」和「實戰課程」是獨立語意群
- 凡是 Latin 詞開頭、後接中文詞的標題，`keep-all` 只能在空格處斷，仍會出現 "Google / 商家實戰課程"
- **解法**：將 `site.ts` 中 `course.title` 改為支援 `<br>` 的渲染，在 `App.tsx` 把 `{siteContent.course.title}` 改成支援 HTML 片段的元件（或 split/換行符號），這樣 Sean 在 `site.ts` 用 `\n` 就能控制斷行點

#### 尚未處理（待 Codex 或下次 Claude Code 接手）

- **Hero 圖片** — 現為 placeholder（`/images/home-hero-placeholder.webp`），等 Sean 提供形象照後替換。替換路徑：`public/images/home-hero-placeholder.webp`，同步更新 `src/data/site.ts` 的 `hero.image`
- **Course / Services 圖片** — 同上，`/images/course-placeholder.webp`、`/images/consulting-placeholder.webp`
- **合作表單** — `services.actionLabel`「合作表單準備中」按鈕目前為 disabled span，等表單 URL 確認後改為 `<a>` 並更新 `src/data/site.ts`
- **標題斷行精控（已完成）** — `course.title` 已改為 `"Google商家\n實戰課程"`，`App.tsx` 的 `<h3>` 已支援 `\n` 轉 `<br>`。**未來新增課程**：在 `site.ts` 的 title 字串中用 `\n` 標示斷行點，渲染邏輯已就位，不需再動 `App.tsx`
- **Hero 說明文字位置** — 目前 `.hero-title-row` `align-items: end`，說明文字在右下角。這是刻意的編輯設計（editorial layout），Sean 若覺得不順可改為 `align-items: center`
- **Footer 社群連結圖示** — 目前純文字，無平台 icon。若要加 SVG icon 需在 `App.tsx` footer 段修改

#### 協作說明（給 Codex / Claude Code 的話）

- **主要內容資料檔**：`src/data/site.ts`，所有文案、連結、圖片路徑集中在此，修改內容優先動這個檔案
- **樣式檔**：`src/styles.css`，無 CSS Modules，全站共用
- **頁面結構**：`src/App.tsx`（首頁）、`src/AboutPage.tsx`（講師邀約頁）、`src/BniPage.tsx`（BNI 預留頁）
- **開發 port**：`npm run dev` 啟動後，若 5173 被佔（常見，因為 ig-audience-analyzer 也在跑），Vite 會自動用 5174
- **品牌色**：`--lime: #b8ff4f`、`--lime-strong: #9bed2d`、`--black: #111`、`--gray-100: #eeeeeb`。新增元素請從這個系統取色，不要另外引入紫色、黃色等
- **截圖工具**：Playwright 在本機截 full page 會因 Google Fonts timeout，建議用 Puppeteer（`mcp__puppeteer__puppeteer_screenshot`）分段截圖

---


## 必讀文件

開始規劃頁面、撰寫文案、產生圖片或修改品牌表達前，必須先閱讀：

- `README.md`：產品範圍與技術方案
- `docs/BRAND_GUIDE.md`：熊恩老師的品牌定位、受眾、課程與文案語氣

若臨時文案與品牌文件互相衝突，應以 Sean 最新明確說明為準，並同步更新
品牌文件。

## 專案定位

本專案是熊恩 Sean 的正式品牌入口網站，服務非技術背景的課程學員、
實體店家與社群經營客戶。

網站第一版負責品牌介紹、內容分流及導向既有服務，並提供 Sean 單人使用
的輕量內容後台；不自行承擔會員、付款、課程播放或複雜資料管理。

## 核心頁面

1. 首頁
2. 講師邀約頁
3. 課程
4. 學員工具
5. 社群經營方案與聯絡表單
6. BNI 夥伴專區預留頁
7. Sean 單人內容後台

## 技術與部署原則

- 使用適合 Cloudflare Pages 的靜態前端架構。
- 程式碼保存在 GitHub，推送後自動部署。
- 使用自有網域、Cloudflare DNS 與自動 SSL。
- 不使用需要人工維護的 VM 或傳統自架伺服器。
- 第一版不建立資料庫。
- 網站內容集中保存於 GitHub 的 JSON、Markdown 或其他結構化資料檔。
- 後台內容更新透過 Cloudflare Pages Function 寫入 GitHub。
- 後台使用 Cloudflare Access，僅允許 Sean 指定的 Email 登入。
- 不自行建立密碼登入、註冊、忘記密碼或多人權限系統。
- GitHub 憑證只能存放於 Cloudflare 環境變數，不得傳送到前端。
- 聯絡表單優先使用 Tally 等代管服務。
- 課程報名及付款連到既有第三方系統。
- 影片使用 YouTube 或 Vimeo，不存放於 GitHub。
- 圖片上線前必須壓縮並使用適當格式。

## 內容與介面原則

- 全站使用繁體中文。
- 文字要讓非技術背景使用者容易理解。
- 中文標題必須依完整語意片語換行，不可只為視覺平衡切斷詞組或轉折語。
- 重要標題應使用人工可控換行，避免出現「一件／事」、「而是／確保」等斷句。
- 首頁應清楚分流至課程、學員工具與社群經營方案。
- 每張課程及工具卡片都要有明確行動按鈕。
- 外部報名及工具連結應清楚標示，並安全地開啟。
- 手機版是必要驗收項目，不是後續功能。
- 不使用無法由 Sean 長期更新的複雜動畫或編輯流程。

## 後台原則

- 後台採固定模板與結構化欄位，定位為內容編輯器，不是頁面建構器。
- 可編輯文字、Banner、圖片、按鈕、外部連結及基本 SEO 資訊。
- 可新增、排序、隱藏課程與工具項目。
- 應提供預覽與發布步驟，降低誤改正式網站的風險。
- 不提供任意拖拉排版、自訂 CSS、HTML 或 JavaScript。
- 導覽、版型、色彩、字體與元件樣式由程式碼管理。
- 後台所有輸入都必須驗證，外部連結也必須限制為安全協定。
- 內容更新應保留 GitHub 版本紀錄，讓錯誤內容可以還原。

## 工具內容原則

- 工具主要提供熊恩老師的學員使用，不定位為公開免費工具平台。
- 工具應說明所輔助的課程、練習或工作情境。
- 工具的來源是教課與社群經營中反覆出現的操作需求。
- 文案應強調減少重複工作，以及縮短學習、摸索與執行時間。

## 維護原則

- 課程、工具、社群連結與頁面文字應集中在容易修改的資料檔，不散落在元件中。
- 不為尚未確認的需求預先建立會員、金流、資料庫或多人後台。
- 優先使用成熟的代管服務，減少金鑰、安全更新、備份及主機維護。
- 每次新增外部服務，都要記錄用途、費用、帳號擁有者及取消方式。
- 不在程式碼中寫入 API Key、密碼或其他秘密資料。
- 圖片先壓縮後再上傳；只有素材數量或流量增加時才評估 Cloudflare R2。

## 第一版範圍外

- 前台會員登入、註冊與會員系統
- 網站內金流
- 課程影音平台
- WordPress 式自由頁面編輯器
- 多人帳號、角色權限與內容審核流程
- 自建資料庫
- 小工具權限整合
- Google Cloud VM
- PDF 報告與複雜下載功能

除非 Sean 明確調整專案範圍，否則不要在第一版加入以上功能。
