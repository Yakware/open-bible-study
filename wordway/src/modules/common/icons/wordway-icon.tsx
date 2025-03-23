import { CommonIconProps } from "./common-icon-props";

export function WordwayIcon({ size = 50 }: CommonIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width={size}
      height={size}
    >
      <defs>
        <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>

      <circle cx="100" cy="100" r="90" fill="url(#bg-gradient)" />

      <path
        d="M40,100 C60,70 80,130 100,100 S140,70 160,100"
        stroke="white"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
      />

      <path
        d="M50,120 C70,100 90,140 110,120"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />

      <path
        d="M90,80 C110,60 130,100 150,80"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />

      <circle cx="40" cy="100" r="6" fill="white" />
      <circle cx="160" cy="100" r="6" fill="white" />

      <circle cx="70" cy="90" r="4" fill="rgba(255,255,255,0.8)" />
      <circle cx="130" cy="90" r="4" fill="rgba(255,255,255,0.8)" />
      <circle cx="100" cy="130" r="4" fill="rgba(255,255,255,0.8)" />
    </svg>
  );
}
