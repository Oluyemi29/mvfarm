"use client";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { HeroUIProvider } from "@heroui/react";
import { SessionProvider } from "next-auth/react";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <HeroUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <SessionProvider>{children}</SessionProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
};

export default Provider;
