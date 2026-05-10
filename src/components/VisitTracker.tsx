"use client";

import { useEffect } from "react";

export function VisitTracker() {
  useEffect(() => {
    const STORAGE_KEY = "portfolio-visited";
    if (typeof window === "undefined") return;
    if (localStorage.getItem(STORAGE_KEY)) return;

    // Mark immediately so parallel renders don't double-send
    localStorage.setItem(STORAGE_KEY, "1");

    fetch("/api/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        language: navigator.language,
      }),
    }).catch(() => {
      // Silently swallow — never break the page
    });
  }, []);

  return null;
}
