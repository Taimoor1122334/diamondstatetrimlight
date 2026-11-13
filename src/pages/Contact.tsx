import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { shots, EMAIL, PHONE, FB, IG, ESTIMATE_URL } from "../data";
import { Btn, FadeUp, PageHero, Tag } from "../ui";

const ease = [0.22, 1, 0.36, 1] as const;

function fmtPhone(v: string) {
  let d = v.replace(/\D/g, "");
  if (d[0] === "1") d = d.slice(1);
  d = d.slice(0, 10);
  if (d.length > 6) return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  if (d.length > 3) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return d;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="group block border-b border-ink/15 pb-3 transition-colors focus-within:border-gold">
      <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink/50 group-focus-within:text-gold">{label}</span>
      {children}
    </label>
  );
}

export default function Contact() {
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const input = "mt-1 w-full bg-transparent py-1.5 text-lg outline-none placeholder:text-ink/25 md:text-xl";
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `Name: ${f.get("name")}\nPhone: ${phone}\nEmail: ${f.get("email")}\n\n${f.get("msg")}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Website inquiry")}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  const info = [
    ["Hours", "Mon – Fri : 10am – 5pm CST"],
    ["Location", "Hot Springs, Arkansas"],
    ["Email", EMAIL, `mailto:${EMAIL}`],
    ["Phone", PHONE, "tel:5017222336"],
  ];
  return (
    <>
      <PageHero tag="Contact" title="Let's Talk Light" sub="Questions about permanent lighting? Send a message — the person you talk to is the person who'll service your system." />
      <section className="px-5 pb-20 md:px-10 md:pb-32">
        <div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl">
              <img src={shots[13].src} alt="" className="aspect-[4/5] w-full object-cover md:aspect-[16/10] lg:aspect-[4/5]" />
              <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-white/80 p-5 backdrop-blur-xl md:inset-x-4 md:bottom-4 md:right-auto md:max-w-sm lg:right-4 lg:max-w-none">
                <p className="font-display text-2xl uppercase">Skip the form?</p>
                <p className="mt-1 text-sm text-ink/60">Request your free quote directly through Trimlight.</p>
                <div className="mt-4"><Btn href={ESTIMATE_URL}>Free Estimate</Btn></div>
              </div>
            </div>
            <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10 md:mt-10">
              {info.map(([k, v, h], i) => (
                <FadeUp key={k} delay={i * 0.08} className="flex items-center justify-between gap-4 py-3 md:py-4">
                  <Tag className="shrink-0">{k}</Tag>
                  {h ? <a href={h} className="break-words py-2 text-right hover:text-gold">{v}</a> : <span className="py-2 text-right">{v}</span>}
                </FadeUp>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={FB} target="_blank" rel="noreferrer" className="whitespace-nowrap rounded-full border border-ink/15 px-5 py-3 text-xs uppercase tracking-widest hover:bg-ink hover:text-cream">Facebook ↗</a>
              <a href={IG} target="_blank" rel="noreferrer" className="whitespace-nowrap rounded-full border border-ink/15 px-5 py-3 text-xs uppercase tracking-widest hover:bg-ink hover:text-cream">Instagram ↗</a>
            </div>
          </div>
          <div className="lg:sticky lg:top-28 lg:col-span-6 lg:col-start-7 lg:self-start">
            <Tag>Send a message</Tag>
            {sent ? (
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="mt-8 rounded-3xl bg-sand p-8 md:mt-10 md:p-10">
                <p className="font-display text-5xl uppercase">Thank you!</p>
                <p className="mt-4 text-ink/60">Your submission has been received. We'll be in touch soon.</p>
                <button onClick={() => setSent(false)} className="mt-8 text-sm uppercase tracking-widest underline">Send another</button>
              </motion.div>
            ) : (
              <form onSubmit={submit} className="mt-8 space-y-8 md:mt-10 md:space-y-10">
                <Field label="01 — Your name"><input required name="name" className={input} placeholder="Jane Doe" /></Field>
                <div className="grid gap-8 md:grid-cols-2 md:gap-10">
                  <Field label="02 — Email"><input required type="email" name="email" className={input} placeholder="name@example.com" /></Field>
                  <Field label="03 — Phone"><input type="tel" value={phone} onChange={(e) => setPhone(fmtPhone(e.target.value))} pattern="\(\d{3}\) \d{3}-\d{4}" title="Enter a 10-digit phone number" className={input} placeholder="(555) 123-4567" /></Field>
                </div>
                <Field label="04 — Message"><textarea required name="msg" rows={4} className={`${input} resize-none`} placeholder="Tell us about your home or business…" /></Field>
                <button type="submit" className="group flex w-full items-center justify-between rounded-full bg-ink px-7 py-5 text-cream transition-colors hover:bg-gold md:px-8 md:py-6">
                  <span className="font-display text-xl uppercase md:text-2xl">Send Message</span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cream text-ink transition-transform duration-500 group-hover:rotate-45">↗</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
