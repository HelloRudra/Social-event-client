"use client";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") || "light");
  }, []);

  function toggle() {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setTheme(next);
  }

  return (
    <button
      onClick={toggle}
      className="btn btn-ghost btn-circle"
      aria-label="Toggle light and dark theme"
    >
      {theme === "light" ? <FaMoon size={18} /> : <FaSun size={18} />}
    </button>
  );
}