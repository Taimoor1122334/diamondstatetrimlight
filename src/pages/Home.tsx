import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { shots, FEATURE, ESTIMATE_URL, PHONE } from "../data";
import { Btn, Tag } from "../ui";

function Hero() {
  const slides = shots.slice(0, 6);
  const [i, setI] = useState(0);
  const [shown, setShown] = useState(0);
  const paused = useRef(false);
  const step = (dir: number) => setI((v) => (v + dir + slides.length) % slides.length);

  useEffect(() => {
    const t = setInterval(() => {
      if (!paused.current) setI((v) => (v + 1) % slides.length);
    }, 7000);
    return () => clearInterval(t);
  }, [i, slides.length]);

  const nextSrc = slides[i].src;
  useEffect(() => {
    if (i === shown) return;
    let cancel = false;
    const img = new Image();
    img.src = nextSrc;
    const go = () => { if (!cancel) setShown(i); };
    if (img.complete && img.naturalWidth > 0) go();
    else img.onload = go;
    return () => { cancel = true; };
  }, [i, shown, nextSrc]);

  const slide = slides[shown];

  return (
    <section className="border-b border-ink/10 px-5 pb-14 pt-36 md:px-8 md:pb-20 md:pt-40">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <Tag>Certified Trimlight dealer</Tag>
          <h1 className="mt-3 font-display text-4xl leading-tight text-ink md:text-5xl">Permanent lighting for your Hot Springs home or business.</h1>
          <p className="mt-5 text-lg leading-relaxed text-ink/75">
            We’re a family-owned business here in Arkansas. We install low-profile lights along your roofline once. After that, you change the colors from your phone for holidays, company, or a quiet night on the porch.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Btn href={ESTIMATE_URL}>Request a free estimate</Btn>
            <a href="tel:5017222336" className="inline-flex items-center justify-center rounded-md border border-ink/20 bg-white px-5 py-3 text-base font-semibold text-ink hover:bg-sand">Call {PHONE}</a>
          </div>
          <p className="mt-6 text-sm text-ink/60">Locally owned · Family business · Serving Hot Springs</p>
        </div>
        <div onMouseEnter={() => { paused.current = true; }} onMouseLeave={() => { paused.current = false; }}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-ink/10 bg-sand">
            {slides.map((s, k) => (
              <img
                key={s.src}
                src={s.src}
                alt={k === shown ? s.title : ""}
                aria-hidden={k !== shown}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out ${k === shown ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between gap-4">
            <p className="text-sm text-ink/70" aria-live="polite">{slide.title} · {slide.tag}</p>
            <div className="flex gap-2">
              <button type="button" onClick={() => step(-1)} className="rounded-md border border-ink/15 bg-white px-4 py-2 text-sm font-semibold transition-colors hover:bg-sand" aria-label="Previous photo">Previous</button>
              <button type="button" onClick={() => step(1)} className="rounded-md border border-ink/15 bg-white px-4 py-2 text-sm font-semibold transition-colors hover:bg-sand" aria-label="Next photo">Next</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="reveal px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-4">
          <Tag>Welcome</Tag>
          <h2 className="mt-2 font-display text-3xl leading-tight text-ink md:text-4xl">Put the lights up once.</h2>
        </div>
        <div className="md:col-span-8">
          <p className="text-lg leading-relaxed text-ink/75">
            No more ladders every November, and no more paying for temporary lights that last one season. One installation lets you change colors, patterns, and brightness any night of the year. Holidays, game days, a little extra light by the walk, or just a warm glow when you’re home.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Btn href={ESTIMATE_URL}>Get started</Btn>
            <Btn to="/portfolio" dark={false}>See our work</Btn>
          </div>
        </div>
      </div>
    </section>
  );
}

const stats = [
  { n: "48", l: "Trim colors, so the track matches your home" },
  { n: "5 years", l: "Free service warranty included" },
  { n: "365", l: "Nights a year you can use the lights" },
  { n: "$75", l: "Flat service fee after the first 5 years" },
];

function Stats() {
  return (
    <section className="reveal bg-ink px-5 py-12 text-cream md:px-8 md:py-14">
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((x) => (
          <div key={x.n}>
            <p className="font-display text-3xl md:text-4xl">{x.n}</p>
            <p className="mt-2 text-sm leading-relaxed text-cream/75">{x.l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const features = [
  { t: "Hard to spot by day", d: "The track comes in 48 colors and follows the lines of your house. During the day it blends in. At night, that’s the part people notice." },
  { t: "Easy on the power bill", d: "The LEDs use less energy than traditional holiday lighting, and the color stays even from one end of the house to the other." },
  { t: "A warranty you can use", d: "Trimlight covers the core parts for life. As a certified dealer, we also service the system free for 5 years. After that, it’s a flat $75 visit." },
  { t: "Useful all year", d: "This isn’t a December-only product. Use it for holidays, a party, everyday accent light, or a little extra light when you get home after dark." },
];

function Features() {
  return (
    <section className="reveal bg-sand px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-6xl">
        <Tag>Why Trimlight</Tag>
        <h2 className="mt-2 max-w-2xl font-display text-3xl leading-tight text-ink md:text-4xl">A system that suits the house, not the other way around.</h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/70">What sets it apart is the track the lights sit in. It is built to disappear against the trim, then do the work at night.</p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {features.map((f) => (
            <article key={f.t} className="rounded-lg border border-ink/10 bg-cream p-6">
              <h3 className="font-display text-2xl text-ink">{f.t}</h3>
              <p className="mt-3 leading-relaxed text-ink/75">{f.d}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 grid items-center gap-8 rounded-lg border border-ink/10 bg-cream p-6 md:grid-cols-[1fr_auto] md:p-8">
          <div>
            <h3 className="font-display text-2xl text-ink">Change it from the kitchen table.</h3>
            <p className="mt-3 max-w-xl leading-relaxed text-ink/75">Colors, patterns, and brightness live in a simple phone app. You don’t need to be technical. Pick a look, and the house follows.</p>
          </div>
          <img src={FEATURE} width={550} height={1122} loading="lazy" alt="The Trimlight app, with controls for colors, patterns, and brightness" className="mx-auto h-64 w-auto md:h-72" />
        </div>
      </div>
    </section>
  );
}

function Work() {
  const list = [shots[0], shots[4], shots[8], shots[13]];
  return (
    <section className="reveal px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Tag>Recent installs</Tag>
            <h2 className="mt-2 font-display text-3xl leading-tight text-ink md:text-4xl">Homes around Arkansas</h2>
          </div>
          <Btn to="/portfolio" dark={false}>View all work</Btn>
        </div>
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {list.map((s) => (
            <Link key={s.src} to="/portfolio" className="group block">
              <div className="overflow-hidden rounded-lg border border-ink/10">
                <img src={s.src} alt={s.title} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]" />
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-3">
                <h3 className="font-display text-xl text-ink transition-colors duration-300 group-hover:text-gold">{s.title}</h3>
                <span className="text-sm text-ink/55">{s.tag}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="reveal border-t border-ink/10 px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-lg border border-ink/10">
          <img src={shots[7].src} alt="A home lit with Trimlight at night" className="aspect-[4/3] w-full object-cover" />
        </div>
        <div>
          <Tag>From the owner</Tag>
          <blockquote className="mt-4 font-display text-2xl leading-snug text-ink md:text-3xl">
            “We use our Trimlight every single day. It’s rare to drive past our house and not see a fun pattern going.”
          </blockquote>
          <p className="mt-5 leading-relaxed text-ink/75">
            The lights tend to explain themselves. If you’ve priced a holiday install, you know it can cost a lot for something that lasts one season, with no way to change the color once it’s hung. When you call us, you get the same people who sold you the system. If something needs attention, that’s who shows up.
          </p>
          <p className="mt-6 border-t border-ink/10 pt-4 text-sm">
            <span className="font-semibold">Diamond State Trimlight</span>
            <span className="text-ink/60"> · Locally owned family business</span>
          </p>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  ["What is Trimlight?", "Trimlight is a permanent, low-profile LED system installed along your roofline. You pick colors and patterns from your phone for holidays, gatherings, a little security light, and everyday accent lighting."],
  ["Will I see the lights during the day?", "Not much. The track comes in 48 colors so it can match the house. Most people notice it at night, not from the curb at noon."],
  ["What does the warranty cover?", "Trimlight carries a lifetime warranty on the core components. As certified dealers, we also include 5 years of service at no charge. After that, a visit is a flat $75."],
  ["Do you work on businesses too?", "Yes. We install permanent lighting for homes and businesses in the Hot Springs area."],
  ["How do I get a price?", `Use the free estimate button, or call us at ${PHONE}. We’re here Monday through Friday, 10am to 5pm CST.`],
];

function Faq() {
  const [o, setO] = useState<number | null>(0);
  return (
    <section className="reveal bg-sand px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Tag>Questions</Tag>
          <h2 className="mt-2 font-display text-3xl leading-tight text-ink md:text-4xl">Happy to walk you through it.</h2>
          <p className="mt-4 leading-relaxed text-ink/70">If you’d rather talk than read, call {PHONE}. A real person in Hot Springs will pick up during business hours.</p>
        </div>
        <div className="lg:col-span-8">
          {faqs.map(([q, a], i) => (
            <div key={q} className="border-b border-ink/10">
              <button type="button" onClick={() => setO(o === i ? null : i)} aria-expanded={o === i} className="flex w-full items-center justify-between gap-4 py-4 text-left">
                <span className="text-lg font-semibold">{q}</span>
                <span className="text-gold" aria-hidden>{o === i ? "–" : "+"}</span>
              </button>
              <div className="grid transition-[grid-template-rows] duration-300 ease-out" style={{ gridTemplateRows: o === i ? "1fr" : "0fr" }}>
                <div className="overflow-hidden">
                  <p className="max-w-2xl pb-4 leading-relaxed text-ink/75">{a}</p>
                </div>
              </div>
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
      <Intro />
      <Stats />
      <Features />
      <Work />
      <Story />
      <Faq />
    </>
  );
}
