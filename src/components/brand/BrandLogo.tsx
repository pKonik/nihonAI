type BrandLogoProps = {
  compact?: boolean;
  inverted?: boolean;
};

export function BrandLogo({
  compact = false,
  inverted = false,
}: BrandLogoProps) {
  return (
    <span className="flex items-center gap-3">
      <svg
        aria-hidden="true"
        className={compact ? "size-9 shrink-0" : "size-11 shrink-0"}
        viewBox="0 0 48 48"
      >
        <rect
          className="fill-shu-600"
          height="44"
          rx="14"
          width="44"
          x="2"
          y="2"
        />
        <path
          d="M14 12.5h20v23H14zM14 24h20"
          fill="none"
          stroke="#fffdf8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        />
      </svg>

      <span>
        <span
          className={`block font-sans font-bold tracking-[-0.04em] ${
            compact ? "text-xl" : "text-2xl"
          } ${inverted ? "text-washi-50" : "text-sumi-950"}`}
        >
          Nihon<span className="text-shu-500">AI</span>
        </span>
      </span>
    </span>
  );
}
