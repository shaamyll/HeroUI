import { useEffect, useState } from "react";
import Button, { BUTTON_VARIANTS } from "@/components/Reusable/Button";

// Detect system theme if no preference stored
const getInitialTheme = (): "light" | "dark" => {
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return "light";
};

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">(
    () => (localStorage.getItem("theme") as "light" | "dark") || getInitialTheme()
  );

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <Button
      variant={BUTTON_VARIANTS.OUTLINED}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
     {theme === "light" ? "Dark" : "Light"}
    </Button>
  );
}
