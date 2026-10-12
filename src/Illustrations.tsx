export function Spark({
  className = "",
  color = "currentColor",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 50 50"
      fill={color}
      aria-hidden="true"
    >
      <path d="M25 0c1 18 7 23 25 25-18 2-24 7-25 25C23 32 18 27 0 25c18-2 23-7 25-25Z" />
    </svg>
  );
}
export function Squirrel({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="250"
      height="260"
      viewBox="0 0 250 260"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M114 225C45 246 8 204 13 146c2-31 23-74 5-111 41 5 86 37 91 78 4 31-28 55-45 32-16-22 11-48 26-31"
        fill="#d7a572"
      />
      <path d="M59 207c-45-20-37-65-25-88 14-30 12-49 3-64" strokeWidth="3" />
      <path
        d="M90 220c-23-36-5-73 18-91l-3-29c-25-26-13-54 1-60l7 19 13-21c17 3 30 22 30 34 22 2 39 17 37 30-9 5-24 9-43 9-4 14-6 25-1 36 8 21 14 40 8 62l18 14c10 8 4 17-9 17h-55c-23 1-28-7-21-20Z"
        fill="#f5eddc"
      />
      <path d="m112 77-5-17m23 24c5-7 13-7 18-1m-17 20c8 8 20 5 24-1" />
      <ellipse
        cx="145"
        cy="85"
        rx="3"
        ry="6"
        fill="currentColor"
        stroke="none"
      />
      <path d="M188 90c-8-4-12 1-9 6" fill="currentColor" />
      <path d="m159 135 64-4-7 72-49 3Z" fill="#c9d5b2" />
      <path d="m154 132 71-4 3 12-74 5Z" fill="#f5eddc" />
      <path
        d="M125 142c15 6 31 8 43 3 9-4 13 7 4 13-21 15-43 13-57 0m26 43 17 7"
        fill="#f5eddc"
      />
      <path
        d="M180 114c-5-10 5-13 0-23m22 23c-5-10 5-13 0-23"
        strokeWidth="2"
      />
    </svg>
  );
}
export function HeroArt() {
  return (
    <svg
      className="hero-art"
      viewBox="0 0 620 540"
      role="img"
      aria-label="A cheerful coffee cup and Chaus squirrel sharing a coffee break"
    >
      <defs>
        <pattern
          id="checks"
          width="48"
          height="48"
          patternUnits="userSpaceOnUse"
        >
          <rect width="48" height="48" fill="#eee2ca" />
          <path d="M0 0h24v24H0zM24 24h24v24H24z" fill="#c7cfa8" />
        </pattern>
      </defs>
      <path
        d="M93 442c-30-161 10-324 181-334 152-9 233 142 214 317Z"
        fill="#e9dfcb"
      />
      <g fill="none" stroke="#4c3123" strokeWidth="2.5" strokeLinecap="round">
        <path d="M500 163c21-13 40-7 43 11 4 19-14 33-28 27m25-91-10 15m36 4-15 8M71 278l-22 13m24 1-14 23" />
        <path d="M464 62q40-9 48 21m-8-1 10 3-1-11" />
      </g>
      <g transform="translate(365 15) rotate(12)">
        <path
          d="m0 32 13-5 1-17 16 7 12-12 8 17 18-2-2 18 15 11-14 13 4 17-19 1-8 16-16-9-14 11-8-16-19-1 5-18-15-11Z"
          fill="#cbd392"
        />
        <text
          x="33"
          y="43"
          textAnchor="middle"
          fill="#4c3123"
          fontFamily="sans-serif"
          fontWeight="700"
          fontSize="12"
        >
          100%
        </text>
        <text
          x="33"
          y="60"
          textAnchor="middle"
          fill="#4c3123"
          fontFamily="sans-serif"
          fontWeight="700"
          fontSize="10"
        >
          STUDENT RUN
        </text>
      </g>
      <path
        d="m48 421 468-29 63 83-467 41Z"
        fill="url(#checks)"
        stroke="#4c3123"
        strokeWidth="2.5"
      />
      <path d="m112 516 467-41v13l-467 40Z" fill="#4c3123" />
      <g
        className="coffee-pal"
        stroke="#4c3123"
        strokeWidth="5"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <path
          d="m285 185 32-5c81-8 77 105-7 115l-18-24c55-3 64-64 16-56l-21 4Z"
          fill="#e8b5ad"
        />
        <path d="m119 183 179-13 12 131c8 69-152 93-167 29Z" fill="#f8f0dd" />
        <ellipse
          cx="207"
          cy="179"
          rx="91"
          ry="29"
          transform="rotate(-4 207 179)"
          fill="#e8b5ad"
        />
        <ellipse
          cx="206"
          cy="181"
          rx="74"
          ry="19"
          transform="rotate(-4 206 181)"
          fill="#4c3123"
          strokeWidth="2"
        />
        <path
          d="M179 135c-31-30 12-45-1-70m43 65c-25-34 23-44 4-79m39 75c-13-25 17-36 7-53"
          fill="none"
          strokeWidth="3.5"
        />
        <ellipse
          cx="179"
          cy="253"
          rx="6"
          ry="14"
          fill="#4c3123"
          stroke="none"
        />
        <ellipse
          cx="238"
          cy="249"
          rx="6"
          ry="14"
          fill="#4c3123"
          stroke="none"
        />
        <path d="M193 276q22 29 38-2" fill="none" strokeWidth="4" />
        <path d="M207 289v-9" strokeWidth="3" />
        <path
          d="M141 273c-28-2-35-34-46-38m-6-7 10 4m-6-14 4 12m-16-4 12 9"
          fill="none"
        />
        <path d="M301 286q25 28 40 13" fill="none" />
        <path d="m179 358-13 39-33 20m113-61 7 35 31 15" fill="none" />
        <path d="M160 395c-31-12-52 21-32 27 13 4 41-7 47-16Z" fill="#4c3123" />
        <path d="M254 390c31-17 56 12 43 20-15 7-43-2-48-11Z" fill="#4c3123" />
      </g>
      <g transform="translate(355 205) scale(.77)" color="#4c3123">
        <Squirrel />
      </g>
      <g transform="translate(483 302) rotate(9)" fill="#4c3123">
        <path d="M24 0c1 18 7 23 25 25-18 2-24 7-25 25C22 32 17 27-1 25 17 23 23 18 24 0Z" />
      </g>
      <g transform="translate(53 132) rotate(-12)">
        <path
          d="m0 22 11-5L17 0l9 14 16 4-10 12 1 17-15-8-16 4 4-15Z"
          fill="#4c3123"
        />
      </g>
      <g
        transform="translate(257 435) rotate(-6)"
        stroke="#4c3123"
        strokeWidth="2"
      >
        <ellipse cx="40" cy="15" rx="49" ry="18" fill="#f6edda" />
        <path
          d="M4 10c10-37 49-44 73-12l5 10c-28 13-60 13-78 2Z"
          fill="#d7a572"
        />
        <path
          d="M23-13c-3 13 2 23 5 29m16-36c-4 13-1 23 2 36m14-27c-3 9-2 13 1 23"
          fill="none"
        />
      </g>
      <text
        x="394"
        y="525"
        transform="rotate(-4 394 525)"
        fill="#4c3123"
        fontFamily="'Comic Sans MS', cursive"
        fontSize="18"
      >
        your daily dose of chaüs ♡
      </text>
    </svg>
  );
}
export function DrinkArt({
  type = "cup",
  className = "",
}: {
  type?: string;
  className?: string;
}) {
  if (type === "pastry")
    return (
      <svg
        className={`drink-art ${className}`}
        viewBox="0 0 260 240"
        aria-hidden="true"
        stroke="#4c3123"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <ellipse cx="130" cy="182" rx="92" ry="25" fill="#f7f2e7" />
        <ellipse cx="130" cy="176" rx="77" ry="15" strokeWidth="1.5" />
        <g transform="rotate(-8 130 120)">
          <path
            d="M74 125c-38-9-55 30-41 39 18 13 44-6 57-21m96-18c38-9 55 30 41 39-18 13-44-6-57-21"
            fill="#e1b480"
          />
          <path
            d="M62 135c11-57 124-65 138 0-36 53-114 55-138 0Z"
            fill="#e1b480"
          />
          <path d="M100 97c-12 25-7 61 1 75m48-79c12 26 13 60 1 79M73 120q-1 24 9 38m101-36q1 26-12 40" />
          <path d="M114 124v8m28-8v8m-26 10q12 12 23 0" strokeWidth="2.5" />
        </g>
        <path
          d="m213 53 3 13 13 3-13 3-3 13-3-13-13-3 13-3Z"
          fill="#4c3123"
          stroke="none"
        />
        <path d="m57 59 4 9m10-11-2 11m-22 4 11 3" strokeWidth="2" />
      </svg>
    );
  return (
    <svg
      className={`drink-art ${className}`}
      viewBox="0 0 260 240"
      aria-hidden="true"
      stroke="#4c3123"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      <g transform="rotate(-8 130 120)">
        <path d="m81 71 106 0-13 128c-15 10-59 10-78 0Z" fill="#f8f0dd" />
        <path d="m78 70 111 0 5 13H73Z" fill="#f8f0dd" />
        <path
          d="m102 121 72 0-5 52-61 0Z"
          fill={
            type === "flower"
              ? "#c8baD5"
              : type === "star"
                ? "#dea6ab"
                : "#d9ad73"
          }
        />
        <path d="M166 54v-30l21-5" strokeWidth="6" />
        <path d="M119 150v6m24-6v6m-22 9q10 10 19-2" />
        <path d="M107 93h17m12 0h19" strokeWidth="2" />
        <path d="m99 209-20 10m88-10 22 8" />
      </g>
      {type === "bee" ? (
        <g transform="translate(35 39) rotate(-15)">
          <ellipse cx="8" cy="-8" rx="9" ry="14" fill="#f6edda" />
          <ellipse cx="25" cy="-8" rx="9" ry="14" fill="#f6edda" />
          <ellipse cx="15" cy="11" rx="24" ry="16" fill="#d7b859" />
          <path d="M8-3v29m12-29v28" strokeWidth="5" />
          <circle cx="32" cy="7" r="2" fill="#4c3123" />
          <path d="m-9 12-8 3" />
        </g>
      ) : type === "flower" ? (
        <g transform="translate(50 65)">
          <path d="M0 34v63m0-37c-29-9-30-27-9-23l9 13m1 21c25-24 35-7 7 6" />
          <path
            d="M0-20c17-30 41-6 23 9 37 0 27 34 9 30 24 26-7 41-19 18-1 34-37 30-31 8-31 17-49-13-22-25-36-6-19-39 2-31-10-23 18-39 25-9Z"
            fill="#c8bad5"
          />
          <circle r="13" fill="#d7b859" />
          <path d="M-5 0v3m9-3v3m-8 5q4 4 8 0" strokeWidth="2" />
        </g>
      ) : (
        <g transform="translate(48 60)">
          <path
            d="m0-25 8 17 20 3-14 14 4 19L0 18l-18 10 4-19-14-14 20-3Z"
            fill="#d7b859"
          />
          <path d="m-5 1 1 3m9-3 1 3m-9 5q6 5 11-1" strokeWidth="2" />
        </g>
      )}
      <path
        d="m214 103 3 11 11 3-11 3-3 11-3-11-11-3 11-3Z"
        fill="#4c3123"
        stroke="none"
      />
      <path d="m45 172-8 9m18-5-1 14m-15-27-12 4" strokeWidth="2" />
    </svg>
  );
}
