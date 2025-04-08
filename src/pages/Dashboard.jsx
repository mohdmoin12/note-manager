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
import { Trash2, CheckCircle2, Clock } from "lucide-react";

const LOCAL_STORAGE_KEY = "focusflow-tasks";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [filterState, setFilterState] = useState("all"); // 'all', 'active', or 'completed'

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
      createdAt: new Date().toISOString(),
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

  const filteredTasks = tasks.filter(task => {
    if (filterState === "all") return true;
    if (filterState === "active") return !task.done;
    if (filterState === "completed") return task.done;
    return true;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto space-y-6"
      style={{ minHeight: "100vh", padding: "2rem 0" }}
    >
      <div className="space-y-1">
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          FocusFlow
        </h2>
        <p className="text-muted-foreground text-sm">
          Track your tasks, boost your productivity
        </p>
      </div>

      {/* Add Task */}
      <Card className="overflow-hidden shadow-lg border-0">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Input
              placeholder="What needs to be done?"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
              className="w-full rounded-lg"
            />
            <Button
              onClick={addTask}
              className="transition-all duration-300 hover:scale-105 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md rounded-lg"
            >
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filter Tabs */}
      <div className="flex justify-center sm:justify-start gap-2">
        <Button
          variant={filterState === "all" ? "default" : "outline"}
          onClick={() => setFilterState("all")}
          className="rounded-full text-sm"
        >
          All
        </Button>
        <Button
          variant={filterState === "active" ? "default" : "outline"}
          onClick={() => setFilterState("active")}
          className="rounded-full text-sm"
        >
          Active
        </Button>
        <Button
          variant={filterState === "completed" ? "default" : "outline"}
          onClick={() => setFilterState("completed")}
          className="rounded-full text-sm"
        >
          Completed
        </Button>
      </div>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <CheckCircle2 size={48} className="text-gray-300 mb-4" />
          <p className="text-lg font-medium">
            {filterState === "all" 
              ? "Your task list is empty" 
              : filterState === "active" 
                ? "No active tasks" 
                : "No completed tasks"}
          </p>
          <p className="text-muted-foreground text-sm mt-1">
            {filterState === "all" ? "Add a new task to get started" : ""}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {filteredTasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3 flex-1">
                        <motion.div
                          whileTap={{ scale: 0.9 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <Checkbox
                            checked={task.done}
                            onCheckedChange={() => toggleDone(task.id)}
                            className={task.done ? "bg-green-500 border-green-500" : ""}
                          />
                        </motion.div>
                        <div className="flex flex-col">
                          <span
                            className={`text-base break-words ${
                              task.done
                                ? "line-through text-muted-foreground"
                                : ""
                            }`}
                          >
                            {task.text}
                          </span>
                          {task.createdAt && (
                            <span className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                              <Clock size={12} />
                              {formatDate(task.createdAt)}
                            </span>
                          )}
                        </div>
                      </div>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 transition-all rounded-full"
                              onClick={() => deleteTask(task.id)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Delete Task</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    {task.done && (
                      <div className="h-1 bg-gradient-to-r from-green-400 to-green-500" />
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Stats Footer */}
      <div className="flex justify-between items-center text-sm text-muted-foreground mt-4 pt-4 border-t">
        <div>
          {tasks.filter(t => !t.done).length} tasks remaining
        </div>
        {tasks.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setTasks(tasks.filter(t => !t.done))}
            className="text-red-500 hover:text-red-700"
          >
            Clear completed
          </Button>
        )}
      </div>
    </motion.div>
  );
}