"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="
        relative flex items-center justify-center
        h-12 w-12 rounded-full
        bg-white/30 dark:bg-gray-800/30
        backdrop-blur-md
        shadow-lg shadow-gray-400/30 dark:shadow-black/40
        border border-white/40 dark:border-gray-700/40
        transition-colors duration-300
      "
    >
      {theme === "light" ? (
        <Moon className="h-6 w-6 text-gray-800" />
      ) : (
        <Sun className="h-6 w-6 text-yellow-400" />
      )}
      <span className="sr-only">Toggle theme</span>
    </motion.button>
  );
}
