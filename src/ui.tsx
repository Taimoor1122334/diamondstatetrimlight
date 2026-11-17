import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { LOGO_DARK, ESTIMATE_URL, PHONE, EMAIL, FB, IG } from "./data";

const stripe = ["#e23d3d", "#f08c1a", "#f2c230", "#38b157", "#2f80ed", "#7a3ff2"];

export function Rainbow() {
  return (
    <div className="flex h-2" aria-hidden>
      {stripe.map((c) => <div key={c} className="flex-1" style={{ backgroundColor: c }} />)}
    </div>
  );
}

export function Btn({ href, to, children, dark = true }: { href?: string; to?: string; children: string; dark?: boolean }) {
  const tone = dark
    ? "bg-[linear-gradient(90deg,#2ec8ff,#7a5cff_46%,#e453e8)] text-white hover:brightness-110"
    : "border border-black/20 bg-white text-ink hover:bg-sand";
  const cls = `inline-flex items-center justify-center rounded-full px-5 py-3 text-base font-medium transition duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue ${tone}`;
  return href
    ? <a href={href} target="_blank" rel="noreferrer" className={cls}>{children}</a>
    : <Link to={to!} className={cls}>{children}</Link>;
}

const links = [["Home", "/"], ["Our Work", "/portfolio"], ["Contact", "/contact"]] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  useEffect(() => setOpen(false), [loc]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="bg-white">
      <Rainbow />
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-2 md:px-8">
        <Link to="/" className="flex shrink-0 items-center"><img src={LOGO_DARK} alt="Diamond State Trimlight" className="h-16 w-auto md:h-20" /></Link>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map(([l, h]) => (
            <NavLink key={h} to={h} end className={({ isActive }) => `text-base underline-offset-4 transition-colors hover:text-blue hover:underline ${isActive ? "font-semibold text-blue" : "text-ink"}`}>
              {l}
            </NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-5 md:flex">
          <a href="tel:5017222336" className="text-base font-semibold underline-offset-4 transition-colors hover:text-blue hover:underline">{PHONE}</a>
          <Btn href={ESTIMATE_URL}>Get a quote</Btn>
        </div>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="rounded border border-black/20 px-3 py-2 text-sm font-semibold md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-white px-5 py-4 md:hidden">
          <div className="flex items-center justify-between">
            <img src={LOGO_DARK} alt="" className="h-16 w-auto" />
            <button type="button" onClick={() => setOpen(false)} className="rounded border border-black/20 px-3 py-2 text-sm font-semibold">Close</button>
          </div>
          <div className="mt-8 flex flex-col">
            {links.map(([l, h]) => (
              <Link key={h} to={h} className="border-b border-black/10 py-4 text-lg transition-colors hover:text-blue">{l}</Link>
            ))}
            <a href="tel:5017222336" className="border-b border-black/10 py-4 text-lg font-semibold transition-colors hover:text-blue">{PHONE}</a>
            <div className="pt-5"><Btn href={ESTIMATE_URL}>Get a quote</Btn></div>
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-white">
      <Rainbow />
      <div className="px-5 py-10 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        <div>
          <Link to="/" className="inline-flex"><img src={LOGO_DARK} alt="Diamond State Trimlight" className="h-20 w-auto" /></Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed">A locally owned, family Trimlight dealer in Hot Springs. We install it, and we service it.</p>
        </div>
        <div className="text-sm leading-relaxed">
          <p className="font-semibold">The shop</p>
          <p className="mt-2">Hot Springs, Arkansas<br />Monday – Friday<br />10am – 5pm CST</p>
          <a href="tel:5017222336" className="mt-3 block text-lg font-semibold text-blue underline-offset-4 transition-colors hover:underline">{PHONE}</a>
          <a href={`mailto:${EMAIL}`} className="mt-1 block break-words underline-offset-4 transition-colors hover:text-blue hover:underline">{EMAIL}</a>
        </div>
        <div className="text-sm">
          <div className="flex flex-col gap-2">
            {links.map(([l, h]) => <Link key={h} to={h} className="underline-offset-4 transition-colors hover:text-blue hover:underline">{l}</Link>)}
            <a href={FB} target="_blank" rel="noreferrer" className="underline-offset-4 transition-colors hover:text-blue hover:underline">Facebook</a>
            <a href={IG} target="_blank" rel="noreferrer" className="underline-offset-4 transition-colors hover:text-blue hover:underline">Instagram</a>
          </div>
          <div className="mt-5"><Btn href={ESTIMATE_URL}>Get a quote</Btn></div>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-6xl text-sm text-ink/60">© {new Date().getFullYear()} Diamond State Trimlight · Certified dealer</p>
      </div>
    </footer>
  );
}

export function PageHero({ title, sub, image }: { tag?: string; title: string; sub: string; image: string }) {
  return (
    <section className="relative h-64 overflow-hidden bg-[#3a1280] md:h-80">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#3a1280_0%,transparent_100%)]" />
      <div className="relative z-10 flex h-full items-end">
        <div className="hero-in mx-auto w-full max-w-6xl px-5 pb-8 md:px-8 md:pb-10">
          <h1 className="max-w-3xl font-display text-3xl leading-tight text-white md:text-5xl">{title}</h1>
          <p className="mt-2 max-w-xl text-lg text-white/85">{sub}</p>
        </div>
      </div>
    </section>
  );
}
