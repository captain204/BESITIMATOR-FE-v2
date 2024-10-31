import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Layout from "@/components/Layout";
import { Providers } from "@/components/provider/provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SplashScreen from "@/screens/SplashScreen";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Building Estimator",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
        {/* <SplashScreen />  */}
          <Layout showNavFooter={false}>{children}</Layout>
        </Providers>

        <ToastContainer />
      </body>
    </html>
  );
}
