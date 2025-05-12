import { pizzaData } from "~/lib/pizza-data";

interface Selections {
  crust: string;
  sauce: string;
  toppings: string[];
  style: string;
  eating: string;
  cutting: string;
}

// Helper function to find the max percentage in a category
function getMaxPercentage(
  options: Array<{ name: string; percentage: number }>
) {
  return Math.max(...options.map((option) => option.percentage));
}

export function calculateMatchScore(selections: Selections) {
  const comparisons: {
    category: string;
    userChoice: string;
    percentage: number;
    normalizedPercentage: number;
  }[] = [];
  let totalNormalizedScore = 0;
  let totalFactors = 0;

  // Get max percentages for normalization
  const maxCrustPercentage = getMaxPercentage(pizzaData.crustTypes);
  const maxSaucePercentage = getMaxPercentage(pizzaData.sauceAmounts);
  const maxStylePercentage = getMaxPercentage(pizzaData.regionalStyles);
  const maxEatingPercentage = getMaxPercentage(pizzaData.eatingMethods);
  const maxCuttingPercentage = getMaxPercentage(pizzaData.cuttingStyles);
  const maxToppingPercentage = getMaxPercentage(pizzaData.toppings);

  // Calculate crust match
  if (selections.crust) {
    const crustOption = pizzaData.crustTypes.find(
      (c) => c.name === selections.crust
    );
    if (crustOption) {
      const normalizedPercentage = Math.round(
        (crustOption.percentage / maxCrustPercentage) * 100
      );
      totalNormalizedScore += normalizedPercentage;
      totalFactors++;
      comparisons.push({
        category: "Crust Type",
        userChoice: selections.crust,
        percentage: crustOption.percentage,
        normalizedPercentage,
      });
    }
  }

  // Calculate sauce match
  if (selections.sauce) {
    const sauceOption = pizzaData.sauceAmounts.find(
      (s) => s.name === selections.sauce
    );
    if (sauceOption) {
      const normalizedPercentage = Math.round(
        (sauceOption.percentage / maxSaucePercentage) * 100
      );
      totalNormalizedScore += normalizedPercentage;
      totalFactors++;
      comparisons.push({
        category: "Sauce Amount",
        userChoice: selections.sauce,
        percentage: sauceOption.percentage,
        normalizedPercentage,
      });
    }
  }

  // Calculate style match
  if (selections.style) {
    const styleOption = pizzaData.regionalStyles.find(
      (s) => s.name === selections.style
    );
    if (styleOption) {
      const normalizedPercentage = Math.round(
        (styleOption.percentage / maxStylePercentage) * 100
      );
      totalNormalizedScore += normalizedPercentage;
      totalFactors++;
      comparisons.push({
        category: "Regional Style",
        userChoice: selections.style,
        percentage: styleOption.percentage,
        normalizedPercentage,
      });
    }
  }

  // Calculate eating method match
  if (selections.eating) {
    const eatingOption = pizzaData.eatingMethods.find(
      (e) => e.name === selections.eating
    );
    if (eatingOption) {
      const normalizedPercentage = Math.round(
        (eatingOption.percentage / maxEatingPercentage) * 100
      );
      totalNormalizedScore += normalizedPercentage;
      totalFactors++;
      comparisons.push({
        category: "Eating Method",
        userChoice: selections.eating,
        percentage: eatingOption.percentage,
        normalizedPercentage,
      });
    }
  }

  // Calculate cutting style match
  if (selections.cutting) {
    const cuttingOption = pizzaData.cuttingStyles.find(
      (c) => c.name === selections.cutting
    );
    if (cuttingOption) {
      const normalizedPercentage = Math.round(
        (cuttingOption.percentage / maxCuttingPercentage) * 100
      );
      totalNormalizedScore += normalizedPercentage;
      totalFactors++;
      comparisons.push({
        category: "Cutting Style",
        userChoice: selections.cutting,
        percentage: cuttingOption.percentage,
        normalizedPercentage,
      });
    }
  }

  // Calculate toppings match (average of all selected toppings)
  if (selections.toppings.length > 0) {
    let toppingsScore = 0;
    let normalizedToppingsScore = 0;

    selections.toppings.forEach((topping) => {
      const toppingOption = pizzaData.toppings.find((t) => t.name === topping);
      if (toppingOption) {
        toppingsScore += toppingOption.percentage;
        normalizedToppingsScore +=
          (toppingOption.percentage / maxToppingPercentage) * 100;
      }
    });

    const avgToppingScore = Math.round(
      toppingsScore / selections.toppings.length
    );
    const normalizedAvgToppingScore = Math.round(
      normalizedToppingsScore / selections.toppings.length
    );

    totalNormalizedScore += normalizedAvgToppingScore;
    totalFactors++;

    comparisons.push({
      category: "Toppings",
      userChoice: selections.toppings.join(", "),
      percentage: avgToppingScore,
      normalizedPercentage: normalizedAvgToppingScore,
    });
  } else {
    // If no toppings are selected, add a 0% match score
    totalNormalizedScore += 0;
    totalFactors++;

    comparisons.push({
      category: "Toppings",
      userChoice: "None",
      percentage: 0,
      normalizedPercentage: 0,
    });
  }

  // Calculate final score (average of all normalized factors)
  const finalScore =
    totalFactors > 0 ? Math.round(totalNormalizedScore / totalFactors) : 0;

  // Fix comparisons to only include the original percentage field expected by PizzaResult component
  const formattedComparisons = comparisons.map(
    ({ category, userChoice, normalizedPercentage }) => ({
      category,
      userChoice,
      percentage: normalizedPercentage,
    })
  );

  return {
    score: finalScore,
    comparisons: formattedComparisons,
  };
}
