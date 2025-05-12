import PizzaBuilder from "~/components/pizza-builder";
import { LogoRA } from "~/components/pizza-svg-components";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-crust-neutral1 flex flex-col items-center py-4 sm:py-8 px-2 sm:px-4 relative ">
      {/* Background pizza elements */}
      <div className="fixed inset-0 pointer-events-none w-[100vw] h-[100svh] overflow-hidden">
        <div className="absolute -top-20 -left-20 w-40 h-40 opacity-10">
          <div className="w-full h-full rounded-full bg-crust-red1"></div>
        </div>
        <div className="absolute top-1/4 -right-10 w-32 h-32 opacity-10">
          <div className="w-full h-full rounded-full bg-crust-red1"></div>
        </div>
        <div className="absolute bottom-1/3 -left-10 w-24 h-24 opacity-10">
          <div className="w-full h-full rounded-full bg-crust-red1"></div>
        </div>
      </div>

      <div className="max-w-4xl w-full relative z-10 overflow-visible">
        <div className="text-center mb-4 sm:mb-8">
          <div className="flex justify-center mb-6 gap-2 sm:gap-4 items-center">
            <Image
              src="/images/slice-logo.svg"
              alt="Slice.com"
              width={80}
              height={80}
              className="object-contain w-16 h-16 sm:w-24 sm:h-24"
            />
            <span className="text-crust-neutral7 text-xl sm:text-2xl font-normal mb-2">
              &times;
            </span>
            <div className="w-32 sm:w-48 mb-2">
              <LogoRA />
            </div>
          </div>
          <h1 className="text-xl sm:text-4xl font-bold text-crust-red1 mb-2">
            Build the People&apos;s Pizza
          </h1>
          <p className="text-sm sm:text-lg text-crust-neutral7 max-w-xl mx-auto">
            Create your perfect pizza and see how your taste compares to
            America&apos;s preferences with data from{" "}
            <a
              href="https://today.yougov.com/consumer/articles/45715-americans-favorite-pizza-topping-pepperoni-poll"
              className="text-crust-red1 hover:text-crust-red2 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* add an extrnal url icon */}
              YouGov
              <span className="inline-block w-3 h-3 sm:w-4 sm:h-4 ml-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-3 h-3 sm:w-4 sm:h-4"
                  style={{ fill: "currentColor" }}
                >
                  <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-9z" />
                </svg>
              </span>
            </a>
            .
          </p>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto w-full relative z-10">
        <PizzaBuilder />
      </div>
      <div className="text-center mt-8">
        <p className="text-crust-neutral7 text-[9px] sm:text-xs">
          This fun little web app was created to support my application. <br />
          The Slice logo and branding are used with admiration and belong to{" "}
          <a
            href="https://www.slice.com"
            className="text-crust-red1 hover:text-crust-red2 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            slice.com
          </a>
          . <br />
          No pizzas were harmed in the making of this application, though
          several were consumed for research purposes.
        </p>
        <a
          href="https://github.com/gek0z/slice"
          className="inline-flex items-center gap-1 text-crust-neutral7 hover:text-crust-red1 transition-colors text-[9px] sm:text-xs mt-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
          View on GitHub
        </a>
      </div>
    </main>
  );
}
