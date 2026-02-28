import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ContactSvg, HomeSvg, ProfileSvg } from './SvgComponent'
import { AnimatePresence, motion } from 'framer-motion';

const DEFAULT_ITEMS = [
  {
    label: 'Home',
    href: 'home',
    ariaLabel: 'Home',
    rotation: -8,
    hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }
  },
  {
    label: 'Projects',
    href: 'portfolio',
    ariaLabel: 'Projects',
    rotation: 8,
    hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' }
  },
  {
    label: 'About',
    href: 'about',
    ariaLabel: 'About',
    rotation: 8,
    hoverStyles: { bgColor: '#20c997', textColor: '#ffffff' }
  },
  {
    label: 'Education',
    href: 'resume',
    ariaLabel: 'Education',
    rotation: -8,
    hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' }
  },
  {
    label: 'Contact',
    href: 'contact',
    ariaLabel: 'Contact',
    rotation: 8,
    hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' }
  },
];

export default function BubbleMenu({
  showAiFeature,
  setAiFeature,
  onMenuClick,
  className,
  style,
  menuAriaLabel = 'Toggle menu',
  menuBg = '#fff',
  menuContentColor = '#111',
  useFixedPosition = false,
  animationEase = 'back.out(1.5)',
  animationDuration = 0.5,
  staggerDelay = 0.12,
  isScrolling,
  setCurrentSetterTab,
  currentTab,
  setShowleftside,
  setDark
}) {
  const sectionIcons = {
    profile: { icon: <ProfileSvg classname="stroke-black h-5 w-5" />, title: 'Profile' },
    home: { icon: <HomeSvg classname="stroke-black h-5 w-5" />, title: 'Home' },
    portfolio: {
      icon: <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" className="size-6 stroke-black">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
      , title: 'Portfolio'
    },
    resume: {
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" className="size-6 stroke-black">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
      </svg>
      , title: 'Resume'
    },
    "about": {
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
      , title: "About"
    },
    contact: { icon: <ContactSvg classname="stroke-black h-5 w-5" />, title: 'Contact' },
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const overlayRef = useRef(null);
  const bubblesRef = useRef([]);
  const labelRefs = useRef([]);

  const menuItems = DEFAULT_ITEMS;


  const containerClassName = [
    'bubble-menu',
    useFixedPosition ? 'fixed' : 'absolute',
    'left-0 right-0 top-8',
    'flex items-center justify-between',
    'gap-4 px-8',
    'pointer-events-none',
    'z-[9000]',
    className
  ]
    .filter(Boolean)
    .join(' ');

  const handleToggle = () => {
    const nextState = !isMenuOpen;
    if (nextState) setShowOverlay(true);
    setIsMenuOpen(nextState);
    onMenuClick?.(nextState);
  };

  useEffect(() => {
    const overlay = overlayRef.current;
    const bubbles = bubblesRef.current.filter(Boolean);
    const labels = labelRefs.current.filter(Boolean);
    if (!overlay || !bubbles.length) return;

    if (isMenuOpen) {
      gsap.set(overlay, { display: 'flex' });
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.set(bubbles, { scale: 0, transformOrigin: '50% 50%' });
      gsap.set(labels, { y: 24, autoAlpha: 0 });

      bubbles.forEach((bubble, i) => {
        const delay = i * staggerDelay + gsap.utils.random(-0.05, 0.05);
        const tl = gsap.timeline({ delay });
        tl.to(bubble, {
          scale: 1,
          duration: animationDuration,
          ease: animationEase
        });
        if (labels[i]) {
          tl.to(
            labels[i],
            {
              y: 0,
              autoAlpha: 1,
              duration: animationDuration,
              ease: 'power3.out'
            },
            '-=' + animationDuration * 0.9
          );
        }
      });
    } else if (showOverlay) {
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.to(labels, {
        y: 24,
        autoAlpha: 0,
        duration: 0.2,
        ease: 'power3.in'
      });
      gsap.to(bubbles, {
        scale: 0,
        duration: 0.2,
        ease: 'power3.in',
        onComplete: () => {
          gsap.set(overlay, { display: 'none' });
          setShowOverlay(false);
        }
      });
    }
  }, [isMenuOpen, showOverlay, animationEase, animationDuration, staggerDelay]);

  useEffect(() => {
    const handleResize = () => {
      if (isMenuOpen) {
        const bubbles = bubblesRef.current.filter(Boolean);
        const isDesktop = window.innerWidth >= 900;
        bubbles.forEach((bubble, i) => {
          const item = menuItems[i];
          if (bubble && item) {
            const rotation = isDesktop ? (item.rotation ?? 0) : 0;
            gsap.set(bubble, { rotation });
          }
        });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen, menuItems]);

  const [showOptions, setShowOptions] = useState(false)

  function toggleTheme(){
    setDark(prev=>!prev)
    document.documentElement.classList.toggle("dark")
  }
  return (
    <>
      {/* Workaround for silly Tailwind capabilities */}
      <style>{`
        .bubble-menu .menu-line {
          transition: transform 0.3s ease, opacity 0.3s ease;
          transform-origin: center;
        }
        .bubble-menu-items .pill-list .pill-col:nth-child(4):nth-last-child(2) {
          margin-left: calc(100% / 6);
        }
        .bubble-menu-items .pill-list .pill-col:nth-child(4):last-child {
          margin-left: calc(100% / 3);
        }
        @media (min-width: 900px) {
          .bubble-menu-items .pill-link {
            transform: rotate(var(--item-rot));
          }
          .bubble-menu-items .pill-link:hover {
            transform: rotate(var(--item-rot)) scale(1.06);
            background: var(--hover-bg) !important;
            color: var(--hover-color) !important;
          }
          .bubble-menu-items .pill-link:active {
            transform: rotate(var(--item-rot)) scale(.94);
          }
        }
        @media (max-width: 899px) {
          .bubble-menu-items {
            padding-top: 120px;
            align-items: flex-start;
          }
          .bubble-menu-items .pill-list {
            row-gap: 16px;
          }
          .bubble-menu-items .pill-list .pill-col {
            flex: 0 0 100% !important;
            margin-left: 0 !important;
            overflow: visible;
          }
          .bubble-menu-items .pill-link {
            font-size: clamp(1.2rem, 3vw, 4rem);
            padding: clamp(1rem, 2vw, 2rem) 0;
            min-height: 80px !important;
          }
          .bubble-menu-items .pill-link:hover {
            transform: scale(1.06);
            background: var(--hover-bg);
            color: var(--hover-color);
          }
          .bubble-menu-items .pill-link:active {
            transform: scale(.94);
          }
        }
      `}</style>

      <nav className={containerClassName} style={style} aria-label="Main navigation">
        <div onClick={() => setShowOptions(prev => !prev)} className='pointer-events-auto group relative'>
          {/* checkout notificaiton */}
          {showAiFeature && <>
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="absolute z-[100] top-[120%] left-[80%]
  w-52 px-5 py-4
  rounded-xl
  bg-white/90 backdrop-blur-md
  shadow-xl
  border border-gray-200
  text-sm flex flex-col gap-3"
            >

              {/* Title */}
              <p className="text-[#222] font-medium leading-snug">
                ✨ New AI Chatbot Feature
              </p>

              {/* Subtitle */}
              <p className="text-xs text-[#777] leading-relaxed">
                Ask anything and get instant smart answers.
              </p>

              {/* Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setAiFeature(false)}
                className="cursor-none target-hand text-xs py-2 px-3 rounded-lg bg-[#222] text-white self-end hover:bg-black transition">
                Dismiss
              </motion.button>

            </motion.div>
            <div className="fixed top-0 left-0 w-screen h-screen bg-black/40"></div>
          </>
          }

          <h1 className='font-bold bg-white group rounded-3xl px-5 py-3 relative active:scale-90 transition-transform duration-100 '>
            Pranay
          </h1>
          <div className="absolute top-0 left-0 w-full h-full flex bg-white rounded-full items-center transition duration-300 opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100">
            <button onClick={toggleTheme} className='target-hand cursor-none relative flex flex-col gap-1 justify-center items-center group/first w-full hover:bg-[#111] h-full rounded-l-full'>
              <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 group-hover/first:stroke-white hidden dark:block">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
              </svg>
              <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 group-hover/first:stroke-white block dark:hidden">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
              </svg>
              <p className='text-[9px] scale-0 opacity-0 group-hover/first:scale-100 group-hover/first:opacity-100 transition duraiton-300 pointer-events-none absolute top-[120%] whitespace-nowrap bg-black text-white rounded-full px-3 py-1'>
                <span className='hidden dark:inline-block'>Light</span>
                <span className='dark:hidden inline-block'>Dark</span>
                &nbsp;Mode
              </p>
            </button>
            <div className='h-full w-[1px] bg-black/50' />
            <button onClick={() => setShowleftside(prev => !prev)} className='target-hand cursor-none relative flex flex-col gap-1 justify-center items-center group/second hover:bg-[#111] h-full rounded-r-full w-full'>
              <svg viewBox="0 0 32 32" className='group-hover/second:fill-white size-6'>
                <path d="M16 19a6.99 6.99 0 0 1-5.833-3.129l1.666-1.107a5 5 0 0 0 8.334 0l1.666 1.107A6.99 6.99 0 0 1 16 19m4-11a2 2 0 1 0 2 2 1.98 1.98 0 0 0-2-2m-8 0a2 2 0 1 0 2 2 1.98 1.98 0 0 0-2-2" />
                <path d="M17.736 30 16 29l4-7h6a1.997 1.997 0 0 0 2-2V6a1.997 1.997 0 0 0-2-2H6a1.997 1.997 0 0 0-2 2v14a1.997 1.997 0 0 0 2 2h9v2H6a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4h-4.835Z" />
                <path d="M0 0h32v32H0z" style={{ fill: "none" }} /></svg>
              <p className='text-[9px] scale-0 opacity-0 group-hover/second:scale-100 group-hover/second:opacity-100 transition duraiton-300 pointer-events-none absolute top-[120%] whitespace-nowrap bg-black text-white rounded-full px-3 py-1'>Chat Bot</p>
            </button>
          </div>
          {/* this iwll be enabled on mouse click */}
          <AnimatePresence>
            {showOptions && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="sm:hidden absolute top-0 left-0 w-full h-full flex bg-white rounded-full items-center transition duration-300">
              <button onClick={toggleTheme} className='target-hand cursor-none relative flex flex-col gap-1 justify-center items-center group/first w-full'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>
                <p className='text-[9px] scale-0 opacity-0 group-hover/first:scale-100 group-hover/first:opacity-100 transition duraiton-300 pointer-events-none absolute top-[120%] whitespace-nowrap bg-black text-white rounded-full px-3 py-1'>
                  <span className='hidden dark:inline-block'>Light</span>
                  <span className='dark:hidden inline-block'>Dark</span>
                  &nbsp;Mode
                </p>
              </button>
              <div className='h-full w-[1px] bg-black/50' />
              <button onClick={() => setShowleftside(prev => !prev)} className='target-hand cursor-none relative flex flex-col gap-1 justify-center items-center group/second w-full'>
                <svg viewBox="0 0 32 32" className='stroke-white size-6'>
                  <path d="M16 19a6.99 6.99 0 0 1-5.833-3.129l1.666-1.107a5 5 0 0 0 8.334 0l1.666 1.107A6.99 6.99 0 0 1 16 19m4-11a2 2 0 1 0 2 2 1.98 1.98 0 0 0-2-2m-8 0a2 2 0 1 0 2 2 1.98 1.98 0 0 0-2-2" />
                  <path d="M17.736 30 16 29l4-7h6a1.997 1.997 0 0 0 2-2V6a1.997 1.997 0 0 0-2-2H6a1.997 1.997 0 0 0-2 2v14a1.997 1.997 0 0 0 2 2h9v2H6a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4h-4.835Z" />
                  <path d="M0 0h32v32H0z" style={{ fill: "none" }} /></svg>
                <p className='text-[9px] scale-0 opacity-0 group-hover/second:scale-100 group-hover/second:opacity-100 transition duraiton-300 pointer-events-none absolute top-[120%] whitespace-nowrap bg-black text-white rounded-full px-3 py-1'>Chat Bot</p>
              </button>
            </motion.div>}
          </AnimatePresence>
        </div>
        <button
          type="button"
          className={[
            'bubble toggle-bubble menu-btn active:scale-90 hover:scale-105 transition duration-300',
            isMenuOpen ? 'open' : '',
            'inline-flex flex-col items-center justify-center',
            'rounded-full',
            'bg-white',
            'shadow-[0_4px_16px_rgba(0,0,0,0.12)]',
            'pointer-events-auto',
            'w-12 h-12 md:w-14 md:h-14',
            'border-0 cursor-none target-hand p-0',
            'will-change-transform'
          ].join(' ')}
          onClick={handleToggle}
          aria-label={menuAriaLabel}
          aria-pressed={isMenuOpen}
          style={{ background: menuBg }}
        >

          {isScrolling ? <div>
            {sectionIcons[currentTab.toLowerCase()].icon}
          </div> : <>
            <span
              className="menu-line block mx-auto rounded-[2px]"
              style={{
                width: 26,
                height: 2,
                background: menuContentColor,
                transform: isMenuOpen ? 'translateY(4px) rotate(45deg)' : 'none'
              }}
            />
            <span
              className="menu-line short block mx-auto rounded-[2px]"
              style={{
                marginTop: '6px',
                width: 26,
                height: 2,
                background: menuContentColor,
                transform: isMenuOpen ? 'translateY(-4px) rotate(-45deg)' : 'none'
              }}
            />
          </>}
        </button>
      </nav>

      {showOverlay && <div className='absolute w-full h-full top-0 left-0 backdrop-blur-sm z-[1000]' onClick={handleToggle}>
      </div>}

      {showOverlay && (
        <div
          ref={overlayRef}
          className={[
            'bubble-menu-items',
            useFixedPosition ? 'fixed' : 'absolute',
            'inset-0',
            'flex items-center justify-center',
            'pointer-events-none',
            'z-[1000]'
          ].join(' ')}
          aria-hidden={!isMenuOpen}
        >
          <ul
            className={[
              'pill-list',
              'list-none m-0 px-6',
              'w-full max-w-[1600px] mx-auto',
              'flex flex-wrap',
              'gap-x-0 gap-y-1',
              'pointer-events-auto'
            ].join(' ')}
            role="menu"
            aria-label="Menu links"
          >
            {menuItems.map((item, idx) => (
              <li
                key={idx}
                role="none"
                className={[
                  'pill-col active:scale-95 transition duration-150 cursor-none target-hand',
                  'flex justify-center items-stretch',
                  '[flex:0_0_calc(100%/3)]',
                  'box-border'
                ].join(' ')}
                onClick={() => {
                  if (item.href == "chatbot") {
                    setShowleftside(true)
                    handleToggle();
                  } else {
                    handleToggle();
                    setCurrentSetterTab(item.href)
                  }
                }}
              >
                <a
                  role="menuitem"
                  aria-label={item.ariaLabel || item.label}
                  className={[
                    'pill-link select-none',
                    'w-full',
                    'rounded-[999px]',
                    'no-underline',
                    'bg-white',
                    'text-inherit',
                    'shadow-[0_4px_14px_rgba(0,0,0,0.10)]',
                    'flex items-center justify-center',
                    'relative',
                    'transition-[background,color] duration-300 ease-in-out',
                    'box-border',
                    'whitespace-nowrap overflow-hidden'
                  ].join(' ')}
                  style={{
                    ['--item-rot']: `${item.rotation ?? 0}deg`,
                    ['--pill-bg']: menuBg,
                    ['--pill-color']: menuContentColor,
                    ['--hover-bg']: item.hoverStyles?.bgColor || '#f3f4f6',
                    ['--hover-color']: item.hoverStyles?.textColor || menuContentColor,
                    background: currentTab == item.href ? item.hoverStyles?.bgColor : 'var(--pill-bg)',
                    color: currentTab == item.href ? item.hoverStyles?.textColor : 'var(--pill-color)',
                    minHeight: 'var(--pill-min-h, 160px)',
                    padding: 'clamp(1.5rem, 3vw, 8rem) 0',
                    fontSize: 'clamp(1.5rem, 4vw, 4rem)',
                    fontWeight: 400,
                    lineHeight: 0,
                    willChange: 'transform',
                    height: 10
                  }}
                  ref={el => {
                    if (el) bubblesRef.current[idx] = el;
                  }}
                >
                  <span
                    className="pill-label inline-block"
                    style={{
                      willChange: 'transform, opacity',
                      height: '1.2em',
                      lineHeight: 1.2
                    }}
                    ref={el => {
                      if (el) labelRefs.current[idx] = el;
                    }}
                  >
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
