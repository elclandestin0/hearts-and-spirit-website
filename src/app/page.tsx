// src/app/page.tsx (or Home.tsx if you're routing differently)
"use client";

import React, { useEffect, useRef, useState } from "react";
import GlowyTitle from "@/components/GlowyTitle";

const YOUTUBE_ID = "dQw4w9WgXcQ"; // TODO: replace with real trailer ID

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [activeTab, setActiveTab] = useState<"trailer" | "about" | "pc">(
    "trailer"
  );
  const timerRef = useRef<number | null>(null);

  // Secret triple-tap logic
  useEffect(() => {
    if (clicks === 0) return;
    if (clicks >= 3) {
      setUnlocked(true);
      setActiveTab("pc");
      setClicks(0);
      return;
    }
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setClicks(0), 1200);
  }, [clicks]);

  return (
    <div className="min-h-screen text-slate-100 bg-[radial-gradient(1200px_800px_at_50%_-10%,#111626_0%,#0b0c0f_50%,#06070a_100%)]">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-800/60 backdrop-blur-md bg-slate-900/40 [isolation:isolate]">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          {/* Brand + glowy title */}
          <div className="flex items-center gap-3 min-w-0">
            {/* <span className="w-3.5 h-3.5 shrink-0 rounded-full shadow-[0_0_24px_#6ee7ff] bg-[radial-gradient(circle_at_30%_30%,#fff,#6ee7ff)]" /> */}
            <div className="truncate leading-none">
              <GlowyTitle
                text="Hearts & Spirit"
                className="text-[18px] sm:text-[22px] leading-none"
              />
            </div>
          </div>

          {/* Tabs */}
          <nav className="flex items-center gap-1">
            <TabButton
              label="Trailer"
              active={activeTab === "trailer"}
              onClick={() => setActiveTab("trailer")}
            />
            <TabButton
              label="About"
              active={activeTab === "about"}
              onClick={() => setActiveTab("about")}
            />
            {unlocked && (
              <TabButton
                label="PC Test"
                active={activeTab === "pc"}
                onClick={() => setActiveTab("pc")}
              />
            )}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-5xl mx-auto px-4 py-10">
        <section className="mb-8">
          <div className="mb-2 uppercase tracking-[.14em] text-xs text-sky-300">
            Momentum Flight • Spherical World • Dove Companion
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold">
            Glide, dive, and explore a tiny world in VR
          </h1>
          <p className="text-slate-300/80 mt-3 max-w-2xl">
            A serene, momentum-based flying demo with Arkham-style gliding and Wind Waker vibes.
            Built for Quest/PCVR. Minimal, focused, cozy.
          </p>
          <div className="flex gap-2 mt-4 flex-wrap">
            <a
              className="inline-flex items-center rounded-xl px-4 py-2 bg-slate-100 text-slate-900 font-semibold hover:bg-slate-200"
              href={`https://www.youtube-nocookie.com/watch?v=${YOUTUBE_ID}`}
              target="_blank"
              rel="noreferrer"
            >
              Watch Trailer
            </a>
            <button
              className="inline-flex items-center rounded-xl px-4 py-2 border border-slate-700 text-slate-200 hover:border-sky-400"
              onClick={() => setActiveTab("about")}
            >
              Learn More
            </button>
          </div>
        </section>

        {/* Tabs */}
        <section>
          {activeTab === "trailer" && <TrailerCard youtubeId={YOUTUBE_ID} />}
          {activeTab === "about" && <AboutCard />}
          {unlocked && activeTab === "pc" && <PCTestCard />}
        </section>

        {/* Secret seed (click 3x) */}
        <button
          aria-label="seed"
          onClick={() => setClicks((c) => c + 1)}
          title={unlocked ? "Unlocked" : ""}
          className={[
            "fixed right-4 bottom-24 w-2.5 h-2.5 rounded-full transition-opacity",
            unlocked
              ? "opacity-20 bg-amber-300 shadow-[0_0_14px_#ffd166]"
              : "opacity-50 bg-amber-300 shadow-[0_0_10px_#ffd166] hover:opacity-80",
          ].join(" ")}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 bg-slate-900/40">
        <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-[radial-gradient(circle_at_30%_30%,#fff,#6ee7ff)] shadow-[0_0_18px_#6ee7ff]" />
            <span className="text-sm">
              © {new Date().getFullYear()} Hearts & Spirit
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-400 flex-wrap">
            <FooterLink href="https://youtube.com/@YOURCHANNEL" label="YouTube" />
            <FooterLink href="https://x.com/YOURHANDLE" label="X/Twitter" />
            <FooterLink href="https://instagram.com/YOURHANDLE" label="Instagram" />
            <FooterLink href="https://reddit.com/r/YOURSUB" label="Reddit" />
            <FooterLink href="https://itch.io/profile/YOURPAGE" label="Itch.io" />
            <FooterLink href="mailto:hello@example.com" label="Email" />
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ---------- UI Bits ---------- */

function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "px-3 py-1.5 rounded-xl text-sm font-semibold transition border",
        active
          ? "bg-slate-100 text-slate-900 border-transparent"
          : "bg-transparent text-slate-200 border-slate-700 hover:border-sky-400",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function TrailerCard({ youtubeId }: { youtubeId: string }) {
  return (
    <div className="bg-slate-900/40 border border-slate-800/70 rounded-2xl shadow-[inset_0_10px_30px_rgba(0,0,0,0.35),0_6px_20px_rgba(0,0,0,0.25)]">
      <div className="p-4">
        <h2 className="text-slate-100 text-lg font-semibold mb-3">Trailer</h2>
        <div className="aspect-video w-full overflow-hidden rounded-xl border border-slate-800 bg-black">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`}
            title="VR Demo Trailer"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
    </div>
  );
}

function AboutCard() {
  return (
    <div
      id="about"
      className="mt-6 bg-slate-900/40 border border-slate-800/70 rounded-2xl"
    >
      <div className="p-4">
        <h2 className="text-slate-100 text-lg font-semibold mb-2">About</h2>
        <div className="grid gap-3">
          <p className="text-slate-300/90 leading-7">
            <strong>Hearts & Spirit</strong> is a short, premium VR experience on a
            cozy spherical world. Master momentum: dive to gain speed, then pull
            up for lift. Your dove companion hovers nearby, guiding you to seeds
            and light.
          </p>
          <ul className="text-slate-300/90 leading-7 list-disc pl-5">
            <li>Physics-leaning glide &amp; dive with torso-based steering</li>
            <li>Wind Waker-inspired, stylized aesthetic</li>
            <li>Single scene, fast load, comfort-first options</li>
            <li>Quest 2/3 (SideQuest) and PCVR, demo first</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function PCTestCard() {
  return (
    <div className="mt-6 bg-emerald-900/10 border border-emerald-800/50 rounded-2xl">
      <div className="p-4">
        <h2 className="text-emerald-200 text-lg font-semibold mb-2">
          PC Test (Unlocked)
        </h2>
        <div className="grid gap-3">
          <p className="text-emerald-200/90 leading-7">
            This tab appears after the hidden seed is tapped three times. It
            links to a lightweight PC build for investors & creators.
          </p>
          <div className="flex gap-2 flex-wrap">
            {/* TODO: Replace with your real hosted link */}
            <a
              className="inline-flex items-center rounded-xl px-4 py-2 bg-emerald-300 text-emerald-950 font-semibold hover:bg-emerald-200"
              href="/builds/pc-demo.zip"
              download
            >
              Download PC Demo (Zip)
            </a>
            <a
              className="inline-flex items-center rounded-xl px-4 py-2 border border-emerald-800 text-emerald-100 hover:border-emerald-400"
              href="/webgl/index.html"
              target="_blank"
              rel="noreferrer"
            >
              Open Web Preview
            </a>
          </div>
          <p className="text-xs text-emerald-200/60">
            Note: This is a keyboard/mouse fly-through for scene lookdev, not
            the final VR feel.
          </p>
        </div>
      </div>
    </div>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  const external = !href.startsWith("/") && !href.startsWith("mailto:");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="inline-flex items-center gap-2 px-2 py-1 rounded-md hover:text-slate-200"
    >
      <span>{label}</span>
    </a>
  );
}