import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f4f5f7",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://landing-page.example.com"),
  title: {
    default: "NAVI — Your Change Navigator",
    template: "%s | NAVI",
  },
  description:
    "NAVI helps you navigate organizational change with clarity—align stakeholders, track progress, and move from strategy to action with confidence.",
  keywords: [
    "NAVI",
    "change management",
    "organizational change",
    "transformation",
    "SaaS",
  ],
  openGraph: {
    title: "NAVI — Your Change Navigator",
    description:
      "Your Change Navigator—clarity for every step of organizational change.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "NAVI — Your Change Navigator",
    description:
      "Your Change Navigator—clarity for every step of organizational change.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-canvas font-sans text-navy">
        <Navbar />
        <main className="flex-1 bg-canvas">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
