import { AnimatePresence, motion } from 'framer-motion'
import { AppWindow, ChevronLeft, ChevronLeftCircle, ExternalLink, Image, ScrollText, Smile, Star,Send } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { GithubSvg } from '../component/SvgComponent'
import CardSwap, { Card } from '../component/infiniteMenu';
import Stepper, { Step } from '../component/Stepper';
import { FaAndroid, FaJava, FaLink, FaPython } from 'react-icons/fa';


function RateUs() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [message, setMessage] = useState("");

  return (
      <div className="w-full text-black dark:text-white select-none rounded-2xl shadow-xl p-6">

        {/* Stars */}
        <div className="flex justify-center gap-2 mt-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className="transition-transform hover:scale-125"
            >
              <Star
                size={32}
                className={
                  (hover || rating) >= star
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }
              />
            </button>
          ))}
        </div>

        {/* Rating text */}
        {rating > 0 && (
          <div className="text-center mt-4 text-sm text-gray-600 animate-fade-in">
            {rating === 5 && "🌟 Amazing!"}
            {rating === 4 && "😊 Great experience"}
            {rating === 3 && "🙂 Good, but can improve"}
            {rating === 2 && "😕 Needs improvement"}
            {rating === 1 && "😞 Not satisfied"}
          </div>
        )}

        {/* Message */}
        <div className="mt-6">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Leave a message (optional)"
            rows={4}
            className="w-full resize-none rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
          />
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Smile size={16} />
            <span>Anonymous feedback</span>
          </div>

          <button
            disabled={rating === 0}
            className="flex items-center gap-2 px-5 py-2 cursor-pointer rounded-full bg-black text-white text-sm hover:bg-teal-500 active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <Send size={16} />
            Submit
          </button>
        </div>
    </div>
  );
}


const skills = {
    "Android":<FaAndroid size={20} />,
    "Python":<FaPython size={20} />,
    "API":<FaLink size={20} />,
    "Java":<FaJava size={20} />,
}

const ProjectDisplayScreen = ({setProjectShow}) => {
    const [loading,setLoading] = useState(1)
    useEffect(() => {
      setTimeout(() => {
        setLoading(0)
      }, 1200);
    }, [])
    const [currentTab,setCurrentTab] = useState("Description")
  return (
    <motion.section initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className='fixed top-0 left-0 h-screen w-screen overflow-y-auto overflow-x-hidden z-[10000] bg-white dark:bg-black flex flex-col'>
        <div className="fixed bg-[#a287d5] blur blur-1 opacity-80 lg:opacity-100" />
      <div className="fixed bg-[#E4B8BF] blur blur-2 opacity-80 lg:opacity-100" />
      <div className="fixed bg-[#8b6bc5] blur blur-3 opacity-80 lg:opacity-100" />
      <AnimatePresence>

        {loading ? <>
            <motion.div initial={{top: loading==1 ? "100vh":"-100vh",opacity:0}} animate={{top:0,opacity:1}} exit={{opacity:0}} transition={{duration:.5,delay:loading==1?0:.5}} className={`${loading==1 ? "z-[100]":"z-[150]"} absolute w-full h-full left-0 bg-white`}></motion.div>
            <motion.div initial={{top: loading==1 ? "100vh":"-100vh",opacity:0}} animate={{top:0,opacity:1}} exit={{opacity:0}} transition={{duration:.5,delay:loading==1?.5:0}} className={`${loading==1 ? "z-[100]":"z-[100]"} absolute w-full h-full left-0 bg-black`}></motion.div>
        </>:null}
      </AnimatePresence>

        {/* header */}
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1,delay:.7}} className='px-5 py-5 z-[20]'>
            <button onClick={()=>{setLoading(2);setTimeout(() => {
                setProjectShow(null)
            }, 1000);}} className='border-2 rounded-full text-black dark:text-white cursor-pointer active:scale-85 transition duration-200 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black'>
            <ChevronLeft strokeWidth={1} className='size-10 ' />
            </button>
        </motion.div>
        {/* project name description tech used and right side image */}
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1,delay:.7}} className='grid lg:grid-cols-[1fr_.5fr] px-5 sm:px-10 py-5 gap-10 h-full z-[1]'>
            {/* left side */}
            <div className='flex flex-col h-full lg:pr-20'>
                {/* upper flex col */}
                <motion.p initial={{opacity:0,y:"100%"}} animate={{opacity:1,y:0}} transition={{delay:1.5}} className='text-xs dark:text-white font-semibold uppercase mb-2'>12 Jan 2025</motion.p>
                <motion.h1 initial={{opacity:0,y:"100%"}} animate={{opacity:1,y:0}} transition={{delay:1.5}} className='text-5xl sm:text-6xl text-black dark:text-white syne-font font-semibold'>Field Application</motion.h1>
                <div className='flex gap-5 mt-5'>
                    {["Android","Python","Java"].map((value)=>(
                        <motion.p initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{delay:1.5}} key={value} 
                        className='flex  gap-2 border-2 rounded-full dark:text-white px-7 py-3 text-base cursor-default hover:bg-black hover:text-white hover:border-black dark:hover:bg-white dark:hover:text-black dark:hover:border-white transition duration-300'>
                            {skills[value]}
                                {value}
                        </motion.p>
                    ))}
                </div>
                {/* tabs here */}
                <div className='flex mt-10 border-b-1 dark:border-white max-w-screen overflow-auto min-h-[57px] scrollbar-hide'>
                    {[[<ScrollText size={20} />,"Description"],[<Image size={20} />,"Screenshots"],[<AppWindow size={20} />,"Installation"],[<Smile size={20} />,"Feedback"]].map((value,index)=>(
                        <p key={index} className={`${currentTab==value[1] ? "border-gray-800 bg-gray-800 text-gray-100 dark:bg-white dark:text-gray-800 ":"hover:bg-black/10 dark:hover:bg-white/5 text-gray-800 dark:text-white"} transition duration-300 flex gap-2 w-full px-10 py-4 whitespace-nowrap cursor-pointer rounded-t-sm`} onClick={()=>setCurrentTab(value[1])}>{value[0]}{value[1]}</p>
                    ))}
                </div>

                {/* description here */}
                   {currentTab=="Description" && <>
                    <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}} className='text-base dark:text-gray-300 mt-10'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis in quisquam, minus quia laborum consectetur quam perferendis repudiandae qui cum. Quos velit nemo earum repellat laborum odit amet atque, consequatur fuga officiis, eum voluptatibus. Quod dolore commodi dolores quam sed officiis culpa eos tempora, quaerat minus at hic ducimus error iste aliquid recusandae accusantium nostrum ea harum, cupiditate sint! Est eius id, non doloremque consectetur natus quos tempora error ea.</motion.p>
                    {/* vview github or view project link directly */}
                    <div className='flex mt-10 gap-5'>
                        <motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} className='dark:text-white flex items-center cursor-pointer hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:hover:border-white transition duration-300 group active:scale-80 gap-2 border dark:border-[#333] px-10 py-4 rounded-lg'>
                            <GithubSvg classname="group-hover:fill-white fill-black dark:fill-white dark:group-hover:fill-black h-7" />
                            <span className='text-xl'>
                            Github
                            </span>
                        </motion.div>
                        <motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} className='dark:text-white flex items-center hover:bg-black hover:text-white cursor-pointer dark:hover:bg-white dark:hover:text-black dark:hover:border-white transition duration-300 group active:scale-80 gap-2 border dark:border-[#333] px-10 py-4 rounded-lg'>
                            <ExternalLink classname="dark:fill-white h-7" />
                            <span className='text-xl'>
                            View
                            </span>
                        </motion.div>
                    </div>
                    </>}

                    {currentTab=="Installation" && <div className='relative h-full flex items-center justify-center'>
                    <Stepper
  initialStep={1}
  onStepChange={(step) => {
    console.log(step);
  }}
  onFinalStepCompleted={() => console.log("All steps completed!")}
  backButtonText="Previous"
  nextButtonText="Next"
>
  <Step>
    <h2>Welcome to the React Bits stepper!</h2>
    <p>Check out the next step!</p>
  </Step>
  <Step>
    <h2>Step 2</h2>
    <img style={{ height: '100px', width: '100%', objectFit: 'cover', objectPosition: 'center -70px', borderRadius: '15px', marginTop: '1em' }} src="https://www.purrfectcatgifts.co.uk/cdn/shop/collections/Funny_Cat_Cards_640x640.png?v=1663150894" />
    <p>Custom step content!</p>
  </Step>
  <Step>
    <h2>How about an input?</h2>
    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name?" />
  </Step>
  <Step>
    <h2>Final Step</h2>
    <p>You made it!</p>
  </Step>
</Stepper>
</div>}

{currentTab=="Feedback" && <RateUs/>}

            </div>
            {/* right side image */}
            <div className='hidden lg:flex flex-col overflow-hidden h-full'>
                <div style={{ height: '100%',width:"100%", position: 'relative' }}>
  <CardSwap
    cardDistance={60}
    verticalDistance={70}
    delay={5000}
    pauseOnHover={false}
  >
    <Card>
      <h3>Card 1</h3>
      <p>Your content here</p>
    </Card>
    <Card>
      <h3>Card 2</h3>
      <p>Your content here</p>
    </Card>
    <Card>
      <h3>Card 3</h3>
      <p>Your content here</p>
    </Card>
  </CardSwap>
</div>
                {/* <motion.img initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{delay:1.5,duration:1}} src="/projects/prj-1-0.webp" alt="" className='rounded-lg shadow-lg dark:shadow-white/10 h-max w-full' /> */}
            </div>
        </motion.div>
    </motion.section>
  )
}

export default ProjectDisplayScreen
