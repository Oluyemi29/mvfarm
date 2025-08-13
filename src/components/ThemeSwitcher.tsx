"use client";
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";
import { LuSunMoon } from "react-icons/lu";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <Dropdown className="bg-background text-foreground">
        <DropdownTrigger>
          <div className="px-5 py-2.5 border-2 border-maindeep rounded-xl cursor-pointer">
            {theme === "dark" ? (
              <FaMoon className="text-black" />
            ) : theme === "light" ? (
              <IoSunny className="text-black" />
            ) : (
              <LuSunMoon className="text-black" />
            )}
          </div>
        </DropdownTrigger>
        <DropdownMenu className="bg-background" aria-label="Static Actions">
          <DropdownItem
            className="inline-flex gap-2"
            key="light"
            onPress={() => setTheme("light")}
          >
            <div className="flex gap-2 justify-between items-center">
              <h1>Light Mode</h1>
              <IoSunny />
            </div>
          </DropdownItem>
          <DropdownItem key="dark" onPress={() => setTheme("dark")}>
            <div className="flex gap-2 justify-between items-center">
              <h1>Dark Mode</h1>
              <FaMoon />
            </div>
          </DropdownItem>
          <DropdownItem key="default" onPress={() => setTheme("system")}>
            <div className="flex gap-2 justify-between items-center">
              <h1>Default Mode </h1>
              <LuSunMoon />
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
