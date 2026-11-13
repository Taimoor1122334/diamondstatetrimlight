import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { shots, FEATURE, ESTIMATE_URL, PHONE } from "../data";
import { Btn, Counter, FadeUp, Marquee, ScrollReveal, SplitWords, Tag, useCursor } from "../ui";

const ease = [0.22, 1, 0.36, 1] as const;

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const [i, setI] = useState(0);
  const slides = shots.slice(0, 8);
  const { set } = useCursor();
  useEffect(() => { const t = setInterval(() => setI((v) => (v + 1) % slides.length), 4500); return () => clearInterval(t); }, [slides.length]);
  return (
    <section ref={ref} className="px-3 pt-24 md:px-5 md:pt-28">
      <div className="mx-auto mb-6 max-w-[1500px] px-2 md:px-5">
        <h1 className="font-display text-[15.5vw] uppercase leading-[0.82] tracking-tight md:text-[11.5vw]">
          <SplitWords text="Permanent" delay={0.4} />
          <span className="flex flex-wrap items-end justify-between gap-4">
            <SplitWords text="Lighting" delay={0.55} />
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mb-[1.5vw] hidden max-w-xs font-sans text-base normal-case leading-snug tracking-normal text-ink/60 md:block">
              For your home or business — by a locally owned, family business in Hot Springs, Arkansas.
            </motion.span>
          </span>
        </h1>
      </div>
      <motion.div initial={{ clipPath: "inset(30% 20% 30% 20% round 40px)" }} animate={{ clipPath: "inset(0% 0% 0% 0% round 24px)" }} transition={{ duration: 1.6, ease, delay: 0.6 }}
        className="relative mx-auto h-[68svh] min-h-[460px] max-w-[1500px] overflow-hidden rounded-3xl md:h-[72vh] lg:h-[88vh]"
        onMouseEnter={() => set("Drag")} onMouseLeave={() => set("")} data-hover>
        <motion.div style={{ scale, y }} className="absolute inset-0">
          <AnimatePresence>
            <motion.img key={i} src={slides[i].src} alt={slides[i].title} className="absolute inset-0 h-full w-full object-cover"
              initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.4, ease }} />
          </AnimatePresence>
        </motion.div>
        <motion.div drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.2}
          onDragEnd={(_, info) => { if (info.offset.x < -60) setI((v) => (v + 1) % slides.length); if (info.offset.x > 60) setI((v) => (v - 1 + slides.length) % slides.length); }}
          className="absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
        <div className="pointer-events-none absolute inset-x-4 top-4 flex flex-wrap gap-1.5 md:inset-x-8 md:top-8 md:gap-2">
          {["Hot Springs, AR", "Residential", "Commercial"].map((t) => <span key={t} className="whitespace-nowrap rounded-full bg-white/20 px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] text-white backdrop-blur-md md:px-4 md:py-2 md:tracking-[0.2em]">{t}</span>)}
        </div>
        <div className="absolute inset-x-4 bottom-4 flex flex-col items-start justify-between gap-3 md:inset-x-8 md:bottom-8 md:flex-row md:items-end md:gap-6">
          <div className="pointer-events-none max-w-md rounded-2xl bg-white/15 p-4 text-white backdrop-blur-xl md:p-5">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/70">Trusted by Arkansas homeowners</p>
            <p className="mt-2 text-[15px] leading-snug md:text-lg">Low-profile by day. Beautiful, programmable light by night — for holidays, security, entertaining and year-round curb appeal.</p>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            {/* bars stay thin, but each button gets a larger invisible hit area for touch */}
            <div className="flex">
              {slides.map((_, k) => (
                <button key={k} onClick={() => setI(k)} className="px-[3px] py-4" aria-label={`slide ${k + 1}`}>
                  <span className={`block h-1 rounded-full transition-all duration-500 ${k === i ? "w-10 bg-white" : "w-4 bg-white/40"}`} />
                </button>
              ))}
            </div>
            <span className="font-mono text-xs text-white">0{i + 1}/0{slides.length}</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Intro() {
  return (
    <section className="px-5 py-20 md:px-10 md:py-28 lg:py-40">
      <div className="mx-auto grid max-w-[1500px] gap-6 md:gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-3"><Tag>Welcome to Diamond State</Tag></div>
        <div className="lg:col-span-9">
          <ScrollReveal className="font-display text-[2rem] uppercase leading-[1.05] md:text-5xl lg:text-6xl"
            text="Permanent lighting perfected. No more ladders, no more paying for temporary lights year after year — just one install that lets you change colors, patterns and moods any night of the year." />
          <div className="mt-10 flex flex-wrap gap-3 md:mt-12 md:gap-4"><Btn href={ESTIMATE_URL}>Get Started</Btn><Btn to="/portfolio" dark={false}>See Our Work</Btn></div>
        </div>
      </div>
    </section>
  );
}

const features = [
  { n: "01", t: "Invisible by day", d: "Our custom trim track comes in 48 colors, blending into your home's architecture — nearly invisible by day, a showstopper at night." },
  { n: "02", t: "Energy efficient LEDs", d: "Trimlight LEDs use less energy than traditional lighting while still delivering vibrant, consistent color." },
  { n: "03", t: "Lifetime warranty", d: "Lifetime warranty on core components, plus our 5-year free service warranty as certified dealers. After that, a flat $75 service fee." },
  { n: "04", t: "Designed for year-round", d: "Not seasonal — permanent, all-season lighting for holidays, events, everyday accents and security." },
];

function Features() {
  const [a, setA] = useState(0);
  return (
    <section className="overflow-hidden bg-sand px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-10 flex flex-col justify-between gap-6 md:mb-14 lg:flex-row lg:items-end">
          <div><Tag>Why Trimlight</Tag>
            <h2 className="mt-6 max-w-4xl font-display text-5xl uppercase leading-[0.9] md:text-7xl lg:text-8xl"><SplitWords text="Where every detail shines" /></h2>
          </div>
          <p className="max-w-sm text-ink/60">Something sets Trimlight apart from the competition — and it starts with the track your lights sit in.</p>
        </div>
        <div className="grid items-center gap-12 md:grid-cols-[1.4fr_1fr] lg:grid-cols-2">
          <div className="divide-y divide-ink/10 border-y border-ink/10">
            {features.map((f, i) => (
              <div key={f.n} onMouseEnter={() => setA(i)} onClick={() => setA(i)} data-hover className="group py-7">
                <div className="flex items-baseline gap-6">
                  <span className={`font-mono text-xs transition-colors ${a === i ? "text-gold" : "text-ink/40"}`}>[{f.n}]</span>
                  <h3 className={`font-display text-3xl uppercase transition-all duration-500 lg:text-4xl xl:text-5xl ${a === i ? "translate-x-2 text-ink" : "text-ink/35"}`}>{f.t}</h3>
                </div>
                <motion.div initial={false} animate={{ height: a === i ? "auto" : 0, opacity: a === i ? 1 : 0 }} transition={{ duration: 0.6, ease }} className="overflow-hidden">
                  <p className="max-w-lg pl-14 pt-4 text-ink/70">{f.d}</p>
                </motion.div>
              </div>
            ))}
          </div>
          {/* phone mockup is 550x1122 — size it by height so it can't stretch the section */}
          <FadeUp className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-x-14 inset-y-12 rounded-full bg-gold/30 blur-3xl" />
              <motion.img src={FEATURE} width={550} height={1122} loading="lazy"
                alt="The Trimlight app on a phone, with controls for colors, patterns, animations and brightness"
                className="relative h-[380px] w-auto md:h-[440px] lg:h-[520px]"
                animate={{ y: [0, -14, 0], rotate: [0, 1.5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function Story() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  return (
    <section ref={ref} className="px-5 py-20 md:px-10 md:py-28 lg:py-40">
      <div className="mx-auto grid max-w-[1500px] items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="relative h-[52vh] max-h-[520px] overflow-hidden rounded-3xl md:h-[480px] lg:col-span-5 lg:h-[80vh] lg:max-h-none">
          <motion.img style={{ y, scale: 1.25 }} src={shots[7].src} alt="" className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <Tag>Owner's note</Tag>
          <blockquote className="mt-6 font-display text-3xl uppercase leading-[1.05] md:mt-8 md:text-5xl">
            <SplitWords text="“We use our Trimlight every single day. It's rare to drive past our house and not see a fun pattern going!”" />
          </blockquote>
          <FadeUp delay={0.3}>
            <p className="mt-8 max-w-lg text-ink/65 md:mt-10">Trimlight sells itself. If you've ever priced holiday light installs, you know they can be outrageous — and only last one season, with no way to change colors once they're hung. I tell my customers that not only am I the salesperson, I'm who they call when there's an issue.</p>
            <div className="mt-10 flex items-center gap-4 border-t border-ink/10 pt-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold font-display text-xl text-white">D</div>
              <div><p className="font-medium uppercase tracking-wider">Diamond State Trimlight</p><p className="text-sm text-ink/50">Locally owned · Family business</p></div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const s = [{ n: 48, s: "", l: "Trim colors to match your home" }, { n: 5, s: "yr", l: "Free service warranty included" }, { n: 365, s: "", l: "Nights of light every year" }, { n: 75, s: "$", l: "Flat service fee after 5 years" }];
  return (
    <section className="border-y border-ink/10 px-5 md:px-10">
      <div className="mx-auto grid max-w-[1500px] grid-cols-2 md:grid-cols-4">
        {s.map((x, i) => (
          <div key={i} className={`py-10 md:py-12 lg:py-14 ${i ? "md:border-l" : ""} ${i % 2 ? "border-l" : ""} ${i < 2 ? "border-b md:border-b-0" : ""} border-ink/10 ${i % 2 ? "pl-5" : "pr-5"} md:px-6 lg:px-8`}>
            <p className="font-display text-[3.25rem] leading-none sm:text-6xl lg:text-7xl xl:text-8xl">{x.s === "$" && "$"}<Counter to={x.n} suffix={x.s === "$" ? "" : x.s} /></p>
            <p className="mt-3 max-w-[14rem] text-sm text-ink/60">{x.l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Work() {
  const { set } = useCursor();
  const list = [shots[0], shots[4], shots[8], shots[13]];
  return (
    <section className="px-5 py-20 md:px-10 md:py-28 lg:py-40">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-10 flex items-end justify-between gap-6 md:mb-14">
          <div><Tag>Selected Work</Tag><h2 className="mt-6 font-display text-5xl uppercase leading-[0.9] md:text-7xl lg:text-8xl"><SplitWords text="Homes that glow" /></h2></div>
          <div className="hidden shrink-0 md:block"><Btn to="/portfolio" dark={false}>View All</Btn></div>
        </div>
        <div className="grid gap-8 md:grid-cols-2 md:gap-6">
          {list.map((s, i) => (
            <FadeUp key={i} delay={(i % 2) * 0.15} className={i % 2 ? "md:mt-16 lg:mt-24" : ""}>
              <Link to="/portfolio" onMouseEnter={() => set("View")} onMouseLeave={() => set("")} className="group block">
                <div className="overflow-hidden rounded-3xl"><img src={s.src} alt={s.title} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110" /></div>
                <div className="mt-5 flex items-center justify-between">
                  <h3 className="font-display text-2xl uppercase md:text-3xl">{s.title}</h3>
                  <span className="rounded-full border border-ink/15 px-4 py-1.5 text-xs uppercase tracking-widest text-ink/60">{s.tag}</span>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
        <div className="mt-10 md:hidden"><Btn to="/portfolio" dark={false}>View All Work</Btn></div>
      </div>
    </section>
  );
}

const faqs = [
  ["What is Trimlight?", "Trimlight is a permanent, low-profile LED lighting system installed along your roofline. Control colors and patterns from your phone for holidays, events, security and everyday accent lighting."],
  ["Will I see the lights during the day?", "Barely. Our custom trim track comes in 48 colors so it blends into your home's architecture — nearly invisible by day."],
  ["What does the warranty cover?", "Trimlight carries a lifetime warranty on core components. As certified dealers we also include a 5-year service warranty — we service your products free of charge. After 5 years it's a flat $75 service fee."],
  ["Do you install on businesses too?", "Yes! We install permanent lighting for both homes and businesses throughout the Hot Springs, Arkansas area."],
  ["How do I get a price?", `Click "Free Estimate" to request a quote, or call us at ${PHONE}. We're available Monday – Friday, 10am – 5pm CST.`],
];

function Faq() {
  const [o, setO] = useState<number | null>(0);
  return (
    <section className="bg-sand px-5 py-20 md:px-10 md:py-28 lg:py-36">
      <div className="mx-auto grid max-w-[1500px] gap-8 md:gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5"><Tag>FAQ</Tag>
          <h2 className="mt-6 max-w-2xl font-display text-5xl uppercase leading-[0.9] md:text-6xl lg:text-7xl"><SplitWords text="Have a question? We're here to help." /></h2>
        </div>
        <div className="lg:col-span-7">
          {faqs.map(([q, a], i) => (
            <div key={i} className="border-b border-ink/10">
              <button onClick={() => setO(o === i ? null : i)} aria-expanded={o === i} className="flex w-full items-center justify-between gap-4 py-6 text-left md:gap-6 md:py-7">
                <span className="text-lg font-medium md:text-2xl">{q}</span>
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/15 text-xl transition-all duration-500 ${o === i ? "rotate-45 bg-ink text-cream" : ""}`}>+</span>
              </button>
              <motion.div initial={false} animate={{ height: o === i ? "auto" : 0 }} transition={{ duration: 0.6, ease }} className="overflow-hidden">
                <p className="max-w-2xl pb-7 text-ink/65">{a}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee className="mt-12 font-display text-4xl uppercase md:mt-16 md:text-6xl" items={["Holidays", "Security", "Entertaining", "Curb Appeal", "Game Days", "Every Night"]} />
      <Intro />
      <Stats />
      <Features />
      <Work />
      <Story />
      <Faq />
    </>
  );
}
