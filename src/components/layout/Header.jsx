import { Button } from "@/components/ui/button";
import { Sun, Moon, BrainCircuit, Bell, Search, User, Menu } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  
  const containerVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };
  
  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };
  
  const themeToggleVariants = {
    initial: { rotate: 0 },
    animate: { rotate: 360, transition: { duration: 0.5 } }
  };
  
  return (
    <motion.header
      className={`sticky top-0 z-50 ${theme === 'dark' ? 'bg-gradient-to-r from-indigo-900 to-purple-900' : 'bg-gradient-to-r from-blue-500 to-purple-500'} text-white shadow-lg`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 md:py-4">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            variants={logoVariants}
          >
            <div className="bg-white p-2 rounded-full">
              <BrainCircuit className={`h-6 w-6 ${theme === 'dark' ? 'text-indigo-800' : 'text-blue-300'}`} />
            </div>
            <h1 className="text-xl lg:text-2xl font-bold tracking-tight truncate">
              FocusFlow
              <span className="hidden md:inline-block ml-2 text-xs uppercase tracking-wider bg-white bg-opacity-20 px-2 py-1 rounded-full">
               
              </span>
            </h1>
          </motion.div>

          {/* Search Bar (expanded state) */}
          {searchOpen && (
            <motion.div 
              className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden">
                <div className="flex items-center p-3 border-b dark:border-gray-700">
                  <Search className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                  <input 
                    type="text" 
                    placeholder="Search tasks, notes, and reminders..." 
                    className="w-full bg-transparent border-none focus:ring-0 text-gray-800 dark:text-gray-200"
                    autoFocus
                  />
                  <Button 
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchOpen(false)}
                    className="text-gray-500"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Main Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <motion.nav variants={itemVariants} className="flex space-x-1">
              <Button variant="ghost" className="text-white hover:bg-white hover:bg-opacity-10">
                Dashboard
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white hover:bg-opacity-10">
                Tasks
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white hover:bg-opacity-10">
                Notes
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white hover:bg-opacity-10">
                Stats
              </Button>
            </motion.nav>
          </div>

          {/* Action Icons */}
          <motion.div 
            className="flex items-center space-x-2"
            variants={itemVariants}
          >
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white hover:bg-opacity-10"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white hover:bg-opacity-10 relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>
            
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="icon"
                className="bg-white bg-opacity-10 backdrop-blur-sm border-white border-opacity-20 text-white hover:bg-white hover:bg-opacity-20 transition-all duration-300"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                initial="initial"
                animate="animate"
                variants={themeToggleVariants}
                key={theme} // Force animation to run on theme change
              >
                {theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>
            </motion.div>
            
            <div className="hidden md:block">
              <Button
                variant="outline"
                className="ml-2 bg-white text-purple-600 hover:bg-opacity-90 font-medium"
              >
                Upgrade
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-white hover:bg-opacity-10"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <motion.div 
              className="hidden md:flex items-center ml-2"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Progress Bar - Visual element */}
      <div className="h-1 w-full bg-white bg-opacity-10">
        <motion.div 
          className="h-full bg-white"
          initial={{ width: 0 }}
          animate={{ width: "65%" }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
    </motion.header>
  );
}