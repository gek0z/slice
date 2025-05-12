import React from "react";

interface SVGProps {
  className?: string;
  seed?: number; // Add seed for deterministic texture generation
}

// Base crusts
export const ThinCrustSVG: React.FC<SVGProps> = ({ className }) => (
  <svg
    viewBox="0 0 200 200"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="100" cy="100" r="95" fill="#f0e6c3" />
    <circle
      cx="100"
      cy="100"
      r="95"
      fill="none"
      stroke="#d4b978"
      strokeWidth="2"
    />
    <circle
      cx="100"
      cy="100"
      r="90"
      fill="none"
      stroke="#c49a3d"
      strokeWidth="0.5"
      strokeDasharray="2,2"
    />
    <circle
      cx="100"
      cy="100"
      r="85"
      fill="none"
      stroke="#e2c384"
      strokeWidth="1"
    />
  </svg>
);

export const ThickCrustSVG: React.FC<SVGProps> = ({ className }) => (
  <svg
    viewBox="0 0 200 200"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="100" cy="100" r="95" fill="#e6cb92" />
    <circle
      cx="100"
      cy="100"
      r="95"
      fill="none"
      stroke="#d4b978"
      strokeWidth="3"
    />
    <circle cx="100" cy="100" r="85" fill="#f0e6c3" />
    <circle
      cx="100"
      cy="100"
      r="85"
      fill="none"
      stroke="#c49a3d"
      strokeWidth="2"
    />
    <circle
      cx="100"
      cy="100"
      r="82"
      fill="none"
      stroke="#e2c384"
      strokeWidth="1"
      strokeDasharray="3,1"
    />
  </svg>
);

export const StuffedCrustSVG: React.FC<SVGProps> = ({ className }) => (
  <svg
    viewBox="0 0 200 200"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="100" cy="100" r="95" fill="#e6cb92" />
    <circle
      cx="100"
      cy="100"
      r="95"
      fill="none"
      stroke="#d4b978"
      strokeWidth="3"
    />
    <circle cx="100" cy="100" r="85" fill="#f0e6c3" />
    <circle
      cx="100"
      cy="100"
      r="85"
      fill="none"
      stroke="#c49a3d"
      strokeWidth="2"
    />

    {/* Cheese bubbles in crust */}
    {Array.from({ length: 16 }).map((_, i) => {
      const angle = (i / 16) * Math.PI * 2;
      const x = 100 + Math.cos(angle) * 90;
      const y = 100 + Math.sin(angle) * 90;
      return (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="5"
          fill="#fcf5e3"
          stroke="#f2da9c"
          strokeWidth="0.5"
        />
      );
    })}
  </svg>
);

// Sauce layers with different amounts
export const SauceLayerSVG: React.FC<{
  amount: string;
  className?: string;
}> = ({ amount, className }) => {
  // Set fixed opacity values for each sauce level
  const opacity =
    amount === "A lot"
      ? 1.0 // Increased to full opacity for intense red
      : amount === "A moderate amount"
      ? 0.9
      : amount === "A little bit"
      ? 0.8
      : 0; // "None" or any other case will have 0 opacity

  // Only render the sauce if there's an actual amount
  if (amount === "None" || !amount) {
    return (
      <svg
        viewBox="0 0 200 200"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      ></svg>
    );
  }

  // Pre-calculated fixed pattern points for consistency
  const saucePatternPoints = [
    // Inner circle points
    ...[...Array(15)].map((_, i) => {
      const angle = (i / 15) * Math.PI * 2;
      return {
        x: 100 + Math.cos(angle) * 25,
        y: 100 + Math.sin(angle) * 25,
        size: 1.2,
      };
    }),
    // Middle circle points
    ...[...Array(30)].map((_, i) => {
      const angle = (i / 30) * Math.PI * 2;
      return {
        x: 100 + Math.cos(angle) * 50,
        y: 100 + Math.sin(angle) * 50,
        size: 1.5,
      };
    }),
    // Outer circle points
    ...[...Array(40)].map((_, i) => {
      const angle = (i / 40) * Math.PI * 2;
      return {
        x: 100 + Math.cos(angle) * 75,
        y: 100 + Math.sin(angle) * 75,
        size: 1.8,
      };
    }),
    // Random scattered points for texture
    ...[...Array(35)].map((_, i) => {
      // Using a deterministic "random" approach
      const idx = i * 7; // Multiply by a prime number
      const angle = ((idx % 100) / 100) * Math.PI * 2;
      const radius = 15 + ((idx % 70) / 70) * 65;
      return {
        x: 100 + Math.cos(angle) * radius,
        y: 100 + Math.sin(angle) * radius,
        size: 0.8 + (idx % 10) / 10,
      };
    }),
  ];

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main sauce base - rich tomato color */}
      <circle cx="100" cy="100" r="83" fill="#b23121" fillOpacity={opacity} />

      {/* Darker sauce texture for depth */}
      <circle
        cx="100"
        cy="100"
        r="83"
        fill="#8b2013"
        fillOpacity={opacity * 0.3}
      />

      {/* Sauce texture patterns with fixed points */}
      <g opacity={opacity}>
        {saucePatternPoints.map((point, i) => (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r={point.size}
            fill="#8b2013"
            fillOpacity={0.35}
          />
        ))}
      </g>

      {/* Tomato chunks and oregano specks */}
      <g opacity={opacity}>
        {[...Array(20)].map((_, i) => {
          const idx = i * 13; // Deterministic "random"
          const angle = ((idx % 100) / 100) * Math.PI * 2;
          const radius = 10 + ((idx % 70) / 70) * 65;
          const x = 100 + Math.cos(angle) * radius;
          const y = 100 + Math.sin(angle) * radius;

          return (
            <circle
              key={`chunk-${i}`}
              cx={x}
              cy={y}
              r={1.5 + (idx % 5) / 5}
              fill="#d04132"
              fillOpacity={0.6}
            />
          );
        })}

        {/* Oregano specks */}
        {[...Array(15)].map((_, i) => {
          const idx = i * 17; // Different prime for variation
          const angle = ((idx % 100) / 100) * Math.PI * 2;
          const radius = 15 + ((idx % 65) / 65) * 60;
          const x = 100 + Math.cos(angle) * radius;
          const y = 100 + Math.sin(angle) * radius;

          return (
            <rect
              key={`spice-${i}`}
              x={x - 0.5}
              y={y - 0.5}
              width={1}
              height={1}
              fill="#2a3a17"
              fillOpacity={0.7}
            />
          );
        })}
      </g>
    </svg>
  );
};

// Cheese layer
export const CheeseLayerSVG: React.FC<{
  extraCheese?: boolean;
  className?: string;
}> = ({ extraCheese, className }) => {
  // Create evenly distributed circular cheese pieces like in the reference image

  if (!extraCheese) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 166 166"
        className={className}
      >
        <g>
          <circle
            cx="42.85"
            cy="35.21"
            r="14.68"
            transform="translate(-11.86 26.14) rotate(-30)"
            fill="#fbecc9"
          />
          <path
            d="M141.15,84.33c-.96,2.66-2.53,5.06-4.91,6.66-3.79,2.54-11.63,3.15-15.79,1.01-6.11-3.15-8.16-12.8-5.31-18.78,7.17-15,33.15-8.77,26.01,11.11Z"
            fill="#fbecc9"
          />
          <path
            d="M86,23.63c7.47,1.53,11.84,6.62,11.17,14.68-1.06,12.79-20.02,18.02-27.04,7.17-.03-.05-.5-.85-.53-.9-4.11-8.24.88-19.69,10.24-21.25,1.94-.32,4.24-.09,6.16.3Z"
            fill="#fbecc9"
          />
          <path
            d="M101.61,83.83c.26.28.98,1.62,1.17,2.24.58,1.83.3,5.22-.32,6.92-2.46,6.69-10.12,11.1-17.16,10.22-12.64-1.59-14.6-21.82-3.18-27,7.07-3.21,14.82-1.4,18.77,5.53.37.66.65,2.01.73,2.1Z"
            fill="#fbecc9"
          />
          <circle
            cx="106.49"
            cy="124.29"
            r="14.28"
            transform="translate(-47.88 69.89) rotate(-30)"
            fill="#fbecc9"
          />
          <path
            d="M45.18,113.73c-3.32,7.15-13.36,12.09-20.63,7.24-3.4-2.27-4.55-4.63-5.73-8.31-.27-.84-.71-1.6-.79-2.74-.32-4.83,2.07-10.16,5.9-13.11,11.05-8.51,26.94,4.67,21.25,16.92Z"
            fill="#fbecc9"
          />
          <path
            d="M123.77,29.01c3.36,1.05,7.64,3.33,9.66,6.29.23.33.12.68.19.79.06.1.75.81.93,1.31,2.01,5.73-1.56,13.81-6.59,16.99-7.54,4.77-21.12-.17-21.5-10.23-.37-9.78,7.02-18.39,17.32-15.16Z"
            fill="#fbecc9"
          />
          <circle
            cx="48.82"
            cy="75.11"
            r="14.03"
            transform="translate(-31.02 34.47) rotate(-30)"
            fill="#fbecc9"
          />
          <circle
            cx="59.06"
            cy="131.72"
            r="13.83"
            transform="translate(-57.95 47.17) rotate(-30)"
            fill="#fbecc9"
          />
        </g>
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 166 166"
      className={className}
    >
      <g>
        <path
          d="M24.65,49.82c13.32.28,16.95,18.31,7.37,26.11-.23.19-1.42.93-1.82,1.12-9.56,4.54-20.79-.55-22.37-11.58-1.45-10.12,7.78-15.85,16.81-15.66Z"
          fill="#fbecc9"
        />
        <circle
          cx="49.43"
          cy="32.13"
          r="14.68"
          transform="translate(-9.44 29.02) rotate(-30)"
          fill="#fbecc9"
        />
        <path
          d="M58.69,109.8c6.66,1.23,9.41,7.7,9.32,13.91-.25,17.18-26.74,19.86-29.36,1.85-1.54-10.59,10.86-17.46,20.04-15.77Z"
          fill="#fbecc9"
        />
        <path
          d="M92.75,6.62c.67.13.35,0,.93,0,5.47.02,11.06,3.29,13.07,8.54,3.09,8.09-3.48,20.79-12.89,20.51-.18,0-.22-.32-.38-.32-5.16.05-8.52-.69-11.74-5-4.49-6.01-3.14-14.09,1.97-19.51,1.63-1.72,6.72-4.67,9.05-4.23Z"
          fill="#fbecc9"
        />
        <path
          d="M157.08,79.06c-.96,2.66-2.53,5.06-4.91,6.66-3.79,2.54-11.63,3.15-15.79,1.01-6.11-3.15-8.16-12.8-5.31-18.78,7.17-15,33.15-8.77,26.01,11.11Z"
          fill="#fbecc9"
        />
        <path
          d="M80.03,42.88c7.47,1.53,11.84,6.62,11.17,14.68-1.06,12.79-20.02,18.02-27.04,7.17-.03-.05-.5-.85-.53-.9-4.11-8.24.88-19.69,10.24-21.25,1.94-.32,4.24-.09,6.16.3Z"
          fill="#fbecc9"
        />
        <path
          d="M98.4,95.75c.26.28.98,1.62,1.17,2.24.58,1.83.3,5.22-.32,6.92-2.46,6.69-10.12,11.1-17.16,10.22-12.64-1.59-14.6-21.82-3.18-27,7.07-3.21,14.82-1.4,18.77,5.53.37.66.65,2.01.73,2.1Z"
          fill="#fbecc9"
        />
        <circle
          cx="122.34"
          cy="108.71"
          r="14.28"
          transform="translate(-37.96 75.73) rotate(-30)"
          fill="#fbecc9"
        />
        <path
          d="M35.3,108.02c-3.32,7.15-13.36,12.09-20.63,7.24-3.4-2.27-4.55-4.63-5.73-8.31-.27-.84-.71-1.6-.79-2.74-.32-4.83,2.07-10.16,5.9-13.11,11.05-8.51,26.94,4.67,21.25,16.92Z"
          fill="#fbecc9"
        />
        <path
          d="M130.36,25.92c3.36,1.05,7.64,3.33,9.66,6.29.23.33.12.68.19.79.06.1.75.81.93,1.31,2.01,5.73-1.56,13.81-6.59,16.99-7.54,4.77-21.12-.17-21.5-10.23s7.02-18.39,17.32-15.16Z"
          fill="#fbecc9"
        />
        <path
          d="M122.08,65.47c.52.61.19.25.48.9,2.66,6-.54,14.54-6.4,17.55s-16.57.93-19.69-4.95c-3.43-6.48.09-18.33,7.44-20.66,5.76-1.82,14.86,1.12,18.05,6.37.19.31.05.72.12.8Z"
          fill="#fbecc9"
        />
        <circle
          cx="52.36"
          cy="85.18"
          r="14.03"
          transform="translate(-35.57 37.59) rotate(-30)"
          fill="#fbecc9"
        />
        <circle
          cx="79.64"
          cy="145.58"
          r="13.83"
          transform="translate(-62.12 59.32) rotate(-30)"
          fill="#fbecc9"
        />
        <path
          d="M120.2,126.85c7.03,2.91,8.39,11.3,5.07,17.59-3.72,7.05-15.14,9.32-21.66,4.25-5.9-4.6-5.43-16.95.48-21.39,4.25-3.19,11.37-2.41,16.1-.45Z"
          fill="#fbecc9"
        />
      </g>
    </svg>
  );
};

// Function to get deterministic "random" values from a seed
const seededRandom = (seed: number, index: number) => {
  const value = Math.sin(seed * (index + 1) * 9999) * 10000;
  return (value - Math.floor(value)) * 0.999; // 0-0.999 range
};

// Topping components with seed support
export const PepperoniSVG: React.FC<SVGProps> = ({ className, seed = 0 }) => (
  <svg
    viewBox="0 0 30 30"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="15" cy="15" r="13" fill="#b71c1c" />
    <circle
      cx="15"
      cy="15"
      r="13"
      fill="none"
      stroke="#700606"
      strokeWidth="0.5"
    />

    {/* Texture spots */}
    {Array.from({ length: 15 }).map((_, i) => {
      const angle = seededRandom(seed, i) * Math.PI * 2;
      const radius = seededRandom(seed, i + 15) * 10;
      const x = 15 + Math.cos(angle) * radius;
      const y = 15 + Math.sin(angle) * radius;
      const size = 0.8 + seededRandom(seed, i + 30) * 1.5;

      return (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={size}
          fill="#ff6d6d"
          fillOpacity="0.2"
        />
      );
    })}

    {/* Fat speckles */}
    {Array.from({ length: 12 }).map((_, i) => {
      const angle = seededRandom(seed, i + 45) * Math.PI * 2;
      const radius = seededRandom(seed, i + 60) * 12;
      const x = 15 + Math.cos(angle) * radius;
      const y = 15 + Math.sin(angle) * radius;
      const size = 0.6 + seededRandom(seed, i + 75) * 1;

      return (
        <circle
          key={`fat-${i}`}
          cx={x}
          cy={y}
          r={size}
          fill="#eee"
          fillOpacity={0.4 + seededRandom(seed, i + 90) * 0.3}
        />
      );
    })}
  </svg>
);

export const MushroomsSVG: React.FC<SVGProps> = ({ className, seed = 0 }) => (
  <svg
    viewBox="0 0 25 25"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      {/* Mushroom cap */}
      <ellipse cx="12.5" cy="10" rx="10" ry="8" fill="#c9af94" />
      <ellipse
        cx="12.5"
        cy="10"
        rx="10"
        ry="8"
        fill="none"
        stroke="#a58b6f"
        strokeWidth="0.5"
      />

      {/* Mushroom stem */}
      <rect x="9.5" y="10" width="6" height="8" rx="2" fill="#f0e6d2" />
      <rect
        x="9.5"
        y="10"
        width="6"
        height="8"
        rx="2"
        fill="none"
        stroke="#dfd2bb"
        strokeWidth="0.5"
      />

      {/* Gills */}
      {Array.from({ length: 5 }).map((_, i) => (
        <line
          key={i}
          x1={7 + i * 2.5}
          y1="10"
          x2={7 + i * 2.5}
          y2="5"
          stroke="#a58b6f"
          strokeWidth="0.3"
          strokeOpacity="0.7"
        />
      ))}

      {/* Texture spots */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = seededRandom(seed, i) * Math.PI;
        const radius = 3 + seededRandom(seed, i + 8) * 5;
        const x = 12.5 + Math.cos(angle) * radius;
        const y = 10 + Math.sin(angle) * 6;
        const size = 0.5 + seededRandom(seed, i + 16);

        return (
          <circle
            key={`spot-${i}`}
            cx={x}
            cy={y}
            r={size}
            fill="#876e53"
            fillOpacity="0.3"
          />
        );
      })}
    </g>
  </svg>
);

export const OlivesSVG: React.FC<SVGProps> = ({ className }) => (
  <svg
    viewBox="0 0 15 15"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse cx="7.5" cy="7.5" rx="6" ry="6.5" fill="#2e4031" />
    <ellipse
      cx="7.5"
      cy="7.5"
      rx="6"
      ry="6.5"
      fill="none"
      stroke="#1c2a1e"
      strokeWidth="0.5"
    />

    {/* Olive hole */}
    <ellipse cx="7.5" cy="7.5" rx="2" ry="2.5" fill="#bf2e24" />
    <ellipse
      cx="7.5"
      cy="7.5"
      rx="2"
      ry="2.5"
      fill="none"
      stroke="#9c1e15"
      strokeWidth="0.3"
    />

    {/* Highlight */}
    <ellipse cx="5" cy="5" rx="1.5" ry="1" fill="#4b614f" fillOpacity="0.6" />
  </svg>
);

export const JalapeñosSVG: React.FC<SVGProps> = ({ className }) => (
  <svg
    viewBox="0 0 20 20"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10,2 C11.2,2 13.5,3 13.5,5.2 C13.5,7 13,10 12.5,13 C12,16 11,17 10,17.5 C9,17 8,16 7.5,13 C7,10 6.5,7 6.5,5.2 C6.5,3 8.8,2 10,2 Z"
      fill="#2d5718"
    />
    <path
      d="M10,2 C11.2,2 13.5,3 13.5,5.2 C13.5,7 13,10 12.5,13 C12,16 11,17 10,17.5 C9,17 8,16 7.5,13 C7,10 6.5,7 6.5,5.2 C6.5,3 8.8,2 10,2 Z"
      fill="none"
      stroke="#1d3d0f"
      strokeWidth="0.5"
    />
    <path
      d="M9.8,2 C9.8,1.6 10.2,1.6 10.2,2 L10.2,3.5"
      fill="none"
      stroke="#1d3d0f"
      strokeWidth="0.5"
      strokeLinecap="round"
    />
    <ellipse
      cx="10"
      cy="6"
      rx="1.2"
      ry="0.7"
      fill="#f9f7dc"
      fillOpacity="0.7"
    />
    <ellipse
      cx="10"
      cy="10"
      rx="1.2"
      ry="0.7"
      fill="#f9f7dc"
      fillOpacity="0.7"
    />
    <ellipse
      cx="10"
      cy="14"
      rx="1.2"
      ry="0.7"
      fill="#f9f7dc"
      fillOpacity="0.7"
    />
    <path
      d="M8.8,4.5 C9.3,4.7 9.7,4.7 10.2,4.5"
      fill="none"
      stroke="#7fbf55"
      strokeWidth="0.4"
      strokeOpacity="0.6"
      strokeLinecap="round"
    />
  </svg>
);

export const PineappleSVG: React.FC<SVGProps> = ({ className, seed = 0 }) => (
  <svg
    viewBox="0 0 25 25"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.5,3 L16,6 L18,10 L18,15 L16,19 L12.5,22 L9,19 L7,15 L7,10 L9,6 z"
      fill="#f7d858"
    />
    <path
      d="M12.5,3 L16,6 L18,10 L18,15 L16,19 L12.5,22 L9,19 L7,15 L7,10 L9,6 z"
      fill="none"
      stroke="#d4b72e"
      strokeWidth="0.5"
    />

    {/* Cross pattern */}
    <line x1="7" y1="10" x2="18" y2="10" stroke="#d4b72e" strokeWidth="0.5" />
    <line x1="7" y1="15" x2="18" y2="15" stroke="#d4b72e" strokeWidth="0.5" />
    <line
      x1="12.5"
      y1="3"
      x2="12.5"
      y2="22"
      stroke="#d4b72e"
      strokeWidth="0.5"
    />

    {/* Texture dots */}
    {Array.from({ length: 20 }).map((_, i) => {
      const x = 9 + seededRandom(seed, i) * 7;
      const y = 6 + seededRandom(seed, i + 20) * 13;

      return (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="0.4"
          fill="#d4b72e"
          fillOpacity="0.5"
        />
      );
    })}
  </svg>
);

export const AnchoviesSVG: React.FC<SVGProps> = ({ className }) => (
  <svg
    viewBox="0 0 35 35"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7,15 C7,11.5 9.5,8.5 13,7.5 C16,6.8 21,6.8 23,7.5 C26.5,8.5 28,11.5 28,15 C28,18.5 26.5,21.5 23,22.5 C21,23.2 16,23.2 13,22.5 C9.5,21.5 7,18.5 7,15 Z"
      fill="#5b6a7a"
    />
    <path
      d="M7,15 C7,11.5 9.5,8.5 13,7.5 C16,6.8 21,6.8 23,7.5 C26.5,8.5 28,11.5 28,15 C28,18.5 26.5,21.5 23,22.5 C21,23.2 16,23.2 13,22.5 C9.5,21.5 7,18.5 7,15 Z"
      fill="none"
      stroke="#3e4a58"
      strokeWidth="0.5"
    />
    <path
      d="M7,15 L4.5,11.5 C4,12.5 4,13.5 4,15 C4,16.5 4,17.5 4.5,18.5 L7,15 Z"
      fill="#5b6a7a"
      stroke="#3e4a58"
      strokeWidth="0.4"
    />
    <path d="M6,15 L28,15" fill="none" stroke="#3e4a58" strokeWidth="0.6" />
    {/* Simplified bone structure */}
    <path
      d="M12,15 L11.4,11.5 M12,15 L11.4,18.5 M16,15 L15.4,11.5 M16,15 L15.4,18.5 M20,15 L19.4,11.5 M20,15 L19.4,18.5"
      stroke="#3e4a58"
      strokeWidth="0.3"
      strokeOpacity="0.8"
    />
    <ellipse
      cx="17.5"
      cy="12"
      rx="10"
      ry="2.5"
      fill="#9aa5ad"
      fillOpacity="0.4"
    />
    <circle
      cx="25.5"
      cy="13.5"
      r="0.8"
      fill="#111"
      stroke="#000"
      strokeWidth="0.2"
    />
  </svg>
);

export const SausageSVG: React.FC<SVGProps> = ({ className, seed = 0 }) => (
  <svg
    viewBox="0 0 30 30"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="15" cy="15" r="12" fill="#ad6952" />
    <circle
      cx="15"
      cy="15"
      r="12"
      fill="none"
      stroke="#8c5241"
      strokeWidth="0.5"
    />

    {/* Texture spots */}
    {Array.from({ length: 25 }).map((_, i) => {
      const angle = seededRandom(seed, i) * Math.PI * 2;
      const radius = seededRandom(seed, i + 25) * 10;
      const x = 15 + Math.cos(angle) * radius;
      const y = 15 + Math.sin(angle) * radius;
      const size = 0.6 + seededRandom(seed, i + 50) * 1.2;

      return (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={size}
          fill="#8c5241"
          fillOpacity={0.3 + seededRandom(seed, i + 75) * 0.3}
        />
      );
    })}

    {/* Fat specks */}
    {Array.from({ length: 15 }).map((_, i) => {
      const angle = seededRandom(seed, i + 100) * Math.PI * 2;
      const radius = seededRandom(seed, i + 125) * 11;
      const x = 15 + Math.cos(angle) * radius;
      const y = 15 + Math.sin(angle) * radius;
      const size = 0.5 + seededRandom(seed, i + 150) * 0.8;

      return (
        <circle
          key={`fat-${i}`}
          cx={x}
          cy={y}
          r={size}
          fill="#eee1d5"
          fillOpacity={0.5 + seededRandom(seed, i + 175) * 0.5}
        />
      );
    })}
  </svg>
);

export const OnionsSVG: React.FC<SVGProps> = ({ className }) => (
  <svg
    viewBox="0 0 30 30"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10,15 C10,10 15,5 20,10 C25,15 20,20 15,20 C10,20 10,15 10,15 Z"
      fill="#e8cee4"
      fillOpacity="0.9"
    />
    <path
      d="M10,15 C10,10 15,5 20,10 C25,15 20,20 15,20 C10,20 10,15 10,15 Z"
      fill="none"
      stroke="#d1b2cc"
      strokeWidth="0.5"
    />

    {/* Inner rings */}
    <path
      d="M12,15 C12,12 15,9 18,12 C21,15 18,18 15,18 C12,18 12,15 12,15 Z"
      fill="none"
      stroke="#d1b2cc"
      strokeWidth="0.3"
    />
    <path
      d="M14,15 C14,13 15,12 16,13 C17,14 16,16 15,16 C14,16 14,15 14,15 Z"
      fill="none"
      stroke="#d1b2cc"
      strokeWidth="0.3"
    />
  </svg>
);

export const BaconSVG: React.FC<SVGProps> = ({ className }) => (
  <svg
    viewBox="0 0 30 30"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5,10 C10,5 20,5 25,10 C25,15 20,20 15,20 C10,20 5,15 5,10 Z"
      fill="#d67c63"
    />
    <path
      d="M5,10 C10,5 20,5 25,10 C25,15 20,20 15,20 C10,20 5,15 5,10 Z"
      fill="none"
      stroke="#b15b45"
      strokeWidth="0.5"
    />

    {/* Fat stripes */}
    <path
      d="M7,12 C12,7 18,7 23,12"
      fill="none"
      stroke="#f3d6c9"
      strokeWidth="3"
    />
    <path
      d="M8,15 C13,10 17,10 22,15"
      fill="none"
      stroke="#f3d6c9"
      strokeWidth="2"
    />
    <path
      d="M9,17 C13,13 17,13 21,17"
      fill="none"
      stroke="#f3d6c9"
      strokeWidth="1.5"
    />
  </svg>
);

export const HamSVG: React.FC<SVGProps> = ({ className, seed = 0 }) => (
  <svg
    viewBox="0 0 30 30"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5,10 C10,5 20,5 25,10 C25,15 20,25 15,25 C10,25 5,15 5,10 Z"
      fill="#e0a5a0"
    />
    <path
      d="M5,10 C10,5 20,5 25,10 C25,15 20,25 15,25 C10,25 5,15 5,10 Z"
      fill="none"
      stroke="#c28985"
      strokeWidth="0.5"
    />

    {/* Texture */}
    {Array.from({ length: 20 }).map((_, i) => {
      const x = 7 + seededRandom(seed, i) * 16;
      const y = 10 + seededRandom(seed, i + 20) * 12;
      const size = 0.6 + seededRandom(seed, i + 36) * 1.2;

      return (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={size}
          fill="#c28985"
          fillOpacity={0.2 + seededRandom(seed, i + 52) * 0.3}
        />
      );
    })}

    {/* Highlight */}
    <ellipse cx="15" cy="12" rx="8" ry="3" fill="#ecc8c5" fillOpacity="0.4" />
  </svg>
);

export const PeppersSVG: React.FC<SVGProps> = ({ className }) => (
  <svg
    viewBox="0 0 25 25"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.5,3 C14,3 15,4 15,5 C15,6 14,9 13,12 C16,13 19,14 20,14 C21,15 21,16 20,17 C19,18 16,19 13,18 C12,21 11,24 10,24 C9,25 8,24 8,23 C8,22 9,19 10,16 C7,15 4,14 3,13 C2,12 2,11 3,10 C4,9 7,8 10,9 C11,6 12,3 12.5,3 Z"
      fill="#4a8b32"
    />
    <path
      d="M12.5,3 C14,3 15,4 15,5 C15,6 14,9 13,12 C16,13 19,14 20,14 C21,15 21,16 20,17 C19,18 16,19 13,18 C12,21 11,24 10,24 C9,25 8,24 8,23 C8,22 9,19 10,16 C7,15 4,14 3,13 C2,12 2,11 3,10 C4,9 7,8 10,9 C11,6 12,3 12.5,3 Z"
      fill="none"
      stroke="#3a6e27"
      strokeWidth="0.5"
    />

    {/* Highlight */}
    <path
      d="M12.5,5 C13,5 13.5,5.5 13.5,6 C13.5,7 12.5,10 11.5,13"
      stroke="#6fba51"
      strokeWidth="0.5"
      fill="none"
    />
    <path
      d="M13,14 C15,15 17,15.5 18,15.5"
      stroke="#6fba51"
      strokeWidth="0.5"
      fill="none"
    />
  </svg>
);

export const FreshTomatoSVG: React.FC<SVGProps> = ({ className, seed = 0 }) => (
  <svg
    viewBox="0 0 25 25"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12.5" cy="12.5" r="10" fill="#e14736" />
    <circle
      cx="12.5"
      cy="12.5"
      r="10"
      fill="none"
      stroke="#b22f1f"
      strokeWidth="0.5"
    />

    {/* Tomato interior texture */}
    <circle cx="12.5" cy="12.5" r="8" fill="#ef6f60" fillOpacity="0.3" />
    <circle cx="12.5" cy="12.5" r="6" fill="#ef6f60" fillOpacity="0.3" />

    {/* Tomato stem */}
    <path d="M12.5,2.5 L13.5,4.5 L11.5,4.5 Z" fill="#5e8c26" />

    {/* Seeds */}
    {Array.from({ length: 8 }).map((_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 3 + seededRandom(seed, i) * 3;
      const x = 12.5 + Math.cos(angle) * radius;
      const y = 12.5 + Math.sin(angle) * radius;

      return <circle key={i} cx={x} cy={y} r="0.8" fill="#f0dbaa" />;
    })}

    {/* Highlight */}
    <circle cx="9.5" cy="9.5" r="3" fill="#f26b5b" fillOpacity="0.5" />
  </svg>
);

export const FreshGarlicSVG: React.FC<SVGProps> = ({ className }) => (
  <svg
    viewBox="0 0 25 25"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Garlic clove */}
    <path
      d="M9,17 C6,16 5,13 6,10 C7,7 10,5 13,6 C16,7 17,10 16,13 C15,16 12,18 9,17 Z"
      fill="#f5f3e6"
    />
    <path
      d="M9,17 C6,16 5,13 6,10 C7,7 10,5 13,6 C16,7 17,10 16,13 C15,16 12,18 9,17 Z"
      fill="none"
      stroke="#e0d8c0"
      strokeWidth="0.5"
    />

    {/* Garlic details */}
    <path
      d="M11,16 C9,15 8,13 8.5,11 C9,9 11,7.5 13,8 C15,8.5 16,10.5 15.5,12.5 C15,14.5 13,16 11,16 Z"
      fill="none"
      stroke="#e0d8c0"
      strokeWidth="0.3"
    />

    {/* Texture lines */}
    <path
      d="M7.5,10.5 C10,10 12.5,10 15,11"
      fill="none"
      stroke="#e0d8c0"
      strokeWidth="0.3"
    />
    <path
      d="M7,12 C9.5,12 12,12.5 14.5,13"
      fill="none"
      stroke="#e0d8c0"
      strokeWidth="0.3"
    />
    <path
      d="M7.5,13.5 C9.5,14 11.5,14.5 13.5,14.5"
      fill="none"
      stroke="#e0d8c0"
      strokeWidth="0.3"
    />
  </svg>
);

export const FreshBasilSVG: React.FC<SVGProps> = ({ className }) => (
  <svg
    viewBox="0 0 25 25"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Basil leaf */}
    <path
      d="M12.5,5 C16,5 20,9 20,14 C20,19 16,20 12.5,20 C9,20 5,19 5,14 C5,9 9,5 12.5,5 Z"
      fill="#386e23"
    />
    <path
      d="M12.5,5 C16,5 20,9 20,14 C20,19 16,20 12.5,20 C9,20 5,19 5,14 C5,9 9,5 12.5,5 Z"
      fill="none"
      stroke="#29561a"
      strokeWidth="0.5"
    />

    {/* Leaf veins */}
    <path d="M12.5,5 L12.5,20" fill="none" stroke="#29561a" strokeWidth="0.5" />
    <path d="M8,8 L17,8" fill="none" stroke="#29561a" strokeWidth="0.5" />
    <path d="M6,12 L19,12" fill="none" stroke="#29561a" strokeWidth="0.5" />
    <path d="M7,16 L18,16" fill="none" stroke="#29561a" strokeWidth="0.5" />

    {/* Highlight */}
    <path
      d="M10,7 C12,7 15,8 16,10"
      fill="none"
      stroke="#65a347"
      strokeWidth="0.5"
      strokeOpacity="0.6"
    />
  </svg>
);

export const ChickenSVG: React.FC<SVGProps> = ({ className, seed = 0 }) => (
  <svg
    viewBox="0 0 30 30"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10,10 C12,8 18,8 20,10 C22,12 22,18 20,20 C18,22 12,22 10,20 C8,18 8,12 10,10 Z"
      fill="#e9c8a0"
    />
    <path
      d="M10,10 C12,8 18,8 20,10 C22,12 22,18 20,20 C18,22 12,22 10,20 C8,18 8,12 10,10 Z"
      fill="none"
      stroke="#c7a67e"
      strokeWidth="0.5"
    />

    {/* Grilled marks */}
    <line x1="9" y1="12" x2="21" y2="12" stroke="#9e7c53" strokeWidth="1" />
    <line x1="9" y1="15" x2="21" y2="15" stroke="#9e7c53" strokeWidth="1" />
    <line x1="9" y1="18" x2="21" y2="18" stroke="#9e7c53" strokeWidth="1" />

    {/* Texture spots */}
    {Array.from({ length: 20 }).map((_, i) => {
      const x = 10 + seededRandom(seed, i) * 10;
      const y = 10 + seededRandom(seed, i + 20) * 10;

      return (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="0.5"
          fill="#c7a67e"
          fillOpacity="0.7"
        />
      );
    })}

    {/* Seasoning specks */}
    {Array.from({ length: 12 }).map((_, i) => {
      const x = 10 + seededRandom(seed, i + 40) * 10;
      const y = 10 + seededRandom(seed, i + 60) * 10;

      return <circle key={`spice-${i}`} cx={x} cy={y} r="0.3" fill="#4d4032" />;
    })}
  </svg>
);

export const SpinachSVG: React.FC<SVGProps> = ({ className }) => (
  <svg
    viewBox="0 0 30 30"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Main leaf */}
    <path
      d="M15,5 C19,5 23,9 23,15 C23,21 19,25 15,25 C11,25 7,21 7,15 C7,9 11,5 15,5 Z"
      fill="#295c1e"
    />
    <path
      d="M15,5 C19,5 23,9 23,15 C23,21 19,25 15,25 C11,25 7,21 7,15 C7,9 11,5 15,5 Z"
      fill="none"
      stroke="#1b3d12"
      strokeWidth="0.5"
    />

    {/* Leaf veins */}
    <path d="M15,5 L15,25" fill="none" stroke="#1b3d12" strokeWidth="0.5" />
    <path d="M9,10 L21,10" fill="none" stroke="#1b3d12" strokeWidth="0.5" />
    <path d="M8,15 L22,15" fill="none" stroke="#1b3d12" strokeWidth="0.5" />
    <path d="M9,20 L21,20" fill="none" stroke="#1b3d12" strokeWidth="0.5" />

    {/* Texture accents */}
    <path
      d="M12,7 C13,7 14,7.5 15,8"
      fill="none"
      stroke="#1b3d12"
      strokeWidth="0.3"
    />
    <path
      d="M12,12 C13,12.5 14,13 15,13"
      fill="none"
      stroke="#1b3d12"
      strokeWidth="0.3"
    />
    <path
      d="M12,17 C13,17.5 14,18 15,18"
      fill="none"
      stroke="#1b3d12"
      strokeWidth="0.3"
    />
    <path
      d="M12,22 C13,22.5 14,23 15,23"
      fill="none"
      stroke="#1b3d12"
      strokeWidth="0.3"
    />

    {/* Highlight */}
    <path
      d="M11,8 C13,7 15,7 17,8"
      fill="none"
      stroke="#3d8029"
      strokeWidth="0.5"
      strokeOpacity="0.6"
    />
  </svg>
);

export const MeatballSVG: React.FC<SVGProps> = ({ className, seed = 0 }) => (
  <svg
    viewBox="0 0 25 25"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12.5" cy="12.5" r="10" fill="#855240" />
    <circle
      cx="12.5"
      cy="12.5"
      r="10"
      fill="none"
      stroke="#693c2e"
      strokeWidth="0.5"
    />

    {/* Texture */}
    {Array.from({ length: 25 }).map((_, i) => {
      const angle = seededRandom(seed, i) * Math.PI * 2;
      const radius = seededRandom(seed, i + 25) * 9;
      const x = 12.5 + Math.cos(angle) * radius;
      const y = 12.5 + Math.sin(angle) * radius;
      const size = 0.5 + seededRandom(seed, i + 50) * 1;

      return (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={size}
          fill="#693c2e"
          fillOpacity={0.3 + seededRandom(seed, i + 75) * 0.4}
        />
      );
    })}

    {/* Specks */}
    {Array.from({ length: 15 }).map((_, i) => {
      const angle = seededRandom(seed, i + 100) * Math.PI * 2;
      const radius = seededRandom(seed, i + 125) * 9;
      const x = 12.5 + Math.cos(angle) * radius;
      const y = 12.5 + Math.sin(angle) * radius;

      return <circle key={`speck-${i}`} cx={x} cy={y} r="0.4" fill="#472a22" />;
    })}
  </svg>
);

export const SalamiSVG: React.FC<SVGProps> = ({ className, seed = 0 }) => (
  <svg
    viewBox="0 0 25 25"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12.5" cy="12.5" r="11" fill="#a13c2e" />
    <circle
      cx="12.5"
      cy="12.5"
      r="11"
      fill="none"
      stroke="#85301f"
      strokeWidth="0.5"
    />

    {/* Fatty specks */}
    {Array.from({ length: 30 }).map((_, i) => {
      const angle = seededRandom(seed, i) * Math.PI * 2;
      const radius = seededRandom(seed, i + 30) * 10;
      const x = 12.5 + Math.cos(angle) * radius;
      const y = 12.5 + Math.sin(angle) * radius;
      const size = 0.7 + seededRandom(seed, i + 60) * 1.3;

      return (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={size}
          fill="#e8d8cc"
          fillOpacity={0.6 + seededRandom(seed, i + 90) * 0.4}
        />
      );
    })}

    {/* Spice specks */}
    {Array.from({ length: 25 }).map((_, i) => {
      const angle = seededRandom(seed, i + 120) * Math.PI * 2;
      const radius = seededRandom(seed, i + 150) * 10;
      const x = 12.5 + Math.cos(angle) * radius;
      const y = 12.5 + Math.sin(angle) * radius;

      return <circle key={`spice-${i}`} cx={x} cy={y} r="0.3" fill="#333" />;
    })}
  </svg>
);

export const ArtichokesSVG: React.FC<SVGProps> = ({ className }) => (
  <svg
    viewBox="0 0 30 30"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Artichoke heart */}
    <circle cx="15" cy="15" r="7" fill="#a3b08d" />
    <circle
      cx="15"
      cy="15"
      r="7"
      fill="none"
      stroke="#88997a"
      strokeWidth="0.5"
    />

    {/* Artichoke leaves with more natural arrangement */}
    {[...Array(18)].map((_, i) => {
      const angle = (i / 18) * Math.PI * 2;
      const innerRadius = 7;
      const outerRadius = 7 + (i % 3 === 0 ? 6 : 5); // Varied lengths
      const midX = 15 + Math.cos(angle) * (innerRadius + 2);
      const midY = 15 + Math.sin(angle) * (innerRadius + 2);
      const endX = 15 + Math.cos(angle) * outerRadius;
      const endY = 15 + Math.sin(angle) * outerRadius;
      const controlX = 15 + Math.cos(angle) * (outerRadius + 1.5);
      const controlY = 15 + Math.sin(angle) * (outerRadius + 1.5);

      // Slightly curved leaf shapes
      return (
        <g key={i}>
          <path
            d={`M15,15 L${midX},${midY} Q${controlX},${controlY} ${endX},${endY}`}
            stroke="#88997a"
            strokeWidth={1.8 - (i % 3) * 0.2}
            fill="none"
            strokeLinecap="round"
          />
          {/* Leaf veins for realism */}
          <path
            d={`M${midX},${midY} L${
              15 + Math.cos(angle + 0.1) * (outerRadius - 2)
            },${15 + Math.sin(angle + 0.1) * (outerRadius - 2)}`}
            stroke="#697a57"
            strokeWidth="0.2"
            strokeOpacity="0.6"
            fill="none"
          />
        </g>
      );
    })}

    {/* Inner texture details */}
    <circle cx="15" cy="15" r="5" fill="#88997a" fillOpacity="0.4" />
    <circle cx="15" cy="15" r="3" fill="#697a57" fillOpacity="0.5" />

    {/* Texture patterns on the heart */}
    {[...Array(8)].map((_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      return (
        <path
          key={`texture-${i}`}
          d={`M15,15 L${15 + Math.cos(angle) * 5},${15 + Math.sin(angle) * 5}`}
          stroke="#697a57"
          strokeWidth="0.3"
          strokeOpacity="0.4"
        />
      );
    })}

    {/* Highlight */}
    <circle cx="13" cy="13" r="2" fill="#b9c7a1" fillOpacity="0.3" />
  </svg>
);

export const BroccoliSVG: React.FC<SVGProps> = ({ className, seed = 0 }) => (
  <svg
    viewBox="0 0 30 30"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Broccoli stem with better texture */}
    <path
      d="M13,18 L13,25 C13,25.5 13.5,26 15,26 C16.5,26 17,25.5 17,25 L17,18"
      fill="#88a467"
    />
    <path
      d="M13,18 L13,25 C13,25.5 13.5,26 15,26 C16.5,26 17,25.5 17,25 L17,18"
      fill="none"
      stroke="#738a57"
      strokeWidth="0.4"
    />

    {/* Stem texture */}
    <line x1="14" y1="19" x2="14" y2="24" stroke="#738a57" strokeWidth="0.2" />
    <line x1="16" y1="19" x2="16" y2="24" stroke="#738a57" strokeWidth="0.2" />

    {/* Main broccoli head */}
    <circle cx="15" cy="12" r="8" fill="#3c7a1e" />
    <circle
      cx="15"
      cy="12"
      r="8"
      fill="none"
      stroke="#306617"
      strokeWidth="0.5"
    />

    {/* Realistic broccoli florets structure */}
    {/* Center floret */}
    <circle cx="15" cy="10" r="2.5" fill="#346b19" />
    <circle
      cx="15"
      cy="10"
      r="2.5"
      fill="none"
      stroke="#255313"
      strokeWidth="0.3"
    />

    {/* Surrounding florets with texture */}
    {[...Array(6)].map((_, i) => {
      const angle = (i / 6) * Math.PI * 2;
      const x = 15 + Math.cos(angle) * 5;
      const y = 12 + Math.sin(angle) * 5;
      const size = 1.8 + (i % 3) * 0.4;

      return (
        <g key={i}>
          <circle cx={x} cy={y} r={size} fill="#346b19" />
          <circle
            cx={x}
            cy={y}
            r={size}
            fill="none"
            stroke="#255313"
            strokeWidth="0.3"
          />

          {/* Floret texture */}
          {[...Array(4)].map((_, j) => {
            const innerAngle = (j / 4) * Math.PI * 2;
            const smallX = x + Math.cos(innerAngle) * (size * 0.6);
            const smallY = y + Math.sin(innerAngle) * (size * 0.6);
            return (
              <circle
                key={`floret-${i}-${j}`}
                cx={smallX}
                cy={smallY}
                r={0.6}
                fill="#2c5c15"
                fillOpacity="0.7"
              />
            );
          })}
        </g>
      );
    })}

    {/* Small florets texture for more realism */}
    {[...Array(15)].map((_, i) => {
      const angle = seededRandom(seed, i) * Math.PI * 2;
      const distance = 3 + seededRandom(seed, i + 15) * 4;
      const x = 15 + Math.cos(angle) * distance;
      const y = 12 + Math.sin(angle) * distance;

      return (
        <circle
          key={`texture-${i}`}
          cx={x}
          cy={y}
          r={0.7 + seededRandom(seed, i + 30) * 0.5}
          fill="#2c5c15"
          fillOpacity="0.5"
        />
      );
    })}

    {/* Highlights */}
    <circle cx="13" cy="9" r="1.5" fill="#4a9428" fillOpacity="0.3" />
    <circle cx="17" cy="11" r="1" fill="#4a9428" fillOpacity="0.3" />
  </svg>
);

export const EggplantSVG: React.FC<SVGProps> = ({ className, seed = 0 }) => (
  <svg
    viewBox="0 0 30 30"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Eggplant body with more organic shape */}
    <path
      d="M15,5 C18.5,5 20.5,7 20.5,10 C20.5,13 19.5,17 18.5,20 C17.5,23 16,25 15,25 C14,25 12.5,23 11.5,20 C10.5,17 9.5,13 9.5,10 C9.5,7 11.5,5 15,5 Z"
      fill="#4d2e69"
    />
    <path
      d="M15,5 C18.5,5 20.5,7 20.5,10 C20.5,13 19.5,17 18.5,20 C17.5,23 16,25 15,25 C14,25 12.5,23 11.5,20 C10.5,17 9.5,13 9.5,10 C9.5,7 11.5,5 15,5 Z"
      fill="none"
      stroke="#3b234f"
      strokeWidth="0.5"
    />

    {/* Eggplant stem with more detail */}
    <path
      d="M13.5,5 C13.5,4 14,3 15,2.5 C16,2 17,2.5 17.5,3.5 C18,4.5 17.5,5 17,5.5"
      fill="#567d46"
    />
    <path
      d="M13.5,5 C13.5,4 14,3 15,2.5 C16,2 17,2.5 17.5,3.5 C18,4.5 17.5,5 17,5.5"
      fill="none"
      stroke="#3e5b32"
      strokeWidth="0.4"
    />

    {/* Calyx (green top) */}
    <path
      d="M13,5.5 C12,4.5 12.5,4 13.5,4 L16.5,4 C17.5,4 18,4.5 17,5.5"
      fill="#4a6d3e"
      stroke="#3e5b32"
      strokeWidth="0.3"
    />

    {/* Texture lines for realistic surface */}
    <path
      d="M11,10.5 C13,10 17,10 19,10.5 M11,14 C13,13.5 17,13.5 19,14 M11,17.5 C13,17 17,17 19,17.5 M12,21 C13.5,20.5 16.5,20.5 18,21"
      fill="none"
      stroke="#3b234f"
      strokeWidth="0.3"
      strokeOpacity="0.5"
    />

    {/* Surface detail with subtle dots */}
    {[...Array(25)].map((_, i) => {
      const angle = seededRandom(seed, i) * Math.PI * 2;
      const y = 8 + seededRandom(seed, i + 25) * 14;
      const radius = 3.5 + Math.cos(y / 5) * 1.5; // Vary width by height
      const x = 15 + Math.cos(angle) * radius;

      return (
        <circle
          key={`detail-${i}`}
          cx={x}
          cy={y}
          r="0.2"
          fill="#3b234f"
          fillOpacity="0.6"
        />
      );
    })}

    {/* Highlight */}
    <path
      d="M12.5,8 C13.5,7 16.5,7 17.5,8"
      fill="none"
      stroke="#6a4090"
      strokeWidth="0.5"
      strokeOpacity="0.6"
    />

    <ellipse cx="15" cy="12" rx="3" ry="6" fill="#5a3778" fillOpacity="0.3" />
  </svg>
);

// Update the topping component map with all toppings
export const getToppingComponent = (
  toppingName: string,
  isThumbnail: boolean = false
): React.FC<SVGProps> => {
  // For thumbnails, provide simplified versions that will remain consistent
  if (isThumbnail) {
    return getThumbnailComponent(toppingName);
  }

  // For regular pizza display
  const toppingMap: Record<string, React.FC<SVGProps>> = {
    Pepperoni: PepperoniSVG,
    Mushrooms: MushroomsSVG,
    Olives: OlivesSVG,
    Jalapeños: JalapeñosSVG,
    Pineapple: PineappleSVG,
    Anchovies: AnchoviesSVG,
    Sausage: SausageSVG,
    Onions: OnionsSVG,
    Bacon: BaconSVG,
    Ham: HamSVG,
    Peppers: PeppersSVG,
    "Fresh tomato": FreshTomatoSVG,
    "Fresh garlic": FreshGarlicSVG,
    "Fresh basil": FreshBasilSVG,
    Chicken: ChickenSVG,
    Spinach: SpinachSVG,
    Meatball: MeatballSVG,
    Salami: SalamiSVG,
    Artichokes: ArtichokesSVG,
    Broccoli: BroccoliSVG,
    Eggplant: EggplantSVG,
    default: PepperoniSVG,
  };

  return toppingMap[toppingName] || toppingMap["default"];
};

// Static thumbnail versions with fixed patterns - no randomness
const getThumbnailComponent = (toppingName: string): React.FC<SVGProps> => {
  // Define simple, fixed thumbnail versions of each topping
  const thumbnailMap: Record<string, React.FC<SVGProps>> = {
    Pepperoni: ({ className }) => (
      <svg
        viewBox="0 0 30 30"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="15" cy="15" r="13" fill="#b71c1c" />
        <circle
          cx="15"
          cy="15"
          r="13"
          fill="none"
          stroke="#700606"
          strokeWidth="0.5"
        />
        <circle cx="11" cy="11" r="1.5" fill="#ff6d6d" fillOpacity="0.2" />
        <circle cx="17" cy="14" r="1.2" fill="#ff6d6d" fillOpacity="0.2" />
        <circle cx="14" cy="18" r="1.8" fill="#ff6d6d" fillOpacity="0.2" />
        <circle cx="12" cy="15" r="0.8" fill="#eee" fillOpacity="0.5" />
        <circle cx="18" cy="11" r="0.6" fill="#eee" fillOpacity="0.5" />
      </svg>
    ),
    Mushrooms: ({ className }) => (
      <svg
        viewBox="0 0 25 25"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <ellipse cx="12.5" cy="10" rx="10" ry="8" fill="#c9af94" />
          <ellipse
            cx="12.5"
            cy="10"
            rx="10"
            ry="8"
            fill="none"
            stroke="#a58b6f"
            strokeWidth="0.5"
          />
          <rect x="9.5" y="10" width="6" height="8" rx="2" fill="#f0e6d2" />
          <rect
            x="9.5"
            y="10"
            width="6"
            height="8"
            rx="2"
            fill="none"
            stroke="#dfd2bb"
            strokeWidth="0.5"
          />
          <line
            x1="9.5"
            y1="10"
            x2="9.5"
            y2="5"
            stroke="#a58b6f"
            strokeWidth="0.3"
            strokeOpacity="0.7"
          />
          <line
            x1="12"
            y1="10"
            x2="12"
            y2="5"
            stroke="#a58b6f"
            strokeWidth="0.3"
            strokeOpacity="0.7"
          />
          <line
            x1="14.5"
            y1="10"
            x2="14.5"
            y2="5"
            stroke="#a58b6f"
            strokeWidth="0.3"
            strokeOpacity="0.7"
          />
          <circle cx="10" cy="8" r="1" fill="#876e53" fillOpacity="0.3" />
          <circle cx="14" cy="7" r="0.8" fill="#876e53" fillOpacity="0.3" />
        </g>
      </svg>
    ),
    Olives: ({ className }) => (
      <svg
        viewBox="0 0 15 15"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="7.5" cy="7.5" rx="6" ry="6.5" fill="#2e4031" />
        <ellipse
          cx="7.5"
          cy="7.5"
          rx="6"
          ry="6.5"
          fill="none"
          stroke="#1c2a1e"
          strokeWidth="0.5"
        />
        <ellipse cx="7.5" cy="7.5" rx="2" ry="2.5" fill="#bf2e24" />
        <ellipse
          cx="7.5"
          cy="7.5"
          rx="2"
          ry="2.5"
          fill="none"
          stroke="#9c1e15"
          strokeWidth="0.3"
        />
        <ellipse
          cx="5"
          cy="5"
          rx="1.5"
          ry="1"
          fill="#4b614f"
          fillOpacity="0.6"
        />
      </svg>
    ),
    "Extra cheese": ({ className }) => (
      <svg
        viewBox="0 0 30 30"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="15" cy="15" r="14" fill="#f8e7b3" />
        <circle
          cx="15"
          cy="15"
          r="14"
          fill="none"
          stroke="#e9d28e"
          strokeWidth="0.5"
        />
        <circle cx="11" cy="12" r="2" fill="#f5e9ca" fillOpacity="0.7" />
        <circle cx="18" cy="14" r="2.5" fill="#f5e9ca" fillOpacity="0.7" />
        <circle cx="14" cy="18" r="1.8" fill="#f5e9ca" fillOpacity="0.7" />
        <line
          x1="10"
          y1="10"
          x2="15"
          y2="12"
          stroke="#f5e9ca"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.5"
        />
        <line
          x1="17"
          y1="9"
          x2="20"
          y2="15"
          stroke="#f5e9ca"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.5"
        />
      </svg>
    ),
    Jalapeños: ({ className }) => (
      <svg
        viewBox="0 0 20 20"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10,2 C11.2,2 13.5,3 13.5,5.2 C13.5,7 13,10 12.5,13 C12,16 11,17 10,17.5 C9,17 8,16 7.5,13 C7,10 6.5,7 6.5,5.2 C6.5,3 8.8,2 10,2 Z"
          fill="#2d5718"
        />
        <path
          d="M10,2 C11.2,2 13.5,3 13.5,5.2 C13.5,7 13,10 12.5,13 C12,16 11,17 10,17.5 C9,17 8,16 7.5,13 C7,10 6.5,7 6.5,5.2 C6.5,3 8.8,2 10,2 Z"
          fill="none"
          stroke="#1d3d0f"
          strokeWidth="0.5"
        />
        <path
          d="M9.8,2 C9.8,1.6 10.2,1.6 10.2,2 L10.2,3.5"
          fill="none"
          stroke="#1d3d0f"
          strokeWidth="0.5"
          strokeLinecap="round"
        />
        <ellipse
          cx="10"
          cy="6"
          rx="1.2"
          ry="0.7"
          fill="#f9f7dc"
          fillOpacity="0.7"
        />
        <ellipse
          cx="10"
          cy="10"
          rx="1.2"
          ry="0.7"
          fill="#f9f7dc"
          fillOpacity="0.7"
        />
        <ellipse
          cx="10"
          cy="14"
          rx="1.2"
          ry="0.7"
          fill="#f9f7dc"
          fillOpacity="0.7"
        />
        <path
          d="M8.8,4.5 C9.3,4.7 9.7,4.7 10.2,4.5"
          fill="none"
          stroke="#7fbf55"
          strokeWidth="0.4"
          strokeOpacity="0.6"
          strokeLinecap="round"
        />
      </svg>
    ),
    Pineapple: ({ className }) => (
      <svg
        viewBox="0 0 25 25"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.5,3 L16,6 L18,10 L18,15 L16,19 L12.5,22 L9,19 L7,15 L7,10 L9,6 z"
          fill="#f7d858"
        />
        <path
          d="M12.5,3 L16,6 L18,10 L18,15 L16,19 L12.5,22 L9,19 L7,15 L7,10 L9,6 z"
          fill="none"
          stroke="#d4b72e"
          strokeWidth="0.5"
        />
        <line
          x1="7"
          y1="10"
          x2="18"
          y2="10"
          stroke="#d4b72e"
          strokeWidth="0.5"
        />
        <line
          x1="7"
          y1="15"
          x2="18"
          y2="15"
          stroke="#d4b72e"
          strokeWidth="0.5"
        />
        <line
          x1="12.5"
          y1="3"
          x2="12.5"
          y2="22"
          stroke="#d4b72e"
          strokeWidth="0.5"
        />
        <circle cx="10" cy="8" r="0.4" fill="#d4b72e" fillOpacity="0.5" />
        <circle cx="15" cy="12" r="0.4" fill="#d4b72e" fillOpacity="0.5" />
        <circle cx="11" cy="17" r="0.4" fill="#d4b72e" fillOpacity="0.5" />
      </svg>
    ),
    Anchovies: ({ className }) => (
      <svg
        viewBox="0 0 35 35"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7,15 C7,11.5 9.5,8.5 13,7.5 C16,6.8 21,6.8 23,7.5 C26.5,8.5 28,11.5 28,15 C28,18.5 26.5,21.5 23,22.5 C21,23.2 16,23.2 13,22.5 C9.5,21.5 7,18.5 7,15 Z"
          fill="#5b6a7a"
        />
        <path
          d="M7,15 C7,11.5 9.5,8.5 13,7.5 C16,6.8 21,6.8 23,7.5 C26.5,8.5 28,11.5 28,15 C28,18.5 26.5,21.5 23,22.5 C21,23.2 16,23.2 13,22.5 C9.5,21.5 7,18.5 7,15 Z"
          fill="none"
          stroke="#3e4a58"
          strokeWidth="0.5"
        />
        <path
          d="M7,15 L4.5,11.5 C4,12.5 4,13.5 4,15 C4,16.5 4,17.5 4.5,18.5 L7,15 Z"
          fill="#5b6a7a"
          stroke="#3e4a58"
          strokeWidth="0.4"
        />
        <path d="M6,15 L28,15" fill="none" stroke="#3e4a58" strokeWidth="0.6" />
        {/* Simplified bone structure */}
        <path
          d="M12,15 L11.4,11.5 M12,15 L11.4,18.5 M16,15 L15.4,11.5 M16,15 L15.4,18.5 M20,15 L19.4,11.5 M20,15 L19.4,18.5"
          stroke="#3e4a58"
          strokeWidth="0.3"
          strokeOpacity="0.8"
        />
        <ellipse
          cx="17.5"
          cy="12"
          rx="10"
          ry="2.5"
          fill="#9aa5ad"
          fillOpacity="0.4"
        />
        <circle
          cx="25.5"
          cy="13.5"
          r="0.8"
          fill="#111"
          stroke="#000"
          strokeWidth="0.2"
        />
      </svg>
    ),
    Sausage: ({ className }) => (
      <svg
        viewBox="0 0 30 30"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="15" cy="15" r="12" fill="#ad6952" />
        <circle
          cx="15"
          cy="15"
          r="12"
          fill="none"
          stroke="#8c5241"
          strokeWidth="0.5"
        />
        <circle cx="11" cy="11" r="1.2" fill="#8c5241" fillOpacity="0.4" />
        <circle cx="17" cy="14" r="1.6" fill="#8c5241" fillOpacity="0.4" />
        <circle cx="14" cy="18" r="1" fill="#8c5241" fillOpacity="0.4" />
        <circle cx="18" cy="10" r="0.8" fill="#eee1d5" fillOpacity="0.6" />
        <circle cx="12" cy="15" r="0.7" fill="#eee1d5" fillOpacity="0.6" />
        <circle cx="15" cy="12" r="0.6" fill="#eee1d5" fillOpacity="0.6" />
      </svg>
    ),
    Onions: ({ className }) => (
      <svg
        viewBox="0 0 30 30"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10,15 C10,10 15,5 20,10 C25,15 20,20 15,20 C10,20 10,15 10,15 Z"
          fill="#e8cee4"
          fillOpacity="0.9"
        />
        <path
          d="M10,15 C10,10 15,5 20,10 C25,15 20,20 15,20 C10,20 10,15 10,15 Z"
          fill="none"
          stroke="#d1b2cc"
          strokeWidth="0.5"
        />
        <path
          d="M12,15 C12,12 15,9 18,12 C21,15 18,18 15,18 C12,18 12,15 12,15 Z"
          fill="none"
          stroke="#d1b2cc"
          strokeWidth="0.3"
        />
        <path
          d="M14,15 C14,13 15,12 16,13 C17,14 16,16 15,16 C14,16 14,15 14,15 Z"
          fill="none"
          stroke="#d1b2cc"
          strokeWidth="0.3"
        />
      </svg>
    ),
    Bacon: ({ className }) => (
      <svg
        viewBox="0 0 30 30"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5,10 C10,5 20,5 25,10 C25,15 20,20 15,20 C10,20 5,15 5,10 Z"
          fill="#d67c63"
        />
        <path
          d="M5,10 C10,5 20,5 25,10 C25,15 20,20 15,20 C10,20 5,15 5,10 Z"
          fill="none"
          stroke="#b15b45"
          strokeWidth="0.5"
        />
        <path
          d="M7,12 C12,7 18,7 23,12"
          fill="none"
          stroke="#f3d6c9"
          strokeWidth="3"
        />
        <path
          d="M8,15 C13,10 17,10 22,15"
          fill="none"
          stroke="#f3d6c9"
          strokeWidth="2"
        />
        <path
          d="M9,17 C13,13 17,13 21,17"
          fill="none"
          stroke="#f3d6c9"
          strokeWidth="1.5"
        />
      </svg>
    ),
    Ham: ({ className }) => (
      <svg
        viewBox="0 0 30 30"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5,10 C10,5 20,5 25,10 C25,15 20,25 15,25 C10,25 5,15 5,10 Z"
          fill="#e0a5a0"
        />
        <path
          d="M5,10 C10,5 20,5 25,10 C25,15 20,25 15,25 C10,25 5,15 5,10 Z"
          fill="none"
          stroke="#c28985"
          strokeWidth="0.5"
        />
        <circle cx="10" cy="12" r="1" fill="#c28985" fillOpacity="0.3" />
        <circle cx="15" cy="15" r="1.2" fill="#c28985" fillOpacity="0.3" />
        <circle cx="20" cy="17" r="0.8" fill="#c28985" fillOpacity="0.3" />
        <ellipse
          cx="15"
          cy="12"
          rx="8"
          ry="3"
          fill="#ecc8c5"
          fillOpacity="0.4"
        />
      </svg>
    ),
    Peppers: ({ className }) => (
      <svg
        viewBox="0 0 25 25"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.5,3 C14,3 15,4 15,5 C15,6 14,9 13,12 C16,13 19,14 20,14 C21,15 21,16 20,17 C19,18 16,19 13,18 C12,21 11,24 10,24 C9,25 8,24 8,23 C8,22 9,19 10,16 C7,15 4,14 3,13 C2,12 2,11 3,10 C4,9 7,8 10,9 C11,6 12,3 12.5,3 Z"
          fill="#4a8b32"
        />
        <path
          d="M12.5,3 C14,3 15,4 15,5 C15,6 14,9 13,12 C16,13 19,14 20,14 C21,15 21,16 20,17 C19,18 16,19 13,18 C12,21 11,24 10,24 C9,25 8,24 8,23 C8,22 9,19 10,16 C7,15 4,14 3,13 C2,12 2,11 3,10 C4,9 7,8 10,9 C11,6 12,3 12.5,3 Z"
          fill="none"
          stroke="#3a6e27"
          strokeWidth="0.5"
        />
        <path
          d="M12.5,5 C13,5 13.5,5.5 13.5,6 C13.5,7 12.5,10 11.5,13"
          stroke="#6fba51"
          strokeWidth="0.5"
          fill="none"
        />
        <path
          d="M13,14 C15,15 17,15.5 18,15.5"
          stroke="#6fba51"
          strokeWidth="0.5"
          fill="none"
        />
      </svg>
    ),
    "Fresh tomato": ({ className }) => (
      <svg
        viewBox="0 0 25 25"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12.5" cy="12.5" r="10" fill="#e14736" />
        <circle
          cx="12.5"
          cy="12.5"
          r="10"
          fill="none"
          stroke="#b22f1f"
          strokeWidth="0.5"
        />
        <circle cx="12.5" cy="12.5" r="8" fill="#ef6f60" fillOpacity="0.3" />
        <circle cx="12.5" cy="12.5" r="6" fill="#ef6f60" fillOpacity="0.3" />
        <path d="M12.5,2.5 L13.5,4.5 L11.5,4.5 Z" fill="#5e8c26" />
        <circle cx="10" cy="10" r="0.8" fill="#f0dbaa" />
        <circle cx="15" cy="12" r="0.8" fill="#f0dbaa" />
        <circle cx="12" cy="15" r="0.8" fill="#f0dbaa" />
        <circle cx="9.5" cy="9.5" r="3" fill="#f26b5b" fillOpacity="0.5" />
      </svg>
    ),
    "Fresh garlic": ({ className }) => (
      <svg
        viewBox="0 0 25 25"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9,17 C6,16 5,13 6,10 C7,7 10,5 13,6 C16,7 17,10 16,13 C15,16 12,18 9,17 Z"
          fill="#f5f3e6"
        />
        <path
          d="M9,17 C6,16 5,13 6,10 C7,7 10,5 13,6 C16,7 17,10 16,13 C15,16 12,18 9,17 Z"
          fill="none"
          stroke="#e0d8c0"
          strokeWidth="0.5"
        />
        <path
          d="M11,16 C9,15 8,13 8.5,11 C9,9 11,7.5 13,8 C15,8.5 16,10.5 15.5,12.5 C15,14.5 13,16 11,16 Z"
          fill="none"
          stroke="#e0d8c0"
          strokeWidth="0.3"
        />
        <path
          d="M7.5,10.5 C10,10 12.5,10 15,11"
          fill="none"
          stroke="#e0d8c0"
          strokeWidth="0.3"
        />
        <path
          d="M7,12 C9.5,12 12,12.5 14.5,13"
          fill="none"
          stroke="#e0d8c0"
          strokeWidth="0.3"
        />
        <path
          d="M7.5,13.5 C9.5,14 11.5,14.5 13.5,14.5"
          fill="none"
          stroke="#e0d8c0"
          strokeWidth="0.3"
        />
      </svg>
    ),
    "Fresh basil": ({ className }) => (
      <svg
        viewBox="0 0 25 25"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.5,5 C16,5 20,9 20,14 C20,19 16,20 12.5,20 C9,20 5,19 5,14 C5,9 9,5 12.5,5 Z"
          fill="#386e23"
        />
        <path
          d="M12.5,5 C16,5 20,9 20,14 C20,19 16,20 12.5,20 C9,20 5,19 5,14 C5,9 9,5 12.5,5 Z"
          fill="none"
          stroke="#29561a"
          strokeWidth="0.5"
        />
        <path
          d="M12.5,5 L12.5,20"
          fill="none"
          stroke="#29561a"
          strokeWidth="0.5"
        />
        <path d="M8,8 L17,8" fill="none" stroke="#29561a" strokeWidth="0.5" />
        <path d="M6,12 L19,12" fill="none" stroke="#29561a" strokeWidth="0.5" />
        <path d="M7,16 L18,16" fill="none" stroke="#29561a" strokeWidth="0.5" />
        <path
          d="M10,7 C12,7 15,8 16,10"
          fill="none"
          stroke="#65a347"
          strokeWidth="0.5"
          strokeOpacity="0.6"
        />
      </svg>
    ),
    Chicken: ({ className }) => (
      <svg
        viewBox="0 0 30 30"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10,10 C12,8 18,8 20,10 C22,12 22,18 20,20 C18,22 12,22 10,20 C8,18 8,12 10,10 Z"
          fill="#e9c8a0"
        />
        <path
          d="M10,10 C12,8 18,8 20,10 C22,12 22,18 20,20 C18,22 12,22 10,20 C8,18 8,12 10,10 Z"
          fill="none"
          stroke="#c7a67e"
          strokeWidth="0.5"
        />
        <line x1="9" y1="12" x2="21" y2="12" stroke="#9e7c53" strokeWidth="1" />
        <line x1="9" y1="15" x2="21" y2="15" stroke="#9e7c53" strokeWidth="1" />
        <line x1="9" y1="18" x2="21" y2="18" stroke="#9e7c53" strokeWidth="1" />
        <circle cx="12" cy="11" r="0.5" fill="#c7a67e" fillOpacity="0.7" />
        <circle cx="18" cy="13" r="0.5" fill="#c7a67e" fillOpacity="0.7" />
        <circle cx="15" cy="17" r="0.5" fill="#c7a67e" fillOpacity="0.7" />
        <circle cx="13" cy="14" r="0.3" fill="#4d4032" />
        <circle cx="17" cy="11" r="0.3" fill="#4d4032" />
      </svg>
    ),
    Spinach: ({ className }) => (
      <svg
        viewBox="0 0 30 30"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15,5 C19,5 23,9 23,15 C23,21 19,25 15,25 C11,25 7,21 7,15 C7,9 11,5 15,5 Z"
          fill="#295c1e"
        />
        <path
          d="M15,5 C19,5 23,9 23,15 C23,21 19,25 15,25 C11,25 7,21 7,15 C7,9 11,5 15,5 Z"
          fill="none"
          stroke="#1b3d12"
          strokeWidth="0.5"
        />
        <path d="M15,5 L15,25" fill="none" stroke="#1b3d12" strokeWidth="0.5" />
        <path d="M9,10 L21,10" fill="none" stroke="#1b3d12" strokeWidth="0.5" />
        <path d="M8,15 L22,15" fill="none" stroke="#1b3d12" strokeWidth="0.5" />
        <path d="M9,20 L21,20" fill="none" stroke="#1b3d12" strokeWidth="0.5" />
        <path
          d="M12,7 C13,7 14,7.5 15,8"
          fill="none"
          stroke="#1b3d12"
          strokeWidth="0.3"
        />
        <path
          d="M12,12 C13,12.5 14,13 15,13"
          fill="none"
          stroke="#1b3d12"
          strokeWidth="0.3"
        />
        <path
          d="M12,17 C13,17.5 14,18 15,18"
          fill="none"
          stroke="#1b3d12"
          strokeWidth="0.3"
        />
        <path
          d="M12,22 C13,22.5 14,23 15,23"
          fill="none"
          stroke="#1b3d12"
          strokeWidth="0.3"
        />
        <path
          d="M11,8 C13,7 15,7 17,8"
          fill="none"
          stroke="#3d8029"
          strokeWidth="0.5"
          strokeOpacity="0.6"
        />
      </svg>
    ),
    Meatball: ({ className }) => (
      <svg
        viewBox="0 0 25 25"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12.5" cy="12.5" r="10" fill="#855240" />
        <circle
          cx="12.5"
          cy="12.5"
          r="10"
          fill="none"
          stroke="#693c2e"
          strokeWidth="0.5"
        />
        <circle cx="10" cy="10" r="1" fill="#693c2e" fillOpacity="0.4" />
        <circle cx="15" cy="12" r="1.2" fill="#693c2e" fillOpacity="0.4" />
        <circle cx="11" cy="15" r="0.8" fill="#693c2e" fillOpacity="0.4" />
        <circle cx="14" cy="9" r="0.6" fill="#693c2e" fillOpacity="0.4" />
        <circle cx="9" cy="13" r="0.4" fill="#472a22" />
        <circle cx="16" cy="15" r="0.4" fill="#472a22" />
      </svg>
    ),
    Salami: ({ className }) => (
      <svg
        viewBox="0 0 25 25"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12.5" cy="12.5" r="11" fill="#a13c2e" />
        <circle
          cx="12.5"
          cy="12.5"
          r="11"
          fill="none"
          stroke="#85301f"
          strokeWidth="0.5"
        />
        <circle cx="9" cy="9" r="1.2" fill="#e8d8cc" fillOpacity="0.7" />
        <circle cx="14" cy="11" r="1.5" fill="#e8d8cc" fillOpacity="0.7" />
        <circle cx="11" cy="15" r="1" fill="#e8d8cc" fillOpacity="0.7" />
        <circle cx="16" cy="14" r="0.8" fill="#e8d8cc" fillOpacity="0.7" />
        <circle cx="10" cy="12" r="0.3" fill="#333" />
        <circle cx="15" cy="9" r="0.3" fill="#333" />
        <circle cx="13" cy="16" r="0.3" fill="#333" />
      </svg>
    ),
    default: ({ className }) => (
      <svg
        viewBox="0 0 30 30"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="15" cy="15" r="13" fill="#b71c1c" />
        <circle
          cx="15"
          cy="15"
          r="13"
          fill="none"
          stroke="#700606"
          strokeWidth="0.5"
        />
      </svg>
    ),
    Artichokes: ({ className }) => (
      <svg
        viewBox="0 0 30 30"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="15" cy="15" r="7" fill="#a3b08d" />
        <circle
          cx="15"
          cy="15"
          r="7"
          fill="none"
          stroke="#88997a"
          strokeWidth="0.5"
        />
        {/* Simplified artichoke leaves with varied lengths */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const angle = (i / 8) * Math.PI * 2;
          const length = 5 + (i % 3);
          const endX = 15 + Math.cos(angle) * (7 + length);
          const endY = 15 + Math.sin(angle) * (7 + length);

          return (
            <path
              key={i}
              d={`M15,15 L${15 + Math.cos(angle) * 7} ${
                15 + Math.sin(angle) * 7
              } ${endX} ${endY}`}
              stroke="#88997a"
              strokeWidth={1.8 - (i % 3) * 0.2}
              fill="none"
              strokeLinecap="round"
            />
          );
        })}
        <circle cx="15" cy="15" r="5" fill="#88997a" fillOpacity="0.4" />
        <circle cx="15" cy="15" r="3" fill="#697a57" fillOpacity="0.5" />
      </svg>
    ),
    Broccoli: ({ className }) => (
      <svg
        viewBox="0 0 30 30"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13,18 L13,25 C13,25.5 13.5,26 15,26 C16.5,26 17,25.5 17,25 L17,18"
          fill="#88a467"
        />
        <path
          d="M13,18 L13,25 C13,25.5 13.5,26 15,26 C16.5,26 17,25.5 17,25 L17,18"
          fill="none"
          stroke="#738a57"
          strokeWidth="0.4"
        />
        <circle cx="15" cy="12" r="8" fill="#3c7a1e" />
        <circle
          cx="15"
          cy="12"
          r="8"
          fill="none"
          stroke="#306617"
          strokeWidth="0.5"
        />
        {/* Center floret */}
        <circle cx="15" cy="10" r="2.5" fill="#346b19" />
        <circle
          cx="15"
          cy="10"
          r="2.5"
          fill="none"
          stroke="#255313"
          strokeWidth="0.3"
        />

        {/* Simplified surrounding florets */}
        <circle cx="11" cy="12" r="2" fill="#346b19" />
        <circle
          cx="11"
          cy="12"
          r="2"
          fill="none"
          stroke="#255313"
          strokeWidth="0.3"
        />

        <circle cx="19" cy="12" r="2" fill="#346b19" />
        <circle
          cx="19"
          cy="12"
          r="2"
          fill="none"
          stroke="#255313"
          strokeWidth="0.3"
        />

        <circle cx="15" cy="16" r="2" fill="#346b19" />
        <circle
          cx="15"
          cy="16"
          r="2"
          fill="none"
          stroke="#255313"
          strokeWidth="0.3"
        />
      </svg>
    ),
    Eggplant: ({ className }) => (
      <svg
        viewBox="0 0 30 30"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15,5 C18,5 20,7 20,10 C20,15 17,25 15,25 C13,25 10,15 10,10 C10,7 12,5 15,5 Z"
          fill="#4d2e69"
        />
        <path
          d="M15,5 C18,5 20,7 20,10 C20,15 17,25 15,25 C13,25 10,15 10,10 C10,7 12,5 15,5 Z"
          fill="none"
          stroke="#3b234f"
          strokeWidth="0.5"
        />
        <path
          d="M13.5,5 C13.5,4 14,3 15,2.5 C16,2 17,2.5 17.5,3.5 C18,4.5 17.5,5 17,5.5"
          fill="#567d46"
        />
        <path
          d="M13.5,5 C13.5,4 14,3 15,2.5 C16,2 17,2.5 17.5,3.5 C18,4.5 17.5,5 17,5.5"
          fill="none"
          stroke="#3e5b32"
          strokeWidth="0.4"
        />
        <path
          d="M13,5.5 C12,4.5 12.5,4 13.5,4 L16.5,4 C17.5,4 18,4.5 17,5.5"
          fill="#4a6d3e"
          stroke="#3e5b32"
          strokeWidth="0.3"
        />
        <line
          x1="11"
          y1="10"
          x2="19"
          y2="10"
          stroke="#3b234f"
          strokeWidth="0.3"
          strokeOpacity="0.5"
        />
        <line
          x1="11"
          y1="15"
          x2="19"
          y2="15"
          stroke="#3b234f"
          strokeWidth="0.3"
          strokeOpacity="0.5"
        />
        <line
          x1="12"
          y1="20"
          x2="18"
          y2="20"
          stroke="#3b234f"
          strokeWidth="0.3"
          strokeOpacity="0.5"
        />
        <ellipse
          cx="15"
          cy="12"
          rx="3"
          ry="6"
          fill="#5a3778"
          fillOpacity="0.3"
        />
      </svg>
    ),
  };

  return thumbnailMap[toppingName] || thumbnailMap["default"];
};

// Add a pizza slice component for the results page
export const SliceSVG: React.FC<{
  fillPercentage: number;
  className?: string;
}> = ({ fillPercentage, className }) => {
  // Ensure percentage is within bounds
  const percentage = Math.min(100, Math.max(0, fillPercentage));

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 333.25 333.25"
      className={className}
    >
      {/* Background slice with lower opacity */}
      <path
        d="M332.74,254.12l-39.94-226.52c-3.2-18.16-20.52-30.29-38.68-27.08L27.6,40.45C9.44,43.66-2.69,60.97.51,79.13l39.94,226.52c3.2,18.16,20.52,30.29,38.68,27.08l226.52-39.94c18.16-3.2,30.29-20.52,27.08-38.68Z"
        style={{ fill: "#191919", fillRule: "evenodd", opacity: 0.4 }}
      />

      {/* Filled slice with clip path for percentage */}
      <defs>
        <clipPath id="fillClip">
          <rect
            x="0"
            y={333.25 * (1 - percentage / 100)}
            width="333.25"
            height={333.25 * (percentage / 100)}
          />
        </clipPath>
      </defs>

      <path
        d="M332.74,254.12l-39.94-226.52c-3.2-18.16-20.52-30.29-38.68-27.08L27.6,40.45C9.44,43.66-2.69,60.97.51,79.13l39.94,226.52c3.2,18.16,20.52,30.29,38.68,27.08l226.52-39.94c18.16-3.2,30.29-20.52,27.08-38.68Z"
        style={{
          fill: "#191919",
          fillRule: "evenodd",
          clipPath: "url(#fillClip)",
        }}
      />
      {/* Lower opacity background slice */}
      <path
        d="M332.74,254.12l-39.94-226.52c-3.2-18.16-20.52-30.29-38.68-27.08L27.6,40.45C9.44,43.66-2.69,60.97.51,79.13l39.94,226.52c3.2,18.16,20.52,30.29,38.68,27.08l226.52-39.94c18.16-3.2,30.29-20.52,27.08-38.68Z"
        style={{ fill: "#191919", fillRule: "evenodd", opacity: 0.5 }}
      />
      <path
        d="M250.97,132.18c-.09-.53-.38-.95-.79-1.17-.4-.21-.87-.2-1.33,0l-7.35,3.44c-.93.43-1.54,1.64-1.35,2.69l.64,3.58c.16.93-.37,1.99-1.19,2.38l-7.72,3.61c-.37.17-.74.18-1.06.01-.33-.17-.56-.51-.63-.95l-2.08-11.79c-.16-.93.37-1.99,1.19-2.37l12.18-5.7c4.27-2,7.06-7.55,6.2-12.37l-3.32-18.81c-.42-2.41-1.67-4.27-3.51-5.23-1.75-.92-3.83-.9-5.87.06l-16.65,7.79c-4.27,2-7.06,7.55-6.2,12.37l8.39,47.61-9.71,4.54-1.79-10.08c-.09-.54-.37-.95-.79-1.17-.4-.2-.86-.2-1.32,0l-7.35,3.44c-.93.44-1.54,1.64-1.35,2.7l.65,3.57c.16.93-.37,1.99-1.19,2.37l-7.72,3.61c-.38.17-.74.18-1.06.02-.33-.17-.56-.51-.64-.96l-6.53-37.01c-.16-.93.37-1.99,1.18-2.37l7.72-3.61c.38-.18.75-.18,1.06-.02.33.17.56.51.63.95l1.6,9.16c.1.54.38.95.79,1.17.4.21.87.2,1.32,0l7.35-3.44c.93-.43,1.54-1.64,1.35-2.69l-2.32-13.18c-.42-2.41-1.67-4.27-3.51-5.23-1.75-.92-3.84-.89-5.87.06l-16.63,7.77c-4.27,2-7.06,7.55-6.2,12.37l8.4,47.61-10.4,4.86-6.06-34.35c-.1-.54-.38-.95-.79-1.17-.4-.21-.87-.2-1.32,0l-7.35,3.44c-.93.44-1.54,1.65-1.35,2.7l6.07,34.43-6.41,2.99-.53-2.94c-.09-.53-.38-.95-.79-1.17-.4-.2-.87-.2-1.32.01l-11.05,5.2-8.72-49.48c-.09-.54-.38-.95-.79-1.17-.4-.2-.87-.2-1.32.01l-7.35,3.44c-.93.43-1.54,1.64-1.35,2.69l9.6,54.46-10.04,4.7c.21-1.27.21-2.5,0-3.67l-1.96-11.01c-.93-5.26-4.54-8.67-9.2-8.69l-14.71-.48c-.55-.03-.95-.44-1.06-1.07l-1.56-8.85c-.16-.93.37-1.99,1.19-2.37l7.72-3.61c.38-.17.74-.18,1.06-.02.33.17.56.51.64.96l.99,5.64c.09.53.37.95.79,1.17.4.2.86.2,1.32,0l7.35-3.44c.93-.44,1.54-1.65,1.35-2.7l-1.71-9.66c-.43-2.41-1.67-4.27-3.51-5.23-1.75-.92-3.83-.9-5.87.06l-16.65,7.79c-4.27,2-7.06,7.54-6.2,12.37l2.2,12.52c.95,5.39,4.62,9.02,9.36,9.25l14.66.46c.55.03.95.44,1.06,1.07l1.37,7.7c.16.92-.37,1.98-1.18,2.36l-18.25,8.53c-.93.43-1.54,1.64-1.35,2.69l4.97,28.19c.09.53.38.95.79,1.17.27.14.57.19.89.13.14-.03.29-.07.43-.14.07-.04.13-.07.2-.11l154.3-95.05c3.95-2.28,6.32-7.44,5.51-12.01l-1.29-7.34ZM226.19,120.49c-.33-.17-.56-.51-.63-.95l-1.9-10.77c-.16-.93.37-1.99,1.19-2.38l7.72-3.61c.12-.05.24-.09.36-.11.25-.04.49-.01.7.1.33.17.56.51.63.95l1.9,10.77c.16.93-.37,1.99-1.19,2.38l-7.72,3.61c-.37.17-.74.18-1.06.02Z"
        style={{ fill: "#fdc831" }}
      />
      <path
        d="M149.09,139.66c.09.53.38.95.79,1.16.27.14.57.19.89.13.14-.03.29-.07.43-.14l7.35-3.44c.94-.43,1.54-1.64,1.35-2.69l-1.28-7.29c-.09-.53-.37-.95-.79-1.17-.4-.2-.86-.2-1.32,0l-7.36,3.44c-.93.44-1.54,1.65-1.35,2.7l1.28,7.29Z"
        style={{ fill: "#fdc831" }}
      />
    </svg>
  );
};

export const LogoRA: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 343.78 36.68"
      style={{ width: "100%" }}
    >
      <path
        d="M16.66,16.55A29.4,29.4,0,0,1,36.57,8h.88V0A37.68,37.68,0,0,0,11.06,10.9,37.29,37.29,0,0,0,0,36.68H8v-.07A29.48,29.48,0,0,1,16.66,16.55Z"
        style={{ fill: "#010101" }}
      />
      <path
        d="M19.2,18.28a26.91,26.91,0,0,0-8,18.4H37.47V10.4A26.86,26.86,0,0,0,19.2,18.28Zm2.07,12.14h0a9.6,9.6,0,0,1,9.6-9.52v9.6Z"
        style={{ fill: "#010101" }}
      />
      <path
        d="M69.12,13.92A6.8,6.8,0,0,1,71.5,12.5a8.59,8.59,0,0,1,3.19-.74h.41a2.32,2.32,0,0,1,1.11.21v3.91A4,4,0,0,0,75,15.76h-.48a13.77,13.77,0,0,0-5.43.84V33H65.17V12.31h4Z"
        style={{ fill: "#010101" }}
      />
      <path
        d="M80.26,8.19V3.94h4.33V8.19Zm4.16,4.12V33H80.51V12.31Z"
        style={{ fill: "#010101" }}
      />
      <path
        d="M93.86,19.66v6q0,4.89,5.14,4.89h.89c3.41,0,5.11-1.38,5.11-4.16h3.78a6.72,6.72,0,0,1-2.1,5.33,8.66,8.66,0,0,1-6,1.86H98.24a8.37,8.37,0,0,1-6.19-2.13A7.52,7.52,0,0,1,89.94,26V19.54A7.73,7.73,0,0,1,92.07,14a8.17,8.17,0,0,1,6.17-2.19h2.46a8.8,8.8,0,0,1,6,1.84A6.73,6.73,0,0,1,108.76,19H105a3.57,3.57,0,0,0-1.47-3.16,6.32,6.32,0,0,0-3.76-1h-.64a5.38,5.38,0,0,0-3.93,1.32A4.88,4.88,0,0,0,93.86,19.66Z"
        style={{ fill: "#010101" }}
      />
      <path
        d="M117.82,19.66v6q0,4.89,5.14,4.89h.89c3.4,0,5.1-1.38,5.1-4.16h3.78a6.73,6.73,0,0,1-2.1,5.33,8.63,8.63,0,0,1-5.95,1.86h-2.54A8.36,8.36,0,0,1,116,31.48,7.52,7.52,0,0,1,113.84,26V19.54A7.69,7.69,0,0,1,116,14a8.17,8.17,0,0,1,6.17-2.19h2.46a8.8,8.8,0,0,1,6,1.84A6.78,6.78,0,0,1,132.64,19h-3.77a3.58,3.58,0,0,0-1.43-3.16,6.32,6.32,0,0,0-3.76-1H123a5.39,5.39,0,0,0-4,1.32A4.81,4.81,0,0,0,117.82,19.66Z"
        style={{ fill: "#010101" }}
      />
      <path
        d="M155.06,19.45V28a17.8,17.8,0,0,0,.81,5l-3.91.55a8.89,8.89,0,0,1-.68-2.08,10.93,10.93,0,0,1-6.84,2.13H144a7.63,7.63,0,0,1-4.76-1.43,4.76,4.76,0,0,1-1.87-4v-.47q0-5.68,8-6.34l5.68-.46V19.41q0-4.63-4.41-4.64h-.4a4.12,4.12,0,0,0-4.5,4.44h-3.68a7.34,7.34,0,0,1,2-5.41,8.09,8.09,0,0,1,5.95-2h.81q4.4,0,6.27,2A8.19,8.19,0,0,1,155.06,19.45Zm-3.92,4.14-5.57.53q-4.22.39-4.22,3.26v.34a2.58,2.58,0,0,0,1,2.09,3.79,3.79,0,0,0,2.47.77h1a7.78,7.78,0,0,0,5.32-1.85V23.59Z"
        style={{ fill: "#010101" }}
      />
      <path
        d="M164.93,13.92a6.8,6.8,0,0,1,2.38-1.42,8.59,8.59,0,0,1,3.19-.74h.43A2.3,2.3,0,0,1,172,12v3.91a4.76,4.76,0,0,0-1.19-.12h-.46a13.82,13.82,0,0,0-5.44.84V33H161V12.31h3.95Z"
        style={{ fill: "#010101" }}
      />
      <path
        d="M191,33V31.82a11.47,11.47,0,0,1-6.51,1.83H184a8.12,8.12,0,0,1-6-2.1A7.68,7.68,0,0,1,175.89,26V19.54A7.72,7.72,0,0,1,178,13.92a8.31,8.31,0,0,1,6.2-2.16h2.38a16.59,16.59,0,0,1,4.38.55V5.46l-.21-3.95,4.16-.43V33Zm0-3.95V15.33a17,17,0,0,0-4.76-.56h-1.11q-5.29,0-5.31,4.89v5.83c0,3.39,1.72,5.09,5.14,5.09h.77A10.57,10.57,0,0,0,191,29.06Z"
        style={{ fill: "#010101" }}
      />
      <path
        d="M200.5,19.54A7.69,7.69,0,0,1,202.63,14a8.15,8.15,0,0,1,6.16-2.19h2.9A8.14,8.14,0,0,1,217.84,14,7.69,7.69,0,0,1,220,19.54V26a7.52,7.52,0,0,1-2.11,5.52,8.32,8.32,0,0,1-6.17,2.13h-2.9a8.36,8.36,0,0,1-6.16-2.13A7.48,7.48,0,0,1,200.5,26Zm3.92,6.15q0,4.89,5.14,4.89H211q5,0,5-4.89V19.62a4.85,4.85,0,0,0-1.27-3.57,5.38,5.38,0,0,0-4-1.29h-1.07a5.35,5.35,0,0,0-4,1.32,4.72,4.72,0,0,0-1.29,3.57Z"
        style={{ fill: "#010101" }}
      />
      <path
        d="M245.94,33.1l-5.95.51a5.1,5.1,0,0,1-.81-2.09,10.42,10.42,0,0,1-6.76,2.09h-.85a7.59,7.59,0,0,1-5-1.6,5.22,5.22,0,0,1-1.93-4.22v-.73q0-6,8.64-6.42l5.43-.3v-.5a3,3,0,0,0-3.41-3.41h-.29c-2.38,0-3.66,1.08-3.66,3.23h-6.16a7.58,7.58,0,0,1,2.26-5.76,9.33,9.33,0,0,1,6.66-2.14h2.38q4.29,0,6.36,2.16A7.65,7.65,0,0,1,245,19.41v7.65A18.83,18.83,0,0,0,245.94,33.1Zm-7.23-8.88-4.23.4c-2.28.17-3.42.92-3.42,2.26v.21a1.67,1.67,0,0,0,.79,1.44,3.68,3.68,0,0,0,2.1.53h.38a8.38,8.38,0,0,0,4.47-1.19,17.24,17.24,0,0,1-.09-2Z"
        style={{ fill: "#010101" }}
      />
      <path
        d="M257.16,6.57V33h-6.25V1.51l6.68-.43Z"
        style={{ fill: "#010101" }}
      />
      <path
        d="M270.55,17.07v8.54a4,4,0,0,0,.67,2.38,2.55,2.55,0,0,0,2.22,1h.72a5.51,5.51,0,0,0,1.62-.22v4.38a7.26,7.26,0,0,1-3,.51h-.84c-2.65,0-4.57-.64-5.76-1.94a6.74,6.74,0,0,1-1.81-4.86V17.07h-3.73V12.78l3.79-.34V7.68l6.14-.54V12.5h5.23v4.62Z"
        style={{ fill: "#010101" }}
      />
      <path
        d="M279.9,9.12V2.87h6.5V9.12Zm6.38,3.32V33H280V12.44Z"
        style={{ fill: "#010101" }}
      />
      <path
        d="M307.35,26.59h6.09a6.5,6.5,0,0,1-2.09,5.18c-1.39,1.23-3.72,1.84-7,1.84h-3.83a9.2,9.2,0,0,1-6.5-2.09,7,7,0,0,1-2.21-5.34V19.64A7.77,7.77,0,0,1,293.94,14a8.65,8.65,0,0,1,6.44-2.22h4.51c2.91,0,5.09.74,6.52,2.21a7.52,7.52,0,0,1,2.14,5.48V24.5H298v.81a3.58,3.58,0,0,0,1,2.62,4.29,4.29,0,0,0,3.19,1h1.19C306,28.93,307.33,28.14,307.35,26.59Zm0-6.45c0-2.48-1.33-3.71-4-3.71H302q-4,0-4,3.74v.22h9.35Z"
        style={{ fill: "#010101" }}
      />
      <path
        d="M325.38,14.09a8.8,8.8,0,0,1,3-1.61,10,10,0,0,1,3.33-.72h.43a2.17,2.17,0,0,1,1.06.21v5.79a5.37,5.37,0,0,0-1.19-.14h-.68a24.33,24.33,0,0,0-6,.64V33h-6.25V12.44h6.25Z"
        style={{ fill: "#010101" }}
      />
      <path
        d="M337.28,9.12V2.87h6.5V9.12Zm6.38,3.32V33h-6.24V12.44Z"
        style={{ fill: "#010101" }}
      />
    </svg>
  );
};
