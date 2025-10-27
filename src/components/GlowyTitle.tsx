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
                WebkitTextStroke: "0.4px rgba(255,226,150,0.6)",
                textShadow: "0 0 2px rgba(255,245,170,0.9), 0 0 6px rgba(255,235,140,0.85)",
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