import { useEffect, useState } from "react";
import { siteContent } from "./data/site";

const base = import.meta.env.BASE_URL.replace(/\/$/, "");
const url = (path: string) => path.startsWith("/") && !path.startsWith("//") ? `${base}${path}` : path;

const ArrowIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path d="M5 12h13M13 6l6 6-6 6" />
  </svg>
);

export function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.title = "熊恩老師｜講師介紹與課程邀約";
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute(
      "content",
      "熊恩老師 Sean Chen 講師介紹、授課主題、邀約場合與合作方式。",
    );
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        跳到主要內容
      </a>

      <header className="site-header">
        <a className="brand" href={url("/")} aria-label="返回熊恩老師首頁">
          <span className="brand-symbol">熊</span>
          <span>
            <strong>熊恩老師</strong>
            <small>{siteContent.brand.descriptor}</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="講師介紹導覽">
          <a href="#profile">講師介紹</a>
          <a href="#method">教學方式</a>
          <a href="#topics">邀約主題</a>
          <a href="#organizer">合作資訊</a>
          <a href={url("/")}>回到首頁</a>
        </nav>

        <a
          className="header-action"
          href={siteContent.speakerPage.contactHref}
          target="_blank"
          rel="noreferrer noopener"
        >
          課程邀約 <ArrowIcon />
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "關閉選單" : "開啟選單"}
          aria-expanded={menuOpen}
          aria-controls="about-mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>

        <nav
          className={`mobile-nav ${menuOpen ? "is-open" : ""}`}
          id="about-mobile-navigation"
          aria-label="手機版講師介紹導覽"
        >
          {[
            ["講師介紹", "#profile"],
            ["教學方式", "#method"],
            ["邀約主題", "#topics"],
            ["合作資訊", "#organizer"],
            ["回到首頁", "/"],
          ].map(([label, href]) => (
            <a href={href} key={href} onClick={() => setMenuOpen(false)}>
              {label} <ArrowIcon />
            </a>
          ))}
        </nav>
      </header>

      <main className="speaker-page" id="main">
        <section className="speaker-hero page-shell" id="profile">
          <div className="speaker-hero-copy">
            <p className="section-label">{siteContent.speakerPage.eyebrow}</p>
            <h1>
              <span className="title-phrase">一次講清楚</span>
              <span className="title-phrase">一件事，</span>
              <span className="title-phrase">讓學員在課堂上</span>
              <span className="title-phrase">真的完成。</span>
            </h1>
            <p className="speaker-lead">
              {siteContent.speakerPage.introduction}
            </p>
            <p>{siteContent.speakerPage.positioning}</p>
            <div className="speaker-actions">
              <a
                className="primary-link"
                href={siteContent.speakerPage.contactHref}
                target="_blank"
                rel="noreferrer noopener"
              >
                {siteContent.speakerPage.contactLabel} <ArrowIcon />
              </a>
              <a className="outline-link" href="#topics">
                查看可邀約主題
              </a>
            </div>
          </div>

          <figure className="speaker-portrait">
            <img
              src={siteContent.speakerPage.profileImage}
              alt={siteContent.speakerPage.profileImageAlt}
              width="900"
              height="900"
              fetchPriority="high"
            />
            <figcaption>
              <strong>陳奎翔 Sean Chen</strong>
              <span>社群顧問・AI 講師・企業講師</span>
            </figcaption>
          </figure>
        </section>

        <section className="speaker-facts page-shell" aria-label="講師經歷">
          <p className="section-label">EXPERIENCE</p>
          {siteContent.speakerPage.facts.map((fact, index) => (
            <div key={fact}>
              <span>0{index + 1}</span>
              <p>{fact}</p>
            </div>
          ))}
        </section>

        <section className="speaker-method page-shell" id="method">
          <div className="speaker-section-heading">
            <p className="section-label">TEACHING METHOD</p>
            <h2>
              <span className="title-phrase">不是教越多越好，</span>
              <span className="title-phrase">而是確保學員真的吸收。</span>
            </h2>
            <p>
              我的課程從業主會遇到的工作場景出發，把方法拆成容易理解的步驟，再安排足夠的操作時間。
            </p>
          </div>
          <div className="speaker-method-grid">
            {siteContent.speakerPage.teachingMethod.map((item, index) => (
              <article key={item.title}>
                <span>0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="speaker-topics page-shell" id="topics">
          <div className="speaker-section-heading">
            <p className="section-label">COURSE MENU</p>
            <h2>
              <span className="title-phrase">可單獨邀約，</span>
              <span className="title-phrase">也能依需求</span>
              <span className="title-phrase">組成系列課程。</span>
            </h2>
            <p>
              以下是常見主題。正式合作前會依學員產業、程度、設備與希望成果調整內容。
            </p>
          </div>

          <div className="speaker-topic-grid">
            {siteContent.speakerPage.topics.map((topic) => (
              <article key={topic.number}>
                <div className="speaker-topic-meta">
                  <span>{topic.number}</span>
                  <small>{topic.category}</small>
                </div>
                <h3>{topic.title}</h3>
                <p>{topic.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="organizer-section" id="organizer">
          <div className="organizer-column">
            <p className="section-label">SUITABLE FOR</p>
            <h2>適合邀約場合</h2>
            <ul>
              {siteContent.speakerPage.suitableFor.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="organizer-column organizer-value">
            <p className="section-label">WHAT TO EXPECT</p>
            <h2>合作與課程安排</h2>
            <ul>
              {siteContent.speakerPage.organizerValue.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="speaker-contact page-shell">
          <p className="section-label">INVITE SEAN</p>
          <h2>
            <span className="title-phrase">先告訴我學員是誰，</span>
            <span className="title-phrase">以及希望他們下課後</span>
            <span className="title-phrase">會做什麼。</span>
          </h2>
          <p>
            邀約時可以提供活動日期、地點、參加對象、人數、預計時間與希望主題。我會再一起確認適合的課程範圍與操作方式。
          </p>
          <a
            className="primary-link"
            href={siteContent.speakerPage.contactHref}
            target="_blank"
            rel="noreferrer noopener"
          >
            透過 LINE 聯絡 <ArrowIcon />
          </a>
        </section>

        <div className="partner-entry page-shell">
          <a href={url("/bni")}>BNI 夥伴專區</a>
        </div>
      </main>
    </>
  );
}
