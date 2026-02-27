import { useState } from "react";

const skillGroups = [
  {
    id: "frontend",
    label: "Frontend",
    number: "01",
    color: "#c9a96e",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3", "Framer Motion"],
  },
  {
    id: "backend",
    label: "Backend",
    number: "02",
    color: "#7eb8c9",
    skills: ["Node.js", "Express", "REST APIs", "GraphQL", "PostgreSQL", "MongoDB", "Firebase"],
  },
  {
    id: "languages",
    label: "Languages",
    number: "03",
    color: "#a8c97e",
    skills: ["JavaScript", "TypeScript", "Python", "Java", "C", "SQL", "Bash"],
  },
  {
    id: "tools",
    label: "Tools & DevOps",
    number: "04",
    color: "#c97eb8",
    skills: ["Git", "GitHub", "Docker", "Linux", "VS Code", "Figma", "Postman"],
  },
];

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [activeGroup, setActiveGroup] = useState(null);

  const displayGroups =
    activeGroup ? skillGroups.filter((g) => g.id === activeGroup) : skillGroups;

  return (
    <section
    data-scroll-section
      className="min-h-screen  flex items-center justify-center px-6 py-24 dark:bg-[#111]/20"
      style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
    >
      <div className="w-full max-w-7xl">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p
              className="text-xs tracking-[0.4em] dark:text-[#ccc] text-[#555] uppercase mb-4"
              style={{ fontFamily: "monospace" }}
            >
              04 — Expertise
            </p>
            <h2
              className="text-[clamp(2.2rem,5vw,3.8rem)] font-normal text-[#111] dark:text-[#f0ece4] leading-[1.08]"
              style={{ letterSpacing: "-0.02em" }}
            >
              My
              <br />
              <span className="italic text-[#c9a96e]">Skill Set.</span>
            </h2>
          </div>

          {/* Category filter tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveGroup(null)}
              className={`cursor-none target-hand text-[10px] tracking-widest uppercase px-4 py-2 border transition-all duration-200 ${
                activeGroup === null
                  ? "border-black/20 dark:border-white/20 text-[#222] dark:text-[#f0ece4]"
                  : "border-black/10 dark:border-white/6 text-[#444] dark:text-[#fff] hover:text-[#777] hover:border-white/12"
              }`}
              style={{ fontFamily: "monospace" }}
            >
              All
            </button>
            {skillGroups.map((g) => (
              <button
                key={g.id}
                onClick={() => setActiveGroup(activeGroup === g.id ? null : g.id)}
                className={`cursor-none target-hand text-[10px] tracking-widest uppercase px-4 py-2 border transition-all duration-200 ${
                  activeGroup === g.id
                    ? "text-[#0c0c0c]"
                    : "border-black/6 dark:border-white/6 text-[#444] dark:text-[#aaa] dark:hover:text-[#999] hover:text-[#777] hover:border-white/12"
                }`}
                style={
                  activeGroup === g.id
                    ? { background: g.color, borderColor: g.color }
                    : {}
                }
                fontFamily="monospace"
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skill groups */}
        <div className="space-y-0 divide-y divide-white/6">
          {displayGroups.map((group, gi) => (
            <div
              key={group.id}
              className="py-8 grid grid-cols-12 gap-6 items-start"
              style={{ animation: `fadeUp 0.4s ease ${gi * 0.08}s both` }}
            >
              {/* Left — label */}
              <div className="col-span-12 md:col-span-3 flex items-center gap-3">
                <span
                  className="text-[10px] tracking-widest dark:text-[#888] text-[#333]"
                  style={{ fontFamily: "monospace" }}
                >
                  {group.number}
                </span>
                <div className="h-px flex-1 md:hidden bg-white/6" />
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: group.color }}
                />
                <p
                  className="text-xs tracking-[0.25em] uppercase"
                  style={{ color: group.color, fontFamily: "monospace" }}
                >
                  {group.label}
                </p>
              </div>

              {/* Right — pills */}
              <div className="col-span-12 md:col-span-9 flex flex-wrap gap-2">
                {group.skills.map((skill) => {
                  const isHovered = hoveredSkill === `${group.id}-${skill}`;
                  return (
                    <button
                      key={skill}
                      onMouseEnter={() => setHoveredSkill(`${group.id}-${skill}`)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className={`${isHovered ? `${"text-"+ group.color}  dark:text-white` : "text-[#666] dark:text-white sm:dark:dark:text-[#999]"} text-xs px-4 py-2 border border-black/20 dark:border-white/20 transition-all duration-300 cursor-none target-hand` }
                      style={{
                        fontFamily: "monospace",
                        letterSpacing: "0.08em",
                        borderColor: isHovered ? group.color : "rgba(255,255,255,0.08)",
                        background: isHovered ? `${group.color}0d` : "transparent",
                        boxShadow: isHovered ? `0 0 16px ${group.color}25` : "none",
                        transform: isHovered ? "translateY(-1px)" : "translateY(0)",
                      }}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom count */}
        <div className="mt-12 pt-8 border-t border-white/6 flex items-center justify-between">
          <p
            className="text-[10px] tracking-widest dark:text-white sm:dark:text-[#888] text-[#333] uppercase"
            style={{ fontFamily: "monospace" }}
          >
            Learning Constantly
          </p>
          <div className="flex items-center gap-2">
            {skillGroups.map((g) => (
              <div
                key={g.id}
                className="w-1.5 h-1.5 rounded-full opacity-40"
                style={{ background: g.color }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}