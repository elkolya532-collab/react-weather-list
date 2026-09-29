import { FaCloudSun, FaCircle } from "react-icons/fa"

function Header() {
  return (
    <header className="flex justify-between items-center bg-slate-900/50 border border-slate-800 rounded-2xl px-6 py-4 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="text-2xl bg-sky-500/10 border border-sky-500/30 rounded-xl p-3 flex items-center justify-center">
          <FaCloudSun className="text-sky-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-100">
            Weather Dashboard
          </h1>
          <p className="text-xs text-slate-400">
            Real-time weather updates
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-3 py-1.5">
        <FaCircle className="text-emerald-500 text-[8px] animate-pulse" />
        <span className="text-xs text-emerald-400 font-medium">Live</span>
      </div>
    </header>
  )
}

export default Header