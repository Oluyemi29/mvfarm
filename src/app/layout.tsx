import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "../components/Provider";
import NavbarInfo from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import ContextApi from "@/components/ContextApi";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Mhayvic Farm",
    template: "%s |  Mhayvic Farm",
  },
  description: "A Farm Site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <ContextApi>
            <div className="md:w-[90%] w-[95%] mx-auto">
              <Toaster position="top-center" />
              <NavbarInfo />
              {children}
              <Footer />
            </div>
          </ContextApi>
        </Provider>
      </body>
    </html>
  );
}
