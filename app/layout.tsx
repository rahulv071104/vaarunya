import type { Metadata } from "next";

import { Inter, Montserrat } from 'next/font/google'

import "./globals.css";
import Header from "@/components/ui/Header";
import ErrorBoundary  from "@/components/ErrorBoundary";
import ImageCacheInitializer from "@/components/ImageCacheInitializer";
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
        <ImageCacheInitializer />
        <ErrorBoundary>
        <Header/>
        </ErrorBoundary>
        {children}
        <div className="fixed bottom-4 left-4 z-50 sm:bottom-6 sm:left-6 opacity-85 hover:opacity-100 transition-all duration-300 hover:-translate-y-1 pointer-events-auto">
          <iframe 
            id='Iframe1' 
            src='https://dunsregistered.dnb.com/SealAuthentication.aspx?Cid=1' 
            width='114' 
            height='97' 
            style={{ border: 'none', overflow: 'hidden' }}
          ></iframe>
        </div>
      </body>
    </html>
  );
}
