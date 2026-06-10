import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Premium SEO Metadata Configuration for NCR-BHK
export const metadata: Metadata = {
  title: "NCR-BHK.IN | The Ultimate Rental OS",
  description: "Say goodbye to ghost listings, endless broker spam, and hidden charges. Secure early access to the decentralized, zero-broker real estate ecosystem in Delhi-NCR.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      style={{ backgroundColor: '#0a0a0a', scrollBehavior: 'smooth' }}
    >
      <body 
        className="min-h-full flex flex-col" 
        style={{ backgroundColor: '#0a0a0a', color: '#ffffff', margin: 0 }}
      >
        {children}
      </body>
    </html>
  );
}