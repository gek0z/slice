import type React from "react";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import PasswordProtection from "~/components/password-protection";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "riccardoaltieri.com x slice",
  description:
    "Create your perfect pizza and see how your taste compares to America's preferences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* og image */}
        <meta
          property="og:image"
          content="https://slice.riccardoaltieri.com/images/og-slice.png"
        />
        <meta property="og:image:alt" content="riccardoaltieri.com x slice" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:title" content="riccardoaltieri.com x slice" />
        <meta
          property="og:description"
          content="Create your perfect pizza and see how your taste compares to America's preferences"
        />
      </head>
      <body className={montserrat.className}>
        <PasswordProtection>{children}</PasswordProtection>
      </body>
    </html>
  );
}
