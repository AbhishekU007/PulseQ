import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { connectMetrics, disconnectSocket } from "../../components/socket";
import { DashboardContext } from "../../context/DashboardContext";

export default function DashboardLayout() {
  const [metrics, setMetrics] = useState(null);
  const [history, setHistory] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    connectMetrics(
      (data) => {
        setMetrics(data.metrics);
        setHistory(data.history);
      },
      (event) => setEvents(prev => [event, ...prev].slice(0, 50))
    );

    return () => disconnectSocket();
  }, []);

  return (
    <DashboardContext.Provider value={{ metrics, history, events }}>
      <div className="flex h-screen bg-zinc-950 text-white">
        <Sidebar />

        <div className="flex flex-col flex-1">
          <Navbar />
          <main className="flex-1 p-6 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </DashboardContext.Provider>
  );
}