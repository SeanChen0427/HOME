import { useEffect, useState } from "react";
import { siteContent } from "./data/site";

const ArrowIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path d="M5 12h13M13 6l6 6-6 6" />
  </svg>
);

const base = import.meta.env.BASE_URL.replace(/\/$/, "");
const url = (path: string) => path.startsWith("/") && !path.startsWith("//") && !path.startsWith("/#") ? `${base}${path}` : path;

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    window.addEventListener("resize", closeMenu);
    return () => window.removeEventListener("resize", closeMenu);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        跳到主要內容
      </a>

      <header className="site-header">
        <a className="brand" href="/#top" aria-label="熊恩老師首頁">
          <span className="brand-symbol">熊</span>
          <span>
            <strong>熊恩老師</strong>
            <small>{siteContent.brand.descriptor}</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="主要導覽">
          {siteContent.navigation.map((item) => (
            <a href={url(item.href)} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="header-action" href="/#services">
          合作詢問 <ArrowIcon />
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "關閉選單" : "開啟選單"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>

        <nav
          className={`mobile-nav ${menuOpen ? "is-open" : ""}`}
          id="mobile-navigation"
          aria-label="手機版主要導覽"
        >
          {siteContent.navigation.map((item) => (
            <a
              href={url(item.href)}
              key={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
              <ArrowIcon />
            </a>
          ))}
        </nav>
      </header>

      <main id="main">
        <section className="hero page-shell" id="top">
          <div className="hero-kicker reveal reveal-1">
            <span>數位經營實戰</span>
            <span>每週持續更新</span>
          </div>

          <div className="hero-title-row">
            <h1 className="reveal reveal-2">
              學會判斷
              <br />
              <span>再用工具</span>
            </h1>
            <p className="hero-description reveal reveal-3">
              我不只教你按哪個按鈕，更陪你判斷工具對生意有沒有用、該怎麼用，
              再把方法真正放進工作裡。
            </p>
          </div>

          <div className="hero-tags reveal reveal-3" aria-label="網站特色">
            <span>白話教學</span>
            <span>實際操作</span>
            <span className="tag-accent">非技術背景也能學</span>
          </div>

          <figure className="hero-media reveal reveal-4">
            <img
              src={siteContent.hero.image}
              alt={siteContent.hero.imageAlt}
              width="1672"
              height="941"
              fetchPriority="high"
            />
            <figcaption>
              <span>IMAGE PLACEHOLDER / 後續更換熊恩老師形象照或影片</span>
              <a href="#course">
                開始探索 <ArrowIcon />
              </a>
            </figcaption>
          </figure>
        </section>

        <section className="quick-nav page-shell" aria-labelledby="quick-title">
          <div className="section-intro">
            <span className="section-index">01</span>
            <div>
              <p className="section-label">START HERE</p>
              <h2 id="quick-title">你現在想先解決哪件事？</h2>
            </div>
          </div>

          <div className="quick-grid">
            {siteContent.pathways.map((path, index) => (
              <a className="quick-card" href={path.href} key={path.number}>
                <div className="quick-card-top">
                  <span>0{index + 1}</span>
                  <span className={index === 1 ? "mini-pill active" : "mini-pill"}>
                    {path.label}
                  </span>
                </div>
                <h3>{path.title}</h3>
                <p>{path.description}</p>
                <span className="card-arrow">
                  <ArrowIcon />
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="content-section page-shell" id="course">
          <div className="section-intro">
            <span className="section-index">02</span>
            <div>
              <p className="section-label">FEATURED COURSE</p>
              <h2>精選實戰課程</h2>
            </div>
            <span className="section-status">目前 1 門</span>
          </div>

          <article className="content-card course-card">
            <div className="card-image">
              <img
                src={siteContent.course.image}
                alt={siteContent.course.imageAlt}
                width="1448"
                height="1086"
                loading="lazy"
              />
              <span className="image-chip">熱門課程</span>
            </div>
            <div className="card-body">
              <div className="card-meta">
                <span>Google 商家</span>
                <span>實體店家</span>
              </div>
              <h3>
                {siteContent.course.title.split("\n").map((line, i, arr) => (
                  <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                ))}
              </h3>
              <p>{siteContent.course.description}</p>
              <dl>
                <div>
                  <dt>適合對象</dt>
                  <dd>{siteContent.course.audience}</dd>
                </div>
                <div>
                  <dt>課程狀態</dt>
                  <dd>{siteContent.course.status}</dd>
                </div>
              </dl>
              <a
                className="primary-link"
                href={siteContent.course.action.href}
                target="_blank"
                rel="noreferrer noopener"
              >
                {siteContent.course.action.label} <ArrowIcon />
              </a>
            </div>
          </article>
        </section>

        <section className="content-section tools-section page-shell" id="tools">
          <div className="section-intro">
            <span className="section-index">03</span>
            <div>
              <p className="section-label">TOOLS FOR STUDENTS</p>
              <h2>給學員的實作輔助工具</h2>
            </div>
            <span className="section-status accent">跟著課程持續新增</span>
          </div>

          <div className="tools-statement">
            <p>{siteContent.tools.description}</p>
          </div>

          <div className="tool-grid">
            {siteContent.tools.items.map((tool) => (
              <article className="tool-card" key={tool.href}>
                <div className={`tool-visual tool-visual-${tool.type}`}>
                  <span className="tool-number">{tool.number}</span>
                  {tool.type === "audience" ? (
                    <div className="audience-graphic" aria-hidden="true">
                      <span className="profile-dot profile-main">你</span>
                      <span className="profile-dot">A</span>
                      <span className="profile-dot">B</span>
                      <i />
                      <i />
                    </div>
                  ) : (
                    <div className="image-graphic" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                      <b>↓</b>
                    </div>
                  )}
                  <span className="image-chip green">{tool.label}</span>
                </div>
                <div className="tool-card-body">
                  <h3>{tool.title}</h3>
                  <p>{tool.description}</p>
                  <small>{tool.note}</small>
                  <a
                    className="primary-link"
                    href={tool.href}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {tool.actionLabel} <ArrowIcon />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about-section page-shell" id="about">
          <div className="about-heading">
            <p className="section-label">ABOUT SEAN</p>
            <h2>教你用得會，<br />也陪你做得出來。</h2>
          </div>
          <div className="about-content">
            {siteContent.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="principles">
              {siteContent.about.principles.map((principle, index) => (
                <span key={principle}>
                  <b>0{index + 1}</b>
                  {principle}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="services-section" id="services">
          <div className="services-media">
            <img
              src={siteContent.services.image}
              alt={siteContent.services.imageAlt}
              width="1448"
              height="1086"
              loading="lazy"
            />
          </div>
          <div className="services-copy">
            <p className="section-label">WORK WITH SEAN</p>
            <h2>{siteContent.services.title}</h2>
            <p>{siteContent.services.description}</p>
            <div className="service-tags">
              {siteContent.services.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <span className="disabled-action">
              {siteContent.services.actionLabel}
            </span>
          </div>
        </section>

        <section className="closing page-shell">
          <span className="closing-mark">熊恩老師</span>
          <h2>{siteContent.closing.title}</h2>
          <p>{siteContent.closing.description}</p>
          <div className="closing-links">
            <a className="primary-link" href="#course">
              查看課程 <ArrowIcon />
            </a>
            <a className="outline-link" href="#tools">
              查看學員工具
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <span className="brand-symbol">熊</span>
            <div>
              <strong>熊恩老師</strong>
              <p>{siteContent.brand.descriptor}</p>
            </div>
          </div>
          <p className="footer-introduction">
            {siteContent.footer.introduction}
          </p>
        </div>
        <div className="social-list" aria-label="熊恩老師社群連結">
          {siteContent.footer.socialLinks.map((social) => (
            <a
              href={social.href}
              key={social.label}
              target="_blank"
              rel="noreferrer noopener"
            >
              {social.label} <ArrowIcon />
            </a>
          ))}
        </div>
        <p>© {new Date().getFullYear()} 熊恩老師 Sean Chen</p>
      </footer>
    </>
  );
}

export default App;
