import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { shots, ESTIMATE_URL } from "../data";
import { Btn, FadeUp, PageHero, Tag, useCursor } from "../ui";

const ease = [0.22, 1, 0.36, 1] as const;
const cats = ["All", ...Array.from(new Set(shots.map((s) => s.tag)))];

export default function Portfolio() {
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState<number | null>(null);
  const { set } = useCursor();
  const list = shots.filter((s) => cat === "All" || s.tag === cat);

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (open === null) return;
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((open + 1) % list.length);
      if (e.key === "ArrowLeft") setOpen((open - 1 + list.length) % list.length);
    };
    addEventListener("keydown", k); return () => removeEventListener("keydown", k);
  }, [open, list.length]);

  return (
    <>
      <PageHero tag="Portfolio" title="Our Work in Light" sub="A look at Trimlight installs across Arkansas — discreet trim by day, unforgettable color by night." />
      <section className="px-5 pb-20 md:px-10 md:pb-32">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-y border-ink/10 py-4 md:mb-12 md:gap-6 md:py-5">
            <div className="-mx-1 flex flex-wrap gap-1 md:mx-0 md:gap-2">
              {cats.map((c) => (
                <button key={c} onClick={() => setCat(c)} className={`relative min-h-[42px] rounded-full px-4 py-3 text-xs uppercase tracking-[0.16em] transition-colors md:px-5 md:tracking-[0.18em] ${cat === c ? "text-cream" : "text-ink/60 hover:text-ink"}`}>
                  {cat === c && <motion.span layoutId="pill" className="absolute inset-0 rounded-full bg-ink" transition={{ duration: 0.5, ease }} />}
                  <span className="relative">{c}</span>
                </button>
              ))}
            </div>
            <Tag>{String(list.length).padStart(2, "0")} Projects</Tag>
          </div>
          <motion.div layout className="columns-1 gap-4 sm:columns-2 md:gap-6 lg:columns-3">
            <AnimatePresence mode="popLayout">
              {list.map((s, i) => (
                <motion.button layout key={s.src} onClick={() => setOpen(i)}
                  initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.7, ease, delay: (i % 3) * 0.08 }}
                  onMouseEnter={() => set("Open")} onMouseLeave={() => set("")}
                  className="group relative mb-4 block w-full overflow-hidden rounded-3xl text-left md:mb-6">
                  <img src={s.src} alt={s.title} loading="lazy" className={`w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110 ${i % 3 === 1 ? "aspect-[3/4]" : "aspect-[4/3]"}`} />
                  {/* touch screens can't hover, so captions are always shown there */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 [@media(hover:none)]:opacity-100" />
                  <div className="absolute inset-x-4 bottom-4 flex translate-y-6 items-end justify-between text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:inset-x-5 md:bottom-5 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">
                    <div><p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/75">[{s.tag}]</p><p className="font-display text-xl uppercase md:text-2xl">{s.title}</p></div>
                    <span className="font-mono text-xs">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
          <FadeUp className="mt-14 flex flex-col items-center rounded-3xl bg-sand px-6 py-14 text-center md:mt-24 md:py-20">
            <Tag>Your home next?</Tag>
            <h2 className="mt-5 max-w-3xl font-display text-[2.75rem] uppercase leading-[0.9] md:mt-6 md:text-6xl lg:text-7xl">Let's design your lighting</h2>
            <div className="mt-8 md:mt-10"><Btn href={ESTIMATE_URL}>Free Estimate</Btn></div>
          </FadeUp>
        </div>
      </section>

      <AnimatePresence>
        {open !== null && list[open] && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex flex-col bg-cream/95 p-4 backdrop-blur-xl md:p-8" onClick={() => setOpen(null)}>
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs">{String(open + 1).padStart(2, "0")} / {String(list.length).padStart(2, "0")}</span>
              <button className="rounded-full bg-ink px-5 py-2.5 text-xs uppercase tracking-widest text-cream">Close ✕</button>
            </div>
            <div className="relative flex flex-1 items-center justify-center py-6 md:px-20">
              <button
                type="button"
                aria-label="Previous image"
                onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + list.length) % list.length); }}
                className="absolute left-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ink/20 bg-cream/85 text-ink shadow-md backdrop-blur-md transition-colors hover:bg-ink hover:text-cream md:left-2 md:h-14 md:w-14"
              >
                ←
              </button>
              <AnimatePresence mode="wait">
                <motion.img key={list[open].full} src={list[open].full} alt={list[open].title} onClick={(e) => e.stopPropagation()}
                  initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.5, ease }}
                  className="max-h-[75vh] max-w-full rounded-2xl object-contain shadow-2xl" />
              </AnimatePresence>
              <button
                type="button"
                aria-label="Next image"
                onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % list.length); }}
                className="absolute right-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ink/20 bg-cream/85 text-ink shadow-md backdrop-blur-md transition-colors hover:bg-ink hover:text-cream md:right-2 md:h-14 md:w-14"
              >
                →
              </button>
            </div>
            <div className="text-center" onClick={(e) => e.stopPropagation()}>
              <p className="font-display text-2xl uppercase md:text-4xl">{list[open].title}</p>
              <Tag>{list[open].tag}</Tag>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
