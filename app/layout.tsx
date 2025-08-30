import type { Metadata } from "next";

import { Inter, Montserrat } from 'next/font/google'

import "./globals.css";
import Header from "@/components/ui/Header";
import ErrorBoundary  from "@/components/ErrorBoundary";
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })

export const metadata: Metadata = {
  title: "Vaarunya Global EXIM",
  description: "Vaarunya Global Exim is a leading international trading company specializing in the export and import of high-quality goods across various industries. Our commitment to excellence and customer satisfaction has established us as a trusted partner in global commerce.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body  className={`${inter.variable} ${montserrat.variable}`}>
        <ErrorBoundary>
        <Header/>
        </ErrorBoundary>
        {children}
      </body>
    </html>
  );
}
