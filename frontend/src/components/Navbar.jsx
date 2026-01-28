export default function Navbar() {
  return (
    <div className="h-14 border-b border-white/10 flex items-center justify-between px-6">
      <span className="text-white/60 text-sm">
        Real-time Event Processing Engine
      </span>
      
      <div className="flex items-center gap-6">
        <a href="https://github.com/abhisheku007/PulseQ" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white text-sm transition-colors">
          GitHub
        </a>
        <a href="/" className="text-white/60 hover:text-white text-sm transition-colors">
          Back to Home
        </a>
      </div>
    </div>
  );
}
