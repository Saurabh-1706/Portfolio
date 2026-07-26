"use client";

import { useEffect } from "react";

export default function FadeUpObserver() {
  useEffect(() => {
    const createObserver = (threshold: number) => {
      return new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      }, { root: null, rootMargin: "0px", threshold });
    };

    const observerHigh = createObserver(0.8);
    const observerLow = createObserver(0.2);

    const timeoutId = setTimeout(() => {
      const elements = document.querySelectorAll(".fade-up, .hero-fade-up");
      const windowHeight = window.innerHeight;
      
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.height > windowHeight * 0.8) {
          observerLow.observe(el);
        } else {
          observerHigh.observe(el);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observerHigh.disconnect();
      observerLow.disconnect();
    };
  }, []);

  return null;
}
