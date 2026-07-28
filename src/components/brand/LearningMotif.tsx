type LearningMotifProps = {
  labels: {
    collect: string;
    read: string;
    remember: string;
  };
};

export function LearningMotif({ labels }: LearningMotifProps) {
  const steps = [
    { japanese: "読む", label: labels.read, x: 18, y: 26 },
    { japanese: "集める", label: labels.collect, x: 156, y: 108 },
    { japanese: "覚える", label: labels.remember, x: 294, y: 34 },
  ] as const;

  return (
    <svg
      aria-hidden="true"
      className="h-auto w-full"
      fill="none"
      role="presentation"
      viewBox="0 0 420 230"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="352" cy="178" fill="#FFE6E3" r="48" />
      <circle cx="61" cy="174" fill="#F7F8FB" r="31" />
      <path
        d="M89 75C129 76 129 150 176 153C226 157 252 65 307 78"
        stroke="#ED6B63"
        strokeDasharray="6 8"
        strokeLinecap="round"
        strokeWidth="3"
      />

      {steps.map((step, index) => (
        <g key={step.japanese} transform={`translate(${step.x} ${step.y})`}>
          <rect
            fill="white"
            height="96"
            rx="20"
            stroke={index === 1 ? "#FFC9C4" : "#E7EAF0"}
            width="108"
          />
          <circle
            cx="86"
            cy="20"
            fill={index === 1 ? "#ED6B63" : "#0B2029"}
            r="5"
          />
          <text
            fill="#0B2029"
            fontFamily="var(--font-noto-sans-jp), sans-serif"
            fontSize="23"
            fontWeight="700"
            textAnchor="middle"
            x="54"
            y="45"
          >
            {step.japanese}
          </text>
          <text
            fill="#667583"
            fontFamily="var(--font-inter), sans-serif"
            fontSize="11"
            fontWeight="600"
            letterSpacing="1.2"
            textAnchor="middle"
            x="54"
            y="70"
          >
            {step.label.toUpperCase()}
          </text>
        </g>
      ))}

      <path
        d="M386 18l3.8 8.2L398 30l-8.2 3.8L386 42l-3.8-8.2L374 30l8.2-3.8L386 18Z"
        fill="#ED6B63"
      />
      <path
        d="M42 188l2.5 5.5L50 196l-5.5 2.5L42 204l-2.5-5.5L34 196l5.5-2.5L42 188Z"
        fill="#0B2029"
      />
    </svg>
  );
}
