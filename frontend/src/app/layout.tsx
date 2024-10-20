import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// If NavigationBar is a named export
import { NavigationBar } from "@/layouts/navigation/page";
import { Footer } from "@/layouts/footer/page";

const internItelic = localFont({
  src: "./fonts/intern/Inter-Italic-VariableFont_opsz,wght.ttf",
  variable: "--fonnt-inter-itelic",
  weight: "100 900",
});
const internFont = localFont({
  src: "./fonts/intern/Inter-VariableFont_opsz,wght.ttf",
  variable: "--fonnt-inter-regular",
  weight: "100 900",
});
const ibnsansBold = localFont({
  src: "./fonts/ibnsans/IBMPlexSans-Bold.ttf",
  variable: "--font-ibnsansBold",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "StepSync",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${internItelic.variable} ${internFont.variable} ${ibnsansBold.variable}`}
      >
        <header>
          <NavigationBar />
        </header>
        {children}
        <Footer />
      </body>
    </html>
  );
}
