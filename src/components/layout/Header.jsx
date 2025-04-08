// src/components/layout/Header.jsx
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { motion } from "framer-motion";

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <motion.header
      className="flex justify-between items-center p-4 bg-brand-500 text-white  shadow-md"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold tracking-tight">🧠 FocusFlow</h1>
      <Button
        variant="outline"
        className="bg-white text-brand-500 hover:bg-brand-100 transition-all duration-300"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      </Button>
    </motion.header>
  );
}
