import localFont from "next/font/local";
import "./globals.css";
import SessionProvider from "@/providers/session-provider";
import SnackbarComponent from "@/components/snackbarComponent/snackbarComponent";
import Head from "next/head";

const internItelic = localFont({
  src: "./fonts/intern/Inter-Italic-VariableFont_opsz,wght.ttf",
  variable: "--font-inter-itelic",
  weight: "100 900",
  preload: false,
});
const internFont = localFont({
  src: "./fonts/intern/Inter-VariableFont_opsz,wght.ttf",
  variable: "--font-inter-regular",
  weight: "100 900",
  preload: false,
});
const ibnsansBold = localFont({
  src: "./fonts/ibnsans/IBMPlexSans-Bold.ttf",
  variable: "--font-ibnsansBold",
  weight: "100 900",
  preload: false,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <Head>
        {/* Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.PUBLIC_GOOGLE_ANALYTICS_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.PUBLIC_GOOGLE_ANALYTICS_ID}');
            `,
          }}
        />
      </Head>
      <body
        className={`${internItelic.variable} ${internFont.variable} ${ibnsansBold.variable}`}
      >
        <SessionProvider>{children}</SessionProvider>
        <SnackbarComponent />
      </body>
    </html>
  );
}
