import { Link, useLocation } from "react-router-dom";
import { Home, Notebook, Tags, Settings, AlarmClock, Timer, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", icon: <Home size={18} />, label: "Dashboard" },
  { to: "/notes", icon: <Notebook size={18} />, label: "Notes" },
  { to: "/tags", icon: <Tags size={18} />, label: "Tags" },
  { to: "/reminders", icon: <AlarmClock size={18} />, label: "Reminders" },
  { to: "/pomodoro", icon: <Timer size={18} />, label: "Pomodoro" },
  { to: "/share", icon: <Share2 size={18} />, label: "Share" },
  { to: "/settings", icon: <Settings size={18} />, label: "Settings" },
];

export default function Sidebar({ className }) {
  const location = useLocation();

  return (
    <aside className={cn(
      "w-64 h-full border-r p-4 bg-gradient-to-b from-brand-100 via-white to-brand-50 shadow-lg",
      className
    )}>
      <h2 className="text-2xl font-bold mb-6 text-brand-700">🧠 FocusFlow</h2>
      <nav className="flex flex-col gap-2">
        {navItems.map(({ to, icon, label }) => (
          <Link
            key={to}
            to={to}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition hover:bg-muted",
              location.pathname === to && "bg-muted"
            )}
          >
            {icon}
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
