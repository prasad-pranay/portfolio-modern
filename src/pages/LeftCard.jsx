import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap';
import OrbitImages from '../component/CircularGallery';
import "./extra.css"
import { motion } from 'framer-motion';
import VoiceDialogCard from '../component/VoiceCard';

function formatText(text) {
  if (!text) return "";

  // Convert URLs into clickable links
  text = text.replace(
    /(https?:\/\/[^\s]+)/g,
    '<a href="$1" target="_blank" class="dark:text-blue-400 text-blue-500 underline">$1</a>'
  );

  const lines = text.split("\n");

  let formatted = "";
  let inList = false;

  lines.forEach(line => {
    line = line.trim();

    // Bullet points (* text)
    if (line.startsWith("*")) {
      if (!inList) {
        formatted += "<ul class='list-disc ml-5 space-y-1'>";
        inList = true;
      }

      formatted += `<li>${line.replace(/^\*\s*/, "")}</li>`;
    } 
    else {
      if (inList) {
        formatted += "</ul>";
        inList = false;
      }

      if (line !== "") {
        formatted += `<p>${line}</p>`;
      }
    }
  });

  if (inList) formatted += "</ul>";

  return formatted;
}



const MyCard = ({ color, text }) => {
  return (
    <div className={`${color} rounded-full px-5 py-3 flex flex-col items-center justify-center gap-2 scale-200 hover:scale-400 transition duration-300`}>
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className='size-7 rounded-full'><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="48" height="48" fill="white" fill-opacity="0.01"></rect> <path d="M36 15C38.7614 15 41 12.7614 41 10C41 7.23858 38.7614 5 36 5C33.2386 5 31 7.23858 31 10C31 12.7614 33.2386 15 36 15Z" fill="#2F88FF" stroke="#000000" strokeWidth="4"></path> <path d="M12 16.7691L20.0031 13.998L31 19.2466L20.0031 27.4442L31 34.6834L24.0083 43.998" stroke="#000000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M35.3198 21.6434L38.0015 23.1018L43.9998 17.4658" stroke="#000000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M16.849 31.5454L13.8793 35.4572L4.00391 40.9964" stroke="#000000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
      <p className='text-sm '>{text}</p>
    </div>
  )
}


const QuestionComp = ({ question,SetMsgText }) => {
  return (<p onClick={()=>SetMsgText(question)} className='bg-[#1f1f1f] hover:bg-[#333] active:scale-50 px-6 py-2 rounded-full text-xs hover:scale-105 transition duration-300'>
    {question}
  </p>)
}

const ReverseMarquee2 = ({SetMsgText}) => {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;

    const tween = gsap.to(marquee, {
      xPercent: -50,
      duration: 20,
      ease: "none",
      repeat: -1,
    });

    // Pause on hover
    marquee.addEventListener("mouseenter", () => {
      tween.pause();
    });

    marquee.addEventListener("mouseleave", () => {
      tween.resume();
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <div className="overflow-hidden w-full">
      <div
        ref={marqueeRef}
        className="flex w-max gap-1 text-white text-3xl"
      >
        <QuestionComp SetMsgText={SetMsgText} question="Coffee or tea while coding?" />
        <QuestionComp SetMsgText={SetMsgText} question="What are your career goals?" />
        <QuestionComp SetMsgText={SetMsgText} question="What is your strongest technical skill?" />
        <QuestionComp SetMsgText={SetMsgText} question="How can I contact you?" />

        <QuestionComp SetMsgText={SetMsgText} question="Coffee or tea while coding?" />
        <QuestionComp SetMsgText={SetMsgText} question="What are your career goals?" />
        <QuestionComp SetMsgText={SetMsgText} question="What is your strongest technical skill?" />
        <QuestionComp SetMsgText={SetMsgText} question="How can I contact you?" />
      </div>
    </div>
  );
};

const ReverseMarquee = ({SetMsgText}) => {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;

    const tween = gsap.fromTo(
      marquee,
      { xPercent: -50 },   // start shifted left
      {
        xPercent: 0,       // move to original position
        duration: 20,
        ease: "none",
        repeat: -1,
      }
    );

    marquee.addEventListener("mouseenter", () => {
      tween.pause();
    });

    marquee.addEventListener("mouseleave", () => {
      tween.resume();
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <div className="overflow-hidden w-full mb-2">
      <div
        ref={marqueeRef}
        className="flex w-max gap-10 text-white text-3xl"
      >
        {/* Duplicate for seamless loop */}
        <QuestionComp SetMsgText={SetMsgText} question="Coffee or tea while coding?" />
        <QuestionComp SetMsgText={SetMsgText} question="What are your career goals?" />
        <QuestionComp SetMsgText={SetMsgText} question="What is your strongest technical skill?" />
        <QuestionComp SetMsgText={SetMsgText} question="How can I contact you?" />

        <QuestionComp SetMsgText={SetMsgText} question="Coffee or tea while coding?" />
        <QuestionComp SetMsgText={SetMsgText} question="What are your career goals?" />
        <QuestionComp SetMsgText={SetMsgText} question="What is your strongest technical skill?" />
        <QuestionComp SetMsgText={SetMsgText} question="How can I contact you?" />
      </div>
    </div>
  );
};

const LeftCard = ({ showLeftside, setShowleftside, chatHistory, setChatHistory }) => {
  const [msgText, SetMsgText] = useState("")
  const [recieveMsg, setRecieveMsg] = useState(false)
  const scrollRef = useRef(null)

  const askAPI = async (question) => {

  const res = await fetch(
    `https://clasher.pythonanywhere.com/ask?question=${encodeURIComponent(question)}`
    // `http://localhost:5000/ask?question=${encodeURIComponent(question)}`
  );

  const data = await res.json();

  setChatHistory(prev => ({ ...prev, [question]: data.answer }))
                setRecieveMsg(false)
                SetMsgText("")
                setTimeout(() => {
                  scrollRef.current.scrollTop = scrollRef.current.scrollHeight
                }, 500);
};

  return (
    <section
      className={`flex h-screen lg:items-center justify-center fixed z-[10000] sm:z-[1000] lg:relative transition-all duration-300 ease-in-out md:ml-5 sm:mx-[20px] md:mx-0 ${showLeftside ? "w-full sm:w-[calc(100%-40px)] md:w-[330px]" : "w-[0px] overflow-hidden"}`}>
          
      <div className='sm:mt-[15vh] h-screen sm:h-[80vh] bg-[#fff]/70 dark:bg-[#111] shadow dark:shadow-white/20 transition w-full duration-300 relative rounded-xl flex flex-col'>
        {/* minimize expand button */}
        <div className="absolute top-[-40px] shadow dark:shadow-white/20 right-0 bg-[#fff]/70 dark:bg-[#111] rounded-lg flex items-center">
          <svg onClick={() => setShowleftside(false)}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 stroke-[#111] dark:stroke-white target-hand hover:stroke-teal-500 transition duration-300 p-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
          <svg viewBox="0 0 24 24" fill="none" className='size-8 stroke-[#111] dark:stroke-white target-hand hover:stroke-blue-500 transition duration-300 p-2'><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Arrow / Expand"> <path id="Vector" d="M10 19H5V14M14 5H19V10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg>
          <svg onClick={() => setShowleftside(false)} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 stroke-[#111] dark:stroke-white target-hand rounded-lg hover:bg-red-500 hover:stroke-white transition duration-300 p-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>

        </div>

        {/* top bar */}
        <div className='p-5 flex items-center gap-5 overflow-x-scroll overflow-y-hidden no-scrollbar'>
          <svg viewBox="0 0 61 49" xmlSpace="preserve" className='fill-[#222] dark:fill-white size-14 h-max bg-white dark:bg-[#222] p-2 rounded-xl'>

            <g transform="translate(-19,-25)"> <path d="M49.6,25.8c7.2,0,13,5.8,13,13v3.3c-4.3-0.5-8.7-0.7-13-0.7c-4.3,0-8.7,0.2-13,0.7v-3.3 C36.6,31.7,42.4,25.8,49.6,25.8z"></path> <path d="M73.2,63.8l1.3-11.4c2.9,0.5,5.1,2.9,5.1,5.6C79.6,61.2,76.7,63.8,73.2,63.8z"></path> <path d="M25.9,63.8c-3.5,0-6.4-2.6-6.4-5.8c0-2.8,2.2-5.1,5.1-5.6L25.9,63.8z"></path> <path d="M68.7,44.9c-6.6-0.7-12.9-1-19-1c-6.1,0-12.5,0.3-19,1h0c-2.2,0.2-3.8,2.2-3.5,4.3l2,19.4 c0.2,1.8,1.6,3.3,3.5,3.5c5.6,0.7,11.3,1,17.1,1s11.5-0.3,17.1-1c1.8-0.2,3.3-1.7,3.5-3.5l2-19.4v0C72.4,47,70.9,45.1,68.7,44.9z M38.6,62.5c-1.6,0-2.8-1.6-2.8-3.7s1.3-3.7,2.8-3.7s2.8,1.6,2.8,3.7S40.2,62.5,38.6,62.5z M55.3,66.6c0,0.2-0.1,0.4-0.2,0.5 c-0.1,0.1-0.3,0.2-0.5,0.2h-9.9c-0.2,0-0.4-0.1-0.5-0.2c-0.1-0.1-0.2-0.3-0.2-0.5v-1.8c0-0.4,0.3-0.7,0.7-0.7h0.2 c0.4,0,0.7,0.3,0.7,0.7v0.9h8.1v-0.9c0-0.4,0.3-0.7,0.7-0.7h0.2c0.4,0,0.7,0.3,0.7,0.7V66.6z M60.6,62.5c-1.6,0-2.8-1.6-2.8-3.7 s1.3-3.7,2.8-3.7s2.8,1.6,2.8,3.7S62.2,62.5,60.6,62.5z"></path> </g></svg>
          <div className='flex flex-col w-full'>
            <p className='text-xl text-[#111] dark:text-white font-bold whitespace-nowrap'>Ask Me Anything</p>
            <p className='text-xs text-gray-500 dark:text-gray-300 whitespace-nowrap'>About Me. My Hobby. Skills. Other?</p>
          </div>
          <svg onClick={() => setShowleftside(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 dark:stroke-white md:hidden">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>

        </div>
        {/* divider */}
        <div className="h-[1px] bg-black dark:bg-white opacity-10 w-full rounded"></div>

        {/* middle */}
        <div className='pl-5 pr-1 h-full overflow-hidden flex flex-col relative'>
          {Object.keys(chatHistory).length>0 && <>
          <motion.img initial={{scale:0}} animate={{scale:1}} src='/darkbg.jpg' className='w-full h-full absolute left-0 pointer-events-none hidden dark:block' />
          <motion.img initial={{scale:0}} animate={{scale:1}} src='/lightbg.jpg' className='w-full h-full absolute left-0 pointer-events-none block dark:hidden' />
          </>}
          {/* initial */}
          {Object.keys(chatHistory).length == 0 ? <div className='flex flex-col justify-center h-full'>
            <div className='relative h-50 flex flex-col items-center justify-center'>
              <img src="/bot.gif" alt="" className=' h-50' />
              {/* <div className='absolute top-10 left-0 -translate-y-1/2 w-full h-full'>
                <OrbitImages
                  shape="ellipse"
                  radiusX={500}
                  radiusY={200}
                  rotation={-8}
                  duration={30}
                  baseWidth={1000}
                  itemSize={80}
                  responsive={true}
                  radius={4}
                  direction="normal"
                  showPath
                  paused={false}
                  items={[
                    <MyCard color="bg-blue-300/50" text="Skills" />,
                    <MyCard color="bg-red-300/50" text="Hobbies" />,
                    <MyCard color="bg-yellow-300/50" text="Projects" />,
                    <MyCard color="bg-green-300/50" text="Skills" />
                  ]} />
              </div> */}
            </div>
            <ReverseMarquee SetMsgText={SetMsgText} />
            <ReverseMarquee2 SetMsgText={SetMsgText} />
          </div> :
            <div className='h-full flex flex-col overflow-y-scroll overflow-x-hidden pr-2 gap-2 slim-scrollbar' ref={scrollRef}>
              <div className='h-2' />
              {Object.entries(chatHistory).map(([key, value], index) => {
                return <div key={index} className='flex flex-col w-full'>
                  <div className='flex flex-col gap-2 self-end max-w-[70%]'>
                    <motion.svg initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} viewBox="0 0 512 512" xmlSpace="preserve" className='self-end fill-white size-6 rounded-xl  z-[50]'><path d="M458.159 404.216c-18.93-33.65-49.934-71.764-100.409-93.431-28.868 20.196-63.938 32.087-101.745 32.087-37.828 0-72.898-11.89-101.767-32.087-50.474 21.667-81.479 59.782-100.398 93.431C28.731 448.848 48.417 512 91.842 512h328.317c43.424 0 63.11-63.152 38-107.784M256.005 300.641c74.144 0 134.231-60.108 134.231-134.242v-32.158C390.236 60.108 330.149 0 256.005 0 181.85 0 121.753 60.108 121.753 134.242V166.4c0 74.133 60.098 134.241 134.252 134.241" /></motion.svg>
                    <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className='bg-teal-400 px-3 py-1 rounded-lg relative'>
                      <p className='text-xs z-[10] relative'>
                        {key}
                      </p>
                      <div className="absolute -top-1 right-1 w-4 h-4 bg-teal-400 rotate-45 rounded-sm z-[0]"></div>
                    </motion.div>
                  </div>
                  {value == null ? <div className="relative flex flex-col -translate-x-[35px] w-64 animate-pulse gap-2 p-4 scale-80">
                    <div className="h-12 w-12 rounded-full bg-slate-400"></div>
                    <div className="flex-1">
                      <div className="h-5 w-[90%] rounded-lg bg-slate-400 text-sm"></div>
                    </div>
                  </div> : <div className='flex flex-col gap-2 max-w-[70%]'>
                    <motion.svg initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} viewBox="0 0 61 49" xmlSpace="preserve" className='fill-white size-8 rounded-xl z-[50]'>
                      <g transform="translate(-19,-25)">
                        <path d="M49.6,25.8c7.2,0,13,5.8,13,13v3.3c-4.3-0.5-8.7-0.7-13-0.7c-4.3,0-8.7,0.2-13,0.7v-3.3 C36.6,31.7,42.4,25.8,49.6,25.8z"></path>
                        <path d="M73.2,63.8l1.3-11.4c2.9,0.5,5.1,2.9,5.1,5.6C79.6,61.2,76.7,63.8,73.2,63.8z"></path>
                        <path d="M25.9,63.8c-3.5,0-6.4-2.6-6.4-5.8c0-2.8,2.2-5.1,5.1-5.6L25.9,63.8z"></path>
                        <path d="M68.7,44.9c-6.6-0.7-12.9-1-19-1c-6.1,0-12.5,0.3-19,1h0c-2.2,0.2-3.8,2.2-3.5,4.3l2,19.4 c0.2,1.8,1.6,3.3,3.5,3.5c5.6,0.7,11.3,1,17.1,1s11.5-0.3,17.1-1c1.8-0.2,3.3-1.7,3.5-3.5l2-19.4v0C72.4,47,70.9,45.1,68.7,44.9z M38.6,62.5c-1.6,0-2.8-1.6-2.8-3.7s1.3-3.7,2.8-3.7s2.8,1.6,2.8,3.7S40.2,62.5,38.6,62.5z M55.3,66.6c0,0.2-0.1,0.4-0.2,0.5 c-0.1,0.1-0.3,0.2-0.5,0.2h-9.9c-0.2,0-0.4-0.1-0.5-0.2c-0.1-0.1-0.2-0.3-0.2-0.5v-1.8c0-0.4,0.3-0.7,0.7-0.7h0.2 c0.4,0,0.7,0.3,0.7,0.7v0.9h8.1v-0.9c0-0.4,0.3-0.7,0.7-0.7h0.2c0.4,0,0.7,0.3,0.7,0.7V66.6z M60.6,62.5c-1.6,0-2.8-1.6-2.8-3.7 s1.3-3.7,2.8-3.7s2.8,1.6,2.8,3.7S62.2,62.5,60.6,62.5z"></path>
                      </g></motion.svg>

                    <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className=' self-start bg-white px-3 py-1 rounded-lg relative'>
                      <p className='text-xs z-[10] relative' dangerouslySetInnerHTML={{__html: formatText(value),}}/>
                      <div className="absolute -top-1 left-1 w-4 h-4 bg-white rotate-45 rounded-sm z-[0]"></div>
                    </motion.div>
                  </div>}
                </div>
              })}
              <div className='h-2' />
            </div>}
        </div>

        {/* bottom */}
        <div className="w-full px-5 py-1 rounded-3xl flex items-center gap-2 border-t-2 border-black/20 dark:border-white/10">
          {/* input container with mic and clear text button */}
          <div className='w-full relative flex items-center pr-2 h-[50px]'>
            {!recieveMsg && <>
              <input value={msgText} onChange={e => SetMsgText(e.target.value)} type="text" placeholder='Enter Your Message' className='border-none cursor-none target-text text-black dark:text-white outline-none w-full px-5 py-2 rounded-lg peer placeholder-gray-500 dark:placeholder-gray-300 relative z-[100]' />
              <svg onClick={() => SetMsgText("")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" className={`size-6  relative z-[100] stroke-white hover:stroke-red-500 transition duration-300 hover:scale-105 active:scale-90  ${msgText.length > 0 ? "opacity-100" : "opacity-0"}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg></>}
            {recieveMsg && <div className="wrapper scale-50 translate-x-5">
              <div className="loadcircle bg-blue-500 dark:bg-white"></div>
              <div className="loadcircle bg-blue-500 dark:bg-white"></div>
              <div className="loadcircle bg-blue-500 dark:bg-white"></div>
              <div className="shadow"></div>
              <div className="shadow"></div>
              <div className="shadow"></div>
            </div>}
            <div className="bg-white border-2 border-black/30 dark:bg-[#222] absolute top-0 left-0 h-full w-full rounded-lg z-0 opacity-75"></div>
          </div>

          {(msgText.length == 0 && !recieveMsg) ? <VoiceDialogCard SetMsgText={SetMsgText} /> : <div
            onClick={() => {
              if (msgText.length > 0) {
                askAPI(msgText)
                setChatHistory(prev => ({ ...prev, [msgText]: null }))
                setRecieveMsg(true)
                SetMsgText("")
                setTimeout(() => {
                  scrollRef.current.scrollTop = scrollRef.current.scrollHeight
                }, 500);

              }
            }}
            className={`${recieveMsg ? "bg-blue-700" : msgText.length == 0 ? "dark:bg-[#222] bg-blue-500 " : "bg-teal-500 dark:bg-green-700"} target-hand transition duration-1000 p-2 rounded-lg`}>
            {(msgText.length > 0 && !recieveMsg) && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" className='stroke-white size-6'>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
            }
            {recieveMsg && <div
              className="w-6 h-6 border-4 border-t-teal-500 border-gray-300 rounded-full animate-spin"
            ></div>
            }
          </div>}
        </div>

      </div>
    </section>
  )
}



export default LeftCard
