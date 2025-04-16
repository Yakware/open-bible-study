import { CommonIconProps } from "./common-icon-props";

export function BookIcon({ size = 50 }: CommonIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-200 -150 400 300"
      width={size}
      height={size}
    >
      <rect
        x="-150"
        y="-120"
        width="300"
        height="240"
        rx="5"
        ry="5"
        fill="#f8fafc"
        stroke="#94a3b8"
        strokeWidth="2"
      />
      <rect
        x="-145"
        y="-115"
        width="290"
        height="230"
        rx="3"
        ry="3"
        fill="#ffffff"
        stroke="#cbd5e1"
        strokeWidth="1"
      />

      <rect x="-150" y="-120" width="20" height="240" fill="#94a3b8" />
      <rect x="-130" y="-120" width="5" height="240" fill="#64748b" />

      <g>
        <path
          d="M-125,-100 L125,-100 L125,100 L-125,100 Z"
          fill="#ffffff"
          stroke="#e2e8f0"
          strokeWidth="1"
        />
        <line
          x1="-100"
          y1="-70"
          x2="100"
          y2="-70"
          stroke="#cbd5e1"
          strokeWidth="1"
        />
        <line
          x1="-100"
          y1="-50"
          x2="100"
          y2="-50"
          stroke="#cbd5e1"
          strokeWidth="1"
        />
        <line
          x1="-100"
          y1="-30"
          x2="100"
          y2="-30"
          stroke="#cbd5e1"
          strokeWidth="1"
        />
        <line
          x1="-100"
          y1="-10"
          x2="100"
          y2="-10"
          stroke="#cbd5e1"
          strokeWidth="1"
        />
        <line
          x1="-100"
          y1="10"
          x2="100"
          y2="10"
          stroke="#cbd5e1"
          strokeWidth="1"
        />
        <line
          x1="-100"
          y1="30"
          x2="100"
          y2="30"
          stroke="#cbd5e1"
          strokeWidth="1"
        />
        <line
          x1="-100"
          y1="50"
          x2="100"
          y2="50"
          stroke="#cbd5e1"
          strokeWidth="1"
        />
        <line
          x1="-100"
          y1="70"
          x2="100"
          y2="70"
          stroke="#cbd5e1"
          strokeWidth="1"
        />
      </g>

      <path d="M70,-120 L70,-50 L90,-60 L110,-50 L110,-120 Z" fill="#ef4444" />
    </svg>
  );
}
