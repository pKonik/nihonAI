export function BackgroundDetails() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        fill="none"
        preserveAspectRatio="none"
        role="presentation"
        viewBox="0 0 1600 1000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            height="28"
            id="nihonai-background-dots"
            patternUnits="userSpaceOnUse"
            width="28"
          >
            <circle cx="2" cy="2" fill="#0B2029" fillOpacity="0.1" r="1.6" />
          </pattern>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="nihonai-background-line"
            x1="80"
            x2="1520"
            y1="760"
            y2="220"
          >
            <stop stopColor="#ED6B63" stopOpacity="0" />
            <stop offset="0.48" stopColor="#ED6B63" stopOpacity="0.18" />
            <stop offset="1" stopColor="#ED6B63" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="nihonai-dots-mask">
            <stop offset="0" stopColor="white" />
            <stop offset="1" stopColor="black" />
          </radialGradient>
          <mask id="nihonai-background-dot-fade">
            <rect
              fill="url(#nihonai-dots-mask)"
              height="420"
              width="420"
            />
          </mask>
          <g
            fill="#ED6B63"
            fillOpacity="0.24"
            id="nihonai-sakura-flower"
          >
            <ellipse cy="-8" rx="3.8" ry="8" />
            <ellipse cy="-8" rx="3.8" ry="8" transform="rotate(72)" />
            <ellipse cy="-8" rx="3.8" ry="8" transform="rotate(144)" />
            <ellipse cy="-8" rx="3.8" ry="8" transform="rotate(216)" />
            <ellipse cy="-8" rx="3.8" ry="8" transform="rotate(288)" />
            <circle fillOpacity="0.5" r="2.5" />
          </g>
        </defs>

        <rect
          fill="url(#nihonai-background-dots)"
          height="420"
          mask="url(#nihonai-background-dot-fade)"
          width="420"
          x="-45"
          y="40"
        />

        <g className="hidden sm:block">
          <path
            d="M-86 744C12 714 69 656 106 583C143 509 210 468 297 442C348 426 393 405 458 365"
            stroke="#0B2029"
            strokeLinecap="round"
            strokeOpacity="0.14"
            strokeWidth="7"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M69 645C95 577 109 501 94 430M131 546C173 498 190 439 205 367M203 480C262 483 312 458 356 415M290 444C318 391 360 346 423 313M352 410C398 427 443 421 494 390"
            stroke="#0B2029"
            strokeLinecap="round"
            strokeOpacity="0.12"
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M94 430C65 397 50 363 51 324M205 367C182 331 178 296 193 258M356 415C387 379 399 348 395 315M423 313C450 289 475 276 510 272M494 390C524 375 549 351 566 322"
            stroke="#0B2029"
            strokeLinecap="round"
            strokeOpacity="0.085"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />

          <circle
            cx="189"
            cy="303"
            fill="#ED6B63"
            fillOpacity="0.035"
            r="92"
          />
          <circle
            cx="421"
            cy="345"
            fill="#ED6B63"
            fillOpacity="0.028"
            r="112"
          />

          <use
            href="#nihonai-sakura-flower"
            transform="translate(51 322) scale(1.05)"
          />
          <use
            href="#nihonai-sakura-flower"
            transform="translate(94 429) scale(0.78)"
          />
          <use
            href="#nihonai-sakura-flower"
            transform="translate(154 468) scale(0.65)"
          />
          <use
            href="#nihonai-sakura-flower"
            transform="translate(193 257) scale(1.15)"
          />
          <use
            href="#nihonai-sakura-flower"
            transform="translate(205 367) scale(0.82)"
          />
          <use
            href="#nihonai-sakura-flower"
            transform="translate(274 456) scale(0.72)"
          />
          <use
            href="#nihonai-sakura-flower"
            transform="translate(356 414) scale(0.95)"
          />
          <use
            href="#nihonai-sakura-flower"
            transform="translate(395 314) scale(0.72)"
          />
          <use
            href="#nihonai-sakura-flower"
            transform="translate(423 312) scale(1.2)"
          />
          <use
            href="#nihonai-sakura-flower"
            transform="translate(494 389) scale(0.86)"
          />
          <use
            href="#nihonai-sakura-flower"
            transform="translate(510 271) scale(0.68)"
          />
          <use
            href="#nihonai-sakura-flower"
            transform="translate(566 321) scale(1.02)"
          />

          <ellipse
            cx="333"
            cy="305"
            fill="#ED6B63"
            fillOpacity="0.2"
            rx="3"
            ry="8"
            transform="rotate(32 333 305)"
          />
          <ellipse
            cx="469"
            cy="460"
            fill="#ED6B63"
            fillOpacity="0.18"
            rx="2.6"
            ry="7"
            transform="rotate(-24 469 460)"
          />
          <ellipse
            cx="263"
            cy="383"
            fill="#ED6B63"
            fillOpacity="0.16"
            rx="2.4"
            ry="6"
            transform="rotate(18 263 383)"
          />
        </g>

        <path
          d="M-80 830C330 650 520 880 830 660C1080 482 1210 245 1680 300"
          stroke="url(#nihonai-background-line)"
          strokeDasharray="4 14"
          strokeLinecap="round"
          strokeWidth="3"
        />

        <g>
          <circle
            cx="472"
            cy="818"
            fill="#ED6B63"
            fillOpacity="0.07"
            r="58"
          />
          <path
            d="M15 1000C126 942 202 921 285 932L472 754L680 954C758 932 836 943 934 1000H15Z"
            fill="#0B2029"
            fillOpacity="0.025"
          />
          <path
            d="M15 1000C126 942 202 921 285 932L472 754L680 954C758 932 836 943 934 1000"
            stroke="#0B2029"
            strokeLinecap="round"
            strokeOpacity="0.11"
            strokeWidth="2.5"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M413 810L438 820L472 754L510 824L535 814"
            stroke="#ED6B63"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity="0.2"
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M80 1000C179 961 250 963 336 1000M603 1000C699 967 788 969 876 1000"
            stroke="#0B2029"
            strokeLinecap="round"
            strokeOpacity="0.055"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </g>

        <g transform="translate(0 480)">
          <path
            d="M1640 62C1554 68 1524 102 1473 132C1427 159 1384 164 1325 198"
            stroke="#0B2029"
            strokeLinecap="round"
            strokeOpacity="0.13"
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M1527 101C1512 76 1495 61 1469 50M1445 147C1428 119 1412 105 1388 96"
            stroke="#0B2029"
            strokeLinecap="round"
            strokeOpacity="0.1"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />

          <g fill="#ED6B63" fillOpacity="0.25" transform="translate(1471 51)">
            <ellipse cy="-7" rx="3.4" ry="7" />
            <ellipse cy="-7" rx="3.4" ry="7" transform="rotate(72)" />
            <ellipse cy="-7" rx="3.4" ry="7" transform="rotate(144)" />
            <ellipse cy="-7" rx="3.4" ry="7" transform="rotate(216)" />
            <ellipse cy="-7" rx="3.4" ry="7" transform="rotate(288)" />
            <circle fillOpacity="0.45" r="2.2" />
          </g>
          <g
            fill="#ED6B63"
            fillOpacity="0.22"
            transform="translate(1388 96) scale(0.82)"
          >
            <ellipse cy="-7" rx="3.4" ry="7" />
            <ellipse cy="-7" rx="3.4" ry="7" transform="rotate(72)" />
            <ellipse cy="-7" rx="3.4" ry="7" transform="rotate(144)" />
            <ellipse cy="-7" rx="3.4" ry="7" transform="rotate(216)" />
            <ellipse cy="-7" rx="3.4" ry="7" transform="rotate(288)" />
            <circle fillOpacity="0.45" r="2.2" />
          </g>
          <g
            fill="#ED6B63"
            fillOpacity="0.28"
            transform="translate(1444 148) scale(1.08)"
          >
            <ellipse cy="-7" rx="3.4" ry="7" />
            <ellipse cy="-7" rx="3.4" ry="7" transform="rotate(72)" />
            <ellipse cy="-7" rx="3.4" ry="7" transform="rotate(144)" />
            <ellipse cy="-7" rx="3.4" ry="7" transform="rotate(216)" />
            <ellipse cy="-7" rx="3.4" ry="7" transform="rotate(288)" />
            <circle fillOpacity="0.45" r="2.2" />
          </g>

          <ellipse
            cx="1352"
            cy="221"
            fill="#ED6B63"
            fillOpacity="0.22"
            rx="3"
            ry="7"
            transform="rotate(28 1352 221)"
          />
          <ellipse
            cx="1496"
            cy="191"
            fill="#ED6B63"
            fillOpacity="0.18"
            rx="2.5"
            ry="6"
            transform="rotate(-32 1496 191)"
          />
        </g>

        <circle
          cx="1510"
          cy="870"
          r="238"
          stroke="#0B2029"
          strokeOpacity="0.055"
          strokeWidth="2"
        />
        <circle
          cx="1510"
          cy="870"
          r="184"
          stroke="#ED6B63"
          strokeOpacity="0.11"
          strokeWidth="28"
        />

        <path
          d="M133 730l4.7 10.3L148 745l-10.3 4.7L133 760l-4.7-10.3L118 745l10.3-4.7L133 730Z"
          fill="#ED6B63"
          fillOpacity="0.5"
        />
        <path
          d="M1438 170l3.1 6.9L1448 180l-6.9 3.1L1438 190l-3.1-6.9L1428 180l6.9-3.1L1438 170Z"
          fill="#0B2029"
          fillOpacity="0.35"
        />
      </svg>

      <span className="absolute -bottom-16 left-[3%] hidden font-[var(--font-noto-sans-jp)] text-[19rem] font-black leading-none text-sumi-950/[0.025] select-none sm:block">
        学
      </span>
    </div>
  );
}
