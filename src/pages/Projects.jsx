import { useState, useRef, useEffect } from "react";
import { AiSvg, CssSvg, ExpressSvg, ExtensionSvg, FirebaseSvg, HtmlSvg, IndexedDbSvg, JavascriptSvg, ModelSvg, MongoDbSvg, MysqlSvg, NodeJsSvg, PythonSvg, ReactSvg, RestApiSvg, TailwindSvg } from '../component/SvgComponent'
import { motion } from "framer-motion";


const projects = [
    {category:"Web App", image:"/swello.png", videoSrc:"/swello.mp4", title:"Swellow", description:"A dynamic sports connection platform that helps players discover teammates, join matches, and build their local sports community effortlessly.", tag:"ongoing", skills:[ReactSvg, NodeJsSvg, ExpressSvg, MysqlSvg, MongoDbSvg] ,},
    {category:"Web App", image:"/curease.png", videoSrc:"/curease.mp4", title:"CurEase", description:"An AI-powered health-tech app that provides smart symptom-based disease detection, nutrition analysis, medical report tracking, and seamless doctor-patient interaction in one platform.", tag:"Nov 25", skills:[ReactSvg, TailwindSvg, ExpressSvg, NodeJsSvg, PythonSvg, MongoDbSvg, FirebaseSvg, AiSvg, ModelSvg] ,},
    {category:"Web App", image:"/reviewlens.png", videoSrc:"/reviewlens.mp4", title:"ReviewLens", description:"An AI-powered platform that analyzes user sentiment on products and compares brands to reveal public perception, strengths, and market positioning in real time.", tag:"Jun 25", skills:[HtmlSvg, CssSvg, JavascriptSvg, PythonSvg, AiSvg, RestApiSvg] ,},
    {category:"Web App", image:"/portfolio.png", videoSrc:"/portfolio.mp4", title:"My Portfolio", description:"A modern, fully responsive portfolio website featuring smooth animations, interactive UI elements, and a visually engaging design to showcase my projects and technical skills.", tag:"Oct 25", skills:[ReactSvg, TailwindSvg, CssSvg, JavascriptSvg] ,},
    {category:"Web App", image:"/ricascan.png", videoSrc:"/ricascan.mp4", title:"Rica Scanner", description:"A smart document scanner application that allows users to scan, process, and manage documents seamlessly with real-time sync between web and mobile platforms.", tag:"Jan 26", skills:[ReactSvg, TailwindSvg, CssSvg, JavascriptSvg, PythonSvg, RestApiSvg] ,},
    {category:"Web App", image:"/homepage.png", videoSrc:"/homepage.mp4", title:"HomePage", description:"A customizable homepage browser extension featuring a built-in to-do manager, personalized settings, and quick access to browser bookmarks for a more organized and productive browsing experience.", tag:"Jan 25", skills:[ReactSvg, TailwindSvg, IndexedDbSvg, FirebaseSvg, ExtensionSvg] },
]    

const VideoCard = ({ setProjectShow, image, videoSrc, title, description, tag, skills }) => {
  const videoRef = useRef(null);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isHovering) {
      video.play().catch(() => { });
    } else {
      video.pause();
      video.currentTime = 0; // optional
    }
  }, [isHovering]);
const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <motion.div
    onClick={()=>setProjectShow(true)}
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      exit={{ y: 30, opacity: 0 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ ease: "easeInOut", duration: 1 }}
      className="relative bg-zinc-100 dark:bg-zinc-900 rounded-lg overflow-hidden target-hand w-full"
      style={{ height: "350px" }}
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >

      {!videoLoaded && (
        <img
          src={image}
          alt="Video placeholder"
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{
          height: isHovering ? "100%" : "200px",
          transition: "height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        />
      )}
      {/* Video — starts at top portion, expands to fill on hover */}
      <video
        ref={videoRef}
        src={videoSrc}
        onCanPlayThrough={() => setVideoLoaded(true)}
        loop
        muted
        playsInline
        preload='none'
        className="absolute left-0 top-0 w-full object-cover"
        style={{
          height: isHovering ? "100%" : "200px",
          transition: "height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />

      {/* Tag pill */}
      {tag && (
        <span className={`absolute top-3 left-3 z-10 ${tag == "ongoing" ? "bg-amber-400" : "bg-teal-500"} text-zinc-900 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full`}>
          {tag}
        </span>
      )}



      {/* Description — sits below the video, fades out on hover */}
      <div
        className="absolute left-0 w-full px-5 py-4"
        style={{
          top: "200px",
          opacity: isHovering ? 0 : 1,
          transform: isHovering ? "translateY(6px)" : "translateY(0)",
          transition: "opacity 0.2s ease, transform 0.35s ease",
        }}
      >
        <h3 className="text-[#111] dark:text-white font-semibold text-base leading-snug mb-1" style={{ letterSpacing: "-0.01em" }}>
          {title}
        </h3>
        <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">{description}</p>
        {/* skills sectioon */}
        <div className='flex gap-5 mt-3 w-full overflow-y-hidden overflow-x-auto no-scrollbar'>
          {skills.map((Skill, index) => (
            <Skill key={index} className="fill-black dark:fill-white size-6 opacity-50 min-w-6" />
          ))}
        </div>
      </div>



      {/* Border glow */}
      <div
        className="absolute inset-0 rounded-lg pointer-events-none"
        style={{
          boxShadow: isHovering
            ? "inset 0 0 0 1.5px rgba(251,191,36,0.4)"
            : "inset 0 0 0 1px rgba(255,255,255,0.06)",
          transition: "box-shadow 0.35s ease",
        }}
      />
    </motion.div>
  );
};

const categories = ["Web App", "Android App", "CLI Tools"];

export default function Projects({setProjectShow}) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section
    data-scroll-section
    id="portfolio"
      className="min-h-screen px-6 py-24 dark:bg-[#111]/20"
      style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
    >
      <div data-scroll data-scroll-repeat data-scroll-call="portfolio" />
      <div className="w-full max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <p
              className="text-xs tracking-[0.4em] dark:text-[#ccc] text-[#555] uppercase mb-4"
              style={{ fontFamily: "monospace" }}
            >
              02 — Work
            </p>
            <h2
              className="text-[clamp(2.2rem,5vw,3.8rem)] font-normal text-[#111] dark:text-[#f0ece4] leading-[1.08]"
              style={{ letterSpacing: "-0.02em" }}
            >
              Selected
              <br />
              <span className="italic text-[#c9a96e]">Projects.</span>
            </h2>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`text-[10px] tracking-widest uppercase px-4 py-2 border transition-all duration-200 cursor-none target-hand ${
                  activeFilter === cat
                    ? "border-[#c9a96e]/60 text-[#c9a96e] bg-[#c9a96e]/5"
                    : "border-white/8 dark:text-[#aaa] text-[#555] hover:text-[#aaa] hover:border-white/20"
                }`}
                style={{ fontFamily: "monospace" }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px">
          {/* {filtered.map((project) => (
            <div
              key={project.id}
              onMouseEnter={() => setHovered(project.id)}
              onMouseLeave={() => setHovered(null)}
              className={`relative bg-[#0c0c0c] p-8 flex flex-col justify-between gap-8 transition-all duration-300 group ${
                hovered === project.id ? "bg-[#131313]" : ""
              }`}
              style={{ minHeight: "260px" }}
            >
              Top row — number + category
              <div className="flex items-start justify-between">
                <span
                  className="text-[11px] text-[#2a2a2a] transition-colors duration-300 group-hover:text-[#3a3a3a]"
                  style={{ fontFamily: "monospace" }}
                >
                  {project.number}
                </span>
                <span
                  className={`text-[9px] tracking-widest uppercase px-2 py-1 border transition-all duration-300 ${
                    hovered === project.id
                      ? "border-[#c9a96e]/30 text-[#c9a96e]"
                      : "border-white/6 text-[#444]"
                  }`}
                  style={{ fontFamily: "monospace" }}
                >
                  {project.category}
                </span>
              </div>

              Middle — title + description
              <div className="flex-1">
                <h3
                  className={`text-lg font-normal mb-3 transition-colors duration-300 ${
                    hovered === project.id ? "text-[#f0ece4]" : "text-[#aaa]"
                  }`}
                >
                  {project.title}
                </h3>
                <p
                  className={`text-xs leading-relaxed transition-colors duration-300 ${
                    hovered === project.id ? "text-[#666]" : "text-[#3a3a3a]"
                  }`}
                >
                  {project.description}
                </p>
              </div>

              Bottom — stack
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[9px] tracking-widest uppercase text-[#555] border border-white/6 px-2 py-1 transition-colors duration-300 group-hover:text-[#777] group-hover:border-white/10"
                    style={{ fontFamily: "monospace" }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              Hover corner accent
              <div
                className={`absolute bottom-0 right-0 w-6 h-6 border-b border-r transition-all duration-300 ${
                  hovered === project.id ? "border-[#c9a96e]/50" : "border-transparent"
                }`}
              />
            </div>
          ))} */}
        {filtered.map((project,index)=>(
            <VideoCard setProjectShow={setProjectShow} key={index} VideoCard image={project.image} videoSrc={project.videoSrc} title={project.title} description={project.description} tag={project.tag} skills={project.skills} />
        ))}
          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="col-span-3 py-24 flex items-center justify-center">
              <p className="text-xs dark:text-[#ccc] text-[#444] tracking-widest uppercase" style={{ fontFamily: "monospace" }}>
                Work under progress. I will upload them soon.
              </p>
            </div>
          )}
        </div>

        {/* Footer note */}
        <div className="mt-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/6" />
          <p className="text-[10px] tracking-widest text-[#333] uppercase shrink-0" style={{ fontFamily: "monospace" }}>
            More on GitHub
          </p>
          <div className="h-px flex-1 bg-white/6" />
        </div>

      </div>
      <div data-scroll data-scroll-repeat data-scroll-call="portfolio" />

    </section>
  );
}