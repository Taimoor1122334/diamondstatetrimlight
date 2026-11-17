import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { shots, ESTIMATE_URL, PHONE } from "../data";
import { Btn } from "../ui";

function Hero() {
  const slides = shots.slice(0, 6);
  const [i, setI] = useState(0);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setI((v) => (v + 1) % slides.length);
    }, 4000);
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
    <section
      className="relative h-[78vh] min-h-[520px] max-h-[760px] overflow-hidden bg-[#102018]"
    >
      {slides.map((s, k) => (
        <img
          key={s.src}
          src={s.src}
          alt={k === shown ? s.title : ""}
          aria-hidden={k !== shown}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${k === shown ? "slide-drift opacity-100" : "opacity-0"}`}
        />
      ))}
      <div className="pointer-events-none absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#102018_0%,transparent_100%)]" />
      <div className="relative z-10 flex h-full items-end px-5 pb-16 md:items-center md:px-16 md:pb-16">
        <div className="hero-in max-w-xl text-white">
          <h1 className="font-display text-4xl leading-tight md:text-6xl">Permanent lighting for your Hot Springs home.</h1>
          <p className="mt-4 text-lg leading-relaxed text-white/90">
            We’re a family-owned Trimlight dealer. The lights go up once, stay quiet during the day, and change color from your phone at night.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
            <Btn href={ESTIMATE_URL}>Get a quote</Btn>
            <a href="tel:5017222336" className="text-lg font-semibold underline-offset-4 transition-colors hover:underline">{PHONE}</a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-5 right-5 z-10 flex items-center gap-2" role="tablist" aria-label="Hero photos">
        {slides.map((s, k) => (
          <button
            key={s.src}
            type="button"
            role="tab"
            aria-selected={k === i}
            aria-label={`${s.title}, photo ${k + 1} of ${slides.length}`}
            onClick={() => setI(k)}
            className={`h-2.5 w-2.5 rounded-full border-2 border-white transition duration-300 hover:bg-white ${k === i ? "scale-125 bg-white" : "bg-transparent"}`}
          />
        ))}
      </div>
      <p className="sr-only" aria-live="polite">{slide.title}, {slide.tag}</p>
    </section>
  );
}

const points: [string, string, string][] = [
  ["#38b157", "Hard to spot by day", "The track comes in 48 colors and follows the roofline, so the house still looks like itself at noon."],
  ["#2f80ed", "Installed by us", "A Hot Springs family puts the system on and comes back if it needs attention."],
  ["#7a3ff2", "Every night of the year", "Holidays, game day, a party, or a little light on the walk when you get home."],
];

const faqs = [
  ["What is Trimlight?", "A permanent LED system along the roofline. You pick colors and patterns from your phone."],
  ["Will I see it during the day?", "Not much. The track is matched to the house. Most people notice it at night."],
  ["What does the warranty cover?", "Trimlight covers the core parts for life. We service it free for 5 years, then a visit is $75."],
  ["Do you work on businesses?", "Yes. Homes and businesses around Hot Springs."],
];

export default function Home() {
  const gallery = [shots[1], shots[4], shots[6], shots[8], shots[12], shots[13]];

  return (
    <>
      <Hero />

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="reveal text-center font-display text-3xl md:text-4xl">What you get</h2>
          <div className="stagger mt-10 grid gap-4 sm:grid-cols-3">
            {points.map(([color, t, d]) => (
              <div key={t} className="reveal border border-black/10 bg-white px-6 py-8" style={{ borderTopWidth: 4, borderTopColor: color }}>
                <h3 className="font-display text-xl">{t}</h3>
                <p className="mt-3 leading-relaxed text-ink/80">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand">
        <div className="stagger mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 lg:grid-cols-2 md:px-8 md:py-20">
          <img src={shots[7].src} alt="A home lit with Trimlight at night" className="reveal aspect-[4/3] w-full object-cover" />
          <div className="reveal">
            <h2 className="font-display text-3xl md:text-4xl">Put the lights up once.</h2>
            <p className="mt-4 text-lg leading-relaxed">
              No more ladders every November, and no more paying for lights that last one season. Trimlight covers the core parts for life. We service the system free for 5 years. After that, a visit is $75.
            </p>
            <p className="mt-4 leading-relaxed">
              Colors, patterns, and brightness live in a simple phone app. You don’t need to be technical. Pick a look, and the house follows.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="font-display text-3xl md:text-4xl">Homes around Arkansas</h2>
            <Link to="/portfolio" className="font-semibold text-blue underline-offset-4 transition-colors hover:underline">See all installs</Link>
          </div>
          <div className="stagger mt-8 grid grid-cols-2 gap-3 lg:grid-cols-3">
            {gallery.map((s) => (
              <Link key={s.src} to="/portfolio" className="reveal group block">
                <span className="zoom block">
                  <img src={s.src} alt={s.title} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                </span>
                <p className="mt-2 text-sm font-medium transition-colors group-hover:text-blue">{s.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#102018] px-5 py-16 text-white md:px-8 md:py-20">
        <img src={shots[12].src} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[#102018]/60" />
        <div className="reveal relative mx-auto max-w-3xl text-center">
          <p className="font-display text-2xl leading-snug md:text-3xl">“We use our Trimlight every single day. It’s rare to drive past our house and not see a fun pattern going.”</p>
          <p className="mt-4 text-white/80">Diamond State Trimlight, Hot Springs</p>
        </div>
      </section>

      <section className="bg-sand px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <div className="reveal">
            <h2 className="font-display text-3xl">Questions</h2>
            <p className="mt-3 leading-relaxed">Rather talk it through? Call {PHONE}, Monday through Friday, 10am to 5pm.</p>
            <div className="mt-6"><Btn to="/contact">Contact the shop</Btn></div>
          </div>
          <dl className="stagger divide-y divide-black/10">
            {faqs.map(([q, a]) => (
              <div key={q} className="reveal py-4 first:pt-0 last:pb-0">
                <dt className="font-semibold">{q}</dt>
                <dd className="mt-1 leading-relaxed text-ink/80">{a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-blue px-5 py-14 text-center text-white md:px-8">
        <div className="reveal">
        <h2 className="font-display text-3xl">Lights on your place next.</h2>
        <p className="mt-2">Tell us about the house, or call the Hot Springs shop.</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
          <a href={ESTIMATE_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-md bg-white px-5 py-3 font-medium text-blue hover:bg-sand">Get a quote</a>
          <a href="tel:5017222336" className="text-lg font-semibold underline-offset-4 transition-colors hover:underline">{PHONE}</a>
        </div>
        </div>
      </section>
    </>
  );
}
