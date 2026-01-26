import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function QueueChart({ history }) {
  if (!history || history.length === 0) {
    return (
      <div className="bg-zinc-900/60 border border-white/5 rounded-xl p-5">
        <h3 className="text-sm text-white/60 mb-4">
          Queue Depth (live)
        </h3>
        <div className="h-64 flex items-center justify-center">
          <span className="text-white/30 text-sm">Waiting for data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900/60 border border-white/5 rounded-xl p-5">
      <h3 className="text-sm text-white/60 mb-4">
        Queue Depth (live)
      </h3>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={history}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />

            <XAxis
              dataKey="time"
              tick={{ fontSize: 10 }}
              stroke="#666"
            />

            <YAxis stroke="#666" />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="main"
              stroke="#6366f1"
              strokeWidth={2}
              dot={false}
            />

            <Line
              type="monotone"
              dataKey="retry"
              stroke="#facc15"
              strokeWidth={2}
              dot={false}
            />

            <Line
              type="monotone"
              dataKey="dead"
              stroke="#ef4444"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}