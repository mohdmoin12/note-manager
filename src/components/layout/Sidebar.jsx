import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Notebook, Tags, Settings, AlarmClock, Timer, Share2, ChevronRight, Users, Bell, BarChart3, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { 
    to: "/", 
    icon: <Home size={18} />, 
    label: "Dashboard",
    color: "text-blue-600",
    bgColor: "bg-blue-100" 
  },
  { 
    to: "/notes", 
    icon: <Notebook size={18} />, 
    label: "Notes",
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  },
  { 
    to: "/tags", 
    icon: <Tags size={18} />, 
    label: "Tags",
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  { 
    to: "/reminders", 
    icon: <AlarmClock size={18} />, 
    label: "Reminders",
    color: "text-amber-600",
    bgColor: "bg-amber-100"
  },
  { 
    to: "/pomodoro", 
    icon: <Timer size={18} />, 
    label: "Pomodoro",
    color: "text-red-600",
    bgColor: "bg-red-100"
  },
  { 
    to: "/share", 
    icon: <Share2 size={18} />, 
    label: "Share",
    color: "text-indigo-600",
    bgColor: "bg-indigo-100"
  },
  { 
    to: "/settings", 
    icon: <Settings size={18} />, 
    label: "Settings",
    color: "text-gray-600",
    bgColor: "bg-gray-100"
  },
];

const quickLinks = [
  {
    label: "Team Space",
    icon: <Users size={14} />,
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    label: "Notifications",
    icon: <Bell size={14} />,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    count: 3
  },
  {
    label: "Analytics",
    icon: <BarChart3 size={14} />,
    color: "text-green-600",
    bgColor: "bg-green-100"
  }
];

export default function Sidebar({ className }) {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const containerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };
  
  return (
    <motion.aside 
      className={cn(
        "relative h-full border-r shadow-xl transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64",
        "bg-white dark:bg-gray-900 dark:border-gray-800",
        className
      )}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Collapse Toggle */}
      <button 
        className="absolute -right-3 top-20 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-full shadow-md p-1 z-10"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <motion.div
          animate={{ rotate: isCollapsed ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronRight size={16} className="text-gray-500" />
        </motion.div>
      </button>
      
      {/* Logo Section */}
      <div className={cn(
        "flex items-center pt-6 pb-4 px-4 mb-4 border-b dark:border-gray-800",
        isCollapsed && "justify-center"
      )}>
        {isCollapsed ? (
          <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
            🧠
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
              🧠
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">FocusFlow</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Productivity System</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Main Navigation */}
      <div className="px-3">
        <div className={cn("mb-1 text-xs font-semibold text-gray-500 uppercase tracking-wider px-3", isCollapsed && "sr-only")}>
          Main Menu
        </div>
        <nav className="flex flex-col gap-1 mb-6">
          {navItems.map(({ to, icon, label, color, bgColor }) => (
            <motion.div key={to} variants={itemVariants}>
              <Link
                to={to}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  "hover:bg-gray-100 dark:hover:bg-gray-800",
                  !isCollapsed && location.pathname === to && "bg-gray-100 dark:bg-gray-800",
                  isCollapsed && "justify-center",
                  location.pathname === to ? 
                    `${color} border-l-4 border-${color.split('-')[1]}-500` : 
                    "text-gray-600 dark:text-gray-400"
                )}
              >
                <div className={cn(
                  "flex items-center justify-center p-1.5 rounded-md",
                  location.pathname === to && bgColor
                )}>
                  {icon}
                </div>
                
                {!isCollapsed && <span>{label}</span>}
                
                {!isCollapsed && location.pathname === to && 
                  <motion.div 
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                }
              </Link>
            </motion.div>
          ))}
        </nav>
        
        {/* Quick Links Section */}
        {!isCollapsed && (
          <>
            <div className="mb-1 text-xs font-semibold text-gray-500 uppercase tracking-wider px-3">
              Quick Links
            </div>
            <div className="flex flex-col gap-1 mb-6">
              {quickLinks.map((link, index) => (
                <motion.button
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  variants={itemVariants}
                >
                  <div className={cn("p-1 rounded-md", link.bgColor)}>
                    <span className={link.color}>{link.icon}</span>
                  </div>
                  <span>{link.label}</span>
                  
                  {link.count && (
                    <div className="ml-auto bg-red-500 text-white text-xs font-medium px-1.5 py-0.5 rounded-full">
                      {link.count}
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </>
        )}
      </div>
      
      {/* Create New Button */}
      {!isCollapsed ? (
        <motion.div 
          className="mt-auto mx-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <button className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-200">
            <PlusCircle size={18} />
            <span>Create New</span>
          </button>
        </motion.div>
      ) : (
        <motion.div 
          className="mt-auto mx-auto mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <button className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200">
            <PlusCircle size={20} />
          </button>
        </motion.div>
      )}
      
      {/* User Section */}
      {!isCollapsed && (
        <motion.div 
          className="border-t dark:border-gray-800 p-4"
          variants={itemVariants}
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center text-white font-bold">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-800 dark:text-white truncate">John Doe</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">john.doe@example.com</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.aside>
  );
}