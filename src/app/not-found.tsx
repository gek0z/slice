import Link from "next/link";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { LogoRA } from "~/components/pizza-svg-components";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-crust-neutral1 flex flex-col items-center justify-center py-4 sm:py-8 px-2 sm:px-4 relative">
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

          <h1 className="text-4xl sm:text-6xl font-bold text-crust-red1 mb-4">
            404
          </h1>
          <h2 className="text-xl sm:text-3xl font-bold text-crust-neutral7 mb-4">
            Pizza Not Found
          </h2>
          <p className="text-sm sm:text-lg text-crust-neutral7 max-w-xl mx-auto mb-8">
            Looks like this slice has been delivered to the wrong address.
          </p>

          <Link href="/" passHref>
            <Button className="bg-crust-green1 hover:bg-crust-green2 text-white font-bold rounded-md text-base uppercase tracking-wider hover:text-crust-neutral9 py-6 px-8">
              Return Home
            </Button>
          </Link>
        </div>
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
        </p>
      </div>
    </main>
  );
}
