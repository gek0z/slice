"use client";

import { useRef, useEffect, useState } from "react";

import type { JSX } from "react";
import {
  ThinCrustSVG,
  ThickCrustSVG,
  StuffedCrustSVG,
  SauceLayerSVG,
  CheeseLayerSVG,
  getToppingComponent,
} from "~/components/pizza-svg-components";

interface PizzaCanvasProps {
  crust: string;
  toppings: string[];
  sauce: string;
}

interface ToppingPosition {
  top: number;
  left: number;
  rotation: number;
  seed?: number; // Add seed for consistent texture patterns
}

export function PizzaCanvas({ crust, toppings, sauce }: PizzaCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [toppingElements, setToppingElements] = useState<JSX.Element[]>([]);

  // Store topping positions persistently
  const toppingPositionsRef = useRef<Record<string, ToppingPosition[]>>({});

  // Keep track of cheese visibility for consistent render
  const hasExtraCheese = toppings.includes("Extra cheese");
  const hasAnyToppings = toppings.length > 0;

  // Helper function to determine how many instances of each topping to show
  const getCountForTopping = (topping: string) => {
    switch (topping) {
      case "Pepperoni":
        return 10;
      case "Extra cheese":
        return 1; // Special case, will be handled differently
      case "Mushrooms":
        return 8;
      case "Olives":
        return 8;
      case "Jalapeños":
        return 6;
      case "Pineapple":
        return 6;
      case "Anchovies":
        return 8;
      case "Sausage":
        return 10;
      case "Onions":
        return 42;
      case "Bacon":
        return 8;
      case "Ham":
        return 8;
      case "Peppers":
        return 8;
      case "Fresh tomato":
        return 10;
      case "Fresh garlic":
        return 18;
      case "Fresh basil":
        return 10;
      case "Chicken":
        return 8;
      case "Spinach":
        return 8;
      case "Meatball":
        return 8;
      case "Salami":
        return 12;
      case "Artichokes":
        return 12;
      case "Broccoli":
        return 12;
      case "Eggplant":
        return 12;
      default:
        return 6;
    }
  };

  // Helper function to determine size for each topping
  const getSizeForTopping = (topping: string) => {
    switch (topping) {
      case "Pepperoni":
        return 42;
      case "Mushrooms":
        return 32;
      case "Olives":
        return 25;
      case "Jalapeños":
        return 30;
      case "Pineapple":
        return 50;
      case "Anchovies":
        return 28;
      case "Sausage":
        return 42;
      case "Onions":
        return 18;
      case "Bacon":
        return 60;
      case "Ham":
        return 45;
      case "Peppers":
        return 20;
      case "Fresh tomato":
        return 42;
      case "Fresh garlic":
        return 14;
      case "Fresh basil":
        return 24;
      case "Chicken":
        return 60;
      case "Spinach":
        return 40;
      case "Meatball":
        return 40;
      case "Salami":
        return 32;
      case "Artichokes":
        return 22;
      case "Broccoli":
        return 22;
      case "Eggplant":
        return 22;
      default:
        return 20;
    }
  };

  // Function to generate a random position for a topping
  const generateToppingPosition = (): ToppingPosition => {
    // Adjust the radius to keep toppings away from the edge
    const maxRadius = 32; // Maximum radius to keep toppings within pizza
    const minRadius = 5; // Minimum radius to avoid center clustering

    // Use true randomness for more realism
    const angle = Math.random() * Math.PI * 2;
    const radius = minRadius + Math.random() * (maxRadius - minRadius);

    // Calculate position with random values
    const top = 50 + Math.sin(angle) * radius;
    const left = 50 + Math.cos(angle) * radius;

    // Random rotation for more realism
    const rotation = Math.random() * 360;

    // Add a consistent seed for rendering textures
    const seed = Math.floor(Math.random() * 10000);

    return { top, left, rotation, seed };
  };

  // Generate topping elements with stable positions
  useEffect(() => {
    const generateToppingElements = () => {
      return toppings.flatMap((topping) => {
        // Skip Extra cheese as it's handled differently
        if (topping === "Extra cheese") {
          return [];
        }

        const count = getCountForTopping(topping);

        // Initialize positions for this topping if they don't exist
        if (!toppingPositionsRef.current[topping]) {
          toppingPositionsRef.current[topping] = Array.from({
            length: count,
          }).map(() => generateToppingPosition());
        }

        // Ensure we have enough positions if count has increased
        if (toppingPositionsRef.current[topping].length < count) {
          const currentLength = toppingPositionsRef.current[topping].length;
          const newPositions = Array.from({
            length: count - currentLength,
          }).map(() => generateToppingPosition());
          toppingPositionsRef.current[topping] = [
            ...toppingPositionsRef.current[topping],
            ...newPositions,
          ];
        }

        // Create elements with stable positions
        return Array.from({ length: count }).map((_, idx) => {
          const { top, left, rotation, seed } =
            toppingPositionsRef.current[topping][idx];
          const size = getSizeForTopping(topping);
          const ToppingComponent = getToppingComponent(topping);

          return (
            <div
              key={`${topping}-${idx}`}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                zIndex: 20 + idx,
                transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
              }}
            >
              <div style={{ width: `${size}px`, height: `${size}px` }}>
                <ToppingComponent
                  className="w-full h-full drop-shadow-md"
                  seed={seed}
                />
              </div>
            </div>
          );
        });
      });
    };

    setToppingElements(generateToppingElements());
  }, [toppings]);

  // Clean up removed toppings from the positions ref
  useEffect(() => {
    // Remove positions for toppings that are no longer present
    const currentToppings = new Set(toppings);
    Object.keys(toppingPositionsRef.current).forEach((topping) => {
      if (!currentToppings.has(topping)) {
        delete toppingPositionsRef.current[topping];
      }
    });
  }, [toppings]);

  const getCrustComponent = () => {
    if (crust === "Thin crust") return ThinCrustSVG;
    if (crust === "Thick crust") return ThickCrustSVG;
    if (crust === "Stuffed crust") return StuffedCrustSVG;
    return ThinCrustSVG;
  };

  // Get the appropriate crust component
  const CrustComponent = getCrustComponent();

  return (
    <div
      ref={(node) => {
        canvasRef.current = node;
      }}
      className={`relative w-full aspect-square rounded-full overflow-hidden`}
    >
      {/* Use a specific layering approach with explicit styles */}

      {/* Base crust layer */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        {crust && <CrustComponent className="w-full h-full" />}
      </div>

      {/* Sauce layer with mix-blend-mode to ensure visual consistency */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 5,
          mixBlendMode: "normal",
          isolation: "isolate",
        }}
      >
        <SauceLayerSVG amount={sauce || "None"} className="w-full h-full" />
      </div>

      {/* Cheese layer with controlled opacity */}
      {(hasExtraCheese || hasAnyToppings) && (
        <div
          className="absolute inset-[8%] "
          style={{
            zIndex: 10,
            // mixBlendMode: "soft-light", // This helps blend better with sauce
            isolation: "isolate",
          }}
        >
          <CheeseLayerSVG
            extraCheese={hasExtraCheese}
            className="w-full h-full"
          />
        </div>
      )}

      {/* Topping layer */}
      <div className="absolute inset-[0]" style={{ zIndex: 15 }}>
        {toppingElements}
      </div>

      {/* Placeholder text when empty */}
      {!crust && !toppings.length && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-center p-4 z-50">
          Select options to build your pizza
        </div>
      )}
    </div>
  );
}
