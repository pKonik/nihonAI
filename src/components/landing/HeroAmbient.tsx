"use client";

import type { CSSProperties, PointerEvent, ReactNode } from "react";
import { useRef } from "react";

type HeroAmbientProps = {
  children: ReactNode;
  className: string;
};

type AmbientStyle = CSSProperties & {
  "--ambient-x": string;
  "--ambient-y": string;
};

const RESTING_AMBIENT_STYLE: AmbientStyle = {
  "--ambient-x": "0px",
  "--ambient-y": "0px",
};

export function HeroAmbient({
  children,
  className,
}: HeroAmbientProps) {
  const sectionRef = useRef<HTMLElement>(null);

  function updateParallax(event: PointerEvent<HTMLElement>) {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const bounds = section.getBoundingClientRect();
    const relativeX =
      (event.clientX - bounds.left) / bounds.width - 0.5;
    const relativeY =
      (event.clientY - bounds.top) / bounds.height - 0.5;

    section.style.setProperty(
      "--ambient-x",
      `${(relativeX * 12).toFixed(2)}px`,
    );
    section.style.setProperty(
      "--ambient-y",
      `${(relativeY * 8).toFixed(2)}px`,
    );
  }

  function resetParallax() {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    section.style.setProperty("--ambient-x", "0px");
    section.style.setProperty("--ambient-y", "0px");
  }

  return (
    <section
      className={`hero-ambient ${className}`}
      onPointerLeave={resetParallax}
      onPointerMove={updateParallax}
      ref={sectionRef}
      style={RESTING_AMBIENT_STYLE}
    >
      <div
        aria-hidden="true"
        className="hero-ambient__halo hero-ambient__halo--left"
      />
      <div
        aria-hidden="true"
        className="hero-ambient__halo hero-ambient__halo--right"
      />

      <svg
        aria-hidden="true"
        className="hero-ambient__route"
        preserveAspectRatio="none"
        viewBox="0 0 1200 420"
      >
        <path d="M40 330 C250 270 360 395 565 315 S905 170 1160 235" />
      </svg>

      <span
        aria-hidden="true"
        className="hero-ambient__sparkle hero-ambient__sparkle--one"
      >
        ✦
      </span>
      <span
        aria-hidden="true"
        className="hero-ambient__sparkle hero-ambient__sparkle--two"
      >
        ✦
      </span>
      <span
        aria-hidden="true"
        className="hero-ambient__sparkle hero-ambient__sparkle--three"
      >
        ✦
      </span>

      {children}
    </section>
  );
}
