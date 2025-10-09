"use client";

import React from "react";

/**
 * Static, no-animation, warm-yellow glow title.
 * Tuned to match the provided reference.
 * Uses your Garamondt SDF look via subtle stroke + stacked glows.
 */
export default function GlowyTitle({
    text = "Hearts & Spirit",
    className = "",
}: { text?: string; className?: string }) {
    return (
        <span
            className={`inline-block select-none ${className}`}
            style={{
                fontFamily: "Garamondt, Garamond, Georgia, serif",
                fontWeight: 400,
                letterSpacing: "0.02em",
                color: "#FFF385", // warm core
                WebkitTextStroke: "0.4px rgba(255,226,150,0.6)", // crisp SDF-like edge

                // Keep only a subtle INNER halo via text-shadow (small radius = no box)
                textShadow: "0 0 2px rgba(255,245,170,0.9), 0 0 6px rgba(255,235,140,0.85)",

                // Outer bloom using drop-shadows (no rectangle even over backdrop-blur)
                filter: [
                    "drop-shadow(0 0 10px rgba(255,216,110,0.75))",
                    "drop-shadow(0 0 20px rgba(255,200,90,0.60))",
                    "drop-shadow(0 0 36px rgba(255,190,75,0.50))",
                    "drop-shadow(0 0 60px rgba(255,180,60,0.38))",
                ].join(" "),
                // safety flags
                background: "transparent",
                mixBlendMode: "normal",
                WebkitFontSmoothing: "antialiased",
                textRendering: "optimizeLegibility",
                paintOrder: "stroke fill",
            }}
        >
            {text}
        </span>
    );
}