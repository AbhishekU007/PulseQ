import { useEffect, useState } from "react";
import { connectMetrics } from "../../components/socket";

import MetricsGrid from "../../components/MetricsGrid";
import ThroughputChart from "../../components/ThroughputChart";
import QueueChart from "../../components/QueueChart";
import EventFeed from "../../components/EventFeed";

export default function Overview() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    connectMetrics(setMetrics);
  }, []);

  return (
    <div className="space-y-8">

      <MetricsGrid metrics={metrics} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <ThroughputChart metrics={metrics} />
        <QueueChart metrics={metrics} />
      </div>

      <EventFeed />

    </div>
  );
}
