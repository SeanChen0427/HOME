export function BniPage() {
  return (
    <main className="bni-page">
      <a className="bni-back" href="/about">
        ← 返回講師介紹
      </a>
      <section>
        <p className="section-label">BNI PARTNER AREA</p>
        <h1>五大表格內容預留區</h1>
        <p>
          此頁先建立入口與內容結構，表格名稱、欄位、權限及實際資料之後再確認。
        </p>
        <div className="bni-grid">
          {[1, 2, 3, 4, 5].map((number) => (
            <article key={number}>
              <span>0{number}</span>
              <h2>表格 {number}</h2>
              <p>內容待補</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
