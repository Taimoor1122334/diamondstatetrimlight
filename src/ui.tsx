import { motion, useInView, useScroll, useTransform, animate } from "framer-motion";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { LOGO_DARK, LOGO_LIGHT, ESTIMATE_URL, PHONE, EMAIL, FB, IG } from "./data";

const ease = [0.22, 1, 0.36, 1] as const;

/* ---------- cursor ---------- */
type CursorState = { label: string; set: (l: string) => void };
const CursorCtx = createContext<CursorState>({ label: "", set: () => {} });
export const useCursor = () => useContext(CursorCtx);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [label, set] = useState("");
  return <CursorCtx.Provider value={{ label, set }}>{children}<Cursor label={label} /></CursorCtx.Provider>;
}

function Cursor({ label }: { label: string }) {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const [dark, setDark] = useState(false); // true while the pointer is over a [data-dark] section
  useEffect(() => {
    if (matchMedia("(pointer: coarse)").matches) return;
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, raf = 0, moved = false, dirty = false;
    const probe = (t: Element | null) => {
      setHover(!!t?.closest("a,button,[data-hover]"));
      setDark(!!t?.closest("[data-dark]"));
    };
    const mv = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY; moved = true;
      probe(e.target as Element);
    };
    // the page can scroll under a still pointer, so re-check what is beneath it
    const sc = () => { dirty = moved; };
    const loop = () => {
      rx += (x - rx) * 0.15; ry += (y - ry) * 0.15;
      if (dot.current) dot.current.style.transform = `translate(${x}px,${y}px)`;
      if (ring.current) ring.current.style.transform = `translate(${rx}px,${ry}px)`;
      if (dirty) { dirty = false; probe(document.elementFromPoint(x, y)); }
      raf = requestAnimationFrame(loop);
    };
    addEventListener("mousemove", mv); addEventListener("scroll", sc, { passive: true }); loop();
    return () => { removeEventListener("mousemove", mv); removeEventListener("scroll", sc); cancelAnimationFrame(raf); };
  }, []);
  const size = label ? 96 : hover ? 56 : 32;
  return (
    <div className="pointer-events-none fixed inset-0 z-[999] hidden md:block">
      <div ref={dot} className="absolute left-0 top-0">
        <div className="-ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full transition-[opacity,background-color] duration-300"
          style={{ opacity: label ? 0 : 1, background: dark ? "#f7f4ee" : "#171512" }} />
      </div>
      <div ref={ring} className="absolute left-0 top-0">
        <div
          className="flex items-center justify-center rounded-full border text-[11px] font-medium uppercase tracking-[0.2em] transition-all duration-300 ease-out"
          style={{
            width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2,
            background: label ? "#c8963e" : hover ? (dark ? "rgba(200,150,62,.25)" : "rgba(200,150,62,.12)") : "transparent",
            borderColor: label ? "#c8963e" : dark ? "rgba(247,244,238,.55)" : "rgba(23,21,18,.35)",
            color: "#fff",
          }}
        >{label}</div>
      </div>
    </div>
  );
}

/* ---------- text animations ---------- */
export function SplitWords({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <span ref={ref} className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.9, ease, delay: delay + i * 0.06 }}
          >{w}&nbsp;</motion.span>
        </span>
      ))}
    </span>
  );
}

/** scroll-scrubbed word opacity (Aveon philosophy paragraph) */
export function ScrollReveal({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => <Word key={i} p={scrollYProgress} r={[i / words.length, (i + 1) / words.length]}>{w}</Word>)}
    </p>
  );
}
function Word({ children, p, r }: { children: string; p: any; r: [number, number] }) {
  const o = useTransform(p, r, [0.15, 1]);
  return <motion.span style={{ opacity: o }}>{children} </motion.span>;
}

export function Tag({ children, className = "", light = false }: { children: ReactNode; className?: string; light?: boolean }) {
  // light: for dark backgrounds (footer)
  return <span className={`font-mono text-[11px] uppercase tracking-[0.25em] ${light ? "text-cream/60" : "text-ink/60"} ${className}`}>[{children}]</span>;
}

export function FadeUp({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 1, ease, delay }}>{children}</motion.div>
  );
}

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2, ease, onUpdate: (v) => { if (ref.current) ref.current.textContent = Math.round(v) + suffix; } });
    return () => c.stop();
  }, [inView, to, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

/* ---------- magnetic button ---------- */
export function Magnetic({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState({ x: 0, y: 0 });
  return (
    <motion.div ref={ref} className={`inline-block ${className}`} animate={p} transition={{ type: "spring", stiffness: 200, damping: 15 }}
      onMouseMove={(e) => { const r = ref.current!.getBoundingClientRect(); setP({ x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.3 }); }}
      onMouseLeave={() => setP({ x: 0, y: 0 })}>{children}</motion.div>
  );
}

export function RollText({ text }: { text: string }) {
  return (
    <span className="group/roll relative inline-flex overflow-hidden">
      <span className="transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover/roll:-translate-y-full">{text}</span>
      <span className="absolute left-0 top-full transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover/roll:-translate-y-full">{text}</span>
    </span>
  );
}

export function Btn({ href, to, children, dark = true, onDark = false }: { href?: string; to?: string; children: string; dark?: boolean; onDark?: boolean }) {
  // onDark: for dark backgrounds (footer), where the ink-coloured variants would disappear
  const tone = onDark
    ? "bg-cream text-ink hover:bg-gold"
    : dark ? "bg-ink text-cream hover:bg-gold" : "border border-ink/20 text-ink hover:bg-ink hover:text-cream";
  const cls = `group inline-flex items-center gap-3 whitespace-nowrap rounded-full px-6 py-3.5 text-[13px] font-medium uppercase tracking-[0.15em] transition-colors md:px-7 md:py-4 md:text-sm ${tone}`;
  const inner = <><RollText text={children} /><span className="transition-transform duration-500 group-hover:rotate-45">↗</span></>;
  return (
    <Magnetic>
      {href ? <a href={href} target="_blank" rel="noreferrer" className={cls}>{inner}</a> : <Link to={to!} className={cls}>{inner}</Link>}
    </Magnetic>
  );
}

/* ---------- Nav ---------- */
export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();
  useEffect(() => setOpen(false), [loc]);
  useEffect(() => {
    const f = () => setScrolled(scrollY > 40);
    addEventListener("scroll", f); return () => removeEventListener("scroll", f);
  }, []);
  const links = [["Home", "/"], ["Portfolio", "/portfolio"], ["Contact", "/contact"]];
  return (
    <>
      <motion.header initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 1, ease, delay: 0.3 }}
        className={`pointer-events-none fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}>
        <div className={`pointer-events-auto mx-auto flex max-w-[1500px] items-center justify-between rounded-full px-4 py-2 transition-all duration-500 md:px-6 ${scrolled ? "mx-3 bg-cream/80 shadow-[0_8px_30px_rgba(0,0,0,.06)] backdrop-blur-xl md:mx-auto" : ""}`}>
          <Link to="/" className="flex items-center"><img src={LOGO_DARK} alt="Diamond State Trimlight" className="h-11 w-auto md:h-14" /></Link>
          <nav className="hidden items-center gap-10 md:flex">
            {links.map(([l, h]) => (
              <NavLink key={h} to={h} end className={({ isActive }) => `text-sm uppercase tracking-[0.18em] ${isActive ? "text-gold" : "text-ink"}`}>
                <RollText text={l} />
              </NavLink>
            ))}
          </nav>
          <div className="hidden md:block"><Btn href={ESTIMATE_URL}>Free Estimate</Btn></div>
          <button onClick={() => setOpen(!open)} className="relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full bg-ink md:hidden" aria-label="menu">
            <span className={`h-px w-5 bg-cream transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-5 bg-cream transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </motion.header>
      <motion.div initial={false} animate={{ clipPath: open ? "circle(150% at 90% 5%)" : "circle(0% at 90% 5%)" }} transition={{ duration: 0.8, ease }}
        inert={!open} aria-hidden={!open} data-mobile-menu
        className="fixed inset-0 z-40 flex flex-col justify-center gap-4 bg-cream px-8 md:hidden">
        {[...links, ["Free Estimate", ESTIMATE_URL]].map(([l, h], i) =>
          h.startsWith("http")
            ? <a key={h} href={h} target="_blank" rel="noreferrer" className="font-display text-5xl uppercase text-gold">{l} ↗</a>
            : <Link key={h} to={h} className="font-display text-6xl uppercase text-ink"><span className="mr-3 font-mono text-xs text-ink/40">0{i + 1}</span>{l}</Link>
        )}
      </motion.div>
    </>
  );
}

/* ---------- Footer ---------- */
export function Footer() {
  return (
    <footer data-dark className="relative overflow-hidden bg-ink px-5 pb-8 pt-20 text-cream md:px-10 md:pt-24">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <Link to="/" className="mb-8 inline-flex items-center">
              <img src={LOGO_LIGHT} alt="Diamond State Trimlight" className="h-16 w-auto md:h-20" />
            </Link>
            <div><Tag light>Let's light it up</Tag></div>
            <h3 className="mt-6 font-display text-5xl uppercase leading-[0.9] md:text-6xl lg:text-7xl">
              <SplitWords text="Ready to shine every night?" />
            </h3>
            <div className="mt-8 md:mt-10"><Btn href={ESTIMATE_URL} onDark>Get A Free Estimate</Btn></div>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 text-sm md:grid-cols-[1fr_1fr_max-content] lg:col-span-6">
            <div><p className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-cream/60">Pages</p>
              {[["Home", "/"], ["Portfolio", "/portfolio"], ["Contact", "/contact"]].map(([l, h]) => <Link key={h} to={h} className="block py-2.5 hover:text-gold lg:py-1"><RollText text={l} /></Link>)}
            </div>
            <div><p className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-cream/60">Social</p>
              <a href={FB} target="_blank" rel="noreferrer" className="block py-2.5 hover:text-gold lg:py-1"><RollText text="Facebook" /></a>
              <a href={IG} target="_blank" rel="noreferrer" className="block py-2.5 hover:text-gold lg:py-1"><RollText text="Instagram" /></a>
            </div>
            <div className="col-span-2 md:col-span-1"><p className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-cream/60">Contact</p>
              <a href={`mailto:${EMAIL}`} className="block break-words py-2.5 hover:text-gold lg:py-1">{EMAIL}</a>
              <a href="tel:5017222336" className="block py-2.5 hover:text-gold lg:py-1">{PHONE}</a>
              <p className="py-1 text-cream/60">Hot Springs, Arkansas</p>
            </div>
          </div>
        </div>
        <div aria-hidden className="mt-16 select-none whitespace-nowrap md:mt-24 font-display text-[15vw] uppercase leading-[0.8] text-cream/10 md:text-[13vw]">Diamond State</div>
        <div className="mt-6 flex flex-col justify-between gap-2 border-t border-cream/10 pt-6 text-xs text-cream/50 md:flex-row">
          <p>Copyright © {new Date().getFullYear()} Diamond State Trimlight</p>
          <p>Certified Trimlight Dealer · Hot Springs, AR</p>
        </div>
      </div>
    </footer>
  );
}

export function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <div className={`flex overflow-hidden whitespace-nowrap ${className}`}>
      {[0, 1].map((k) => (
        <div key={k} className="flex shrink-0 animate-[marquee_30s_linear_infinite] items-center">
          {items.map((t, i) => <span key={i} className="flex items-center px-8">{t}<span className="ml-16 text-gold">✦</span></span>)}
        </div>
      ))}
    </div>
  );
}

export function PageHero({ tag, title, sub }: { tag: string; title: string; sub: string }) {
  return (
    <section className="px-5 pb-10 pt-32 md:px-10 md:pb-14 md:pt-40 lg:pb-16 lg:pt-48">
      <div className="mx-auto max-w-[1500px]">
        <FadeUp><Tag>{tag}</Tag></FadeUp>
        <h1 className="mt-5 font-display text-[16vw] uppercase leading-[0.85] tracking-tight md:mt-6 md:text-[10vw] 2xl:text-[150px]"><SplitWords text={title} delay={0.2} /></h1>
        <FadeUp delay={0.5}><p className="mt-6 max-w-xl text-base text-ink/60 md:mt-8 md:text-lg">{sub}</p></FadeUp>
      </div>
    </section>
  );
}
