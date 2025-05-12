This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Build the People's Pizza

An interactive pizza builder app that lets you create your dream pizza and see how your preferences align with America's favorites. This project was created to support my application to [Slice](https://www.slice.com).

## About The Project

Build the People's Pizza is an interactive web application where users can:

- Select from various crust types, sauce amounts, and up to 5 toppings
- Choose regional pizza styles with helpful descriptions
- Specify preferred eating methods and cutting styles
- See a dynamic preview of their pizza as they build it
- Get a match score comparing their preferences to average American tastes
- View detailed breakdowns of how each choice compares to national survey data

All preference data is sourced from [YouGov surveys](https://today.yougov.com/consumer/articles/45715-americans-favorite-pizza-topping-pepperoni-poll) on American pizza preferences.

## Technology Stack

- **Framework**: Next.js with React
- **Styling**: Tailwind CSS with custom pizza-themed color palette
- **Graphics**: Custom SVG components for pizza visualization

## Project Structure

- **`pizza-builder.tsx`**: Main UI component for building pizzas
- **`pizza-canvas.tsx`**: Renders the pizza visualization with proper layering
- **`pizza-svg-components.tsx`**: SVG graphics for all pizza elements
- **`pizza-data.ts`**: YouGov survey data on American pizza preferences
- **`pizza-result.tsx`**: Match score results with animated graphics

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [https://localhost:3000](https://localhost:3000) with your browser to see the result.

No pizzas were harmed in the making of this application, though several were consumed for research purposes.
