import React, { useRef } from 'react'
import { SectionTitle, textGradientClass } from '../component/SvgComponent'
import { motion } from 'framer-motion'
import CartoonWhiteboard from '../component/Whiteboard'


function MusicCard() {
  return (
    <div className="relative w-[250px] h-[120px] bg-[#191414] rounded-[10px] p-[10px]">

      {/* Top Section */}
      <div className="relative flex gap-[10px] w-full">
        
        {/* Profile + Equalizer */}
        <div className="relative top-[5px] left-[5px] h-[40px] w-[40px] bg-[#d2d2d2] rounded-[5px] flex items-center justify-center">
          <div className="flex justify-center gap-[1px] w-[30px] h-[20px]">
            {[0.2, 0.5, 0.6, 0, 0.4].map((delay, i) => (
              <div
                key={i}
                className="w-[2px] h-[20px] bg-[#1db954] origin-bottom animate-playing"
                style={{ animationDelay: `${delay}s` }}
              />
            ))}
          </div>
        </div>

        {/* Texts */}
        <div>
          <p className="text-white text-[25px] font-extrabold">
            Soldiers Rage
          </p>
          <p className="text-white text-[12px] font-bold">
            Tha Mechanic
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-[30px] left-0 w-full flex justify-center items-center text-white group">
        
        {/* Volume Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-[24px] h-[20px] cursor-pointer transition hover:text-[#1db954]"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.26 3.691A1.2 1.2 0 0 1 12 4.8v14.4a1.199 1.199 0 0 1-2.048.848L5.503 15.6H2.4a1.2 1.2 0 0 1-1.2-1.2V9.6a1.2 1.2 0 0 1 1.2-1.2h3.103l4.449-4.448a1.2 1.2 0 0 1 1.308-.26Z"
          />
        </svg>

        {/* Volume Slider */}
        <div className="relative w-[48px] opacity-0 group-hover:opacity-100 transition duration-200">
          <div className="h-[4px] w-[80%] bg-[#5e5e5e] rounded-[2px] mt-[8px] ml-[10%]">
            <div className="h-full w-[80%] bg-[#1db954] rounded-[3px]" />
          </div>
          <div className="absolute bg-white h-[6px] w-[6px] rounded-full right-[20%] top-[60%]" />
        </div>

        {/* Spacer */}
        <div className="w-[48px]" />

        {/* Previous */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-[24px] h-[24px] cursor-pointer transition hover:text-[#1db954]"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 21.6a9.6 9.6 0 1 0 0-19.2 9.6 9.6 0 0 0 0 19.2Z"
          />
        </svg>

        {/* Pause */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-[24px] h-[24px] cursor-pointer transition hover:text-[#1db954]"
        >
          <path d="M8.4 9.6h2.4v4.8H8.4zm4.8 0h2.4v4.8h-2.4z" />
        </svg>

        {/* Next */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-[24px] h-[24px] cursor-pointer transition hover:text-[#1db954]"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 21.6a9.6 9.6 0 1 0 0-19.2 9.6 9.6 0 0 0 0 19.2Z"
          />
        </svg>

        {/* Heart */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          className="w-[24px] h-[20px] cursor-pointer transition hover:text-[#1db954]"
        >
          <path d="M3.343 7.778a4.5 4.5 0 0 1 7.339-1.46L12 7.636l1.318-1.318a4.5 4.5 0 1 1 6.364 6.364L12 20.364 4.318 12.682a4.5 4.5 0 0 1-.975-4.904Z" />
        </svg>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-[22px] left-[5%] w-[90%] h-[6px] bg-[#5e5e5e] rounded-[3px]">
        <div className="w-[42%] h-full bg-[#1db954] rounded-[3px]" />
      </div>

      {/* Time Text */}
      <p className="absolute bottom-[11px] left-[10px] text-white text-[8px]">
        1:31
      </p>
      <p className="absolute bottom-[11px] right-[10px] text-white text-[8px]">
        3:46
      </p>
    </div>
  );
}

const Hero = ({ setCurrentSetterTab, setShowPortfolio, showLeftside }) => {
  return (
    <section id="home"
      data-scroll-section
      className='min-h-screen relative flex flex-col items-start justify-center pt-15 pl-5 sm:pl-0 px-1 sm:px-5 lg:px-0 overflow-hidden'>
      <div data-scroll data-scroll-repeat data-scroll-call="home" className='h-[250px] sm:h-0' />
      {/* lets meet button */}
      {/* <SectionTitle title="Hey!" /> */}
      {/* big info */}
      <motion.h1 initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} viewport={{ once: false, amount: .5 }} transition={{ ease: "easeInOut", duration: 1 }}
        className={` ${showLeftside?"xl:mt-0 lg:mt-40":"sm:mt-80 md:mt-0 md:w-[50%]"}  flex flex-col z-[100] text-6xl sm:text-7xl md:text-8xl lg:text-8xl xl:text-9xl leading-tight tracking-tight font-bold syne-font relative ${textGradientClass} `}>
          Full-Stack 
          Developer
       </motion.h1>
      <motion.h1 initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} viewport={{ once: false, amount: .5 }} transition={{ ease: "easeInOut", duration: 1 }}
        className={`flex flex-col z-[100] text-xl mt-5 leading-tight tracking-tight font-bold syne-font relative ${textGradientClass} `}>
          I'm a developer who
crafts digital
experiences.
       </motion.h1>
      {/* bottom buttons */}
      <div className='flex gap-x-5 w-full mt-10'>
        <motion.button onClick={() => setCurrentSetterTab("portfolio")} initial={{ y: 30, opacity: 0, scale: 0 }} whileInView={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 30, opacity: 0, scale: 0 }} viewport={{ once: false, amount: 0.5 }} transition={{ ease: "easeInOut", duration: 1.5 }}
          className='cursor-none group relative transition-all overflow-hidden duration-100 active:scale-80  hover:scale-103 target-hand syne-font font-semibold text-md dark:bg-[transparent] border-[1px border-[#A9B1C2] dark:border-[#4B4B51] w-max  text-center py-3 px-5 rounded-sm'>
          <span className='whitespace-nowrap block transition-all duration-250 group-hover:-translate-y-[300%] syne-font text-[#22232C] dark:text-white flex gap-x-3 items-center justify-center'>Projects</span>
          <span className='whitespace-nowrap transition-all duration-250 -translate-y-1/2 absolute top-[150%] syne-font text-[#22232C] dark:text-white group-hover:top-[50%] left-0 w-full whitespace-nowrap flex gap-x-3 items-center justify-center'>Projects</span>
        </motion.button>
        <motion.button onClick={() => setShowPortfolio(true)} initial={{ y: 30, opacity: 0, scale: 0 }} whileInView={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 30, opacity: 0, scale: 0 }} viewport={{ once: false, amount: 0.5 }} transition={{ ease: "easeInOut", duration: 2 }}
          className='cursor-none target-hand group relative transition-all overflow-hidden duration-100 active:scale-80 syne-font font-semibold text-md bg-white dark:bg-[#111] text-center py-3 px-7 rounded-xs '>
          <span className='whitespace-nowrap block transition-all duration-250 group-hover:-translate-y-[300%] syne-font text-[#717586] group-hover:text-[#22232C] dark:group-hover:text-white dark:text-[#8B8A91] flex gap-x-3 items-center justify-center'>View CV </span>
          <span className='whitespace-nowrap transition-all duration-250 -translate-y-1/2 absolute top-[150%] syne-font text-[#717586] group-hover:text-[#22232C] dark:group-hover:text-white dark:text-[#8B8A91] group-hover:top-[50%] left-0 w-full whitespace-nowrap flex gap-x-3 items-center justify-center'>View CV </span>
        </motion.button>
      </div>
    
    <div className={`absolute transition-all duration-400 ${showLeftside ? "scale-40 xl:scale-50 xl:top-[unset] -top-1/8 xl:right-0 right-1/8 xl:translate-x-1/6":"xl:translate-x-0 xl:scale-80 translate-x-[220px] sm:translate-x-1/5 scale-50 sm:scale-50 md:right-0 xl:right-5 md:top-[unset] top-0 sm:-top-[50px] right-1/5"}`} style={{ perspective: "1000px" }}>
      <CartoonWhiteboard/>
    </div>

  
      <div data-scroll data-scroll-repeat data-scroll-call="home" />
    </section>
  )
}

export default Hero
