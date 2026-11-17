import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import about1Asset from "@/assets/about-1.webp.asset.json";
const about1 = about1Asset.url;
import about2Asset from "@/assets/about-2.webp.asset.json";
const about2 = about2Asset.url;
import buildingsAsset from "@/assets/buildings.webp.asset.json";
const buildings = buildingsAsset.url;
import { company, services } from "@/lib/site";
import { CtaBanner, Faq, Kicker, Process, QuoteSection, ServicesGrid, SplitTitle, WhoWeServe, WhyUs, useInView, REVEAL_MARGIN } from "@/components/site/Sections";
import amcImgAsset from "@/assets/service-amc.webp.asset.json";
const amcImg = amcImgAsset.url;
import maintImgAsset from "@/assets/service-maintenance.webp.asset.json";
const maintImg = maintImgAsset.url;
import heroVideoAsset from "@/assets/hero-services-sequence.mp4.asset.json";
import aboutVideoAsset from "@/assets/about-electromechanical.mp4.asset.json";
import aboutPosterAsset from "@/assets/about-electromechanical-poster.webp.asset.json";
import heroPosterAsset from "@/assets/hero-poster.webp.asset.json";

import { T, Img, useEditable } from "@/lib/editable";


const aboutTitle = "Engineering Experience. Proven Performance. Trusted Delivery.";

const tabs = [
  { title: "Mechanical Works", get img() { return services[0]!.image; }, s: services[0]! },
  { title: "Electrical Works", get img() { return services[1]!.image; }, s: services[1]! },
  { title: "Plumbing & Drainage", get img() { return services[2]!.image; }, s: services[2]! },
  { title: "Fire Protection", get img() { return services[3]!.image; }, s: services[3]! },
];

const audiences = [
  {
    img: amcImg, icon: "fa-city", title: "Developers", sub: "Residential & Commercial",
    text: "Integrated MEP and interior solutions for residential and commercial developments, delivered with quality and timely execution.",
  },
  {
    img: buildings, icon: "fa-hard-hat", title: "Main Contractors", sub: "Construction Projects",
    text: "A dependable MEP partner, coordinated with project schedules, specifications and site requirements.",
  },
  {
    img: maintImg, icon: "fa-drafting-compass", title: "Consultants", sub: "Engineering & Design",
    text: "Engineering coordination, compliance with project specifications and transparent communication at every stage.",
  },
  {
    img: about1, icon: "fa-user-tie", title: "Project Owners", sub: "Building Owners",
    text: "Professional project execution and quality you can trust, from initial coordination to handover.",
  },
];


export function HomeContent() {
  const { edit, get, pick } = useEditable();
  const [tab, setTab] = useState(0);
  // Reveal the About section with a staggered animation once it scrolls into view.
  const abRef = useRef<HTMLDivElement>(null);
  const [abIn, setAbIn] = useState(false);
  useEffect(() => {
    const el = abRef.current;
    if (!el || typeof IntersectionObserver === "undefined") { setAbIn(true); return; }
    const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { setAbIn(true); io.disconnect(); } }, { rootMargin: REVEAL_MARGIN });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const [pjRef, pjIn] = useInView<HTMLElement>(0.1);
  const cur = tabs[tab]!;
  return (
    <>
      {/* Hero — corporate MEP hero: dark navy overlay on the services video, centred-left copy, two CTAs, trust bar */}
      <section className="hx">
        <div className="hx-card">
          <video className="hx-video" src={heroVideoAsset.url} poster={heroPosterAsset.url} autoPlay muted loop playsInline preload="auto" aria-hidden="true" />
          <div className="hx-shade" aria-hidden="true" />
          <div className="hx-grid" aria-hidden="true" />

          <div className="hx-body">
            <span className="hx-kicker hx-in" style={{ ["--d" as string]: "0ms" }}>
              <span className="hx-kicker-dot" aria-hidden="true" />
              <T k="home.hero.kicker" d="20 Years of Excellence in MEP" line />
            </span>
            <h1 className="hx-title">
              <span className="hx-line"><span style={{ ["--d" as string]: "120ms" }}><T k="home.hero.h1a" d="Where Quality" line /></span></span>
              <span className="hx-line"><span style={{ ["--d" as string]: "220ms" }}><T k="home.hero.h1b" d="Meets" line /> <em className="hx-accent"><T k="home.hero.h1c" d="Speed." line /></em></span></span>
            </h1>
            <p className="hx-sub hx-in" style={{ ["--d" as string]: "380ms" }}>
              {(["Mechanical", "Electrical", "Plumbing"] as const).map((w, n) => (
                <span key={w} className="hx-sub-item"><T k={`home.hero.sub${n}`} d={w} line /></span>
              ))}
              <span className="hx-sub-item hx-sub-last"><T k="home.hero.sub3" d="MEP Contractor of Choice" line /></span>
            </p>
            <div className="hx-actions hx-in" style={{ ["--d" as string]: "500ms" }}>
              <Link to="/projects" className="hx-btn hx-btn-primary">
                <T k="home.hero.btn1" d="Explore Our Projects" line />
                <i className="fa fa-arrow-right" aria-hidden="true"></i>
              </Link>
              <Link to="/contact" className="hx-btn hx-btn-ghost"><T k="home.hero.btn2" d="Get In Touch" line /></Link>
            </div>
          </div>

          <ul className="hx-trust hx-in" style={{ ["--d" as string]: "680ms" }}>
            {[
              { icon: "fa-drafting-compass", t: "Established 2007", d: "Proven MEP project execution in the UAE" },
              { icon: "fa-shield-alt", t: "Quality in Every Detail", d: "Quality assurance at every stage" },
              { icon: "fa-bolt", t: "Efficient Delivery", d: "Focused project management, timely completion" },
            ].map((x, n) => (
              <li key={x.t} className="hx-trust-item">
                <span className="hx-trust-ico" aria-hidden="true"><i className={`fa ${x.icon}`}></i></span>
                <span className="hx-trust-txt">
                  <strong><T k={`home.hero.trust${n}`} d={x.t} line /></strong>
                  <small><T k={`home.hero.trust${n}d`} d={x.d} line /></small>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <div className="pb-5"></div>


      {/* About — modern animated layout with a thick animated frame playing an electromechanical video */}
      <div ref={abRef} className={`band abm ${abIn || edit ? "is-in" : ""}`}>
        <div className="abm-grid" aria-hidden="true" />
        <div className="abm-orb abm-orb-a" aria-hidden="true" />
        <div className="abm-orb abm-orb-b" aria-hidden="true" />
        <div className="container position-relative">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <div className="abm-media">
                <div className="abm-frame rv" style={{ ["--d" as string]: "0ms" }}>
                  <div className="abm-frame-inner">
                    <video className="abm-video" src={get("home.about.video", aboutVideoAsset.url)} poster={get("home.about.img1", aboutPosterAsset.url)} autoPlay muted loop playsInline preload="auto" aria-hidden="true" />
                    <span className="abm-scan" aria-hidden="true" />
                    <span className="abm-live"><span className="abm-live-dot" /> <T k="home.about.live" d="On Site · UAE" line /></span>
                    {edit && (
                      <button type="button" className="cms-hero-pick" onClick={() => pick("home.about.img1")}><i className="fa fa-image me-2"></i>Change video poster</button>
                    )}
                  </div>
                </div>
                <Img k="home.about.img2" d={about2} className="abm-sub rv" style={{ ["--d" as string]: "250ms" }} alt="QMEP technician installing an AC unit" />
                <div className="abm-badge rv" style={{ ["--d" as string]: "400ms" }}>
                  <span className="abm-badge-num"><T k="home.about.badgeNum" d="20" line /></span>
                  <span className="abm-badge-text"><small><T k="home.about.badge1" d="Years of" line /></small><strong><T k="home.about.badge2" d="Excellence" line /></strong></span>
                </div>
                <span className="abm-vert" aria-hidden="true">QMEP · Dubai · UAE</span>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="abm-kicker rv" style={{ ["--d" as string]: "100ms" }}><span className="abm-kicker-dot" aria-hidden="true" /><span><T k="home.about.kicker" d="About QMEP" line /></span></div>
              <h2 className="abm-title rv" style={{ ["--d" as string]: "200ms" }}>
                {edit ? <T k="home.about.title" d={aboutTitle} /> : (() => {
                  const w = get("home.about.title", aboutTitle).trim().split(/\s+/);
                  const last = w.pop();
                  return <>{w.join(" ")}{w.length ? " " : ""}<em className="abm-accent">{last}</em></>;
                })()}
              </h2>
              <p className="abm-lead rv" style={{ ["--d" as string]: "300ms" }}><T k="home.about.lead" d="Established in 2007, QMEP Electromechanical and Interior Works LLC is an experienced MEP contracting company committed to delivering reliable engineering solutions for the UAE construction industry." /></p>
              <p className="abm-text rv" style={{ ["--d" as string]: "380ms" }}><T k="home.about.text" d="Our approach combines engineering knowledge, professional project management, skilled resources and rigorous quality control to ensure every project is executed with precision, efficiency and accountability." /></p>
              <div className="row g-3 mb-4">
                {[
                  { icon: "fa-award", text: "Quality Workmanship" },
                  { icon: "fa-stopwatch", text: "Timely Execution" },
                  { icon: "fa-handshake", text: "Lasting Client Relationships" },
                  { icon: "fa-clipboard-check", text: "Rigorous Quality Control" },
                ].map((f, fi) => (
                  <div key={f.text} className="col-sm-6">
                    <div className="abm-check rv" style={{ ["--d" as string]: `${460 + fi * 90}ms` }}><i className={`fa ${f.icon}`}></i><span className="abm-check-text"><T k={`home.about.f${fi}`} d={f.text} /></span><span className="abm-check-num" aria-hidden="true">0{fi + 1}</span></div>
                  </div>
                ))}
              </div>
              <div className="abm-actions rv" style={{ ["--d" as string]: "820ms" }}>
                <Link className="abm-btn abm-btn-primary" to="/services"><span><T k="home.about.btn1" d="Discover Our Services" line /></span><span className="abm-btn-ico" aria-hidden="true"><i className="fa fa-arrow-right"></i></span></Link>
                <Link className="abm-btn abm-btn-ghost" to="/about"><T k="home.about.btn2" d="More About Us" line /></Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ServicesGrid />
      <WhyUs />

      {/* Project tabs — same tabs & content, modern animated layout */}
      <section ref={pjRef} className={`band mx pjx ${pjIn || edit ? "is-in" : ""}`}>
        <div className="wcx-fx" aria-hidden="true">
          <span className="wcx-gridbg" />
          <span className="wcx-orb wcx-orb-a" />
        </div>
        <div className="container position-relative">
          <div className="mx-head mx-center">
            <Kicker k="home.proj.kicker" d="Our Projects" />
            <SplitTitle k="home.proj.title" d="Experience That Delivers. Projects That Speak." className="display-5" />
          </div>
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="pjx-tabs" role="tablist" aria-label="Project types">
                {tabs.map((t, n) => (
                  <div key={t.title} className="mx-rv" style={{ ["--d" as string]: `${250 + n * 110}ms` }}>
                    <button type="button" role="tab" aria-selected={tab === n} onClick={() => setTab(n)} className={`pjx-tab ${tab === n ? "is-active" : ""}`}>
                      <span className="pjx-tab-icon" aria-hidden="true"><i className={`fa ${t.s.icon}`}></i></span>
                      <span className="pjx-tab-text"><small>0{n + 1}</small><strong><T k={`home.proj.tab${n}`} d={t.title} line /></strong></span>
                      <span className="pjx-tab-arrow" aria-hidden="true"><i className="fa fa-arrow-right"></i></span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-8 mx-rv" style={{ ["--d" as string]: "350ms" }}>
              <div className="pjx-panel" role="tabpanel">
                <div className="pjx-inner">
                  <div className="pjx-media" key={`m${tab}`}>
                    <Img k={`services.${tab}.image`} d={cur.img} alt={cur.title} />
                    <span className="pjx-chip"><span className="pjx-chip-dot" />Project 0{tab + 1}</span>
                  </div>
                  <div className="pjx-body" key={`b${tab}`}>
                    <h3 className="pjx-title" style={{ ["--d" as string]: "150ms" }}><T k={`services.${tab}.title`} d={cur.s.title} /></h3>
                    <p className="pjx-text" style={{ ["--d" as string]: "250ms" }}><T k={`services.${tab}.summary`} d={cur.s.summary} /></p>
                    <ul className="pjx-list" style={{ ["--d" as string]: "300ms" }}>
                      {cur.s.items.slice(0, 3).map((it, j) => (
                        <li key={j} style={{ ["--d" as string]: `${380 + j * 110}ms` }}><span className="pjx-tick" aria-hidden="true"><i className="fa fa-check"></i></span><span><T k={`services.${tab}.items.${j}`} d={it} /></span></li>
                      ))}
                    </ul>
                    <Link to="/projects" className="abm-btn abm-btn-primary" style={{ ["--d" as string]: "650ms" }}>
                      <span><T k="home.proj.btn" d="View Our Project Portfolio" line /></span>
                      <span className="abm-btn-ico" aria-hidden="true"><i className="fa fa-arrow-right"></i></span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who we serve */}
      <WhoWeServe audiences={audiences} />


      <Process />
      <CtaBanner k="home.cta" kicker="Our Commitment" title="Quality in Every Detail." text="Quality is not simply a final inspection at QMEP; it is an integral part of every stage of project delivery — from engineering coordination and material selection to installation, testing and commissioning." button="Get In Touch" />
      <QuoteSection />
      <Faq />
    </>
  );
}
