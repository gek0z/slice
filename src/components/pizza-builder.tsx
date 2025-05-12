"use client";

import { useState } from "react";

import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "~/components/ui/tooltip";

import { PizzaCanvas } from "~/components/pizza-canvas";
import { pizzaData } from "~/lib/pizza-data";
import { calculateMatchScore } from "~/lib/calculate-match";
import { getToppingComponent } from "~/components/pizza-svg-components";
import PizzaResult from "~/components/pizza-result";

// Define interface for regional style
interface RegionalStyle {
  name: string;
  percentage: number;
  description?: string;
}

export default function PizzaBuilder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState({
    crust: "",
    sauce: "",
    toppings: [] as string[],
    style: "",
    eating: "",
    cutting: "",
  });
  const [showResults, setShowResults] = useState(false);
  const [matchScore, setMatchScore] = useState(0);
  const [comparisons, setComparisons] = useState<
    { category: string; userChoice: string; percentage: number }[]
  >([]);

  // Maximum allowed toppings
  const MAX_TOPPINGS = 5;

  const steps = [
    { name: "Crust", key: "crust", options: pizzaData.crustTypes },
    { name: "Sauce", key: "sauce", options: pizzaData.sauceAmounts },
    { name: "Toppings", key: "toppings", options: pizzaData.toppings },
    { name: "Style", key: "style", options: pizzaData.regionalStyles },
    { name: "Eating Method", key: "eating", options: pizzaData.eatingMethods },
    { name: "Cutting Style", key: "cutting", options: pizzaData.cuttingStyles },
  ];

  const currentStepData = steps[currentStep];

  const handleSelect = (option: string) => {
    if (currentStepData.key === "toppings") {
      // For toppings, we allow multiple selections up to MAX_TOPPINGS
      setSelections((prev) => {
        // If already selected, remove it
        if (prev.toppings.includes(option)) {
          return {
            ...prev,
            toppings: prev.toppings.filter((t) => t !== option),
          };
        }

        // If not selected and we're at the limit, don't add
        if (prev.toppings.length >= MAX_TOPPINGS) {
          return prev;
        }

        // Otherwise, add the new topping
        return { ...prev, toppings: [...prev.toppings, option] };
      });
    } else {
      // For other steps, it's a single selection
      setSelections((prev) => ({ ...prev, [currentStepData.key]: option }));
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Calculate match score and show results
      const { score, comparisons: comparisonData } =
        calculateMatchScore(selections);
      setMatchScore(score);
      setComparisons(comparisonData);
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setSelections({
      crust: "",
      sauce: "",
      toppings: [],
      style: "",
      eating: "",
      cutting: "",
    });
    setCurrentStep(0);
    setShowResults(false);
  };

  const isOptionSelected = (option: string) => {
    if (currentStepData.key === "toppings") {
      return selections.toppings.includes(option);
    }
    return (
      selections[currentStepData.key as keyof typeof selections] === option
    );
  };

  const isToppingDisabled = (option: string) => {
    // Only disable if not already selected and we're at the limit
    return (
      currentStepData.key === "toppings" &&
      !selections.toppings.includes(option) &&
      selections.toppings.length >= MAX_TOPPINGS
    );
  };

  const canProceed = () => {
    if (currentStepData.key === "toppings") {
      // Allow proceeding with no toppings selected (removing the requirement for at least one topping)
      return true;
    }
    return !!selections[currentStepData.key as keyof typeof selections];
  };

  if (showResults) {
    return (
      <PizzaResult
        matchScore={matchScore}
        comparisons={comparisons}
        handleReset={handleReset}
      />
    );
  }

  return (
    <TooltipProvider>
      <Card className="w-full  top-0 z-10 pt-6 border-none shadow-none bg-crust-neutral9 overflow-visible p-0">
        <CardContent className="overflow-visible p-0">
          <div className="flex flex-col-reverse sm:flex-row justify-between items-center  px-3 sm:px-6 py-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="text-crust-neutral9 font-bold bg-crust-yellow1 px-2 uppercase text-xs py-1 rounded-full">
                Step {currentStep + 1}
              </span>
              <span className="text-crust-white text-sm sm:text-base">
                Choose Your {currentStepData.name}
              </span>
            </h2>
            <div className="flex gap-2 mt-2 sm:mt-0 mb-4 sm:mb-0">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className={`w-3 h-3 rounded-full ${
                    idx === currentStep
                      ? "bg-crust-yellow1"
                      : idx < currentStep
                      ? "bg-crust-green1"
                      : "bg-crust-neutral3"
                  }`}
                  onClick={() => idx <= currentStep && setCurrentStep(idx)}
                />
              ))}
            </div>
          </div>

          <div className="relative px-3 sm:px-6">
            <div className="flex flex-col items-center sticky top-0 z-10 bg-crust-neutral9 px-4 sm:px-0 mb-5">
              <div className="relative w-full mx-auto">
                <div className="relative z-10 max-w-md w-full mx-auto">
                  <PizzaCanvas
                    crust={selections.crust}
                    toppings={selections.toppings}
                    sauce={selections.sauce}
                  />
                </div>
                {/* gradient overlay at the bottom of the pizza canvas */}
              </div>
              <h3 className="text-sm font-medium mb-0 text-crust-white text-center tracking-wider uppercase  z-10 mt-3">
                Select your {currentStepData.name.toLowerCase()}
              </h3>
              <div className="absolute bottom-[-20px]  left-0 right-0 h-[20px]  bg-gradient-to-b from-crust-neutral9 to-transparent"></div>
            </div>

            <div className="relative ">
              {currentStepData.key === "toppings" && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                  <div
                    className={`p-1 sm:p-3 border rounded-md cursor-pointer transition-colors text-sm sm:text-base ${
                      selections.toppings.length === 0
                        ? "border-crust-yellow1 bg-crust-yellow1 text-crust-neutral9"
                        : "border-crust-neutral3 hover:border-crust-yellow1 text-crust-white"
                    }`}
                    onClick={() =>
                      setSelections((prev) => ({ ...prev, toppings: [] }))
                    }
                  >
                    <div className="flex justify-between items-center flex-1 h-full justify-center">
                      <span className="font-medium">None</span>
                    </div>
                  </div>
                  {currentStepData.options.map((option) => (
                    <ToppingItem
                      key={option.name}
                      name={option.name}
                      isSelected={isOptionSelected(option.name)}
                      isDisabled={isToppingDisabled(option.name)}
                      onSelect={() => handleSelect(option.name)}
                    />
                  ))}
                </div>
              )}

              {currentStepData.key !== "toppings" && (
                <div className="mb-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                    {currentStepData.options.map((option) => (
                      <div
                        key={option.name}
                        className={`p-2 sm:p-3 border rounded-md cursor-pointer transition-colors text-sm sm:text-base ${
                          isOptionSelected(option.name)
                            ? "border-crust-yellow1 bg-crust-yellow1 text-crust-neutral9"
                            : "border-crust-neutral3 hover:border-crust-yellow1 text-crust-white"
                        }`}
                        onClick={() => handleSelect(option.name)}
                      >
                        <div className="flex flex-col sm:flex-row justify-between items-center flex-1 h-full justify-center text-center ">
                          <span className="font-medium">{option.name}</span>

                          {currentStepData.key === "style" && (
                            <>
                              <span
                                className={`text-crust-neutral3 block sm:hidden text-xs ${
                                  isOptionSelected(option.name)
                                    ? "text-crust-neutral9"
                                    : ""
                                }`}
                              >
                                {(option as RegionalStyle).description?.replace(
                                  /\.$/,
                                  ""
                                )}
                              </span>
                              <span className="hidden sm:inline-block ml-2 cursor-help">
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info
                                      size={16}
                                      className={`text-crust-neutral3 transition-colors ${
                                        isOptionSelected(option.name)
                                          ? "text-crust-neutral9 hover:text-crust-neutral9"
                                          : "hover:text-crust-yellow1"
                                      }`}
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent
                                    className="bg-crust-neutral9 border border-crust-neutral6 text-crust-white max-w-xs"
                                    sideOffset={5}
                                  >
                                    <p className="text-xs">
                                      {(option as RegionalStyle).description ||
                                        `${option.name} style pizza.`}
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between mt-10">
            <Button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="text-crust-white w-1/2 text-base uppercase tracking-wider font-bold bg-crust-neutral6 hover:bg-crust-neutral7 rounded-none border-none rounded-b-md !rounded-r-none py-6"
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-crust-green1 hover:bg-crust-green2 text-white font-bold w-1/2 rounded-none text-base uppercase tracking-wider rounded-b-md !rounded-l-none hover:text-crust-neutral9 py-6"
            >
              {currentStep === steps.length - 1 ? "See Results" : "Next"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}

export function ToppingItem({
  name,

  isSelected,
  isDisabled,
  onSelect,
}: {
  name: string;

  isSelected: boolean;
  isDisabled?: boolean;
  onSelect: () => void;
}) {
  // Using the static thumbnail version (isThumbnail=true) to ensure consistent appearance
  const ToppingComponent = getToppingComponent(name, true);

  return (
    <div
      className={`p-2 sm:p-3 border rounded-md cursor-pointer transition-colors flex items-center justify-center gap-2 ${
        isSelected
          ? "border-crust-yellow1 bg-crust-yellow1 text-crust-neutral9"
          : isDisabled
          ? "border-crust-neutral3 bg-crust-neutral3 opacity-50 cursor-not-allowed"
          : "border-crust-neutral3 hover:border-crust-yellow1 text-crust-white"
      }`}
      onClick={isDisabled ? undefined : onSelect}
    >
      <div className="flex-shrink-0 w-5 h-5 sm:w-8 sm:h-8 relative">
        <ToppingComponent className="w-full h-full" />
      </div>
      <div className="text-sm sm:text-base">
        <div className="flex justify-between items-center">
          <span className="font-medium truncate">{name}</span>
        </div>
      </div>
    </div>
  );
}
