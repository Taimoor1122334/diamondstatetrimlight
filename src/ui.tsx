import { useEffect, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { LOGO_DARK, LOGO_LIGHT, ESTIMATE_URL, PHONE, EMAIL, FB, IG } from "./data";

export function Tag({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-sm font-semibold text-ink/55 ${className}`}>{children}</p>;
}

export function Btn({ href, to, children, dark = true, onDark = false }: { href?: string; to?: string; children: string; dark?: boolean; onDark?: boolean }) {
  const tone = onDark
    ? "bg-cream text-ink hover:bg-white"
    : dark
      ? "bg-ink text-white hover:bg-[#2c3b36]"
      : "border border-ink/20 bg-white text-ink hover:border-ink/40 hover:bg-sand";
  const cls = `inline-flex items-center justify-center rounded-md px-5 py-3 text-base font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${tone}`;
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
    <div className="fixed inset-x-0 top-0 z-50">
      <div className="relative z-10 bg-ink text-cream">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-2 text-sm md:px-8">
          <p>Hot Springs, Arkansas</p>
          <p className="hidden sm:block">Monday – Friday, 10am – 5pm</p>
          <a href="tel:5017222336" className="font-semibold hover:text-white">{PHONE}</a>
        </div>
      </div>
      <header className="relative z-10 border-b border-ink/10 bg-cream">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-3 md:px-8">
          <Link to="/" className="flex items-center"><img src={LOGO_DARK} alt="Diamond State Trimlight" className="h-12 w-auto md:h-14" /></Link>
          <nav className="hidden items-center gap-8 md:flex">
            {links.map(([l, h]) => (
              <NavLink key={h} to={h} end className={({ isActive }) => `text-base ${isActive ? "font-semibold text-ink" : "text-ink/70 hover:text-ink"}`}>
                {l}
              </NavLink>
            ))}
          </nav>
          <div className="hidden md:block"><Btn href={ESTIMATE_URL}>Free estimate</Btn></div>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="rounded-md border border-ink/15 px-3 py-2 text-sm font-semibold md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>
      {open && (
        <div className="fixed inset-0 -z-10 overflow-auto bg-cream px-5 pb-10 pt-36 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map(([l, h]) => (
              <Link key={h} to={h} className="rounded-md px-2 py-3 text-lg hover:bg-sand">{l}</Link>
            ))}
            <a href="tel:5017222336" className="rounded-md px-2 py-3 text-lg hover:bg-sand">Call {PHONE}</a>
            <div className="pt-2"><Btn href={ESTIMATE_URL}>Free estimate</Btn></div>
          </div>
        </div>
      )}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink px-5 py-14 text-cream md:px-8 md:py-16">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Link to="/" className="inline-flex"><img src={LOGO_LIGHT} alt="Diamond State Trimlight" className="h-16 w-auto" /></Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/75">A locally owned, family Trimlight dealer in Hot Springs. We install it, and we service it.</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white/70">Visit</p>
          <p className="mt-3 text-sm leading-relaxed text-cream/80">Hot Springs, Arkansas<br />Monday – Friday<br />10am – 5pm CST</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white/70">Talk with us</p>
          <a href="tel:5017222336" className="mt-3 block text-lg font-semibold hover:text-white">{PHONE}</a>
          <a href={`mailto:${EMAIL}`} className="mt-1 block break-words text-sm text-cream/80 hover:text-white">{EMAIL}</a>
          <div className="mt-4 flex gap-4 text-sm">
            <a href={FB} target="_blank" rel="noreferrer" className="hover:text-white">Facebook</a>
            <a href={IG} target="_blank" rel="noreferrer" className="hover:text-white">Instagram</a>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-white/70">Pages</p>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            {links.map(([l, h]) => <Link key={h} to={h} className="text-cream/80 hover:text-white">{l}</Link>)}
          </div>
          <div className="mt-5"><Btn href={ESTIMATE_URL} onDark>Free estimate</Btn></div>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-2 border-t border-cream/15 pt-6 text-sm text-cream/60 md:flex-row md:justify-between">
        <p>© {new Date().getFullYear()} Diamond State Trimlight</p>
        <p>Certified Trimlight dealer · Hot Springs, AR</p>
      </div>
    </footer>
  );
}

export function PageHero({ tag, title, sub }: { tag: string; title: string; sub: string }) {
  return (
    <section className="border-b border-ink/10 px-5 pb-10 pt-36 md:px-8 md:pb-12 md:pt-40">
      <div className="mx-auto max-w-6xl">
        <Tag>{tag}</Tag>
        <h1 className="mt-2 max-w-3xl font-display text-4xl leading-tight text-ink md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/70">{sub}</p>
      </div>
    </section>
  );
}
