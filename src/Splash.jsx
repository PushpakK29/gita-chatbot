export default function Splash() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-amber-50/80 backdrop-blur-md transition-opacity duration-1000">
      
      {/* Divine Rays */}
      <div className="absolute inset-0 animate-rays"></div>

      {/* Center Content */}
      <div className="relative flex flex-col items-center gap-4">
        <div className="text-3xl font-semibold text-amber-800 blur-[0.3px]">
          श्रीमद्भगवद्गीता
        </div>
        <div className="text-sm tracking-wide text-amber-700 opacity-80">
          Gita Path
        </div>
      </div>
    </div>
  );
}
