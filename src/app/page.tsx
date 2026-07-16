"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import { useLang } from "@/i18n/LanguageProvider";
import { useTheme } from "@/theme/ThemeProvider";

// ---------------------------- DATA (não traducible: fuentes, urls, iconos) ----------------------------

const STACK = [
  { src: "/tech/react.svg", label: "React" },
  { src: "/tech/nextjs.svg", label: "Next.js" },
  { src: "/tech/typescript.svg", label: "TypeScript" },
  { src: "/tech/javascript.svg", label: "JavaScript" },
  { src: "/tech/tailwind.svg", label: "Tailwind" },
  { src: "/tech/mysql.svg", label: "MySQL" },
  { src: "/tech/html5.svg", label: "HTML5" },
  { src: "/tech/css3.svg", label: "CSS3" },
  { src: "/tech/git.svg", label: "Git" },
];

// ---------------------------- MAIN ----------------------------

export default function Home() {
  const { t, lang, toggleLang } = useLang();
  const { theme, toggleTheme } = useTheme();
  const heroRef = useRef<HTMLElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Hero stagger entry animation
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const timer = setTimeout(() => el.classList.add("loaded"), 60);
    return () => clearTimeout(timer);
  }, []);

  // Nav scroll state — adds .scrolled after 60px of scroll
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const onScroll = () => {
      if (window.scrollY > 60) nav.classList.add("scrolled");
      else nav.classList.remove("scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body class sync for hamburger animation + prevent scroll
  useEffect(() => {
    if (menuOpen) document.body.classList.add("menu-open");
    else document.body.classList.remove("menu-open");
  }, [menuOpen]);

  // Close menu on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("juana.gonzalez.dev@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* silent */
    }
  };

  const closeMenu = () => setMenuOpen(false);

  // Reusable toggle buttons for nav + mobile menu
  const LangButton = () => (
    <button
      className="nav-toggle"
      type="button"
      onClick={toggleLang}
      aria-label={t("nav.langToggle")}
      title={lang === "es" ? "English" : "Español"}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/lang-flag.png" alt="" className="flag-img" />
    </button>
  );

  const ThemeButton = () => (
    <button
      className="nav-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={t("nav.themeToggle")}
      title={theme === "dark" ? "Light mode" : "Dark mode"}
    >
      <svg className="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3v2M12 19v2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M3 12h2M19 12h2M5.6 18.4l1.4-1.4M17 7l1.4-1.4" />
      </svg>
      <svg className="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    </button>
  );

  return (
    <>
      {/* ============================================================ NAV ============================================================ */}
      <header className="nav" id="nav" ref={navRef}>
        <div className="wrap nav-inner">
          <a href="#inicio" className="logo" aria-label="Inicio" onClick={closeMenu}>
            <span>juana<span className="dotlima">.</span></span>
            <span className="nav-tagline">{t("nav.tagline")}</span>
          </a>

          <nav className="nav-links" aria-label="Principal">
            <a className="nav-link" href="#inicio">{t("nav.home")}</a>
            <a className="nav-link" href="#sobre-mi">{t("nav.about")}</a>
            <a className="nav-link" href="#proyectos">{t("nav.projects")}</a>
            <a className="nav-link" href="#experiencia">{t("nav.experience")}</a>
            <a className="nav-link" href="#contacto">{t("nav.contact")}</a>
          </nav>

          <div className="nav-right">
            <LangButton />
            <ThemeButton />
            <a
              className="btn btn-ghost btn-sm btn-attract"
              href="/CV_Juana_Gonzalez.pdf"
              download
            >
              {t("nav.downloadCV")}
            </a>
            <button
              className="hamb"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
              aria-expanded={menuOpen}
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================ MOBILE MENU ============================================================ */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <a href="#inicio" onClick={closeMenu}><span>01</span>{t("nav.home")}</a>
        <a href="#sobre-mi" onClick={closeMenu}><span>02</span>{t("nav.about")}</a>
        <a href="#proyectos" onClick={closeMenu}><span>03</span>{t("nav.projects")}</a>
        <a href="#experiencia" onClick={closeMenu}><span>04</span>{t("nav.experience")}</a>
        <a href="#contacto" onClick={closeMenu}><span>05</span>{t("nav.contact")}</a>
        <a
          className="mobile-cv btn btn-primary"
          href="/CV_Juana_Gonzalez.pdf"
          download
          onClick={closeMenu}
        >
          {t("nav.downloadCV")}
        </a>
      </div>

      {/* ============================================================ 1 · HERO ============================================================ */}
      <section className="hero" id="inicio" ref={heroRef}>
        <div className="hero-grid-bg" aria-hidden="true"></div>
        <div className="wrap hero-layout">
          <div className="hero-inner hero-stagger">
            <p className="eyebrow">
              <span className="dot"></span>
              {t("hero.eyebrow")}
            </p>
            <h1>
              Juana<br />
              <span className="lastname">González</span>
            </h1>
            <p className="role">
              {t("hero.role")} <b>{t("hero.roleAccent")}</b>
            </p>
            <p className="tagline">{t("hero.tagline")}</p>
            <div className="hero-cta">
              <a className="btn btn-primary" href="#proyectos">
                {t("hero.cta1")} <span className="arr">→</span>
              </a>
              <a className="btn btn-ghost" href="/CV_Juana_Gonzalez.pdf" download>
                {t("hero.cta2")}
              </a>
            </div>
          </div>

          <div className="hero-stage" aria-hidden="true">
            <div className="phone-parallax">
              <div className="phone-float">
                <div className="phone-enter">
                  <figure className="photo-frame">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/juana-foto.png" alt={t("hero.imgAlt")} />
                    <span className="pf-corner tl"></span>
                    <span className="pf-corner br"></span>
                  </figure>
                </div>
              </div>
            </div>

            <div className="hcard-pos pos-status">
              <div className="hcard-parallax">
                <div className="hcard-float" style={{ "--amp": "12px", "--dur": "9s", "--delay": "1.2s" } as React.CSSProperties}>
                  <div className="hcard-enter" style={{ "--enter-delay": ".35s" } as React.CSSProperties}>
                    <div className="hcard" style={{ "--breathe-delay": "2.2s" } as React.CSSProperties}>
                      <span className="hic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg></span>
                      <span className="htxt"><b>{t("hero.card.status.title")}</b><small>{t("hero.card.status.sub")}</small></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hcard-pos pos-perf">
              <div className="hcard-parallax">
                <div className="hcard-float" style={{ "--amp": "16px", "--dur": "7s", "--delay": "0s" } as React.CSSProperties}>
                  <div className="hcard-enter" style={{ "--enter-delay": ".2s" } as React.CSSProperties}>
                    <div className="hcard" style={{ "--breathe-delay": "0s" } as React.CSSProperties}>
                      <span className="hic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M3 13.5 7.5 9l3.5 3 4-5 5.5 6" /><path d="M3 20h18" /></svg></span>
                      <span className="htxt"><b>{t("hero.card.perf.title")}</b><span className="hbar"><i></i></span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hcard-pos pos-loc">
              <div className="hcard-parallax">
                <div className="hcard-float" style={{ "--amp": "14px", "--dur": "8s", "--delay": ".7s" } as React.CSSProperties}>
                  <div className="hcard-enter" style={{ "--enter-delay": ".5s" } as React.CSSProperties}>
                    <div className="hcard" style={{ "--breathe-delay": "1.1s" } as React.CSSProperties}>
                      <span className="hic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-5.7-7-11a7 7 0 0 1 14 0c0 5.3-7 11-7 11z" /><circle cx="12" cy="10" r="2.6" /></svg></span>
                      <span className="htxt"><b>{t("hero.card.loc.title")}</b><small>{t("hero.card.loc.sub")}</small></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hcard-pos pos-stack">
              <div className="hcard-parallax">
                <div className="hcard-float" style={{ "--amp": "10px", "--dur": "10s", "--delay": "2s" } as React.CSSProperties}>
                  <div className="hcard-enter" style={{ "--enter-delay": ".65s" } as React.CSSProperties}>
                    <div className="hcard" style={{ "--breathe-delay": "3.4s" } as React.CSSProperties}>
                      <span className="hic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="m8 6-6 6 6 6M16 6l6 6-6 6" /></svg></span>
                      <span className="htxt"><b>{t("hero.card.stack.title")}</b><small>{t("hero.card.stack.sub")}</small></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <a href="#sobre-mi" className="scroll-ind" aria-label={t("hero.scroll")}>
          <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
          {t("hero.scroll")}
        </a>
      </section>

      {/* ============================================================ 2 · SOBRE MÍ ============================================================ */}
      <section className="section-pad" id="sobre-mi">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="section-kicker">{t("about.kicker")}</span>
            <h2 className="section-title">{t("about.title1")}<br />{t("about.title2")}</h2>
          </Reveal>

          <div className="about-grid">
            <div className="about-copy">
              <Reveal as="p">{t("about.p1")}</Reveal>
              <Reveal as="p">
                {t("about.p2.pre")}
                <strong>{t("about.p2.bold")}</strong>
                {t("about.p2.post")}
              </Reveal>
              <Reveal as="p">{t("about.p3")}</Reveal>
              <Reveal as="p">
                {t("about.p4.pre")}
                <a className="ig-link" href="https://instagram.com/progamacion" target="_blank" rel="noopener noreferrer">
                  @progamacion
                </a>
                {t("about.p4.post")}
              </Reveal>
              <Reveal as="p">{t("about.p5")}</Reveal>
              <Reveal as="p" className="pd">{t("about.pd")} 🐛</Reveal>
            </div>

            <Reveal as="aside" variant="right" className="about-deco">
              <div className="stack-card">
                <span className="corner tl"></span>
                <span className="corner br"></span>
                <span className="stack-cap">{t("about.stack.title")}</span>
                <div className="stack-grid">
                  {STACK.map((tech) => (
                    <div key={tech.label} className="stack-tile">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={tech.src} alt={tech.label} loading="lazy" />
                      <span>{tech.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="about-meta">
                <div className="row">
                  <span className="dot" style={{ animation: "none" }}></span>{" "}
                  <b>{t("about.meta.location")}</b>{t("about.meta.locationSub")}
                </div>
                <div className="row">{t("about.meta.stack")}</div>
                <div className="row">{t("about.meta.availability")}</div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================================================ 3 · LO QUE HAGO ============================================================ */}
      <section className="section-pad" id="lo-que-hago" style={{ background: "var(--bg-2)", borderBlock: "1px solid var(--border)" }}>
        <div className="wrap">
          <Reveal className="section-head">
            <span className="section-kicker">{t("do.kicker")}</span>
            <h2 className="section-title">{t("do.title1")}<br />{t("do.title2")}</h2>
          </Reveal>

          <div className="do-grid">
            {(["1", "2", "3", "4"] as const).map((n, i) => {
              const icons: Record<string, React.ReactElement> = {
                "1": <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>,
                "2": <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L4.5 13.5H11l-1 8.5 9-12h-6.5z" /></svg>,
                "3": <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
                "4": <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 2v6M15 2v6M7 8h10v3a5 5 0 0 1-10 0zM12 16v6" /></svg>,
              };
              return (
                <Reveal key={n} as="article" className="do-card" delay={i * 90}>
                  <span className="num">0{n}</span>
                  <div className="ic">{icons[n]}</div>
                  <h3>{t(`do.cards.${n}.title` as const)}</h3>
                  <p>{t(`do.cards.${n}.body` as const)}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ 4 · PROYECTOS ============================================================ */}
      <section className="section-pad" id="proyectos">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="section-kicker">{t("projects.kicker")}</span>
            <h2 className="section-title">{t("projects.title")}</h2>
          </Reveal>

          {/* 01 MoocAmbiental */}
          <article className="project">
            <Reveal className="project-media" variant="left">
              <div className="ph shot"><span className="ph-tag">{t("projects.mediaAlt")} — MoocAmbiental</span></div>
            </Reveal>
            <Reveal className="project-body" variant="right">
              <span className="project-num">01</span>
              <h3>MoocAmbiental</h3>
              <p className="desc">{t("projects.1.desc")}</p>
              <p className="role-line"><span className="lbl">{t("projects.role")}</span> {t("projects.1.role")}</p>
              <div className="stack">
                <span className="badge">Next.js</span>
                <span className="badge">TypeScript</span>
                <span className="badge">Express</span>
                <span className="badge">MySQL</span>
                <span className="badge">JWT</span>
              </div>
              <div className="links">
                <a className="btn btn-primary btn-sm" href="https://mooc-ambiental.vercel.app" target="_blank" rel="noopener noreferrer">
                  {t("projects.viewDemo")} <span className="arr">→</span>
                </a>
                <a className="btn btn-ghost btn-sm" href="https://github.com/JuanaGonzalez21/mooc-ambiental-frontend" target="_blank" rel="noopener noreferrer">
                  {t("projects.viewCode")} <span className="arr">→</span>
                </a>
              </div>
            </Reveal>
          </article>

          {/* 02 BMI Calculator */}
          <article className="project flip">
            <Reveal className="project-media" variant="right">
              <div className="ph shot"><span className="ph-tag">{t("projects.mediaAlt")} — BMI Calculator</span></div>
            </Reveal>
            <Reveal className="project-body" variant="left">
              <span className="project-num">02</span>
              <h3>BMI Calculator</h3>
              <p className="desc">{t("projects.2.desc")}</p>
              <p className="role-line"><span className="lbl">{t("projects.role")}</span> {t("projects.2.role")}</p>
              <div className="stack">
                <span className="badge">React</span>
                <span className="badge">Vite</span>
                <span className="badge">JavaScript</span>
                <span className="badge">CSS3</span>
              </div>
              <div className="links">
                <a className="btn btn-primary btn-sm" href="https://bmi-calculator-one-mocha.vercel.app" target="_blank" rel="noopener noreferrer">
                  {t("projects.viewDemo")} <span className="arr">→</span>
                </a>
                <a className="btn btn-ghost btn-sm" href="https://github.com/JuanaGonzalez21/BodyMass.github.io" target="_blank" rel="noopener noreferrer">
                  {t("projects.viewCode")} <span className="arr">→</span>
                </a>
              </div>
            </Reveal>
          </article>

          {/* 03 AluraGeek */}
          <article className="project">
            <Reveal className="project-media" variant="left">
              <div className="ph shot"><span className="ph-tag">{t("projects.mediaAlt")} — AluraGeek</span></div>
            </Reveal>
            <Reveal className="project-body" variant="right">
              <span className="project-num">03</span>
              <h3>
                AluraGeek{" "}
                <span className="badge" style={{ verticalAlign: "middle", fontSize: "0.6em" }}>
                  {t("projects.inProgress")}
                </span>
              </h3>
              <p className="desc">{t("projects.3.desc")}</p>
              <p className="role-line"><span className="lbl">{t("projects.role")}</span> {t("projects.3.role")}</p>
              <div className="stack">
                <span className="badge">React</span>
                <span className="badge">React Router</span>
                <span className="badge">Axios</span>
                <span className="badge">Bootstrap</span>
              </div>
              <div className="links">
                <a className="btn btn-ghost btn-sm" href="https://github.com/JuanaGonzalez21/Challenge_AluraGeek" target="_blank" rel="noopener noreferrer">
                  {t("projects.viewCode")} <span className="arr">→</span>
                </a>
              </div>
            </Reveal>
          </article>
        </div>
      </section>

      {/* ============================================================ 5 · TRAYECTORIA ============================================================ */}
      <section className="section-pad" id="experiencia" style={{ background: "var(--bg-2)", borderBlock: "1px solid var(--border)" }}>
        <div className="wrap">
          <Reveal className="section-head" style={{ alignItems: "center", textAlign: "center" }}>
            <span className="section-kicker" style={{ alignSelf: "center" }}>{t("timeline.kicker")}</span>
            <h2 className="section-title">{t("timeline.title")}</h2>
          </Reveal>

          <div className="timeline">
            {(["1", "2", "3", "4", "5"] as const).map((n, i) => {
              const isEdu = n === "1" || n === "5";
              return (
                <Reveal key={n} className="tl-item" delay={i * 80}>
                  <span className="tl-node"></span>
                  <div className={`tl-card ${isEdu ? "edu" : "exp"}`}>
                    <span className={isEdu ? "tag-edu" : "tag-exp"}>
                      {isEdu ? t("timeline.tagEdu") : t("timeline.tagExp")}
                    </span>
                    <div className="tl-date">{t(`timeline.${n}.date` as const)}</div>
                    <h3>{t(`timeline.${n}.title` as const)}</h3>
                    <p className="org">{t(`timeline.${n}.org` as const)}</p>
                    <p>{t(`timeline.${n}.desc` as const)}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ 6 · CONTACTO ============================================================ */}
      <section className="section-pad contact2" id="contacto">
        <div className="wrap">
          <Reveal className="c2-head">
            <span className="section-kicker" style={{ justifyContent: "center" }}>{t("contact.kicker")}</span>
            <h2>
              {t("contact.title1")}<br />
              <span className="em">{t("contact.titleEm")}</span>
              {t("contact.title2")}
            </h2>
            <p className="sub">{t("contact.sub")}</p>
          </Reveal>

          <Reveal className="c2-mailcard">
            <div className="c2-mail-l">
              <span className="c2-tag"><span className="dot"></span>{t("contact.emailTag")}</span>
              <span className="c2-addr">juana.gonzalez.dev@gmail.com</span>
            </div>
            <div className="c2-actions">
              <button className="c2-copy" type="button" onClick={handleCopy} aria-label={t("contact.copy")}>
                <svg className="ic-copy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="11" height="11" rx="2" />
                  <path d="M5 15V5a2 2 0 0 1 2-2h10" />
                </svg>
                <svg className="ic-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span className="c2-copy-txt">{copied ? t("contact.copied") : t("contact.copy")}</span>
              </button>
              <a className="btn btn-primary" href="mailto:hola@juanagonzalez.dev">
                {t("contact.send")} <span className="arr">→</span>
              </a>
            </div>
          </Reveal>

          <div className="c2-socials">
            <Reveal as="div" delay={0}>
              <a className="c2-social" href="https://www.linkedin.com/in/juanagonzalezardila/" target="_blank" rel="noopener noreferrer">
                <span className="c2-social-ic">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM3.25 8.5h3.4V21h-3.4zM10 8.5h3.26v1.7h.05c.45-.86 1.56-1.76 3.2-1.76 3.43 0 4.06 2.26 4.06 5.2V21h-3.4v-5.5c0-1.31-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21H10z" /></svg>
                </span>
                <span className="c2-social-txt"><b>LinkedIn</b><small>/in/juanagonzalezardila</small></span>
                <span className="c2-social-arr">↗</span>
              </a>
            </Reveal>

            <Reveal as="div" delay={90}>
              <a className="c2-social" href="https://github.com/JuanaGonzalez21" target="_blank" rel="noopener noreferrer">
                <span className="c2-social-ic">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.48l-.01-1.7c-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.4 9.4 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9l-.01 2.82c0 .27.18.59.69.48A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" /></svg>
                </span>
                <span className="c2-social-txt"><b>GitHub</b><small>/JuanaGonzalez21</small></span>
                <span className="c2-social-arr">↗</span>
              </a>
            </Reveal>

            <Reveal as="div" delay={180}>
              <a className="c2-social" href="https://instagram.com/progamacion" target="_blank" rel="noopener noreferrer">
                <span className="c2-social-ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </span>
                <span className="c2-social-txt"><b>Instagram</b><small>@progamacion</small></span>
                <span className="c2-social-arr">↗</span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================================================ FOOTER ============================================================ */}
      <footer className="footer">
        <div className="wrap footer-inner">
          <div className="fcol">
            <p>{t("footer.built")} <span className="coffee">☕</span></p>
            <p>{t("footer.rights")}</p>
          </div>
          <div className="socials">
            <a href="https://github.com/JuanaGonzalez21" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.48l-.01-1.7c-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.4 9.4 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9l-.01 2.82c0 .27.18.59.69.48A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" /></svg>
            </a>
            <a href="https://www.linkedin.com/in/juanagonzalezardila/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM3.25 8.5h3.4V21h-3.4zM10 8.5h3.26v1.7h.05c.45-.86 1.56-1.76 3.2-1.76 3.43 0 4.06 2.26 4.06 5.2V21h-3.4v-5.5c0-1.31-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21H10z" /></svg>
            </a>
            <a href="https://instagram.com/progamacion" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
