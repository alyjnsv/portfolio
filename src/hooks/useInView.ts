"use client";

import { useEffect, useRef, useState } from "react";

interface UseInViewReturn {
  ref: React.RefObject<Element | null>;
  inView: boolean;
}

export function useInView(options?: IntersectionObserverInit): UseInViewReturn {
  const ref = useRef<Element | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // trigger once
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px", ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return { ref, inView };
}
