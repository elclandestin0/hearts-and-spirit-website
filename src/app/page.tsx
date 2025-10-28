// src/app/page.tsx (or Home.tsx if you're routing differently)
"use client";

import React, { useEffect, useRef, useState } from "react";
import GlowyTitle from "@/components/GlowyTitle";
import UnityBuild from "@/components/ui/UnityBuild";

const YOUTUBE_ID = "dQw4w9WgXcQ"; // TODO: replace with real trailer ID

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [activeTab, setActiveTab] = useState<"trailer" | "about" | "pc">(
    "trailer"
  );
  const timerRef = useRef<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);


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
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [clicks]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <div className="min-h-svh flex flex-col text-slate-100 bg-[radial-gradient(1200px_800px_at_50%_-10%,#111626_0%,#0b0c0f_50%,#06070a_100%)]">
      {/* Header */}
      <header
        // single source of truth for header height 
        className="sticky top-0 z-40 border-b border-slate-800/60 backdrop-blur-md bg-slate-900/40 [isolation:isolate] h-[var(--header-h)]"
      >
        <div className="relative max-w-5xl mx-auto h-full px-4 flex items-center justify-between gap-3">
          {/* Brand + glowy title */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="leading-none">
              <GlowyTitle
                text="Hearts & Spirit"
                className="block leading-none text-[calc(var(--header-h)*0.28)] sm:text-[calc(var(--header-h)*0.32)]"
              />
            </div>
          </div>

          {/* Desktop tabs */}
          <nav className="hidden sm:flex items-center gap-1 self-end pb-4 pt-4">
            <TabButton label="Home" active={activeTab === "trailer"} onClick={() => setActiveTab("trailer")} />
            {/* <TabButton label="About" active={activeTab === "about"} onClick={() => setActiveTab("about")} /> */}
            {unlocked && (
              <TabButton label="Demo" active={activeTab === "pc"} onClick={() => setActiveTab("pc")} />
            )}
          </nav>

          {/* Mobile hamburger */}
          <div className="sm:hidden self-center">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-700/80 hover:border-sky-400/80"
            >
              <span className="relative inline-block w-5 h-5">
                <span className={`absolute left-0 top-1 block h-0.5 w-5 bg-slate-200 transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
                <span className={`absolute left-0 top-2.5 block h-0.5 w-5 bg-slate-200 transition-opacity ${menuOpen ? "opacity-0" : "opacity-100"}`} />
                <span className={`absolute left-0 top-4 block h-0.5 w-5 bg-slate-200 transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
              </span>
            </button>
          </div>

          {/* Mobile menu panel */}
          {menuOpen && (
            <>
              {/* click-away overlay */}
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="fixed inset-0 z-[-1] cursor-default bg-black/0"
              />
              <div
                className="absolute right-4 top-[calc(var(--header-h)-8px)] sm:hidden min-w-[180px]
                     rounded-xl border border-slate-800 bg-slate-900/95 backdrop-blur-md shadow-lg"
                role="menu"
              >
                <ul className="py-2">
                  <li>
                    <button
                      role="menuitem"
                      onClick={() => { setActiveTab("trailer"); setMenuOpen(false); }}
                      className="w-full text-left px-3 py-2 text-slate-200 hover:bg-slate-800/60"
                    >
                      Home
                    </button>
                  </li>
                  {/* <li>
                    <button
                      role="menuitem"
                      onClick={() => { setActiveTab("about"); setMenuOpen(false); }}
                      className="w-full text-left px-3 py-2 text-slate-200 hover:bg-slate-800/60"
                    >
                      About
                    </button>
                  </li> */}
                  {unlocked && (
                    <li>
                      <button
                        role="menuitem"
                        onClick={() => { setActiveTab("pc"); setMenuOpen(false); }}
                        className="w-full text-left px-3 py-2 text-slate-200 hover:bg-slate-800/60"
                      >
                        Demo
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            </>
          )}
        </div>
      </header>
      {/* Hero */}
      <main className="max-w-5xl mx-auto px-4 py-10">
        <section className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-semibold">
            {activeTab === "trailer" && 'Soar with Love'}
            {activeTab === "pc" && 'Demo'}
          </h1>
          <p className="text-slate-300/80 mt-3 max-w-2xl">
            {activeTab === "trailer" && 'Flap, glide, dive and hover your way around with Dovina as you discover the parables of Love.'}
            {activeTab === "pc" && 'This is available only to grantors and other interested parties.'}

          </p>
        </section>
        <section>
          {activeTab === "trailer" && <PCTestCard />}
          {activeTab === "about" && <AboutCard />}
          {unlocked && activeTab === "pc" && <PCTestCard />}
        </section>
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
      <footer className="border-t border-slate-800/60 bg-slate-900/40 mt-auto">
        <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-[radial-gradient(circle_at_30%_30%,#fff,#6ee7ff)] shadow-[0_0_18px_#6ee7ff]" />
            <span className="text-sm">
              © {new Date().getFullYear()} SEEYUF Studios
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-400 flex-wrap">
            <FooterLink href="https://youtube.com/@YOURCHANNEL" label="YouTube" />
            <FooterLink href="https://x.com/YOURHANDLE" label="X/Twitter" />
            <FooterLink href="https://instagram.com/YOURHANDLE" label="Instagram" />
            <FooterLink href="https://reddit.com/r/YOURSUB" label="Reddit" />
            <FooterLink href="https://itch.io/profile/YOURPAGE" label="Itch.io" />
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
    <div className="bg-slate-900/40 rounded-2xl shadow-[inset_0_10px_30px_rgba(0,0,0,0.35),0_6px_20px_rgba(0,0,0,0.25)]">
      <div className="aspect-video w-full overflow-hidden rounded-xl border border-slate-800 bg-black">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`}
          title="Home"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
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
      <UnityBuild />
      <div className="px-4 pb-4">
        <ControlsCard />
      </div>
    </div>
  );
}

function ControlsCard() {
  const rows: Array<{key: string; action: string}> = [
    { key: "Mouse / Touch Pad", action: "Look around" },
    { key: "F", action: "Flap" },
    { key: "M", action: "Glide" },
    { key: "N", action: "Hover" },
    { key: "C", action: "Attract seeds nearby" },
    { key: "X", action: "Launch seeds" },
  ]
  return (
    <div className="mt-4 rounded-xl border border-emerald-800/50 bg-emerald-900/20">
      <div className="p-4">
        <h3 className="text-emerald-200 font-semibold mb-2">Keyboard & Mouse Controls</h3>
        <ul className="grid grid-cols-1 gap-x-6 gap-y-2 text-sm">
          {rows.map(({ key, action }) => (
            <li key={key} className="flex items-center justify-between gap-3">
              <span className="text-emerald-200/90 font-medium">{key}</span>
              <span className="text-emerald-100/80">{action}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
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