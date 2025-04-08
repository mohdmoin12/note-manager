// components/MobileSidebar.jsx
import { Menu } from "lucide-react";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { motion } from "framer-motion";

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="lg:hidden flex items-center p-4 justify-between shadow">
        <h2 className="text-xl font-bold text-brand-700">🧠 FocusFlow</h2>
        <button onClick={() => setOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 flex"
        >
          <div
            className="fixed inset-0 bg-black/30"
            onClick={() => setOpen(false)}
          />
          <Sidebar className="bg-white w-64 h-full z-50" />
        </motion.div>
      )}
    </>
  );
}
