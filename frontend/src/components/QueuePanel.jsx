export default function QueuePanel({ title, items }) {
  return (
    <div className="bg-zinc-900 rounded-xl p-5 border border-white/5">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>

      <div className="space-y-2 max-h-[320px] overflow-y-auto text-sm">
        {items.length === 0 && (
          <div className="text-white/40">Empty queue</div>
        )}

        {items.map((item, i) => (
          <pre
            key={i}
            className="bg-black/40 p-3 rounded text-white/80 overflow-x-auto"
          >
            {JSON.stringify(JSON.parse(item), null, 2)}
          </pre>
        ))}
      </div>
    </div>
  );
}
