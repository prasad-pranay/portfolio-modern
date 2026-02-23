import React,{ useState } from 'react'
import { motion } from 'framer-motion';
import { CheckSvg, CopySvg, ExternalLinkSvg } from './SvgComponent';
const CopySocialLink = ({xPos,yPos,link,setShowLink}) => {
    const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(link);

    setCopied(true);
   
    setShowLink(prev=>({...prev,link:null}))
  };
  
  const windowWidth = window.innerWidth;
  const leftPos = windowWidth>850 ? (xPos+500>windowWidth ? windowWidth - 500 : xPos) : windowWidth/2;
  return (
    <>
      <div className="absolute top-0 left-0 h-screen z-[10000] w-screen backdrop-blur-xs" onClick={()=>setShowLink(prev=>({...prev,link:null}))}></div>
      <motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:1}} 
      style={{top:yPos,left:leftPos}} className={`fixed z-[11000] dark:bg-black/20 backdrop-blur-lg bg-black/10 px-10 py-5 rounded -translate-y-1/2 ${windowWidth<850 && "-translate-x-1/2"}`}>
      
      {/* Input-like text */}
      <div className="mb-4 rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white/80 font-mono select-all">
        {link}
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleCopy}
          className="flex-1 cursor-none target-hand flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/20 active:scale-95"
        >
          {copied ? (
            <>
              <CheckSvg classname="size-6 fill-black dark:fill-white" /> Copied
            </>
          ) : (
            <>
              <CopySvg  classname="size-6 fill-black dark:fill-white" /> Copy
            </>
          )}
        </button>
        <button
        onClick={()=>window.open(link)}
          target="_blank"
          className="flex-1 cursor-none target-hand flex items-center justify-center gap-2 rounded-xl bg-white text-black px-4 py-2 text-sm font-medium transition hover:bg-white/90 active:scale-95"
        >
          <ExternalLinkSvg classname="size-6 fill-black" />
          Open
        </button>
      </div>
      </motion.div>
    </>
  )
}

export default CopySocialLink
