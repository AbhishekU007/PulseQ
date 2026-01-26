export default function JsonModal({ json, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-zinc-900 p-6 rounded-xl w-[700px] max-h-[80vh] overflow-auto">

        <div className="flex justify-between mb-4">
          <h3 className="font-semibold">Payload</h3>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white"
          >
            ✕
          </button>
        </div>

        <pre className="text-xs text-emerald-400 whitespace-pre-wrap">
          {JSON.stringify(JSON.parse(json), null, 2)}
        </pre>

      </div>
    </div>
  );
}
