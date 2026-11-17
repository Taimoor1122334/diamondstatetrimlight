import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { shots, ESTIMATE_URL } from "../data";
import { Btn, PageHero } from "../ui";

const cats = ["All", ...Array.from(new Set(shots.map((s) => s.tag)))];

function FadePhoto({ src, alt }: { src: string; alt: string }) {
  const [shown, setShown] = useState(src);
  const [dim, setDim] = useState(false);
  useEffect(() => {
    if (src === shown) {
      setDim(false);
      return;
    }
    let cancel = false;
    setDim(true);
    const img = new Image();
    img.src = src;
    const done = () => { if (!cancel) setShown(src); };
    if (img.complete && img.naturalWidth > 0) done();
    else {
      img.onload = done;
      img.onerror = done;
    }
    return () => { cancel = true; };
  }, [src, shown]);
  return (
    <img
      src={shown}
      alt={alt}
      className={`mx-auto mt-4 max-h-[68vh] w-auto max-w-full rounded-md object-contain transition-opacity duration-300 ${dim ? "opacity-40" : "opacity-100"}`}
    />
  );
}

export default function Portfolio() {
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState<number | null>(null);
  const list = shots.filter((s) => cat === "All" || s.tag === cat);

  const step = (dir: number) => setOpen((cur) => (cur === null ? cur : (cur + dir + list.length) % list.length));

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (open === null) return;
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  }, [open, list.length]);

  return (
    <>
      <PageHero
        image={shots[0].src}
        title="Installs around Arkansas"
        sub="A look at Trimlight on real homes. The track stays quiet during the day. At night, neighbors usually ask what it is."
      />
      <section className="px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {cats.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => { setCat(c); setOpen(null); }}
                  className={`px-2 py-2 text-sm underline-offset-4 transition-colors hover:text-blue hover:underline ${cat === c ? "font-semibold text-blue" : "text-ink/70"}`}
                >
                  {c}
                </button>
              ))}
            </div>
            <p className="text-sm text-ink/60">{list.length} {list.length === 1 ? "project" : "projects"}</p>
          </div>

          <div key={cat} className="stagger rise mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((s, i) => (
              <button key={s.src} type="button" onClick={() => setOpen(i)} className="reveal group block text-left">
                <span className="zoom block">
                  <img src={s.src} alt={s.title} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                </span>
                <p className="mt-3 font-display text-xl text-ink transition-colors group-hover:text-blue">{s.title}</p>
                <p className="text-sm text-ink/55">{s.tag}</p>
              </button>
            ))}
          </div>

          <div className="mt-14 border-t border-black/10 pt-8">
            <h2 className="font-display text-3xl">Your place could be next.</h2>
            <p className="mt-3 max-w-xl">Tell us a little about the house or the building. We’ll come back with a clear estimate.</p>
            <div className="mt-5"><Btn href={ESTIMATE_URL}>Request a free estimate</Btn></div>
          </div>
        </div>
      </section>

      {open !== null && list[open] && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink p-4 md:p-8" onClick={() => setOpen(null)}>
          <div className="flex w-full max-w-5xl flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between text-cream">
              <span className="text-sm">{open + 1} of {list.length}</span>
              <button type="button" onClick={() => setOpen(null)} className="rounded-md bg-cream px-4 py-2 text-sm font-semibold text-ink">Close</button>
            </div>
            <FadePhoto src={list[open].full} alt={list[open].title} />
            <div className="mt-4 flex items-center justify-between gap-4 text-cream">
              <button type="button" onClick={() => step(-1)} className="rounded-md bg-cream px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-white" aria-label="Previous image">Previous</button>
              <div className="min-w-0 text-center">
                <p className="truncate font-display text-2xl">{list[open].title}</p>
                <p className="text-sm text-cream/70">{list[open].tag}</p>
              </div>
              <button type="button" onClick={() => step(1)} className="rounded-md bg-cream px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-white" aria-label="Next image">Next</button>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
