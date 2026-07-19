// app/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, HelpCircle, X, ArrowRight, ChevronDown } from "lucide-react";
import {
  UtensilsCrossed,
  Cake,
  Heart,
  Briefcase,
  Users,
  Plane,
} from "lucide-react";

const FAQS = [
  {
    q: "Do I need an account to create an event?",
    a: "No. Fill in the event name, date, and location, and you'll get a shareable link right away. No sign-up wall before you can send the first invite.",
  },
  {
    q: "Is there a limit on how many events or links I can create?",
    a: "None. Create as many events and invite links as you need — for one dinner or fifty.",
  },
  {
    q: "Do my guests need to sign up to RSVP?",
    a: "No. Anyone with the link can respond Attending, Maybe, or Can't make it in one tap — no account required on their end either.",
  },
  {
    q: "Can I see who's responded?",
    a: "Yes. Every response updates your guest list in real time, so you always know where headcount stands.",
  },
  {
    q: "Is it free to use?",
    a: "Yes — creating events, sending links, and collecting RSVPs doesn't cost anything.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="font-[family-name:var(--font-display)] text-lg text-[#F5F1E8] sm:text-xl">
          {q}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-[#C9A15A] transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">
          <p className="max-w-xl text-[15px] leading-relaxed text-[#8B8886]">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main
      className={` text-[#F5F1E8] antialiased`}
    >
      



      {/* HERO */}
      <section className="relative mx-auto grid  gap-16  pb-28  lg:grid-cols-2 lg:items-center pt-14 sm:pt-20">
        <div className="space-y-7">
          <p className="text-xs uppercase tracking-[0.25em] text-[#C9A15A]">
            You&apos;re invited
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-5xl leading-[1.05] tracking-tight sm:text-6xl">
            An invitation,
            <br />
            <span className="italic text-[#C9A15A]">not a form.</span>
          </h1>
          <p className="max-w-md text-[17px] leading-relaxed text-[#8B8886]">
            Name your event, drop a date and location, and send the link. Your
            guests tap Attending, Maybe, or Can&apos;t make it — no accounts, no
            waiting, no limit on how many you send.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/events/new"
              className="group flex items-center gap-2 rounded-full bg-[#F5F1E8] px-6 py-3 text-sm font-medium text-[#0A0A09] transition-colors hover:bg-white"
            >
              Create your first event
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/dashboard"
              className="text-sm text-[#8B8886] underline-offset-4 hover:text-[#F5F1E8] hover:underline"
            >
              View dashboard
            </Link>
          </div>
        </div>

        {/* SIGNATURE ELEMENT: the invitation card */}
        <div className="relative mx-auto flex
        
         h-[420px] w-full max-w-sm
          items-center justify-center
          "
          //  bg-red-400
          >
          {/* back card, stacked */}
          <div className="absolute h-[360px] w-[300px] rotate-[7deg] rounded-2xl border border-white/5 bg-[#141311]" />
          {/* main card */}
          <div className="relative h-[380px] w-[310px] 
          -rotate-[4deg] rounded-2xl border
           border-[#C9A15A]/25 bg-[#141311] 
          p-8 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] 
          transition-transform duration-500
           hover:rotate-0">
            {/* seal */}
            <div className="absolute -top-4 left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border border-[#C9A15A]/40 bg-[#0A0A09] text-[#C9A15A]">
              <span className="font-[family-name:var(--font-display)] text-sm italic">
                O
              </span>
            </div>

            <p className="mt-3 text-center text-[10px] uppercase tracking-[0.2em] text-[#8B8886]">
              Together with friends
            </p>
            <h3 className="mt-3 text-center font-[family-name:var(--font-display)] text-2xl italic leading-tight">
              Maya&apos;s Rooftop
              <br />
              Dinner
            </h3>
            <p className="mt-3 text-center text-sm text-[#8B8886]">
              Sat, Aug 22 · 7:00 PM
              <br />
              Fig &amp; Vine, Terrace
            </p>

            <div className="mt-7 border-t border-white/10 pt-6">
              <p className="mb-3 text-center text-[10px] uppercase tracking-[0.2em] text-[#8B8886]">
                Will you attend?
              </p>
              <div className="flex justify-center gap-2">
                <span className="flex items-center gap-1.5 rounded-full bg-[#8CA37E]/15 px-3 py-1.5 text-xs text-[#A9C199] ring-1 ring-[#8CA37E]/30">
                  <Check className="h-3.5 w-3.5" /> Attending
                </span>
                <span className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-xs text-[#8B8886]">
                  <HelpCircle className="h-3.5 w-3.5" /> Maybe
                </span>
                <span className="flex items-center gap-1.5  rounded-full bg-white/5 px-3 py-1.5 text-xs text-[#8B8886]">
                  <X className="h-3.5 w-3.5" /> Can&apos;t go
                </span>
              </div>
            </div>
          </div>
        </div>



      </section>

      {/* HOW IT WORKS — genuine sequence, numbering earns its place */}
      <section className="relative mx-auto  ">
        <p className="mb-14 text-xs uppercase tracking-[0.25em] text-[#C9A15A]">
          How it works
        </p>
        <div className="grid gap-12 sm:grid-cols-3">
          {[
            {
              n: "01",
              t: "Write the invite",
              d: "Event name, date, and location. That's the whole form.",
            },
            {
              n: "02",
              t: "Send the link",
              d: "Text it, email it, post it — it works anywhere a link works.",
            },
            {
              n: "03",
              t: "Watch RSVPs arrive",
              d: "Attending, Maybe, or Can't make it — updated the moment a guest replies.",
            },
          ].map((s) => (
            <div key={s.n} className="space-y-3">
              <span className="font-[family-name:var(--font-display)] text-3xl italic text-[#C9A15A]/60">
                {s.n}
              </span>
              <h3 className="font-[family-name:var(--font-display)] text-xl">
                {s.t}
              </h3>
              <p className="text-[15px] leading-relaxed text-[#8B8886]">{s.d}</p>
            </div>
          ))}
        </div>
      </section>



      {/* FOR EVERY OCCASION START */}
<section className="relative mx-auto  py-24">
  <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#C9A15A]">
    Any occasion
  </p>
  <h2 className="mb-14 max-w-lg font-[family-name:var(--font-display)] text-3xl italic sm:text-4xl">
    One invite link, whatever you&apos;re hosting.
  </h2>

  <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
    {[
      { icon: UtensilsCrossed, label: "Dinner party" },
      { icon: Cake, label: "Birthday" },
      { icon: Heart, label: "Wedding" },
      { icon: Briefcase, label: "Work event" },
      { icon: Plane, label: "Weekend trip" },
      { icon: Users, label: "Reunion" },
    ].map(({ icon: Icon, label }) => (
      <div
        key={label}
        className="flex flex-col items-start gap-4 bg-[#0A0A09] px-6 py-8 transition-colors hover:bg-[#141311]"
      >
        <Icon className="h-5 w-5 text-[#C9A15A]" strokeWidth={1.5} />
        <span className="text-sm text-[#F5F1E8]">{label}</span>
      </div>
    ))}
  </div>
</section>

{/* FOR EVERY OCCASION END */}


{/* LIVE RSVP TRACKING */}
<section className="relative mx-auto  py-24 ">
  <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
    <div className="space-y-5">
      <p className="text-xs uppercase tracking-[0.25em] text-[#C9A15A]">
        Guest list
      </p>
      <h2 className="max-w-md font-[family-name:var(--font-display)] text-3xl italic sm:text-4xl">
        Know your headcount before you cook.
      </h2>
      <p className="max-w-sm text-[15px] leading-relaxed text-[#8B8886]">
        Every tap updates instantly. No refreshing a spreadsheet, no
        texting to confirm — just an accurate count, always current.
      </p>
    </div>

    {/* guest list mockup */}
    <div className="rounded-2xl border border-white/10 bg-[#141311] p-6">
      <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-5 text-sm">
        <span className="text-[#F5F1E8]">Maya&apos;s Rooftop Dinner</span>
        <span className="text-[#8B8886]">12 invited</span>
      </div>

      <ul className="space-y-4">
        {[
          { name: "Priya S.", status: "attending" },
          { name: "Jonah K.", status: "attending" },
          { name: "Ren A.", status: "maybe" },
          { name: "Dana W.", status: "declined" },
        ].map((g) => (
          <li key={g.name} className="flex items-center justify-between text-sm">
            <span className="text-[#F5F1E8]">{g.name}</span>
            <span
              className={`rounded-full px-3 py-1 text-xs ring-1 ${
                g.status === "attending"
                  ? "bg-[#8CA37E]/15 text-[#A9C199] ring-[#8CA37E]/30"
                  : g.status === "maybe"
                  ? "bg-white/5 text-[#8B8886] ring-white/10"
                  : "bg-[#B06A52]/10 text-[#C58D77] ring-[#B06A52]/25"
              }`}
            >
              {g.status === "attending"
                ? "Attending"
                : g.status === "maybe"
                ? "Maybe"
                : "Can't make it"}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex gap-4 border-t border-white/10 pt-5 text-xs text-[#8B8886]">
        <span>7 attending</span>
        <span>2 maybe</span>
        <span>3 can&apos;t make it</span>
      </div>
    </div>
  </div>
</section>
{/* LIVE RSVP TRACKING END */}



      {/* FAQ */}
      <section className="relative mx-auto  py-24">
        <p className="mb-10 text-xs uppercase tracking-[0.25em] text-[#C9A15A]">
          Questions
        </p>
        <div>
          {FAQS.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </section>

      {/* FOOTER CTA */}
      {/* <section className="relative mx-auto  pb-28 ">
        <div className="rounded-3xl border border-[#C9A15A]/20 bg-[#141311] px-8 py-16 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl italic sm:text-4xl">
            Your next event deserves a link, not a spreadsheet.
          </h2>
          <Link
            href="/events/new"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#F5F1E8] px-7 py-3 text-sm font-medium text-[#0A0A09] transition-colors hover:bg-white"
          >
            Create an event <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section> */}
    </main>
  );
}