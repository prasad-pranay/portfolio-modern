import { useState, useEffect } from "react";
import CartoonWhiteboard from "../component/Whiteboard";
import MusicCard from "../component/MusicCard";
import { AnimatePresence } from "framer-motion";

const roles = [
  "Full Stack Developer.",
  "CS Student.",
  "Problem Solver.",
  "Curious Learner.",
];

function useTypewriter(words, typingSpeed = 80, deletingSpeed = 40, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState("typing"); // typing | pausing | deleting

  useEffect(() => {
    const current = words[wordIndex];

    if (phase === "typing") {
      if (display.length < current.length) {
        const t = setTimeout(() => setDisplay(current.slice(0, display.length + 1)), typingSpeed);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("deleting"), pause);
        return () => clearTimeout(t);
      }
    }

    if (phase === "deleting") {
      if (display.length > 0) {
        const t = setTimeout(() => setDisplay(display.slice(0, -1)), deletingSpeed);
        return () => clearTimeout(t);
      } else {
        setWordIndex((i) => (i + 1) % words.length);
        setPhase("typing");
      }
    }
  }, [display, phase, wordIndex, words, typingSpeed, deletingSpeed, pause]);

  return display;
}

export default function HeroPage({setCurrentSetterTab, setShowPortfolio}) {
  const typed = useTypewriter(roles);
  const [mounted, setMounted] = useState(false);
  const [location,setLocation] = useState("")
  const [musicShow,setMusicShow] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  async function getLocation() {
  const res = await fetch("https://ipapi.co/json/");
  const data = await res.json();

    setLocation(`${data.city}, ${data.country_name}`)
}
//   location
useEffect(() => {
  getLocation()

}, [])


  return (
    <section
    data-scroll-section
    id="home"
      className="relative min-h-screen flex flex-col justify-between px-6 md:px-20 py-10 overflow-hidden dark:bg-[#111]/20"
      style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
    >
      <div data-scroll data-scroll-repeat data-scroll-call="home" />
       

      {/* Soft glow */}
      <div
        className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Center — two column layout */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between flex-1 py-12 gap-10">

        {/* LEFT — text content */}
        <div className="flex flex-col justify-center w-full md:w-1/2">

          {/* Greeting */}
          <div className={`transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <p className="text-xs tracking-[0.4em] dark:text-[#ccc] text-[#555] uppercase mb-8" style={{ fontFamily: "monospace" }}>
              Hello, world —
            </p>
          </div>

          {/* Name */}
          <div className={`transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <h2
              className="font-normal text-[#222] dark:text-[#f0ece4] leading-[0.95]"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)", letterSpacing: "-0.03em" }}
            >
              Web
              <br />
              <span className="italic text-[#c9a96e]">Developer</span>
              <span className="dark:text-[#ccc] text-[#2a2a2a]">.</span>
            </h2>
          </div>

          {/* Typewriter role */}
          <div className={`mt-8 flex items-center gap-3 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="h-px w-10 bg-[#c9a96e]/50" />
            <p className="text-base md:text-lg dark:text-[#aaa] text-[#777]" style={{ minWidth: "240px" }}>
              {typed}
              <span
                className="inline-block w-[2px] h-[1em] bg-[#c9a96e] ml-0.5 align-middle"
                style={{ animation: "blink 1s step-end infinite" }}
              />
            </p>
          </div>

          {/* Tagline */}
          <div className={`mt-6 max-w-sm transition-all duration-700 delay-400 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <p className="text-sm dark:text-[#ccc] text-[#555] leading-relaxed">
              I build clean, purposeful software — one commit at a time.
              <br />
              Currently studying CS &amp; actively seeking internship opportunities.
            </p>
          </div>

          {/* CTA buttons */}
          <div className={`mt-10 flex flex-wrap gap-4 transition-all duration-700 delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <button
              onClick={()=>setShowPortfolio(true)}
              className="cursor-none target-hand text-xs tracking-[0.25em] uppercase px-7 py-3.5 bg-[#f0ece4] text-[#0c0c0c] hover:bg-[#c9a96e] transition-colors duration-300"
              style={{ fontFamily: "monospace" }}
            >
              View Resume
            </button>
            <button
            onClick={()=>setCurrentSetterTab("contact")}
              className="cursor-none target-hand text-xs tracking-[0.25em] uppercase px-7 py-3.5 border border-white/10 dark:text-white sm:dark:text-[#777] text-[#777] hover:text-[#f0ece4] hover:border-white/25 transition-all duration-300"
              style={{ fontFamily: "monospace" }}
            >
              Get in Touch
            </button>
          </div>
        </div>

        {/* RIGHT — image */}
        <div
          className={`relative w-full md:w-[38%] lg:w-[34%] transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          {/* Aspect ratio wrapper — tall rectangle */}
          <div className="relative w-full h-full " style={{ aspectRatio: "3 / 4" }}>
          {/* whiteboard */}
          <div className="flex flex-col items-center justify-center absolute h-full w-full top-0 left-0 scale-70 md:scale-100 transition-all duration-300" style={{perspective:"1000px"}}>
            <CartoonWhiteboard />
          </div>
          
          </div>

          {/* Decorative offset box behind image */}
          <div
            className="absolute -bottom-3 -right-3 w-full h-full border border-white/5 -z-10"
            style={{ aspectRatio: "3 / 4" }}
          />
        </div>
      </div>
        
      {/* Bottom row */}
      <div
        className={`relative z-10 flex items-end justify-between transition-all duration-700 delay-600 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
      >
        {/* Scroll indicator */}
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-px h-14 bg-gradient-to-b from-transparent to-[#555]"
            style={{ animation: "grow 2s ease-in-out infinite" }}
          />
          <p className="text-[9px] tracking-[0.4em] text-[#444] uppercase" style={{ fontFamily: "monospace" }}>
            Scroll
          </p>
        </div>

        {/* Coordinate / location tag */}
        <p className="text-[10px] tracking-widest dark:text-[#ccc] text-[#333] uppercase" style={{ fontFamily: "monospace" }}>
          {location}
        </p>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes grow {
          0%, 100% { transform: scaleY(0.6); opacity: 0.4; }
          50% { transform: scaleY(1); opacity: 1; }
        }
      `}</style>
      <div data-scroll data-scroll-repeat data-scroll-call="home" />
         {/* music card */}
          <div className="flex-col items-end justify-start absolute h-full w-full top-40 right-10 hidden md:flex">
            <div className="relative z-[200]" style={{perspective:"1000px"}}>
              <svg onClick={()=>setMusicShow(prev=>!prev)} viewBox="0 0 24 24" fill="none" className="size-6 stroke-black dark:stroke-[#ccc] transition duration-300 hover:scale-120 active:scale-90 target-hand" >
                <path d="M12 19.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm10-2a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" strokeWidth="1.5"/>
                <path d="m22 8-10 4" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="m14.456 5.158.29.692zm2-.837-.29-.692zm4.652-.98-.416.624zM21.25 12a.75.75 0 0 0 1.5 0zm-8.5 7V8.847h-1.5V19zm1.995-13.15 2-.837-.579-1.384-2 .837zm8.005 2.16c0-1.333.002-2.42-.12-3.24-.123-.837-.4-1.583-1.106-2.054l-.832 1.249c.185.123.355.353.455 1.024.101.686.103 1.638.103 3.022zm-6.005-2.997c1.276-.534 2.156-.9 2.828-1.072.657-.167.935-.099 1.12.024l.83-1.249c-.707-.47-1.502-.437-2.32-.228-.805.205-1.806.626-3.037 1.141zM12.75 8.848c0-.662.001-1.098.037-1.434.035-.317.095-.474.172-.59l-1.248-.83c-.258.387-.366.805-.415 1.258-.047.436-.046.967-.046 1.596zm1.416-4.382c-.58.243-1.07.447-1.454.659-.4.22-.743.48-1.001.868l1.248.831c.077-.115.199-.232.478-.386.296-.163.698-.333 1.308-.588zM22.75 12V8.01h-1.5V12z" className="fill-black dark:fill-[#ccc]"/>
                <path d="M7 11V2" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="4.5" cy="10.5" r="2.5" strokeWidth="1.5"/>
                <path d="M10 5c-1.243 0-3-.929-3-3" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <AnimatePresence>
                {musicShow && <div className="absolute top-1/2 -translate-y-1/2 -left-[300px] "><MusicCard /></div>}
              </AnimatePresence>
            </div>
          </div>
          {/* <div className="flex-col items-center justify-center absolute h-full w-full top-20 left-0 hidden md:flex" >
            <div className="relative z-[200]" style={{perspective:"1000px"}}>
            <TicTacToe />
            </div>
          </div> */}
    </section>
  );
}