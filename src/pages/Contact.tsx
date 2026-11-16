import { useState, type FormEvent, type ReactNode } from "react";
import { shots, EMAIL, PHONE, FB, IG, ESTIMATE_URL } from "../data";
import { Btn, PageHero } from "../ui";

function fmtPhone(v: string) {
  let d = v.replace(/\D/g, "");
  if (d[0] === "1") d = d.slice(1);
  d = d.slice(0, 10);
  if (d.length > 6) return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  if (d.length > 3) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return d;
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-ink">{label}</span>
      {children}
    </label>
  );
}

export default function Contact() {
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const input = "w-full rounded-md border border-ink/20 bg-white px-3 py-3 text-base outline-none placeholder:text-ink/35 focus:border-gold";
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `Name: ${f.get("name")}\nPhone: ${phone}\nEmail: ${f.get("email")}\n\n${f.get("msg")}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Website inquiry")}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  const info: [string, string, string?][] = [
    ["Hours", "Monday – Friday, 10am – 5pm CST"],
    ["Location", "Hot Springs, Arkansas"],
    ["Email", EMAIL, `mailto:${EMAIL}`],
    ["Phone", PHONE, "tel:5017222336"],
  ];

  return (
    <>
      <PageHero
        tag="Contact"
        title="We’d like to hear about your place."
        sub="Send a note, or call during the week. The person you talk with is the person who will service the system."
      />
      <section className="px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-lg border border-ink/10">
              <img src={shots[13].src} alt="A Trimlight install on a home at night" className="aspect-[4/3] w-full object-cover" />
            </div>
            <div className="mt-6 rounded-lg border border-ink/10 bg-sand p-6">
              <p className="font-display text-2xl text-ink">Rather skip the form?</p>
              <p className="mt-2 text-ink/70">Request a quote through Trimlight, or just call the shop.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Btn href={ESTIMATE_URL}>Free estimate</Btn>
                <a href="tel:5017222336" className="inline-flex items-center justify-center rounded-md border border-ink/20 bg-white px-5 py-3 text-base font-semibold hover:bg-cream">Call {PHONE}</a>
              </div>
            </div>
            <dl className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
              {info.map(([k, v, h]) => (
                <div key={k} className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="text-sm font-semibold text-ink/60">{k}</dt>
                  <dd className="text-right">{h ? <a href={h} className="break-words hover:text-gold">{v}</a> : v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 flex gap-4 text-sm">
              <a href={FB} target="_blank" rel="noreferrer" className="font-semibold underline decoration-ink/20 underline-offset-4 hover:text-gold">Facebook</a>
              <a href={IG} target="_blank" rel="noreferrer" className="font-semibold underline decoration-ink/20 underline-offset-4 hover:text-gold">Instagram</a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <h2 className="font-display text-3xl text-ink">Send a message</h2>
            {sent ? (
              <div className="mt-6 rounded-lg border border-ink/10 bg-sand p-8">
                <p className="font-display text-3xl text-ink">Thank you.</p>
                <p className="mt-3 text-ink/70">We got your note and will be in touch soon.</p>
                <button type="button" onClick={() => setSent(false)} className="mt-6 text-sm font-semibold underline underline-offset-4">Send another message</button>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-6 space-y-5">
                <Field label="Your name"><input required name="name" className={input} placeholder="Jane Smith" /></Field>
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Email"><input required type="email" name="email" className={input} placeholder="name@email.com" /></Field>
                  <Field label="Phone"><input type="tel" value={phone} onChange={(e) => setPhone(fmtPhone(e.target.value))} pattern="\(\d{3}\) \d{3}-\d{4}" title="Enter a 10-digit phone number" className={input} placeholder="(501) 555-0100" /></Field>
                </div>
                <Field label="How can we help?"><textarea required name="msg" rows={5} className={`${input} resize-y`} placeholder="Tell us about your home or business." /></Field>
                <button type="submit" className="rounded-md bg-gold px-5 py-3 text-base font-semibold text-white hover:bg-[#734a12]">Send message</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
