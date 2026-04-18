export default function BookStack({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 440"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* shelf */}
      <line
        x1="20"
        y1="420"
        x2="340"
        y2="420"
        stroke="#14192a"
        strokeWidth="1.5"
      />

      {/* horizontal stack on the right — books lying flat */}
      <g>
        <rect x="200" y="380" width="130" height="18" fill="#c1563a" />
        <rect x="200" y="380" width="130" height="2" fill="#a1462f" />
        <rect x="205" y="395" width="120" height="2" fill="#a1462f" />

        <rect x="190" y="362" width="140" height="18" fill="#e8d5b1" />
        <rect x="190" y="362" width="140" height="2" fill="#c9b78f" />
        <rect x="195" y="377" width="130" height="2" fill="#c9b78f" />

        <rect x="195" y="344" width="135" height="18" fill="#6b7a5c" />
        <rect x="195" y="344" width="135" height="2" fill="#5a6a4d" />
        <rect x="200" y="359" width="125" height="2" fill="#5a6a4d" />
      </g>

      {/* vertical book spines on the left */}
      <g>
        <rect x="30" y="260" width="28" height="160" fill="#c1563a" />
        <rect x="30" y="275" width="28" height="2" fill="#a1462f" />
        <text
          x="44"
          y="350"
          textAnchor="middle"
          fontSize="9"
          fontWeight="600"
          fill="#faf8f4"
          transform="rotate(-90 44 350)"
          fontFamily="Pretendard, serif"
          letterSpacing="2"
        >
          READING
        </text>

        <rect x="58" y="240" width="24" height="180" fill="#1a2440" />
        <text
          x="70"
          y="340"
          textAnchor="middle"
          fontSize="9"
          fontWeight="600"
          fill="#faf8f4"
          transform="rotate(-90 70 340)"
          fontFamily="Pretendard, serif"
          letterSpacing="2"
        >
          LISTENING
        </text>

        <rect x="82" y="255" width="30" height="165" fill="#c9994a" />
        <rect x="82" y="270" width="30" height="2" fill="#a77e3a" />
        <text
          x="97"
          y="352"
          textAnchor="middle"
          fontSize="9"
          fontWeight="600"
          fill="#14192a"
          transform="rotate(-90 97 352)"
          fontFamily="Pretendard, serif"
          letterSpacing="2"
        >
          PHONICS
        </text>

        <rect x="112" y="245" width="22" height="175" fill="#6b7a5c" />
        <text
          x="123"
          y="345"
          textAnchor="middle"
          fontSize="9"
          fontWeight="600"
          fill="#faf8f4"
          transform="rotate(-90 123 345)"
          fontFamily="Pretendard, serif"
          letterSpacing="2"
        >
          SPEAKING
        </text>

        <rect x="134" y="270" width="26" height="150" fill="#e8d5b1" />
        <rect x="134" y="285" width="26" height="2" fill="#c9b78f" />
      </g>

      {/* leaning book at far right */}
      <g transform="rotate(-12 300 320)">
        <rect x="280" y="240" width="28" height="170" fill="#8a3a2a" />
        <rect x="280" y="255" width="28" height="2" fill="#6e2a1e" />
        <text
          x="294"
          y="330"
          textAnchor="middle"
          fontSize="9"
          fontWeight="600"
          fill="#faf8f4"
          transform="rotate(-90 294 330)"
          fontFamily="Pretendard, serif"
          letterSpacing="2"
        >
          WRITING
        </text>
      </g>

      {/* floating leaves/shapes — very subtle */}
      <circle cx="60" cy="80" r="3" fill="#c1563a" opacity="0.6" />
      <circle cx="290" cy="60" r="2" fill="#6b7a5c" opacity="0.8" />
      <circle cx="320" cy="140" r="4" fill="#c9994a" opacity="0.4" />
    </svg>
  );
}
