import Contact from './pages/Contact'
import Hero from './pages/Hero'
import LeftCard from './pages/LeftCard'
import Portfolio from './pages/Portfolio'
import Resume from './pages/Resume'

import { useEffect, useRef, useState } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import BubbleMenu from './component/BubbleMenu'
import CopySocialLink from './component/CopySocialLink'
import { AnimatePresence } from 'framer-motion'
import ProjectDisplayScreen from './pages/ProjectDisplayScreen'
import ResizableBox from './component/ResizableWindow'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);



function CallerPage() {
  const scrollRef = useRef(null);
  const locoRef = useRef(null);
  const screenWidth = window.innerWidth;
  const [currentTab, setCurrentTab] = useState("home");
  const [currentTabSetter, setCurrentSetterTab] = useState("");
  const [isScrolling, setIsScrolling] = useState(false)
  const [showLink, setShowLink] = useState({ x: null, y: null, link: null })
  const [projectShow, setProjectShow] = useState(false)
  const [showPortfolio, setShowPortfolio] = useState(false)
  const progressRef = useRef(null);
  useEffect(() => {
    if (!scrollRef.current) return;

    let scrollTimeout;
    locoRef.current = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      lerp: 0.08,
      multiplier: 1,
      smartphone: { smooth: true },
      tablet: { smooth: true },
      keyboard: false, 
    });

    locoRef.current.on("call", (value, way) => {
      if (way === "enter") { console.log(value); setCurrentTab(value) }
    });

    locoRef.current.on("scroll", (args) => {
      const scrollTop = args.scroll.y;
  const limit = args.limit.y;
  const progress = (scrollTop / limit) * 100;

      if (progressRef.current) {
        progressRef.current.style.width = `${progress}%`;
      }
  
      setIsScrolling(true);
      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);

      ScrollTrigger.update()
    });

    // Proxy methods
    ScrollTrigger.scrollerProxy(scrollRef.current, {
      scrollTop(value) {
        return arguments.length
          ? locoRef.current.scrollTo(value, 0, 0)
          : locoRef.current.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: "transform",
    });

    // Recalculate after render
    setTimeout(() => {
      locoRef.current.update();
    }, 500);

    return () => {
      // clearTimeout(scrollTimeout);
      locoRef.current?.destroy();
      locoRef.current = null;
      ScrollTrigger.killAll();
    };
  }, []);

  useEffect(() => {
    if (!currentTabSetter) return
    locoRef.current.scrollTo(`#${currentTabSetter}`, {
      offset: -80,
      duration: 800,
    });
    setCurrentSetterTab("")

  }, [currentTabSetter]);


  const [chatHistory, setChatHistory] = useState({
    // "Hey who are you": "why you want to know",
    // "Just kidding": "no kidding in front of me",
    // "what your purpose": "shut up i am not here to tell you what my purpose here is understand",

  })


  const [showLeftside, setShowleftside] = useState(false)
  const [leftSideExpanded,setLeftSideExpanded] = useState(false)
  const [showAiFeature,setAiFeature] = useState(false)
  // useEffect(() => {
  //   setTimeout(() => {
  //     setAiFeature(true)
  //   }, 2500);
  // }, [])
  
  return (
    <>
    <div className="fixed top-0 left-0 h-[2px] bg-white z-[100] rounded-r-lg" ref={progressRef} style={{ width: `0%`,transition:"width 500ms linear" }} ></div>
      {/* background blurs */}
      <div className="fixed pointer-events-none bg-[#a287d5] blur blur-1 opacity-80 lg:opacity-100" />
      <div className="fixed pointer-events-none bg-[#E4B8BF] blur blur-2 opacity-80 lg:opacity-100" />
      <div className="fixed pointer-events-none bg-[#8b6bc5] blur blur-3 opacity-80 lg:opacity-100" />
      
      {/* conent starts here */}
      <div className="bg-[var(--bg)] transition-bg duration-300 overflow-hidden flex flex-col lg:grid lg:grid-cols-[max-content_1fr] gap-5 ">
        {/* <div
          id='profile'
          className={`h-screen w-full lg:items-center justify-center relative hidden lg:flex ml-5 overflow-hidden transition duration-500`}
          style={{
            width: showLeftside ? "330px" : "0",
            transition: "width 1s"
          }}
        > */}
          <LeftCard showLeftside={showLeftside} setShowleftside={setShowleftside} chatHistory={chatHistory} setChatHistory={setChatHistory} setShowPortfolio={setShowPortfolio} setShowLink={setShowLink} setCurrentSetterTab={setCurrentSetterTab} />
        {/* </div> */}
        <main ref={scrollRef} data-scroll-container id='right-container' className="overflow-hidden flex flex-col">
          <Hero showLeftside={showLeftside} setCurrentSetterTab={setCurrentSetterTab} setShowPortfolio={setShowPortfolio} />
          <Portfolio setProjectShow={setProjectShow} />
          <Resume scroller={scrollRef.current} />
          <Contact setShowLink={setShowLink} />
        </main>
      </div>
      {/* navbar */}
      <BubbleMenu
      showAiFeature={showAiFeature}
      setAiFeature={setAiFeature}
        menuAriaLabel="Toggle navigation"
        menuBg="#ffffff"
        menuContentColor="#111111"
        useFixedPosition={false}
        animationEase="back.out(1.5)"
        animationDuration={0.5}
        staggerDelay={0.12}
        isScrolling={isScrolling}
        currentTab={currentTab}
        setCurrentSetterTab={setCurrentSetterTab}
        setShowleftside={setShowleftside}
      />
      {/* copy like menu */}
      <AnimatePresence>
        {showLink.link &&
          <CopySocialLink xPos={showLink.x} yPos={showLink.y} link={showLink.link} setShowLink={setShowLink} />}
      </AnimatePresence>

      {/* project screen */}
      <AnimatePresence>
        {projectShow && <ProjectDisplayScreen setProjectShow={setProjectShow} />}
      </AnimatePresence>

      {/* my resume  */}
      <AnimatePresence>
        {showPortfolio && 
          <ResizableBox setShow={setShowPortfolio} bgColor='#222' iconImage="/dp.jpg" title="Suraj's Resume" initialHeight={screenWidth < 600 ? window.innerHeight : window.innerHeight * 0.8} initialWidth={screenWidth < 600 ? screenWidth : screenWidth * 0.8} children={<iframe
            src="/resume.pdf"
            className="h-full w-full border-none top-0 left-0"
            title="PDF Viewer"
          />} />}
      </AnimatePresence>
      
      
    </>
  );
}

export default CallerPage;

