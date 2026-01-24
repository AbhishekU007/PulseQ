import { NavLink } from "react-router-dom";

const link =
  "block px-4 py-2 rounded hover:bg-white/10 transition";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-white/10 p-4">
      <h1 className="text-xl font-bold mb-8">
        Pulse<span className="text-indigo-400">Q</span>
      </h1>

      <nav className="space-y-2">
        <NavLink to="/dashboard" end className={link}>
          Overview
        </NavLink>
        <NavLink to="/dashboard/queues" className={link}>
          Queues
        </NavLink>
        <NavLink to="/dashboard/dead" className={link}>
          Dead Events
        </NavLink>
        <NavLink to="/dashboard/system" className={link}>
          System
        </NavLink>
      </nav>
    </aside>
  );
}
