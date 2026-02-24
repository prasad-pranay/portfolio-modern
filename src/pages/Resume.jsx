import React, { useEffect, useRef } from 'react'
import { Graduation, School, SectionTitle, textGradientClass } from '../component/SvgComponent'
import { motion } from "framer-motion";
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Education from './Education';
gsap.registerPlugin(ScrollTrigger);




function Heading({ text }) {
  return (
    <div className="splash-screen h-[172px] w-full hidden md:flex flex-col items-center justify-center mt-5 text-4xl md:text-8xl leading-tight tracking-tight font-bold syne-font mb-2 ">
      <svg className='w-full' viewBox="0 0 600 100">
        <defs>
          <mask id="text-mask">
            <text
              y="50%"
              x="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
            >
              <tspan dx="10" dy="10">{text}</tspan>
            </text>
          </mask>
        </defs>

        <text
          y="50%"
          x="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="back-text"
        >
          <tspan dx="10" dy="10">{text}</tspan>
        </text>

        <linearGradient id="text-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e9e0ca" />
          <stop offset="100%" stopColor="#c3c7fb" />
        </linearGradient>
        <rect
          x="0"
          y="0"
          width="100%"
          // fill="white"
          fill="url(#text-gradient)"
          className="fill-rect"
          mask="url(#text-mask)"
        ></rect>
      </svg>
    </div>
  );
}



const Resume = ({ scroller }) => {
  const circle1Ref = useRef(null);
  const circle2Ref = useRef(null);
  useEffect(() => {
    if (!scroller) return; // wait until scroller is passed

    setTimeout(() => {
         // ecucation text svg
    gsap.to(".back-text tspan", {
      strokeDashoffset: "0",
      duration: 5,
      scrollTrigger: {
        trigger: ".resume-heading",
        scroller: scroller,
        start: "top 60%",
        end: "bottom -50%",
        scrub: true,
      },
    });

    gsap.to(".fill-rect", {
      height: "150%",
      duration: 1,
      scrollTrigger: {
        trigger: ".resume-heading",
        scroller: scroller,
        start: "top 15%",
        end: "bottom 10%",
        scrub: true,
      },
    });


        // Example animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".resume-section",      // whole section
            start: "top top",
            end: "bottom 139%",
            scrub: true,
            pin: ".circle",                 // pin circle for entire section
            pinSpacing: false,
            scroller: scroller,
            markers: false,
          },
        });
    
        // Animate x and scale only during heading interval
        tl.to(".circle", {
          x: -(window.innerWidth / 2) + 45,
          scale: 15,
          // opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".resume-heading",
            start: "top top",
            end: "bottom 0%",
            scroller: scroller,
            scrub: true,
            markers: false,
          }
        });
        tl.fromTo(".circle", {
          x: -(window.innerWidth / 2) + 45,
          scrollTrigger: {
            trigger: ".circle-bounce",
            start: "top top",
            end: "bottom top",
            scroller: scroller,
            scrub: true,
          }
        },
          {
            x: -(window.innerWidth / 2) + 190,
            ease: "none",
            scrollTrigger: {
              trigger: ".circle-bounce",
              start: "top top",
              end: "bottom top",
              scroller: scroller,
              scrub: true,
            }
          },
        );
    }, 500);


    // const circle1 = circle1Ref.current;
    // const radius1 = circle1.r.baseVal.value;
    // const circumference1 = 2 * Math.PI * radius1;
    // circle1.style.strokeDasharray = circumference1;
    // circle1.style.strokeDashoffset = circumference1;
    // gsap.to(circle1, {
    //   strokeDashoffset: 0,
    //   scrollTrigger: {
    //     trigger: ".edu-part",
    //     scroller: scroller, // use the scroller passed from parent
    //     start: "top 90%",
    //     end: "bottom 75%",
    //     scrub: true,
    //   },
    // });

    // const circle2 = circle2Ref.current;
    // const radius2 = circle2.r.baseVal.value;
    // const circumference2 = 2 * Math.PI * radius2;
    // circle2.style.strokeDasharray = circumference2;
    // circle2.style.strokeDashoffset = circumference2;
    // gsap.to(circle2, {
    //   strokeDashoffset: 0,
    //   scrollTrigger: {
    //     trigger: ".edu-part",
    //     scroller: scroller, // use the scroller passed from parent
    //     start: "top 30%",
    //     end: "bottom 75%",
    //     scrub: true,
    //   },
    // });

    // gsap.to(".circle-line-1", {
    //   height: "100%",
    //   scrollTrigger: {
    //     trigger: ".edu-part",
    //     scroller: scroller, // use the scroller passed from parent
    //     start: "top 73%",
    //     end: "bottom 80%",
    //     scrub: true,
    //   },
    // });
    // gsap.to(".circle-line-2", {
    //   height: "100%",
    //   scrollTrigger: {
    //     trigger: ".edu-part",
    //     scroller: scroller, // use the scroller passed from parent
    //     start: "top 13%",
    //     end: "bottom 10%",
    //     scrub: true,
    //   },
    // });

  }, [scroller]);




  return (
    <section id="resume"
      data-scroll-section
      className='min-h-screen pt-[30vh] lg:pr-10 z-[1000] relative resume-section'>
      {/* top section title */}
      <div
        data-scroll
        data-scroll-repeat
        data-scroll-call="resume"
        className='flex flex-col md:h-[50vh] w-full items-center resume-heading'>
        <div className="hidden md:block circle bg-white rounded-full z-[100] w-1 h-1 absolute opacit-0"></div>
        <SectionTitle title="Resume" />
        {/* section title content */}
        <Heading text="Education" />
        <motion.h1 initial={{y:30,opacity:0}} whileInView={{y:0,opacity:1}} exit={{y:30,opacity:0}} viewport={{once:false,amount:0.5}} transition={{ease:"easeInOut",duration:1.5}} className={`md:hidden mt-10 text-6xl sm:text-8xl pr-10 leading-tight tracking-tight font-bold syne-font  ${textGradientClass} `}>
                Education
            </motion.h1>
      </div>

      <div className="circle-bounce h-50 "></div>

      <Education/>
      
      <div
        data-scroll
        data-scroll-repeat
        data-scroll-call="resume" />
    </section>
  )
}

export default Resume






{/* <motion.p initial={{y:30,opacity:0}} whileInView={{y:0,opacity:1}} exit={{y:30,opacity:0}} viewport={{once:false,amount:0.5}} transition={{ease:"easeInOut",duration:1.5}} className='dark:text-[#C7C6D3] text-xl mt-10'>My academic background and learning experience</motion.p> */ }
{/* <motion.p initial={{y:30,opacity:0}} whileInView={{y:0,opacity:1}} exit={{y:30,opacity:0}} viewport={{once:false,amount:0.5}} transition={{ease:"easeInOut",duration:1.5}} className='dark:text-white text-3xl mt-15 syne-font font-bold'>My Education</motion.p> */ }
{/* <div className='h-[1px] w-full bg-[#2F2F32] my-10'></div> */ }
{/* <Education duration="2024 - Present" title="Master of Business Administration" venue="University of Delhi" description="Intensive drawing courses that present the fundamental principles of drawing." />
      <div className='h-[1px] w-full bg-[#2F2F32]'></div>
      <Education duration="2020 - 2024" title="Bachelor of Arts (Honours) in English" venue="University of Delhi" description="Intensive drawing courses that present the fundamental principles of drawing." />
      <div className='h-[1px] w-full bg-[#2F2F32]'></div>
      <Education duration="2019 - 2020" title="Senior Secondary (Class 12th)" venue="Airforce Senior Secondary School" description="Intensive drawing courses that present the fundamental principles of drawing." />
      <div className='h-[1px] w-full bg-[#2F2F32]'></div> */}




      
      {/* education 1 : My College */}
      {/* education 2: My School */}
      // <div className='relative px-5 md:px-0 md:pl-28 flex flex-col w-full mt-46 edu-part'>
      //   <div className='w-full top-0 grid md:grid-cols-[max-content_1fr] gap-5 relative overflow-hidden rounded-lg'>
      //     <div className='h-full hidden md:flex flex-col items-center'>
      //       <svg className="min-w-[80px] min-h-[80px]" viewBox="0 0 52 52">
      //         <circle
      //           ref={circle1Ref}
      //           cx="26"
      //           cy="26"
      //           r="25"
      //           stroke="white"
      //           strokeWidth="2"
      //           fill="transparent"
      //         />
      //       </svg>
      //       <div className='w-1 bg-white -translate-y-[1px] rounded-xl circle-line-1 ' />
      //     </div>
      //     <div className={`bg-black/10 w-full py-5 px-5 sm:p-20 rounded-2xl mb-10`}>
      //       <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} viewport={{ once: false, amount: 0.5 }} transition={{ ease: "easeInOut", duration: 1 }} className='flex justify-between w-full'>
      //         <Graduation className="fill-white h-20" />
      //         <p className='bg-white rounded-xl px-10 py-2 h-max'>2023 - 2026</p>
      //       </motion.div>
      //       <motion.p initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} viewport={{ once: false, amount: 0.5 }} transition={{ ease: "easeInOut", duration: 1 }} className='text-white text-3xl sm:text-5xl mt-5'>Bachelor In Computer Application</motion.p>
      //       <motion.p initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} viewport={{ once: false, amount: 0.5 }} transition={{ ease: "easeInOut", duration: 1 }} className='text-white text-base sm:text-xl'>Vivekananda Institute of Professional Studies</motion.p>
      //       <motion.p initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} viewport={{ once: false, amount: 0.5 }} transition={{ ease: "easeInOut", duration: 1 }} className='text-white text-sm mt-2 sm:mt-5'>CGPA: <span className='font-normal'>8.55 / 10</span></motion.p>
      //     </div>
      //   </div>
      //   <div className='w-full top-0 grid md:grid-cols-[max-content_1fr] md:gap-5 relative overflow-hidden rounded-lg'>
      //     <div className='h-full hidden md:flex flex-col items-center'>
      //       <svg className="min-w-[80px] min-h-[80px] -translate-y-[1px]" viewBox="0 0 52 52">
      //         <circle
      //           ref={circle2Ref}
      //           cx="26"
      //           cy="26"
      //           r="25"
      //           stroke="white"
      //           strokeWidth="2"
      //           fill="transparent"
      //         />
      //       </svg>
      //       <div className='w-1 bg-white -translate-y-[1px] rounded-xl circle-line-2 ' />
      //     </div>
      //     <div className={`bg-black/10 w-full py-5 px-5 sm:p-20 rounded-2xl mb-10`}>
      //       <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} viewport={{ once: false, amount: 0.5 }} transition={{ ease: "easeInOut", duration: 1 }} className='flex justify-between w-full'>
      //         <School className="stroke-white fill-none h-20" />
      //         <p className='bg-white rounded-xl px-10 py-2 h-max'>2022 - 2023</p>
      //       </motion.div>
      //       <motion.p initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} viewport={{ once: false, amount: 0.5 }} transition={{ ease: "easeInOut", duration: 1 }} className='text-white text-3xl sm:text-5xl mt-5'>Senior Seconadary XII</motion.p>
      //       <motion.p initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} viewport={{ once: false, amount: 0.5 }} transition={{ ease: "easeInOut", duration: 1 }} className='text-white text-base sm:text-xl'>Kendriya Vidyalaya, Mumbai</motion.p>
      //       <motion.p initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} viewport={{ once: false, amount: 0.5 }} transition={{ ease: "easeInOut", duration: 1 }} className='text-white text-sm mt-2 sm:mt-5'>Stream : PCM <span className='font-normal'>75.2%</span></motion.p>
      //     </div>
      //   </div>

      // </div>