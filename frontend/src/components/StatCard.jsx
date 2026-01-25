export default function StatCard({ title, value, glow }) {
  return (
    <div
      className={`
        rounded-2xl p-6 border border-white/10
        bg-white/[0.02]
        backdrop-blur-xl
        transition-all duration-300
        hover:scale-[1.02]
        ${glow}
      `}
    >
      <p className="text-sm text-white/50 mb-2">{title}</p>

      <p className="text-4xl font-bold tracking-wide">
        {value}
      </p>
    </div>
  );
}
