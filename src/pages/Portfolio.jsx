import React, { useEffect, useRef, useState } from 'react'
import { AiSvg, CssSvg, ExpressSvg, ExtensionSvg, FirebaseSvg, HtmlSvg, IndexedDbSvg, JavascriptSvg, ModelSvg, MongoDbSvg, MysqlSvg, NodeJsSvg, PythonSvg, ReactSvg, RestApiSvg, SectionTitle, StarSvg, TailwindSvg } from '../component/SvgComponent'
import { motion } from 'framer-motion';

const VideoCard = ({ image, videoSrc, title, description, tag, skills }) => {
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
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      exit={{ y: 30, opacity: 0 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ ease: "easeInOut", duration: 1 }}
      className="relative bg-zinc-100 dark:bg-zinc-900 rounded-2xl overflow-hidden target-hand w-full"
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
        className="absolute inset-0 rounded-2xl pointer-events-none"
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

const Portfolio = ({ setProjectShow }) => {

  return (
    <section id="portfolio"
      data-scroll-section
      className='flex flex-col px-5 lg:px-0 lg:pr-5 w-full mt-[30vh]'>
      <div data-scroll data-scroll-repeat data-scroll-call="portfolio" />

      <SectionTitle title="Projects" />
      <div className='mt-10 flex relative w-full grid md:grid-cols-2 gap-5 lg:gap-10 grid-rows-[max-content_max-content]'>
        <VideoCard image="/swello.png" videoSrc="/swello.mp4" title="Swellow" description="A dynamic sports connection platform that helps players discover teammates, join matches, and build their local sports community effortlessly." tag="ongoing" skills={[ReactSvg, NodeJsSvg, ExpressSvg, MysqlSvg, MongoDbSvg]} />
        <VideoCard image="/curease.png" videoSrc="/curease.mp4" title="CurEase" description="An AI-powered health-tech app that provides smart symptom-based disease detection, nutrition analysis, medical report tracking, and seamless doctor-patient interaction in one platform." tag="Nov 25" skills={[ReactSvg, TailwindSvg, ExpressSvg, NodeJsSvg, PythonSvg, MongoDbSvg, FirebaseSvg, AiSvg, ModelSvg]} />
        <VideoCard image="/reviewlens.png" videoSrc="/reviewlens.mp4" title="ReviewLens" description="An AI-powered platform that analyzes user sentiment on products and compares brands to reveal public perception, strengths, and market positioning in real time." tag="Jun 25" skills={[HtmlSvg, CssSvg, JavascriptSvg, PythonSvg, AiSvg, RestApiSvg]} />
        <VideoCard image="/portfolio.png" videoSrc="/portfolio.mp4" title="My Portfolio" description="A modern, fully responsive portfolio website featuring smooth animations, interactive UI elements, and a visually engaging design to showcase my projects and technical skills." tag="Oct 25" skills={[ReactSvg, TailwindSvg, CssSvg, JavascriptSvg]} />
        <VideoCard image="/ricascan.png" videoSrc="/ricascan.mp4" title="Rica Scanner" description="A smart document scanner application that allows users to scan, process, and manage documents seamlessly with real-time sync between web and mobile platforms." tag="Jan 26" skills={[ReactSvg, TailwindSvg, CssSvg, JavascriptSvg, PythonSvg, RestApiSvg]} />
        <VideoCard image="/homepage.png" videoSrc="/homepage.mp4" title="HomePage" description="A customizable homepage browser extension featuring a built-in to-do manager, personalized settings, and quick access to browser bookmarks for a more organized and productive browsing experience." tag="Jan 25" skills={[ReactSvg, TailwindSvg, IndexedDbSvg, FirebaseSvg, ExtensionSvg]} />
      </div>
      <div data-scroll data-scroll-repeat data-scroll-call="portfolio" />
    </section>
  )
}

export default Portfolio
