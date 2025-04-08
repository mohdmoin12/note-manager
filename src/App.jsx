import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Notes from "./pages/Notes";
import Tags from "./pages/Tags";
import Reminders from "./pages/Reminders";
import Pomodoro from "./pages/Pomodoro";
import Share from "./pages/Share";
import Settings from "./pages/Settings";

import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import MobileSidebar from "./components/layout/MobileSidebar";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="focusflow-theme">
      <BrowserRouter>
        <div className="flex h-screen overflow-hidden">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <Sidebar />
          </div>

          {/* Mobile Header + Sidebar */}
          <div className="lg:hidden fixed top-0 left-0 right-0 z-50">
            <MobileSidebar />
          </div>

          {/* Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header only visible on desktop */}
            <div className="hidden lg:block">
              <Header />
            </div>

            <main className="flex-1 overflow-y-auto px-4 pt-16 lg:pt-4 bg-muted/10">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/tags" element={<Tags />} />
                <Route path="/reminders" element={<Reminders />} />
                <Route path="/pomodoro" element={<Pomodoro />} />
                <Route path="/share" element={<Share />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
