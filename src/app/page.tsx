"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";

/**
 * ================================================================
 *  Portafolio · Juana González — juanagonzalez.dev
 * ================================================================
 *  Secciones:
 *    1 · Hero
 *    2 · Sobre mí
 *    3 · Lo que hago
 *    4 · Proyectos
 *    5 · Trayectoria (Experiencia + Educación)
 *    6 · Contacto
 *    Footer
 * ================================================================
 */

// ---------------------------- DATA ----------------------------

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

const CAPABILITIES = [
  {
    num: "01",
    title: "Construyo interfaces",
    body: "UIs limpias, responsive y accesibles, pensadas para sentirse naturales en cualquier pantalla.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Optimizo performance",
    body: "Afino lo que ya existe para que cargue rápido y se sienta ligero, sin sacrificar la experiencia.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L4.5 13.5H11l-1 8.5 9-12h-6.5z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Acompaño al cliente",
    body: "Traduzco ideas dispersas en producto, escuchando lo que no siempre se sabe articular.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Conecto front con APIs",
    body: "Integro datos y servicios, y me meto en el full-stack cuando el proyecto lo necesita.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 2v6M15 2v6M7 8h10v3a5 5 0 0 1-10 0zM12 16v6" />
      </svg>
    ),
  },
];

// ---------------------------- MAIN ----------------------------

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const timer = setTimeout(() => el.classList.add("loaded"), 60);
    return () => clearTimeout(timer);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("hola@juanagonzalez.dev");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback silencioso: si el navegador no soporta clipboard, no hacemos nada
    }
  };

  return (
    <>
      {/* ============================================================
           NAV
      ============================================================ */}
      <header className="nav" id="nav">
        <div className="wrap nav-inner">
          <a href="#inicio" className="logo" aria-label="Inicio">
            juana<span className="dotlima">.</span>
          </a>
          <nav className="nav-links" aria-label="Principal">
            <a className="nav-link" href="#inicio">Inicio</a>
            <a className="nav-link" href="#sobre-mi">Sobre mí</a>
            <a className="nav-link" href="#proyectos">Proyectos</a>
            <a className="nav-link" href="#experiencia">Experiencia</a>
            <a className="nav-link" href="#contacto">Contacto</a>
          </nav>
          <div className="nav-right">
            <a className="btn btn-ghost btn-sm" href="/CV_Juana_Gonzalez.pdf" download>
              Descargar CV
            </a>
            <button className="hamb" aria-label="Abrir menú" aria-expanded="false">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================
           1 · HERO
      ============================================================ */}
      <section className="hero" id="inicio" ref={heroRef}>
        <div className="hero-grid-bg" aria-hidden="true"></div>
        <div className="wrap hero-layout">
          <div className="hero-inner hero-stagger">
            <p className="eyebrow">
              <span className="dot"></span>
              Bogotá, Colombia · Disponible para trabajo
            </p>
            <h1>
              Juana<br />
              <span className="lastname">González</span>
            </h1>
            <p className="role">
              Desarrolladora <b>Frontend</b>
            </p>
            <p className="tagline">
              Convierto ideas dispersas en interfaces que se ven bien y van rápido.
            </p>
            <div className="hero-cta">
              <a className="btn btn-primary" href="#proyectos">
                Ver proyectos <span className="arr">→</span>
              </a>
              <a className="btn btn-ghost" href="/CV_Juana_Gonzalez.pdf" download>
                Descargar CV
              </a>
            </div>
          </div>

          <div className="hero-stage" aria-hidden="true">
            <div className="phone-parallax">
              <div className="phone-float">
                <div className="phone-enter">
                  <figure className="photo-frame">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/juana-foto.png" alt="Juana González con toga y birrete de grado" />
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
                      <span className="hic">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                      </span>
                      <span className="htxt"><b>Disponible</b><small>Remoto · freelance</small></span>
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
                      <span className="hic">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M3 13.5 7.5 9l3.5 3 4-5 5.5 6" /><path d="M3 20h18" /></svg>
                      </span>
                      <span className="htxt"><b>Performance 98</b><span className="hbar"><i></i></span></span>
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
                      <span className="hic">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-5.7-7-11a7 7 0 0 1 14 0c0 5.3-7 11-7 11z" /><circle cx="12" cy="10" r="2.6" /></svg>
                      </span>
                      <span className="htxt"><b>Bogotá, Colombia</b><small>GMT-5</small></span>
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
                      <span className="hic">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="m8 6-6 6 6 6M16 6l6 6-6 6" /></svg>
                      </span>
                      <span className="htxt"><b>Stack</b><small>React · Next.js · TS</small></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <a href="#sobre-mi" className="scroll-ind" aria-label="Bajar">
          <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
          Scroll
        </a>
      </section>

      {/* ============================================================
           2 · SOBRE MÍ
      ============================================================ */}
      <section className="section-pad" id="sobre-mi">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="section-kicker">Sobre mí</span>
            <h2 className="section-title">El cruce entre videojuegos<br />y matemáticas.</h2>
          </Reveal>

          <div className="about-grid">
            <div className="about-copy">
              <Reveal as="p">
                Llegué al desarrollo por la intersección menos obvia. A los 18 me di cuenta
                de que el código era el cruce perfecto entre mis dos pasiones — los videojuegos
                y las matemáticas — y desde entonces no me he movido de ahí.
              </Reveal>
              <Reveal as="p">
                Hoy soy desarrolladora frontend con una convicción muy clara:{" "}
                <strong>toda interfaz puede ser más bonita, más rápida y más comprensible.</strong>{" "}
                Disfruto especialmente traducir las ideas dispersas que un cliente tiene en
                la cabeza —a veces sin saber bien cómo articularlas— en algo que se vea y
                funcione bien. Y le tengo un cariño particular a la parte invisible: optimizar
                lo que ya existe para que cargue rápido y se sienta ligero.
              </Reveal>
              <Reveal as="p">
                Fuera del código pruebo recetas nuevas casi todas las semanas, escucho música
                abierta a cualquier ritmo (la veo como una forma de conectar con la gente),
                juego indies por la elegancia con la que esconden el trabajo detrás, y voy al
                gimnasio aprendiendo lentamente que los resultados que cuestan se respetan más.
              </Reveal>
              <Reveal as="p">
                Durante un tiempo llevé{" "}
                <a className="ig-link" href="https://instagram.com/progamacion" target="_blank" rel="noopener noreferrer">
                  @progamacion
                </a>
                , una cuenta de Instagram donde mezclaba divulgación dev, ciencia y memes.
                Alcanzó una comunidad linda antes de que la pausara — quizás algún día vuelva.
              </Reveal>
              <Reveal as="p">
                Ahora apunto a un rol remoto en una empresa de habla hispana enfocada en
                producto y diseño, donde pueda ser parte de un equipo y llegar a liderar
                proyectos de frontend, y donde estar cerca del cliente sea parte del trabajo,
                no un anexo.
              </Reveal>
              <Reveal as="p" className="pd">
                PD: en mis primeros meses de dev le decía &ldquo;java&rdquo; a JavaScript,
                hasta que un compañero me miró raro. Hoy ya distingo, pero sigue siendo mi
                confesión favorita. 🐛
              </Reveal>
            </div>

            <Reveal as="aside" variant="right" className="about-deco">
              <div className="stack-card">
                <span className="corner tl"></span>
                <span className="corner br"></span>
                <span className="stack-cap">Mi stack</span>
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
                  <b>Bogotá</b>, Colombia · GMT-5
                </div>
                <div className="row">→ Frontend · React · Next.js</div>
                <div className="row">→ Abierta a remoto · freelance</div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================================================
           3 · LO QUE HAGO
      ============================================================ */}
      <section
        className="section-pad"
        id="lo-que-hago"
        style={{ background: "var(--bg-2)", borderBlock: "1px solid var(--border)" }}
      >
        <div className="wrap">
          <Reveal className="section-head">
            <span className="section-kicker">Lo que hago</span>
            <h2 className="section-title">Cuatro formas de ser útil<br />en un equipo.</h2>
          </Reveal>

          <div className="do-grid">
            {CAPABILITIES.map((cap, i) => (
              <Reveal key={cap.num} as="article" className="do-card" delay={i * 90}>
                <span className="num">{cap.num}</span>
                <div className="ic">{cap.icon}</div>
                <h3>{cap.title}</h3>
                <p>{cap.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
           4 · PROYECTOS
      ============================================================ */}
      <section className="section-pad" id="proyectos">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="section-kicker">Proyectos</span>
            <h2 className="section-title">Trabajo personal seleccionado.</h2>
          </Reveal>

          {/* Proyecto 01 — MoocAmbiental */}
          <article className="project">
            <Reveal className="project-media" variant="left">
              <div className="ph shot"><span className="ph-tag">captura — MoocAmbiental</span></div>
            </Reveal>
            <Reveal className="project-body" variant="right">
              <span className="project-num">01</span>
              <h3>MoocAmbiental</h3>
              <p className="desc">
                Plataforma full-stack de cursos abiertos sobre sostenibilidad y medio ambiente.
                Diseñé y construí toda la experiencia — desde el diseño hasta el backend con
                autenticación y base de datos.
              </p>
              <p className="role-line"><span className="lbl">Tu rol</span> Diseño + desarrollo full-stack</p>
              <div className="stack">
                <span className="badge">Next.js</span>
                <span className="badge">TypeScript</span>
                <span className="badge">Express</span>
                <span className="badge">MySQL</span>
                <span className="badge">JWT</span>
              </div>
              <div className="links">
                <a className="btn btn-primary btn-sm" href="https://mooc-ambiental.vercel.app" target="_blank" rel="noopener noreferrer">
                  Ver demo <span className="arr">→</span>
                </a>
                <a className="btn btn-ghost btn-sm" href="https://github.com/JuanaGonzalez21/mooc-ambiental-frontend" target="_blank" rel="noopener noreferrer">
                  Código GitHub <span className="arr">→</span>
                </a>
              </div>
            </Reveal>
          </article>

          {/* Proyecto 02 — BMI Calculator */}
          <article className="project flip">
            <Reveal className="project-media" variant="right">
              <div className="ph shot"><span className="ph-tag">captura — BMI Calculator</span></div>
            </Reveal>
            <Reveal className="project-body" variant="left">
              <span className="project-num">02</span>
              <h3>BMI Calculator</h3>
              <p className="desc">
                Calculadora de índice de masa corporal con feedback claro e inmediato.
                Un reto de Frontend Mentor donde practiqué implementación pixel-perfect
                a partir de un diseño en Figma.
              </p>
              <p className="role-line"><span className="lbl">Tu rol</span> Desarrollo frontend</p>
              <div className="stack">
                <span className="badge">React</span>
                <span className="badge">Vite</span>
                <span className="badge">JavaScript</span>
                <span className="badge">CSS3</span>
              </div>
              <div className="links">
                <a className="btn btn-primary btn-sm" href="https://bmi-calculator-one-mocha.vercel.app" target="_blank" rel="noopener noreferrer">
                  Ver demo <span className="arr">→</span>
                </a>
                <a className="btn btn-ghost btn-sm" href="https://github.com/JuanaGonzalez21/BodyMass.github.io" target="_blank" rel="noopener noreferrer">
                  Código GitHub <span className="arr">→</span>
                </a>
              </div>
            </Reveal>
          </article>

          {/* Proyecto 03 — AluraGeek */}
          <article className="project">
            <Reveal className="project-media" variant="left">
              <div className="ph shot"><span className="ph-tag">captura — AluraGeek (próximamente)</span></div>
            </Reveal>
            <Reveal className="project-body" variant="right">
              <span className="project-num">03</span>
              <h3>
                AluraGeek{" "}
                <span className="badge" style={{ verticalAlign: "middle", fontSize: "0.6em" }}>
                  En construcción
                </span>
              </h3>
              <p className="desc">
                Tienda e-commerce de productos geek con catálogo dinámico y carrito.
                Proyecto del programa Oracle Next Education / Alura LATAM — en proceso,
                pronto con demo en vivo.
              </p>
              <p className="role-line"><span className="lbl">Tu rol</span> Desarrollo frontend</p>
              <div className="stack">
                <span className="badge">React</span>
                <span className="badge">React Router</span>
                <span className="badge">Axios</span>
                <span className="badge">Bootstrap</span>
              </div>
              <div className="links">
                <a className="btn btn-ghost btn-sm" href="https://github.com/JuanaGonzalez21/Challenge_AluraGeek" target="_blank" rel="noopener noreferrer">
                  Código GitHub <span className="arr">→</span>
                </a>
              </div>
            </Reveal>
          </article>
        </div>
      </section>

      {/* ============================================================
           5 · TRAYECTORIA
      ============================================================ */}
      <section
        className="section-pad"
        id="experiencia"
        style={{ background: "var(--bg-2)", borderBlock: "1px solid var(--border)" }}
      >
        <div className="wrap">
          <Reveal className="section-head" style={{ alignItems: "center", textAlign: "center" }}>
            <span className="section-kicker" style={{ alignSelf: "center" }}>Trayectoria</span>
            <h2 className="section-title">Experiencia &amp; educación.</h2>
          </Reveal>

          <div className="timeline">
            <Reveal className="tl-item">
              <span className="tl-node"></span>
              <div className="tl-card edu">
                <span className="tag-edu">Educación</span>
                <div className="tl-date">2023 — Junio 2026</div>
                <h3>Universidad Cooperativa de Colombia</h3>
                <p className="org">Ingeniería de Sistemas</p>
                <p>
                  Profundización en arquitectura de software, algoritmos y desarrollo —
                  dando el siguiente paso sobre la base tecnológica. Graduada en junio de 2026.
                </p>
              </div>
            </Reveal>

            <Reveal className="tl-item" delay={80}>
              <span className="tl-node"></span>
              <div className="tl-card exp">
                <span className="tag-exp">Experiencia</span>
                <div className="tl-date">Ene 2024 — Dic 2024</div>
                <h3>Octopus CMS</h3>
                <p className="org">Desarrolladora Web</p>
                <p>
                  Desarrollo frontend con React.js y JavaScript: interfaces modernas y
                  responsive, integración de APIs REST, y optimización de rendimiento en
                  aplicaciones web existentes.
                </p>
              </div>
            </Reveal>

            <Reveal className="tl-item" delay={160}>
              <span className="tl-node"></span>
              <div className="tl-card exp">
                <span className="tag-exp">Experiencia</span>
                <div className="tl-date">Sep 2022 — Mar 2023</div>
                <h3>Caracol Radio</h3>
                <p className="org">Auxiliar de Sistemas</p>
                <p>
                  Soporte técnico integral y mantenimiento de infraestructura tecnológica
                  empresarial. Diagnóstico y resolución de incidencias en entornos de alta
                  exigencia.
                </p>
              </div>
            </Reveal>

            <Reveal className="tl-item" delay={240}>
              <span className="tl-node"></span>
              <div className="tl-card exp">
                <span className="tag-exp">Experiencia</span>
                <div className="tl-date">Feb 2021 — Sep 2021</div>
                <h3>EtyaLab S.A.</h3>
                <p className="org">Desarrolladora de Software y Web</p>
                <p>
                  Desarrollo de aplicaciones informáticas en modalidad remota. Vinculación
                  como desarrolladora tras completar exitosamente las prácticas empresariales
                  en la misma empresa.
                </p>
              </div>
            </Reveal>

            <Reveal className="tl-item" delay={320}>
              <span className="tl-node"></span>
              <div className="tl-card edu">
                <span className="tag-edu">Educación</span>
                <div className="tl-date">Hasta 2022</div>
                <h3>Universidad Cooperativa de Colombia</h3>
                <p className="org">Tecnología en Desarrollo y Administración de Aplicaciones Informáticas</p>
                <p>
                  Fundamentos de programación, matemáticas y bases de datos — donde el código
                  y las mates por fin se encontraron.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================================================
           6 · CONTACTO
      ============================================================ */}
      <section className="section-pad contact2" id="contacto">
        <div className="wrap">
          <Reveal className="c2-head">
            <span className="section-kicker" style={{ justifyContent: "center" }}>Contacto</span>
            <h2>
              ¿Trabajamos<br />
              <span className="em">juntas</span>?
            </h2>
            <p className="sub">
              Estoy abierta a oportunidades remotas, freelance, o simplemente a charlar de dev.
              Escríbeme por donde te quede mejor.
            </p>
          </Reveal>

          <Reveal className="c2-mailcard">
            <div className="c2-mail-l">
              <span className="c2-tag"><span className="dot"></span>Email directo</span>
              <span className="c2-addr">hola@juanagonzalez.dev</span>
            </div>
            <div className="c2-actions">
              <button className="c2-copy" type="button" onClick={handleCopy} aria-label="Copiar email">
                <svg className="ic-copy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="11" height="11" rx="2" />
                  <path d="M5 15V5a2 2 0 0 1 2-2h10" />
                </svg>
                <svg className="ic-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span className="c2-copy-txt">{copied ? "¡Copiado!" : "Copiar"}</span>
              </button>
              <a className="btn btn-primary" href="mailto:hola@juanagonzalez.dev">
                Enviar correo <span className="arr">→</span>
              </a>
            </div>
          </Reveal>

          <div className="c2-socials">
            <Reveal as="a" className="c2-social" delay={0}>
              <a
                href="https://www.linkedin.com/in/juanagonzalezardila/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "contents" }}
              >
                <span className="c2-social-ic">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM3.25 8.5h3.4V21h-3.4zM10 8.5h3.26v1.7h.05c.45-.86 1.56-1.76 3.2-1.76 3.43 0 4.06 2.26 4.06 5.2V21h-3.4v-5.5c0-1.31-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21H10z" />
                  </svg>
                </span>
                <span className="c2-social-txt"><b>LinkedIn</b><small>/in/juanagonzalezardila</small></span>
                <span className="c2-social-arr">↗</span>
              </a>
            </Reveal>

            <Reveal as="a" className="c2-social" delay={90}>
              <a
                href="https://github.com/JuanaGonzalez21"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "contents" }}
              >
                <span className="c2-social-ic">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.48l-.01-1.7c-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.4 9.4 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9l-.01 2.82c0 .27.18.59.69.48A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" />
                  </svg>
                </span>
                <span className="c2-social-txt"><b>GitHub</b><small>/JuanaGonzalez21</small></span>
                <span className="c2-social-arr">↗</span>
              </a>
            </Reveal>

            <Reveal as="a" className="c2-social" delay={180}>
              <a
                href="https://instagram.com/progamacion"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "contents" }}
              >
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

      {/* ============================================================
           FOOTER
      ============================================================ */}
      <footer className="footer">
        <div className="wrap footer-inner">
          <div className="fcol">
            <p>Hecho con Next.js, Tailwind y mucho café <span className="coffee">☕</span></p>
            <p>© 2026 Juana González · Bogotá, Colombia</p>
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
