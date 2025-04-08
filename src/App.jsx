import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Notes from "./pages/Notes";
import Tags from "./pages/Tags";
import Reminders from "./pages/Reminders";
import Pomodoro from "./pages/Pomodoro";
import Share from "./pages/Share";
import Settings from "./pages/Settings";

import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header"; // ✅ Import Header
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="focusflow-theme">
      <BrowserRouter>
        <div className="flex flex-col h-screen">
          <Header /> {/* ✅ Top Header */}
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <div className="flex-1 p-4 overflow-y-auto bg-muted/10">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/tags" element={<Tags />} />
                <Route path="/reminders" element={<Reminders />} />
                <Route path="/pomodoro" element={<Pomodoro />} />
                <Route path="/share" element={<Share />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
