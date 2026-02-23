import React, { useEffect, useState } from 'react'
import "./LoadingPage.css"
import { motion } from 'framer-motion'
const LoadingPage = () => {
  const [expand,setExpand] = useState(0)
  useEffect(() => {
    setTimeout(() => {
      setExpand(1)
      setTimeout(() => {
        setExpand(2)
      }, 800);
    }, 1900);
  }, [])
  
  return (
    <motion.section initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className='bg-[#111] h-screen w-screen'>
      <div className={`-translate-1/2 loader w-[30px] h-[30px] absolute top-[50%] left-[50%] bg-[#fff] rounded-full`}></div>
      <div
        className={`absolute inset-0 z-40 bg-white transition-[clip-path] duration-2000 ease-in-out`}
        style={{
          clipPath: expand>0
            ? "circle(150% at 50% 50%)"
            : "circle(0% at 50% 50%)",
        }}
      />
      <div
        className={`absolute inset-0 z-40 bg-black transition-[clip-path] duration-2000 ease-in-out`}
        style={{
          clipPath: expand==2
            ? "circle(150% at 50% 50%)"
            : "circle(0% at 50% 50%)",
        }}
      />
    </motion.section>
  )
}

export default LoadingPage
