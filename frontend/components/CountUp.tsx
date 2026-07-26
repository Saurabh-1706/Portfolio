"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
}

export default function CountUp({ end, duration = 1000, suffix = "" }: CountUpProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated.current) {
            animated.current = true;
            
            if (prefersReducedMotion) {
              setCount(end);
              observer.unobserve(element);
              return;
            }

            let startTimestamp: number | null = null;
            
            const step = (timestamp: number) => {
              if (!startTimestamp) startTimestamp = timestamp;
              const progress = Math.min((timestamp - startTimestamp) / duration, 1);
              
              // easeOutQuart easing function
              const easeOut = 1 - Math.pow(1 - progress, 4);
              
              setCount(Math.floor(easeOut * end));
              
              if (progress < 1) {
                window.requestAnimationFrame(step);
              } else {
                setCount(end); // Ensure we end exactly on the target number
              }
            };
            
            window.requestAnimationFrame(step);
            observer.unobserve(element);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [end, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
}
