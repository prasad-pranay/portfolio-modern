import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const project = {
    number: "01",
    title: "Review Lens",
    tagline: "See what people really think through smart AI review analysis.",
    category: "Data Analytics",
    year: "Jun 2025",
    status: "In Progress",
    github: "https://github.com/prasad-pranay/reviewlens",
    live: "",
    overview:
        "ReviewLens is an AI-powered review analysis platform that helps users quickly understand large amounts of customer feedback. It automatically analyzes reviews to identify key insights, sentiments, and common opinions, making it easier to see what people like or dislike about a product or service. By transforming unstructured reviews into clear and meaningful information, ReviewLens saves time and helps users make better decisions.ReviewLens is an AI-powered review analysis platform that helps users quickly understand large amounts of customer feedback. It automatically analyzes reviews to identify key insights, sentiments, and common opinions, making it easier to see what people like or dislike about a product or service. By transforming unstructured reviews into clear and meaningful information, ReviewLens saves time and helps users make better decisions.",
    images: [
        "/reviewlens.mp4",
        "/prj-reviewlens/0.png",
        "/prj-reviewlens/1.png",
        "/prj-reviewlens/2.png",
        "/prj-reviewlens/3.png",
        "/prj-reviewlens/4.png",
        "/prj-reviewlens/5.png",
    ],
    features: [
        {
        title:"📄 CSV Upload for Review Analysis.",
        desc:"Upload CSV files containing product reviews and get meaningful insights instantly.",
      },
      {
        title:"🔍 Search Product Reviews by Name.",
        desc:"Easily compare similar products from different companies and get best option based on reviews.",
      },
      {
        title:"📷 Barcode Search Support",
        desc:"Search for a product using its barcode to quickly fetch its details and review history.",
      },
      {
        title:"💸 Price Comparison Across Platforms",
        desc:"Check and compare the prices of a product across multiple e-commerce platforms.",
      },
      {
        title:"📊 Sentiment Analysis with NLTK",
        desc:"Backend uses natural language processing to analyze review sentiment and provide helpful feedback.",
      },
      {
        title:"📱 Responsive & User-Friendly UI",
        desc:"Fully responsive design for both desktop and mobile devices, ensuring a smooth user experience.",
      },

        // {
        //     title: "Smart Deadline Tracker",
        //     desc: "Automatically sorts and highlights upcoming deadlines by urgency with color-coded priority levels.",
        // },
        // {
        //     title: "Subject-based Task Boards",
        //     desc: "Kanban-style boards for each subject — move tasks from To Do → In Progress → Done.",
        // },
        // {
        //     title: "Weekly Timetable View",
        //     desc: "A drag-and-drop weekly calendar to plan study sessions and block time for assignments.",
        // },
        // {
        //     title: "Progress Dashboard",
        //     desc: "Visual charts showing completion rates per subject and overall weekly progress.",
        // },
        // {
        //     title: "User Authentication",
        //     desc: "Secure sign-up and login with JWT tokens and persistent sessions across devices.",
        // },
        // {
        //     title: "Dark / Light Mode",
        //     desc: "Fully responsive theme toggle with system preference detection and manual override.",
        // },
    ],
    stack: [
        { category: "Frontend", items: ["React", "Tailwind CSS", "Recharts"] },
        { category: "Backend", items: ["Node.js", "Express", "JWT Auth"] },
        { category: "Database", items: ["PostgreSQL", "Prisma ORM"] },
        { category: "Tools", items: ["Git", "Vite", "Postman", "Figma"] },
    ],
    futureScope: [
        "AI-powered study schedule generator based on exam dates and workload",
        "Collaborative study rooms with shared task boards and real-time updates",
        "Mobile app (React Native) for on-the-go access and push notifications",
        "Integration with Google Calendar and Notion for seamless import/export",
        "Pomodoro timer built in with session analytics and streak tracking",
    ],
};

export default function ProjectDetail({ setProjectShow }) {
    const [activeImage, setActiveImage] = useState(0);
    const [activeTab, setActiveTab] = useState("overview");

    const [loading, setLoading] = useState(1)
    useEffect(() => {
        setTimeout(() => {
            setLoading(0)
        }, 1200);
    }, [])

    const tabs = ["overview", "features", "stack", "future"];

    return (
        <div
            className="min-h-screen bg-[#0c0c0c] text-[#f0ece4] absolute  top-0 left-0 w-screen h-screen flex flex-col"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
        >
            <div className="fixed bg-[#a287d5] blur blur-1 opacity-80 lg:opacity-100 pointer-events-none z-[0]" />
            <div className="fixed bg-[#E4B8BF] blur blur-2 opacity-80 lg:opacity-100 pointer-events-none z-[0]" />
            <div className="fixed bg-[#8b6bc5] blur blur-3 opacity-80 lg:opacity-100 pointer-events-none z-[0]" />
            <AnimatePresence>

                {loading ? <>
                    <motion.div initial={{ top: loading == 1 ? "100vh" : "-100vh", opacity: 0 }} animate={{ top: 0, opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .5, delay: loading == 1 ? 0 : .5 }} className={`${loading == 1 ? "z-[1000]" : "z-[1500]"} absolute w-full h-full left-0 bg-white`}></motion.div>
                    <motion.div initial={{ top: loading == 1 ? "100vh" : "-100vh", opacity: 0 }} animate={{ top: 0, opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .5, delay: loading == 1 ? .5 : 0 }} className={`${loading == 1 ? "z-[1000]" : "z-[1000]"} absolute w-full h-full left-0 bg-black`}></motion.div>
                </> : null}
            </AnimatePresence>

            {/* Top bar */}
            <div className="sticky top-0 z-[150] dark:bg-[#111]/20 border-b border-white/6 px-6 md:px-16 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-[10px] tracking-widest dark:text-[#ccc] text-[#444] uppercase" style={{ fontFamily: "monospace" }}>
                        {project.number}
                    </span>
                    <span className=" dark:text-[#ccc] text-[#2a2a2a]">/</span>
                    <span className="text-sm text-[#aaa]">{project.title}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6ee7b7]" style={{ animation: "blink 2s infinite" }} />
                    <span className="text-[10px] tracking-widest dark:text-[#ccc] text-[#555] uppercase" style={{ fontFamily: "monospace" }}>
                        {project.status}
                    </span>
                </div>
            </div>

            <div className="mx-auto px-6 md:px-16 py-16 space-y-20 z-[100] relative h-full dark:bg-[#111]/20  overflow-y-auto slim-scrollbar">
                {/* go bakc button */}
                <div onClick={() => {
                    setLoading(2); 
                    setTimeout(() => {
                        setProjectShow(null)
                    }, 1000);
                }}
                    className="flex items-center gap-2 dark:bg-[#111]/10 backdrop-blur-sm dark:hover:bg-[#111]/30 w-max py-2 px-5 target-hand active:scale-90 transition duration-300 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg><p>Go Back to Home Page</p>

                </div>
                {/* Hero */}
                <div className="space-y-6">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="text-[10px] tracking-widest dark:text-[#ccc] text-[#555] uppercase border border-white/8 px-3 py-1" style={{ fontFamily: "monospace" }}>
                            {project.category}
                        </span>
                        <span className="text-[10px] tracking-widest dark:text-[#ccc] text-[#555] uppercase" style={{ fontFamily: "monospace" }}>
                            — {project.year}
                        </span>
                    </div>

                    <h1
                        className="font-normal leading-[1.0]"
                        style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)", letterSpacing: "-0.03em" }}
                    >
                        {project.title.split(" ").map((word, i) =>
                            i === project.title.split(" ").length - 1 ? (
                                <span key={i} className="italic text-[#c9a96e]">{word}</span>
                            ) : (
                                <span key={i}>{word} </span>
                            )
                        )}
                    </h1>

                    <p className="text-base dark:text-[#aaa] text-[#666] max-w-xl leading-relaxed">{project.tagline}</p>

                    {/* Links */}
                    <div className="flex flex-wrap gap-4 pt-2">
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase border border-white/10 px-5 py-2.5 text-[#777] hover:text-[#f0ece4] hover:border-white/25 transition-all duration-300"
                            style={{ fontFamily: "monospace" }}
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                            GitHub
                        </a>
                        {project.live.length>0 && <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase px-5 py-2.5 bg-[#f0ece4] text-[#0c0c0c] hover:bg-[#c9a96e] transition-colors duration-300"
                            style={{ fontFamily: "monospace" }}
                        >
                            Live Demo
                            <span className="text-xs">↗</span>
                        </a>}
                    </div>
                </div>

                {/* Image gallery */}
                <div className="space-y-3">
                    <div className="relative w-full overflow-hidden bg-[#141414] border border-white/6" style={{ aspectRatio: "16/9" }}>
                        {project.images[activeImage].includes(".mp4") ? <video key={activeImage} src={project.images[activeImage]} autoPlay loop muted playsInline className="w-full h-full object-cover"
                            style={{ animation: "fadeIn 0.4s ease", filter: "brightness(0.85)" }} ></video>: <img
                            key={activeImage}
                            src={project.images[activeImage]}
                            alt={`Screenshot ${activeImage + 1}`}
                            className="w-full h-full object-cover"
                            style={{ animation: "fadeIn 0.4s ease", filter: "brightness(0.85)" }}
                        />}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c]/40 to-transparent pointer-events-none" />
                        {/* Image counter */}
                        <div className="absolute bottom-4 right-4">
                            <span className="text-[9px] tracking-widest text-white/50 uppercase" style={{ fontFamily: "monospace" }}>
                                {String(activeImage + 1).padStart(2, "0")} / {String(project.images.length).padStart(2, "0")}
                            </span>
                        </div>
                    </div>
                    {/* Thumbnails */}
                    <div className="flex gap-2">
                        {project.images.map((img, i) => {
                            if(img.includes(".mp4")){
                                return <button onClick={() => setActiveImage(i)} className="relative h-full flex-1 py-5 items-center justify-center cursor-none target-hand bg-white dark:bg-black/40 flex flex-col">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6 stroke-black dark:stroke-white">
  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
</svg>
{i === activeImage && (
                                    <div className="absolute inset-0 border-2 border-[#c9a96e]" />
                                )}
                                </button>
                            }else{
                                return <button
                                key={i}
                                onClick={() => setActiveImage(i)}
                                className="relative overflow-hidden flex-1 transition-all duration-300 cursor-none target-hand"
                                style={{ aspectRatio: "16/9" }}
                                >
                                <img src={img} alt="" className="w-full h-full object-cover" style={{ filter: "brightness(0.6)" }} />
                                {i === activeImage && (
                                    <div className="absolute inset-0 border-2 border-[#c9a96e]" />
                                )}
                            </button>
                            }
                        }
                    )}
                    </div>
                </div>

                {/* Tabs */}
                <div className="space-y-10">
                    <div className="flex gap-0 border-b border-white/6">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`text-[10px] tracking-widest uppercase px-5 py-3 border-b-2 transition-all duration-200 -mb-px cursor-none target-hand ${activeTab === tab
                                        ? "border-[#c9a96e] text-[#c9a96e]"
                                        : "border-transparent dark:text-[#aaa] text-[#444] hover:text-[#777]"
                                    }`}
                                style={{ fontFamily: "monospace" }}
                            >
                                {tab === "future" ? "Future Scope" : tab}
                            </button>
                        ))}
                    </div>

                    {/* Overview */}
                    {activeTab === "overview" && (
                        <div className="max-w-2xl space-y-6" style={{ animation: "fadeIn 0.35s ease" }}>
                            <p className="text-xs tracking-[0.3em] dark:text-[#bbb] text-[#555] uppercase" style={{ fontFamily: "monospace" }}>
                                Project Overview
                            </p>
                            <p className="text-base text-[#999] leading-[1.9]">{project.overview}</p>
                        </div>
                    )}

                    {/* Features */}
                    {activeTab === "features" && (
                        <div className="space-y-0 divide-y divide-white/6" style={{ animation: "fadeIn 0.35s ease" }}>
                            <p className="text-xs tracking-[0.3em]  dark:text-[#ccc] text-[#555] uppercase pb-6" style={{ fontFamily: "monospace" }}>
                                Key Features
                            </p>
                            {project.features.map((f, i) => (
                                <div key={i} className="py-5 grid grid-cols-12 gap-4 group">
                                    <div className="col-span-1">
                                        <span className="text-[10px]  dark:text-[#ccc] text-[#333]" style={{ fontFamily: "monospace" }}>
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                    </div>
                                    <div className="col-span-11 md:col-span-4">
                                        <p className="text-sm text-[#f0ece4] group-hover:text-[#c9a96e] transition-colors duration-200">
                                            {f.title}
                                        </p>
                                    </div>
                                    <div className="col-span-11 md:col-span-7 md:col-start-6">
                                        <p className="text-sm text-[#555] dark:text-[#ccc] leading-relaxed">{f.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Stack */}
                    {activeTab === "stack" && (
                        <div className="space-y-8" style={{ animation: "fadeIn 0.35s ease" }}>
                            <p className="text-xs tracking-[0.3em]  dark:text-[#ccc] text-[#555] uppercase" style={{ fontFamily: "monospace" }}>
                                Tech Stack
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {project.stack.map((group) => (
                                    <div key={group.category} className="space-y-3">
                                        <p className="text-[10px]  dark:text-[#ccc] tracking-widest text-[#444] uppercase border-b border-white/6 pb-2" style={{ fontFamily: "monospace" }}>
                                            {group.category}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {group.items.map((item) => (
                                                <span
                                                    key={item}
                                                    className="text-xs px-3 py-1.5 border border-white/8  dark:text-[#999] text-[#777] hover:border-[#c9a96e]/40 hover:text-[#c9a96e] transition-all duration-200 cursor-none"
                                                    style={{ fontFamily: "monospace" }}
                                                >
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Future Scope */}
                    {activeTab === "future" && (
                        <div className="space-y-6" style={{ animation: "fadeIn 0.35s ease" }}>
                            <p className="text-xs tracking-[0.3em]  dark:text-[#ccc] text-[#555] uppercase" style={{ fontFamily: "monospace" }}>
                                Future Scope
                            </p>
                            <div className="space-y-0 divide-y divide-white/6">
                                {project.futureScope.map((item, i) => (
                                    <div key={i} className="py-5 flex items-start gap-5 group">
                                        <span
                                            className="text-[10px]  dark:text-[#aaa] text-[#333] flex-shrink-0 mt-0.5"
                                            style={{ fontFamily: "monospace" }}
                                        >
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#c9a96e]/30 group-hover:bg-[#c9a96e] flex-shrink-0 mt-1.5 transition-colors duration-300" />
                                        <p className="text-sm  dark:text-[#ccc] text-[#666] leading-relaxed group-hover:text-[#aaa] transition-colors duration-300">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
      `}</style>
        </div>
    );
}