import { useState } from "react";

const educationData = [
  {
    id: 1,
    degree: "Bachelor in Computer Application",
    field: "Computer Application",
    school: "Vivekananda Institute of Professional Studies",
    location: "New Delhi",
    year: "2023 – 2026",
    gpa: "8.5 / 10",
    thesis: "Software Developement & Data Science",
    highlights: ["Ideathon","Runner up in Badminton"],
  },
  {
    id: 2,
    degree: "Senior Secondary",
    field: "Science",
    school: "Kendriya Vidyalaya",
    location: "Thane, Mumbai",
    year: "2022 – 2023",
    gpa: "75%",
    thesis: "Physics, Chemistry, Maths with CS",
    highlights: ["Quiz Winner", "Badminton Regionals", "Class Leader"],
  },
];

export default function Education() {
  const [active, setActive] = useState(educationData[0].id);

  const selected = educationData.find((e) => e.id === active);

  return (
    <section
    data-scroll-section
    id="resume"
      className="flex flex-col items-center justify-center px-6 py-10 dark:bg-[#111]/20"
      style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
    >
      {/* Header */}
      <div
        data-scroll
        data-scroll-repeat
        data-scroll-call="resume" className="w-full max-w-7xl mb-16">
            {/* Label */}
        <p
          className="text-xs tracking-[0.4em] dark:text-[#ccc] text-[#555] uppercase mb-12 self-start"
          style={{ fontFamily: "monospace" }}
        >
          05 — Education
        </p>

        <p
          className="text-xs tracking-[0.35em] text-[#555] dark:text-[#888] uppercase mb-3"
          style={{ fontFamily: "monospace" }}
        >
          Background
        </p>
        <h2 className="text-7xl font-normal text-[#333] dark:text-[#f0ece4] leading-tight">
          Education
        </h2>
        <div className="mt-4 h-px w-12 bg-[#c9a96e]" />
      </div>

      {/* Layout */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-5 gap-0">
        {/* Sidebar tabs */}
        <div className="md:col-span-2 flex md:flex-col gap-1 mb-6 md:mb-0 md:pr-10">
          {educationData.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`group text-left px-4 py-4 border-l-2 transition-all duration-300 ${
                active === item.id
                  ? "border-[#c9a96e] bg-black/5 dark:bg-white/5"
                  : "border-transparent hover:border-white/20 hover:bg-white/[0.02]"
              }`}
            >
              <p
                className={`text-xs uppercase tracking-widest mb-1 transition-colors duration-300 ${
                  active === item.id ? "text-[#c9a96e]" : "text-[#555] dark:text-[#888]"
                }`}
                style={{ fontFamily: "monospace" }}
              >
                {item.year}
              </p>
              <p
                className={`text-sm font-medium transition-colors duration-300 ${
                  active === item.id ? "text-[#222] dark:text-[#f0ece4]" : "text-[#666]  dark:text-[#888]"
                }`}
              >
                {item.school}
              </p>
              <p
                className={`text-xs mt-0.5 transition-colors duration-300 ${
                  active === item.id ? "text-[#222] dark:text-[#999]" : "text-[#444]  dark:text-[#666]"
                }`}
              >
                {item.field}
              </p>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div
          key={selected.id}
          className="md:col-span-3 border border-white/10 p-8 bg-black/5 dark:bg-white/[0.02]"
          style={{
            animation: "fadeIn 0.4s ease forwards",
          }}
        >
          {/* Degree + field */}
          <div className="mb-6">
            <h3 className="text-2xl text-[#333] dark:text-[#f0ece4] font-normal leading-snug">
              {selected.field}
            </h3>
            <p className="text-[#c9a96e] text-sm mt-1 tracking-wide">
              {selected.degree}
            </p>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-x-8 gap-y-2 mb-8 text-xs text-[#666]" style={{ fontFamily: "monospace" }}>
            <span className="flex items-center gap-2">
              <span className="text-[#444]">School</span>
              <span className="text-[#222] dark:text-[#aaa]">{selected.school}</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="text-[#444]">Location</span>
              <span className="text-[#222] dark:text-[#aaa]">{selected.location}</span>
            </span>
            {selected.gpa && (
              <span className="flex items-center gap-2">
                <span className="text-[#444]">GPA</span>
                <span className="text-[#222] dark:text-[#aaa]">{selected.gpa}</span>
              </span>
            )}
          </div>

          {/* Thesis */}
          {selected.thesis && (
            <div className="mb-8 pl-4 border-l border-white/10">
              <p className="text-[10px] uppercase tracking-widest text-[#555] mb-1" style={{ fontFamily: "monospace" }}>
                Thesis / Focus
              </p>
              <p className="text-[#222] dark:text-[#bbb] text-sm leading-relaxed italic">
                "{selected.thesis}"
              </p>
            </div>
          )}

          {/* Highlights */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#555] mb-3" style={{ fontFamily: "monospace" }}>
              Highlights
            </p>
            <div className="flex flex-wrap gap-2">
              {selected.highlights.map((h) => (
                <span
                  key={h}
                  className="text-xs px-3 py-1.5 border border-black/10 dark:border-white/10 text-[#222] dark:text-[#aaa] tracking-wide"
                  style={{ fontFamily: "monospace" }}
                >
                  {h}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        data-scroll
        data-scroll-repeat
        data-scroll-call="resume"/>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}