export default function AboutMe({setShowPortfolio,setCurrentSetterTab}) {
  return (
    <section
        data-scroll-section
      className="min-h-screen flex items-center justify-center py-24"
      style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
    >
      <div className="w-full max-w-7xl">

        {/* Label */}
        {/* <p
          className="text-xs tracking-[0.4em] text-[#555] uppercase mb-12"
          style={{ fontFamily: "monospace" }}
        >
          01 — About Me
        </p> */}

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">

          {/* Left — photo + status badge */}
          <div className="md:col-span-4 flex flex-col items-start gap-6">

            {/* Photo box */}
            <div className="w-full aspect-[4/5] bg-[#181818] border border-white/5 relative overflow-hidden">
              {/* Replace this div with: <img src="your-photo.jpg" className="w-full h-full object-cover" /> */}
              <img src="full.jpeg" className=" h-[90%] w-max mx-auto mt-[6.5%] rounded-sm" />
              {/* <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-14 h-14 rounded-full bg-[#2a2a2a]" />
                <p className="text-[10px] tracking-widest text-[#444] uppercase" style={{ fontFamily: "monospace" }}>
                  Your Photo
                </p>
              </div> */}
              <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-[#c9a96e]/40" />
              <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-[#c9a96e]/40" />
            </div>

            {/* Status badge */}
            <div className="w-full border border-white/8 bg-white/[0.02] px-4 py-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6ee7b7]" style={{ animation: "ping-slow 2s infinite" }} />
                <p className="text-[10px] tracking-widest text-[#6ee7b7] uppercase" style={{ fontFamily: "monospace" }}>
                  Open to Internships
                </p>
              </div>
              <p className="text-xs text-[#555] leading-relaxed" style={{ fontFamily: "monospace" }}>
                CS student actively seeking summer / fall 2026 opportunities.
              </p>
            </div>
          </div>

          {/* Right — text content */}
          <div className="md:col-span-8 flex flex-col gap-8">

            {/* Headline */}
            <h2
              className="text-[clamp(2rem,5vw,3.5rem)] font-normal text-[#f0ece4] leading-[1.1]"
              style={{ letterSpacing: "-0.02em" }}
            >
              Hi, I'm a
              <br />
              <span className="italic text-[#c9a96e]">curious mind</span>
              <br />
              studying CS.
            </h2>

            <div className="h-px w-full bg-white/8" />

            {/* Bio */}
            <div className="space-y-5">
              <p className="text-base text-[#aaa] leading-relaxed">
                I'm a Computer Science BCA student currently in my last (6th) semester, driven by an insatiable curiosity for how things work — and an urge to build things that actually matter. Right now I'm in that exciting early chapter: learning fast, experimenting constantly, and turning ideas into real projects.
              </p>
<p className="text-base text-[#666] leading-relaxed">
  I have experience working with technologies like Python, MERN Stack, Flutter, and databases. I like solving problems through code and learning by creating practical projects instead of only studying theory.
</p>
              {/* <p className="text-base text-[#666] leading-relaxed">
                I don't have professional experience yet, but I believe in learning by doing. Every project I take on is a chance to go deeper — whether that's understanding a data structure, making a UI feel just right, or figuring out why something breaks at 2am.
              </p> */}
              <p className="text-base text-[#666] leading-relaxed">
                I'm actively looking for an internship where I can contribute, grow alongside experienced engineers, and prove that hunger and curiosity go a long way.
              </p>
            </div>

            <div className="h-px w-full bg-white/8" />

            {/* Currently + Interested In */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-[10px] tracking-widest text-[#444] uppercase mb-3" style={{ fontFamily: "monospace" }}>
                  Currently
                </p>
                <ul className="space-y-2">
                  {["Studying Computer Science", "Building personal projects", "Learning new tech daily"].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#777]">
                      <span className="text-[#c9a96e] mt-0.5 text-xs">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[10px] tracking-widest text-[#444] uppercase mb-3" style={{ fontFamily: "monospace" }}>
                  Interested In
                </p>
                <ul className="space-y-2">
                  {["Full-stack development", "Clean UI & design", "Open source"].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#777]">
                      <span className="text-[#c9a96e] mt-0.5 text-xs">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
              onClick={()=>setCurrentSetterTab("contact")}
                className="text-xs tracking-[0.25em] cursor-none target-hand uppercase px-6 py-3 bg-[#f0ece4] text-[#0c0c0c] hover:bg-[#c9a96e] transition-colors duration-300"
                style={{ fontFamily: "monospace" }}
              >
                Get in Touch
              </button>
              <button
                onClick={() => setShowPortfolio(true)}
                className="text-xs tracking-[0.25em] cursor-none uppercase px-6 py-3 border border-white/10 text-[#777] hover:text-[#f0ece4] hover:border-white/30 target-hand transition-all duration-300"
                style={{ fontFamily: "monospace" }}
              >
                Resume ↓
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ping-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}