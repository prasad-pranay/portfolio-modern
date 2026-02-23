import React from 'react'
import { buttonGradientClass, CopySvg, GithubSvg, GmailSvg, LinkedInSvg, SectionTitle, SendSvg, textGradientClass, TwitterSvg, WhatsappSvg } from '../component/SvgComponent'
import { motion } from 'framer-motion'
import DinoGame from '../component/HeroGame'

const SocialMedia = ({ Icon, setShowLink, link }) => {
    return <motion.div onClick={e => setShowLink({ x: e.clientX, y: e.clientY, link: link })} initial={{ y: 30, scale: 0, opacity: 0 }} whileInView={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 30, scale: 0, opacity: 0 }} viewport={{ once: false, amount: 0.5 }} transition={{ ease: "easeInOut", duration: .5 }}
        className='border-1 border-transparent hover:border-white rounded-[30px] bg-[var(--bg)]/10 hover:bg-[var(--bg)] flex justify-center overflow-hidden py-15 px-6 w-full h-max group relative hover:scale-105 transition-all duration-300 cursor-none target-hand'>
        <Icon classname="h-10 transition-all duration-300 fill-[#969BB2] dark:fill-gray-400 group-hover:fill-gray-900 dark:group-hover:fill-white" />
    </motion.div>
}

const Contact = ({ setShowLink }) => {

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.send(
            "service_47zjwto",
            "TEMPLATE_ID",
            {
                name: "Suraj",
                email: "user@email.com",
                message: "Hello!",
            },
            "PUBLIC_KEY"
        )
            .then(() => alert("Email sent!"))
            .catch(err => console.error(err));
    };


    const handleCopy = (text) => {
  navigator.clipboard.writeText(text);
};

    return (
        <section id="contact"
            data-scroll-section
            className='min-h-screen flex flex-col px-5 md:px-0 pt-30 lg:pr-10 z-[1000] relative mt-40'>
            <div data-scroll data-scroll-repeat
                data-scroll-call="contact">
            </div>
            {/* top section title */}
            <SectionTitle title="Contact" />
            {/* section title content */}
            <div className='grid gap-15 md:gap-0 md:grid-cols-[1fr_1fr]'>

                <motion.h1 initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} viewport={{ once: false, amount: 0.5 }} transition={{ ease: "easeInOut", duration: 1.5 }}
                    className={`text-center sm:text-left text-6xl sm:text-8xl tracking-tight font-bold syne-font leading-[1] ${textGradientClass} `}>
                    Let's make something awesome together!
                </motion.h1>

                {/* input fields */}
                <form autoComplete='off' onSubmit={sendEmail} className='flex flex-col gap-x-10 gap-y-10 w-full'>
                    {/* your name */}
                    <p className='relative px-1 py-4 syne-font col-span-2'>
                        <motion.input autoComplete='off' initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} viewport={{ once: false, amount: 0.5 }} transition={{ ease: "easeInOut", duration: 1.5 }} type="text" placeholder='Your Name*' className='placeholder-[#969BB2] dark:placeholder-gray-400 dark:focus:placeholder-[#ccc] font-bold w-full border-none outline-none dark:text-white text-xl peer' />
                        <span className='h-[2px] w-full absolute bottom-0 bg-[#D1D5E0] dark:bg-gray-600 left-0'></span>
                        <span className={`h-[2px] w-0 absolute bottom-0 peer-focus:w-full ${buttonGradientClass} left-0 transition-w duration-400`}></span>
                    </p>
                    {/* Email Address* */}
                    <p className='relative px-1 py-4 syne-font'>
                        <motion.input initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} viewport={{ once: false, amount: 0.5 }} transition={{ ease: "easeInOut", duration: 1.5 }} type="text" placeholder='Email Address' className='placeholder-[#969BB2] dark:placeholder-gray-400 dark:focus:placeholder-[#ccc] font-bold w-full border-none outline-none dark:text-white text-xl peer' />
                        <span className='h-[2px] rounded-full w-full absolute bottom-0 bg-[#D1D5E0] dark:bg-gray-600 left-0'></span>
                        <span className={`h-[2px] rounded-full w-0 absolute bottom-0 peer-focus:w-full ${buttonGradientClass} left-0 transition-w duration-400`}></span>
                    </p>
                    {/* Phone Number* */}
                    {/* <p className='relative px-1 py-4 syne-font'>
                    <motion.input initial={{y:30,opacity:0}} whileInView={{y:0,opacity:1}} exit={{y:30,opacity:0}} viewport={{once:false,amount:0.5}} transition={{ease:"easeInOut",duration:1.5}} type="text" placeholder='Phone Number'  className='placeholder-[#969BB2] dark:placeholder-gray-400 dark:focus:placeholder-[#ccc] font-bold w-full border-none outline-none dark:text-white text-xl peer' />
                    <span className='h-[2px] rounded-full w-full absolute bottom-0 bg-[#D1D5E0] dark:bg-gray-600 left-0'></span>
                    <span className={`h-[2px] rounded-full w-0 absolute bottom-0 peer-focus:w-full ${buttonGradientClass} left-0 transition-w duration-400`}></span>
                </p> */}
                    {/* Your Message */}
                    <p className='relative px-1 py-4 syne-font col-span-2'>
                        <motion.textarea initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} viewport={{ once: false, amount: 0.5 }} transition={{ ease: "easeInOut", duration: 1.5 }} type="text" placeholder='Your Message*' className='placeholder-[#969BB2] dark:placeholder-gray-400 dark:focus:placeholder-[#ccc] font-bold w-full border-none outline-none dark:text-white text-xl peer resize-none' rows={3}></motion.textarea>
                        <span className='h-[2px] rounded-full w-full absolute bottom-0 bg-[#D1D5E0] dark:bg-gray-600 left-0'></span>
                        <span className={`h-[2px] rounded-full w-0 absolute bottom-0 peer-focus:w-full ${buttonGradientClass} left-0 transition-w duration-400`}></span>
                    </p>
                    {/* send button */}
                    <motion.button initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} viewport={{ once: false, amount: 0.5 }} transition={{ ease: "easeInOut", duration: 1.5 }} className={`group relative transition-transform overflow-hidden duration-400  hover:scale-103 target-hand syne-font font-semibold text-md ${buttonGradientClass} w-max self-end text-center py-2.5 px-6 rounded-sm`}>
                        <span className='block transition-all duration-250 group-hover:-translate-y-[300%] flex gap-x-3 items-center justify-center text-white dark:text-gray-900'>Send Messages <SendSvg classname="h-5 stroke-white dark:stroke-gray-900" /></span>
                        <span className=' transition-all duration-250 -translate-y-1/2 absolute top-[150%] group-hover:top-[50%] left-0 w-full whitespace-nowrap flex gap-x-3 items-center justify-center text-white dark:text-gray-900'>Send Messages <SendSvg classname="h-5 stroke-white dark:stroke-gray-900" /></span>
                    </motion.button>
                </form>
            </div>
            {/* social networking links */}
            <div className='mt-40 grid grid-cols-3 lg:flex gap-x-5 gap-y-5 lg:gap-x-15'>
                <SocialMedia setShowLink={setShowLink} link={import.meta.env.VITE_LINKEDIN_LINK} Icon={LinkedInSvg} />
                <SocialMedia setShowLink={setShowLink} link={import.meta.env.VITE_GMAIL_LINK} Icon={GmailSvg} />
                {/* <SocialMedia setShowLink={setShowLink} link={import.meta.env.VITE_LINKEDIN_LINK} Icon={InstaSvg} /> */}
                <SocialMedia setShowLink={setShowLink} link={import.meta.env.VITE_GITHUB_LINK} Icon={GithubSvg} />
                <SocialMedia setShowLink={setShowLink} link={import.meta.env.VITE_TWITTER_LINK} Icon={TwitterSvg} />
                <SocialMedia setShowLink={setShowLink} link={import.meta.env.VITE_WHATSAPP_LINK} Icon={WhatsappSvg} />
            </div>
            {/* some text */}
            {/* <motion.h1 initial={{y:30,opacity:0}} whileInView={{y:0,opacity:1}} exit={{y:30,opacity:0}} viewport={{once:false,amount:0.5}} transition={{ease:"easeInOut",duration:1.5}} className={`mt-10 text-7xl pr-10 leading-tight tracking-tight font-bold syne-font  ${textGradientClass} `}>
                Want to know more about me, tell me about your project or just to say hello? Drop me a line and I'll get back as soon as possible.
            </motion.h1> */}
            {/* divider */}
            <div className='h-[1px] w-full bg-[#2F2F32] my-15'></div>
            {/* location phone and email */}
            <div className='flex flex-col lg:flex-row gap-y-10 lg:gap-y-0 justify-between mb-10'>
                <div className='flex flex-col group'>
                    <div className='flex gap-5'>
                        <motion.span initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} viewport={{ once: false, amount: 0.5 }} transition={{ ease: "easeInOut", duration: 1.5 }} className='dark:text-white text-sm'>Phone</motion.span>
                        <div onClick={()=>handleCopy(`+91 ${import.meta.env.VITE_PHONE_LINK}`)}><CopySvg classname="scale-0 group-hover:scale-100 size-4 target-hand hover:scale-120 transition duration-300 active:scale-90 fill-black dark:fill-white" /></div>
                    </div>
                    <p className='relative font-semibold text-lg dark:text-[#C6C4D1] group '>
                        <motion.span initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} viewport={{ once: false, amount: 0.1 }} transition={{ ease: "easeInOut", duration: .5 }} className='active:scale-90 transition-transform duration-150 block target-hand syne-font'>+91 {import.meta.env.VITE_PHONE_LINK}</motion.span>
                        <span className='absolute block bottom-0 h-[1px] w-0 group-hover:w-full bg-gradient-to-r dark:from-blue-100 dark:to-red-200 from-violet-800 to-blue-900 transition-w duration-400'></span>
                    </p>
                </div>
                <div className='flex flex-col group'>
                    <div className='flex gap-5'>
                        <motion.span initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} viewport={{ once: false, amount: 0.5 }} transition={{ ease: "easeInOut", duration: 1.5 }} className='dark:text-white text-sm'>Email</motion.span>
                        <div onClick={()=>handleCopy(`${import.meta.env.VITE_GMAIL_LINK}`)}><CopySvg classname="scale-0 group-hover:scale-100 size-4 target-hand hover:scale-120 transition duration-300 active:scale-90 fill-black dark:fill-white" /></div>
                    </div>
                    <p className='relative font-semibold text-lg dark:text-[#C6C4D1] group '>
                        <motion.span initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} viewport={{ once: false, amount: 0.1 }} transition={{ ease: "easeInOut", duration: .5 }} className='active:scale-90 transition-transform duration-150 block target-hand syne-font'>{import.meta.env.VITE_GMAIL_LINK}</motion.span>
                        <span className='absolute block bottom-0 h-[1px] w-0 group-hover:w-full bg-gradient-to-r dark:from-blue-100 dark:to-red-200 from-violet-800 to-blue-900 transition-w duration-400'></span>
                    </p>
                </div>
                <div className='flex flex-col'>
                    <motion.span initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} viewport={{ once: false, amount: 0.5 }} transition={{ ease: "easeInOut", duration: 1.5 }} className='dark:text-white text-sm'>Location</motion.span>
                    <p className='relative font-semibold text-lg dark:text-[#C6C4D1] group '>
                        <motion.span initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} viewport={{ once: false, amount: 0.1 }} transition={{ ease: "easeInOut", duration: .5 }} className='active:scale-90 transition-transform duration-150 block target-hand syne-font'>Gurgaon, Delhi(NCR)</motion.span>
                        <span className='absolute block bottom-0 h-[1px] w-0 group-hover:w-full bg-gradient-to-r dark:from-blue-100 dark:to-red-200 from-violet-800 to-blue-900 transition-w duration-400'></span>
                    </p>
                </div>
            </div>
            <DinoGame/>
        </section>


    )
}

export default Contact
