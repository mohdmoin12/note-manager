// components/Layout.jsx
import Sidebar from "./Sidebar";
import MobileSidebar from "./layout/MobileSidebar";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Header + Sidebar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50">
        <MobileSidebar />
      </div>

      {/* Page Content */}
      <main className="flex-1 overflow-y-auto pt-16 lg:pt-0 px-4">
        {children}
      </main>
    </div>
  );
}
