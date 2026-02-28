import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const project = {
  title: "Lumina",
  tagline: "Design tokens. Everywhere. In sync.",
  subtitle: "Real-time collaborative design system",
  year: "2024",
  status: "Live",
  youtubeId: "dQw4w9WgXcQ", // ← replace with your actual YouTube video ID
  description:
    "Lumina is a design token management platform that bridges the gap between design and development. It enables teams to define, version, and synchronize design tokens across multiple platforms — web, iOS, Android — with zero friction.",
  problem:
    "Designers update a color in Figma; developers have to manually chase that change across a dozen files. Lumina automates that entire pipeline — tokens defined in one place propagate everywhere, instantly.",
  tech: [
    { name: "React", category: "Frontend" },
    { name: "TypeScript", category: "Frontend" },
    { name: "Tailwind CSS", category: "Frontend" },
    { name: "Node.js", category: "Backend" },
    { name: "GraphQL", category: "Backend" },
    { name: "PostgreSQL", category: "Database" },
    { name: "Redis", category: "Infrastructure" },
    { name: "WebSockets", category: "Realtime" },
  ],
  screenshots: [
    { id: 1, label: "Token Editor", accent: "#e8e0d0", bg: "#0f0e0d" },
    { id: 2, label: "Version History", accent: "#b8c4a8", bg: "#0d0f0d" },
    { id: 3, label: "Export Pipeline", accent: "#a8b8c8", bg: "#0d0e10" },
  ],
  links: { live: "https://lumina.design", github: "https://github.com/username/lumina" },
  metrics: [
    { value: "12k+", label: "Tokens synced" },
    { value: "40%", label: "Faster handoff" },
    { value: "3", label: "Platforms" },
    { value: "99.9%", label: "Uptime" },
  ],
  futureScope: [
    { title: "AI Token Naming", desc: "Suggest semantic names based on usage context and existing naming conventions." },
    { title: "Figma Variables Sync", desc: "Bidirectional sync with Figma Variables API — live, two-way." },
    { title: "Multi-brand Support", desc: "Manage token sets for multiple brands from a single workspace." },
    { title: "Accessibility Audit", desc: "Automated contrast checks and WCAG scoring baked into the editing flow." },
  ],
};

const TABS = ["Overview", "Demo", "Stack", "Roadmap"];

function MockScreen({ shot }) {
  return (
    <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/5 flex flex-col" style={{ background: shot.bg }}>
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5">
        <span className="w-2 h-2 rounded-full bg-white/10" />
        <span className="w-2 h-2 rounded-full bg-white/10" />
        <span className="w-2 h-2 rounded-full bg-white/10" />
        <span className="ml-3 text-[10px] tracking-widest uppercase" style={{ color: shot.accent, opacity: 0.4 }}>{shot.label}</span>
      </div>
      <div className="flex flex-1 gap-3 p-4">
        <div className="w-1/4 flex flex-col gap-2">
          {[80, 65, 90, 55, 75].map((w, i) => (
            <div key={i} className="h-2 rounded-sm" style={{ width: `${w}%`, background: shot.accent, opacity: 0.12 }} />
          ))}
        </div>
        <div className="flex-1 rounded-lg border" style={{ borderColor: shot.accent + "15" }}>
          <div className="w-full h-full rounded-lg" style={{ background: `linear-gradient(135deg, ${shot.accent}08, transparent)` }} />
        </div>
      </div>
    </div>
  );
}

export default function ProjectScreen({setProjectShow}) {
  const [activeTab, setActiveTab] = useState("Overview");
  const [activeShot, setActiveShot] = useState(0);

  const [loading, setLoading] = useState(1)
      useEffect(() => {
          setTimeout(() => {
              setLoading(0)
          }, 1200);
      }, [])

  return (
    <motion.section animate={{opacity:1}} exit={{opacity:0}} className="min-h-screen text-stone-300 z-[10000] fixed top-0 left-0 h-screen w-screen flex flex-col" style={{ fontFamily: "'Sora', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap');
        .serif { font-family: 'Playfair Display', Georgia, serif; }

        ::selection { background: #c8b89a40; color: #f0ebe3; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2a2a28; border-radius: 2px; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .tab-content { animation: fadeIn 0.3s ease forwards; }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-in { animation: slideIn 0.6s ease forwards; }
        .hero-in-2 { animation: slideIn 0.6s 0.1s ease both; }
        .hero-in-3 { animation: slideIn 0.6s 0.2s ease both; }

        .tab-btn { position: relative; }
        .tab-btn::after {
          content: '';
          position: absolute;
          bottom: -1px; left: 0; right: 0;
          height: 1px;
          background: #c8b89a;
          transform: scaleX(0);
          transition: transform 0.25s ease;
        }
        .tab-btn.active::after { transform: scaleX(1); }
        .tab-btn.active { color: #e8dfd4; }

        .pill:hover { background: #c8b89a18; border-color: #c8b89a50; color: #e8dfd4; }
      `}</style>

                  {/* <div className="fixed bg-[#a287d5] blur blur-1 opacity-80 lg:opacity-100 brightness-0 pointer-events-none z-[0]" />
            <div className="fixed bg-[#E4B8BF] blur blur-2 opacity-80 lg:opacity-100 brightness-0 pointer-events-none z-[0]" />
            <div className="fixed bg-[#8b6bc5] blur blur-3 opacity-80 lg:opacity-100 brightness-0 pointer-events-none z-[0]" /> */}
            <AnimatePresence>

                {loading ? <>
                    <motion.div initial={{ top: loading == 1 ? "100vh" : "-100vh", opacity: 0 }} animate={{ top: 0, opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .5, delay: loading == 1 ? 0 : .5 }} className={`${loading == 1 ? "z-[1000]" : "z-[1500]"} absolute w-full h-full left-0 bg-white`}></motion.div>
                    <motion.div initial={{ top: loading == 1 ? "100vh" : "-100vh", opacity: 0 }} animate={{ top: 0, opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .5, delay: loading == 1 ? .5 : 0 }} className={`${loading == 1 ? "z-[1000]" : "z-[1000]"} absolute w-full h-full left-0 bg-black`}></motion.div>
                </> : null}
            </AnimatePresence>

      {/* Nav */}
      <motion.nav initial={{y:"100vh"}} animate={{y:"0vh"}} transition={{delay:.3}} className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0c0c0c] border-b border-white/5">
        <div className="max-w-8xl mx-auto px-6 h-14 flex items-center justify-between">
          <button onClick={() => {
                    setLoading(2); 
                    setTimeout(() => {
                        setProjectShow(null)
                    }, 1000);
                }} className="text-stone-600 text-sm hover:text-stone-300 transition-colors flex items-center gap-2">
            <span className="text-xs">←</span> Back
          </button>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-stone-600 tracking-widest uppercase">{project.year}</span>
            <span className="flex items-center gap-1.5 text-emerald-500/70">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {project.status}
            </span>
          </div>
        </div>
      </motion.nav>
    <motion.div initial={{y:"100vh"}} animate={{y:"0vh"}} transition={{delay:.3}} className="h-full overflow-y-scroll bg-[#0c0c0c]">

    
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-20">

        {/* ── Hero ── */}
        <header className="mb-10">
          <p className="hero-in text-[11px] tracking-[0.35em] text-stone-600 uppercase mb-4">Project</p>
          <h2 className="serif hero-in-2 text-6xl md:text-7xl font-normal text-stone-100 leading-none mb-3">
            {project.title}
          </h2>
          <p className="hero-in-3 text-stone-500 text-base font-light mt-4 max-w-md leading-relaxed">
            {project.tagline}
          </p>

          {/* metrics row */}
          <div className="hero-in-3 flex flex-wrap gap-6 mt-8 pt-8 border-t border-white/5">
            {project.metrics.map((m, i) => (
              <div key={i}>
                <div className="serif text-2xl text-stone-200">{m.value}</div>
                <div className="text-[11px] text-stone-600 tracking-wide mt-0.5">{m.label}</div>
              </div>
            ))}
            <div className="ml-auto flex items-end gap-2 pb-0.5">
              <a href={project.links.github}
                className="text-xs text-stone-600 hover:text-stone-300 transition-colors border border-white/8 hover:border-white/20 px-3 py-1.5 rounded-full">
                GitHub ↗
              </a>
              <a href={project.links.live}
                className="text-xs bg-stone-200 text-stone-900 hover:bg-white transition-colors px-3 py-1.5 rounded-full font-medium">
                Live ↗
              </a>
            </div>
          </div>
        </header>

        {/* ── Tabs ── */}
        <div className="border-b border-white/8 mb-8">
          <div className="flex gap-7">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`tab-btn text-sm pb-3 transition-colors duration-200 ${activeTab === tab ? "active text-stone-200" : "text-stone-600 hover:text-stone-400"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* ── Tab Content ── */}
        <div key={activeTab} className="tab-content">

          {/* OVERVIEW */}
          {activeTab === "Overview" && (
            <div className="space-y-10">
              {/* Screenshots */}
              <div>
                <MockScreen shot={project.screenshots[activeShot]} />
                <div className="flex gap-2 mt-3">
                  {project.screenshots.map((s, i) => (
                    <button
                      key={s.id}
                      onClick={() => setActiveShot(i)}
                      className={`flex-1 py-2 rounded-lg border text-[10px] tracking-widest uppercase transition-all duration-200
                        ${activeShot === i ? "border-stone-500/50 text-stone-400 bg-stone-900/50" : "border-white/5 text-stone-700 hover:border-white/15 hover:text-stone-500"}`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/[0.03] border border-white/6 rounded-2xl p-6">
                  <p className="text-[10px] tracking-[0.3em] text-stone-600 uppercase mb-3">What it is</p>
                  <p className="text-stone-400 text-sm leading-relaxed font-light">{project.description}</p>
                </div>
                <div className="bg-white/[0.03] border border-white/6 rounded-2xl p-6">
                  <p className="text-[10px] tracking-[0.3em] text-stone-600 uppercase mb-3">The problem</p>
                  <p className="text-stone-400 text-sm leading-relaxed font-light">{project.problem}</p>
                </div>
              </div>
            </div>
          )}

          {/* DEMO */}
          {activeTab === "Demo" && (
            <div className="space-y-6">
              <div>
                <p className="text-[10px] tracking-[0.3em] text-stone-600 uppercase mb-4">App Demo</p>
                <div className="rounded-2xl overflow-hidden border border-white/8 bg-black">
                  <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                    <span className="w-2 h-2 rounded-full bg-white/10" />
                    <span className="w-2 h-2 rounded-full bg-white/10" />
                    <span className="w-2 h-2 rounded-full bg-white/10" />
                    <span className="ml-3 text-[10px] text-stone-600 tracking-widest">lumina.design — demo</span>
                  </div>
                  <div className="aspect-video">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${project.youtubeId}?rel=0&modestbranding=1`}
                      title="Project Demo"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>

              {/* short about below video */}
              <div className="bg-white/[0.03] border border-white/6 rounded-2xl p-6">
                <p className="text-[10px] tracking-[0.3em] text-stone-600 uppercase mb-3">About this demo</p>
                <p className="text-stone-500 text-sm leading-relaxed font-light">
                  This walkthrough covers the token editor, multi-platform export pipeline, and the real-time sync in action. Replace the YouTube ID in the project config to use your own video.
                </p>
              </div>
            </div>
          )}

          {/* STACK */}
          {activeTab === "Stack" && (
            <div className="space-y-8">
              <p className="text-[10px] tracking-[0.3em] text-stone-600 uppercase">Technologies used</p>

              {/* group by category */}
              {(() => {
                const categories = [...new Set(project.tech.map(t => t.category))];
                return categories.map(cat => (
                  <div key={cat}>
                    <p className="text-[10px] text-stone-700 tracking-widest uppercase mb-3">{cat}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.filter(t => t.category === cat).map((t, i) => (
                        <span
                          key={i}
                          className="pill px-4 py-2 rounded-full border border-white/8 bg-white/[0.03] text-sm text-stone-400 transition-all duration-200 cursor-default"
                        >
                          {t.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ));
              })()}

              {/* architecture note */}
              <div className="mt-6 border border-white/6 rounded-2xl p-6 bg-white/[0.02]">
                <p className="text-[10px] tracking-[0.3em] text-stone-600 uppercase mb-3">Architecture note</p>
                <p className="text-stone-500 text-sm leading-relaxed font-light">
                  GraphQL sits between the React frontend and Node.js services, with WebSockets for real-time token updates. PostgreSQL stores versioned token history; Redis handles pub/sub for live collaboration sessions.
                </p>
              </div>
            </div>
          )}

          {/* ROADMAP */}
          {activeTab === "Roadmap" && (
            <div className="space-y-4">
              <p className="text-[10px] tracking-[0.3em] text-stone-600 uppercase mb-6">What's coming next</p>
              {project.futureScope.map((item, i) => (
                <div
                  key={i}
                  className="group flex items-start gap-5 p-6 rounded-2xl border border-white/6 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-200"
                >
                  <span className="serif text-3xl text-stone-800 group-hover:text-stone-600 transition-colors mt-0.5 leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-stone-200 text-sm font-medium mb-1.5">{item.title}</h3>
                    <p className="text-stone-500 text-sm leading-relaxed font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-5 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-stone-700 text-[11px] tracking-widest uppercase">{project.title} · {project.year}</span>
          <span className="text-stone-700 text-[11px]">With 💓 from Pranay</span>
        </div>
      </footer>
      </motion.div>
    </motion.section>
  );
}