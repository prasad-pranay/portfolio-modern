import React from 'react'
import {  GithubSvg } from '../component/SvgComponent';

const ShowImageOverlay = ({ showImage, setShowImage }) => {
    const skillList = ["Android", "Kotlin", "Java"];
    const reverseButtonGradient = "bg-gradient-to-r from-blue-100 to-red-200 dark:from-[#A26DE0] dark:to-[#795DE2]"
    return (
        <div className='fixed top-0 left-0 h-screen w-screen  z-[12000] flex gap-x-20 items-center justify-center'>
            {/* for bg */}
            <div className='absolute top-0 left-0 h-full w-full bg-blue-100/90 dark:bg-black/90 z-[-1]' onClick={() => setShowImage(prev => ({ ...prev, "img": null }))}></div>
            <img src={showImage.img} alt="" className='rounded-[30px] w-[min(60vh,60vw)] h-[min(60vh,60vw)]' />
            {/* descripotion box */}
            <div className={`bg-[#111] dark:bg-gradient-to-r dark:from-blue-100 dark:to-red-200 px-10 py-10 rounded-4xl max-w-[50vw] h-[min(60vh,60vw)] flex flex-col`}>
                <p className='text-white text-4xl syne-font'>Project title</p>
                <div className='mt-4 flex gap-5'>
                    {skillList.map((skill, index) => {
                        return <p key={index} className='bg-[#E6EBF4] dark:bg-[var(--bg)] text-sm px-5 py-2 rounded-xl text-gray-800 dark:text-white'>
                            {skill}
                        </p>
                    })}
                </div>
                <p className='text-white mt-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum dignissimos iusto dolorem vel modi saepe incidunt doloribus et error maiores nostrum architecto molestias amet consequuntur natus, at quos, explicabo aliquam voluptate? Adipisci optio neque eum qui,.</p>
                    {/* bottom bar here */}

                    <div className='mt-auto'>
                        <button className={`${reverseButtonGradient} active:scale-90 transition-transform duration-100 px-10 py-3 flex items-center gap-5 rounded-xl cursor-pointer`}>Github <GithubSvg classname="fill-gray-800 dark:fill-gray-100 h-5" /></button>
                    </div>
            </div>
        </div>
    )
}

export default ShowImageOverlay
