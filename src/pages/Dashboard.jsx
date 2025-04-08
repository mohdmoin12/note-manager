import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Trash2 } from "lucide-react";

const LOCAL_STORAGE_KEY = "focusflow-tasks";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTaskText.trim()) return;
    const newTask = {
      id: Date.now(),
      text: newTaskText.trim(),
      done: false,
    };
    setTasks([newTask, ...tasks]);
    setNewTaskText("");
  };

  const toggleDone = (taskId) => {
    setTasks(tasks.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t)));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto space-y-6"
    >
      <div className="space-y-1 text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-500">
          Welcome back 👋
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Here's what’s happening today.
        </p>
      </div>

      {/* Add Task */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          placeholder="Add a new task..."
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          className="w-full"
        />
        <Button
          onClick={addTask}
          className="w-full sm:w-auto transition-all duration-300 hover:scale-105 bg-brand-500 text-white shadow-md"
        >
          Add
        </Button>
      </div>

      {/* Task List */}
      {tasks.length === 0 ? (
        <p className="text-muted-foreground text-sm text-center">
          No tasks for today. 🎉
        </p>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 py-3 px-4">
                    <motion.div
                      className="flex items-start sm:items-center gap-3"
                      whileHover={{ scale: 1.01 }}
                    >
                      <motion.div
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Checkbox
                          checked={task.done}
                          onCheckedChange={() => toggleDone(task.id)}
                        />
                      </motion.div>
                      <span
                        className={`text-sm break-words max-w-[90%] ${
                          task.done
                            ? "line-through text-muted-foreground"
                            : "text-foreground"
                        }`}
                      >
                        {task.text}
                      </span>
                    </motion.div>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-700 transition-all"
                            onClick={() => deleteTask(task.id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Delete Task</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}
