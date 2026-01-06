"use client";

import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "lucide-react";

import { Button } from "@/components/ui/button";


function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  // Sync state with current document theme
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark((prev) => !prev);
  };

  return (
    <Button
      variant="outline"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="border-none bg-none"
    >
      {isDark ? (
        <MoonIcon className="h-4 w-4" />
      ) : (
        <SunIcon className="h-4 w-4" />
      )}
    </Button>
  );
}

export default ThemeToggle;
