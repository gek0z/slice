import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { SliceSVG } from "~/components/pizza-svg-components";
import { useEffect, useState } from "react";

export default function PizzaResult({
  matchScore,
  comparisons,
  handleReset,
}: {
  matchScore: number;
  comparisons: { category: string; userChoice: string; percentage: number }[];
  handleReset: () => void;
}) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [mostSimilar, setMostSimilar] = useState<string>("");
  const [leastSimilar, setLeastSimilar] = useState<string>("");

  // Animate the score from 0 to the final value
  useEffect(() => {
    const duration = 1500; // Duration in milliseconds
    const interval = 10; // Update interval in milliseconds
    const steps = duration / interval;
    const increment = matchScore / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= matchScore) {
        setAnimatedScore(matchScore);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.round(current));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [matchScore]);

  // Find the most and least similar choices
  useEffect(() => {
    if (comparisons.length > 0) {
      // Sort by percentage (highest first)
      const sortedComparisons = [...comparisons].sort(
        (a, b) => b.percentage - a.percentage
      );

      // Get most similar
      const highest = sortedComparisons[0];
      setMostSimilar(
        `${highest.category}| ${highest.userChoice} (${highest.percentage}%)`
      );

      // Get least similar
      const lowest = sortedComparisons[sortedComparisons.length - 1];
      setLeastSimilar(
        `${lowest.category}| ${lowest.userChoice} (${lowest.percentage}%)`
      );
    }
  }, [comparisons]);

  return (
    <Card className="w-full bg-crust-yellow1 border-crust-yellow1 shadow-crust-yellow1">
      <CardContent className="pt-6 px-2 sm:px-6">
        <div className="text-center ">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-4 gap-2">
            <h2 className="text-xl mb-0 font-bold text-crust-neutral9">Your</h2>

            <div className="flex flex-row items-center justify-center mb-0 sm:mb-4">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <SliceSVG
                  fillPercentage={animatedScore}
                  className="w-full h-full"
                />
              </div>
              <span>is</span>{" "}
              <span className="ml-2 font-bold text-3xl w-22 h-22 inline-flex items-center justify-center whitespace-nowrap border border-crust-neutral9 rounded-xl transform rotate-12">
                {animatedScore}
                <span className="text-base mt-2">%</span>
              </span>{" "}
            </div>
            <p className="text-sm sm:text-xl text-crust-neutral9">
              <span className="">similar to the average American</span>
            </p>
          </div>

          <div className="bg-crust-neutral0  rounded-lg mb-6 flex flex-row rounded-xl overflow-hidden">
            <div className="flex-1 bg-crust-green1 flex flex-col items-center justify-center p-2 sm:p-4">
              <div className="font-bold text-crust-white text-sm sm:text-base">
                Most similar
              </div>
              <div className="text-crust-white text-sm sm:text-base font-bold uppercase">
                {mostSimilar.split("|")[0]}
              </div>
              <div className="text-crust-white text-xs sm:text-base ">
                {mostSimilar.split("|")[1]}
              </div>
            </div>
            <div className="flex-1 bg-crust-red1 flex flex-col items-center justify-center p-2 sm:p-4">
              <div className="font-bold text-crust-white text-sm sm:text-base">
                Least similar
              </div>
              <div className="text-crust-white text-sm sm:text-base font-bold uppercase">
                {leastSimilar.split("|")[0]}
              </div>
              <div className="text-crust-white text-xs sm:text-base ">
                {leastSimilar.split("|")[1]}
              </div>
            </div>
          </div>

          <div className="space-y-4 mt-8">
            <h3 className="text-sm sm:text-xl font-semibold mb-4 text-crust-neutral9">
              How Your Choices Compare
            </h3>

            {comparisons.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 items-center"
              >
                <div className="flex justify-start sm:justify-end items-center col-span-1 gap-2">
                  <div className="flex flex-row gap-1 items-center justify-start sm:justify-end flex-wrap">
                    <span className="font-medium text-sm block whitespace-nowrap">
                      {item.category}
                    </span>
                    {item.category === "Toppings" &&
                    item.userChoice !== "None" &&
                    item.userChoice !== "No Toppings" ? (
                      <div className="flex flex-wrap gap-1">
                        {item.userChoice.split(", ").map((topping, i) => (
                          <span
                            key={i}
                            className="font-bold text-xs uppercase text-crust-neutral9 border border-crust-neutral9 rounded-lg px-2 py-1 inline-block h-7 flex items-center justify-center"
                          >
                            {topping.trim()}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="font-bold text-xs uppercase text-crust-neutral9 border border-crust-neutral9 rounded-lg px-2 py-1 inline-block h-7  flex items-center justify-center whitespace-nowrap">
                        {item.userChoice}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-bold bg-crust-neutral9 text-crust-white rounded-lg px-2 py-1 w-11 h-7 flex items-center justify-center order-first sm:order-last ">
                    {item.percentage}
                    <span className="text-[10px] mt-0.5">%</span>
                  </span>
                </div>
                <div className="w-full bg-crust-yellow2 rounded-full h-2 sm:h-6 overflow-hidden col-span-1 mb-2">
                  <div
                    className="bg-crust-neutral9 h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <Button
            onClick={handleReset}
            className="mt-6 bg-crust-neutral9 hover:bg-crust-neutral8 text-crust-white font-bold hover:bg-crust-neutral9"
          >
            Build Another Pizza
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
