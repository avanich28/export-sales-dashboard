"use client";

import { useTheme } from "@/app/_contexts/ThemeContext";
import { TbMoonFilled, TbSunFilled } from "react-icons/tb";

function ThemeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="animate-rotate-right primaryTransition"
      key={theme}
    >
      {theme === "dark" ? <TbSunFilled /> : <TbMoonFilled />}
    </button>
  );
}

export default ThemeButton;
