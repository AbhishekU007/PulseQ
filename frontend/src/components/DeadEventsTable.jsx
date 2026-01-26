import { useEffect, useState } from "react";
import { fetchDeadEvents } from "./api";
import JsonModal from "./JsonModal";

export default function DeadEventsTable() {
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchDeadEvents().then(setEvents);
  }, []);

  return (
    <div className="bg-zinc-900/60 border border-white/5 rounded-xl p-6">

      <h2 className="text-lg font-semibold mb-4">
        Dead Letter Events
      </h2>

      <table className="w-full text-sm table-fixed">
        <thead className="text-white/60 border-b border-white/10">
          <tr>
            <th className="py-2 text-left w-1/4">Type</th>
            <th className="py-2 text-center w-1/6">Retries</th>
            <th className="py-2 text-center w-1/3">Failed At</th>
            <th className="py-2 text-center w-1/6">Payload</th>
          </tr>
        </thead>

        <tbody>
          {events.map(e => (
            <tr
              key={e.id}
              className="border-b border-white/5 hover:bg-white/5"
            >
              <td className="py-2 text-left">{e.type}</td>
              <td className="py-2 text-center">{e.retryCount}</td>
              <td className="py-2 text-center text-xs text-white/50">
                {new Date(e.failedAt).toLocaleString()}
              </td>
              <td className="py-2 text-center">
                <button
                  onClick={() => setSelected(e.payload)}
                  style={{ fontSize: '10px', padding: '2px 6px' }}
                  className="text-indigo-400 hover:underline"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <JsonModal
          json={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}