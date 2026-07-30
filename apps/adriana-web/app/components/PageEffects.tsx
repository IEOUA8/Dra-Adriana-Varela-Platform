"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function PageEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const main = document.querySelector("main");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!main || reduceMotion) return;

    const animation = main.animate(
      [
        {
          opacity: 0.58,
          transform: "translateY(10px)",
        },
        {
          opacity: 1,
          transform: "translateY(0)",
        },
      ],
      {
        duration: 440,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    );

    return () => animation.cancel();
  }, [pathname]);

  return null;
}
