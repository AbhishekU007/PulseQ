import { useState } from "react";
import { useDashboard } from "../../context/DashboardContext";
import { sendEvent } from "../../components/api";
import QueueBars from "../../components/QueueBars";
import MetricsGrid from "../../components/MetricsGrid";
import ThroughputChart from "../../components/ThroughputChart";
import QueueChart from "../../components/QueueChart";
import EventFeed from "../../components/EventFeed";
import LatencyCards from "../../components/LatencyCards";
import { Zap, Loader2 } from "lucide-react";

export default function Overview() {
  // Shared state from DashboardLayout context
  const { metrics, history, events } = useDashboard();
  
  // Local UI state for button loading spinner
  const [sending, setSending] = useState(false);

  const handleSendEvent = async () => {
    setSending(true);
    try {
      await sendEvent("USER_ACTION");
    } catch (err) {
      console.error("Failed to send event:", err);
    } finally {
      setSending(false);
    }
  };

  const handleBurstEvents = async () => {
    setSending(true);
    try {
      await Promise.all(
        Array(10).fill().map((_, i) => sendEvent(`BURST_${i}`))
      );
    } catch (err) {
      console.error("Failed to send burst:", err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-8">

      {/* Control Panel */}
      <div className="flex items-center gap-4 p-4 bg-zinc-900/60 rounded-xl border border-white/5">
        <span className="text-sm text-white/60">Event Controls:</span>
        
        <button
          onClick={handleSendEvent}
          disabled={sending}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 rounded-lg font-medium text-sm transition-all duration-200"
        >
          {sending ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Zap size={16} />
          )}
          Send Event
        </button>

        <button
          onClick={handleBurstEvents}
          disabled={sending}
          className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 disabled:bg-violet-600/50 rounded-lg font-medium text-sm transition-all duration-200"
        >
          {sending ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Zap size={16} />
          )}
          Burst (10 events)
        </button>

        <div className="ml-auto flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${metrics ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'}`}></div>
          <span className="text-xs text-white/40">
            {metrics ? 'Connected' : 'Connecting...'}
          </span>
        </div>
      </div>

      <MetricsGrid metrics={metrics} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <ThroughputChart metrics={metrics} />
        <QueueChart history={history} />
      </div>

      <QueueBars metrics={metrics} />

      <LatencyCards latency={metrics?.latency} />

      <EventFeed events={events} />

    </div>
  );
}