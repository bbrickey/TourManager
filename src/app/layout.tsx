import "./globals.css";
import type { Metadata } from "next";
//import { Inter } from "next/font/google";
import { inter } from "./styles/font";

//const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dead Bars Finance App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
