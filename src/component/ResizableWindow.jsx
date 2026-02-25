import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function ResizableBox({
  title = "Window",
  iconImage = null,
  bgColor = "#fff",
  children,
  initialWidth = 320,
  initialHeight = 220,
  minWidth = 220,
  minHeight = 160,
  setShow
}) {
  const screenWidth = window.innerWidth;
  const actionRef = useRef(null);
  const [state, setState] = useState({
    x: (window.innerWidth - initialWidth)/2,
    y: (window.innerHeight - initialHeight)/2,
    width: initialWidth,
    height: initialHeight
  });

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!actionRef.current) return;
      const a = actionRef.current;

      if (a.type === "drag") {
        setState(prevState => {
          const nextX = a.startX + (e.clientX - a.mouseX);
          const nextY = a.startY + (e.clientY - a.mouseY);

          const maxX = screenWidth - 150;
          const maxY = window.innerHeight - 150;
          
          if(a.fullScreen){
            return {
              ...prevState,
              x: Math.min(Math.max(0,e.clientX - a.fullScreen.width/2), maxX),
              y: Math.min(Math.max(0,nextY), maxY),
              width: a.fullScreen.width,
              height:a.fullScreen.height
            };
          }else{
            return {
              ...prevState,
              x: Math.min(Math.max(0,nextX), maxX),
              y: Math.min(Math.max(0,nextY), maxY),
            };
          }
          
        });
        // setState((s) => ({
        //   ...s,
        //   x: a.startX + (e.clientX - a.mouseX),
        //   y: a.startY + (e.clientY - a.mouseY),
        // }));
      }

      if (a.type === "resize-right") {
        setState((s) => ({
          ...s,
          width: Math.max(minWidth, a.startWidth + (e.clientX - a.mouseX)),
        }));
      }

      if (a.type === "resize-left") {
        const delta = e.clientX - a.mouseX;
        const newWidth = Math.max(minWidth, a.startWidth - delta);
        const newX = a.startX + (a.startWidth - newWidth);

        setState((s) => ({
          ...s,
          width: newWidth,
          x: newX,
        }));
      }

      if (a.type === "resize-bottom") {
        setState((s) => ({
          ...s,
          height: Math.max(minHeight, a.startHeight + (e.clientY - a.mouseY)),
        }));
      }

      if (a.type === "resize-corner") {
        setState((s) => ({
          ...s,
          width: Math.max(minWidth, a.startWidth + (e.clientX - a.mouseX)),
          height: Math.max(
            minHeight,
            a.startHeight + (e.clientY - a.mouseY)
          ),
        }));
      }
    };

    const onMouseUp = () => {
      actionRef.current = null;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [minWidth, minHeight]);

  const startAction = (type, e) => {
    e.preventDefault();

    const fullScreenValue = fullScreen;
    actionRef.current = {
      type,
      mouseX: e.clientX,
      mouseY: e.clientY,
      startX: state.x,
      startY: state.y,
      startWidth: state.width,
      startHeight: state.height,
      fullScreen: fullScreenValue
    };
    setFullScreen(null)
  };

  const [fullScreen, setFullScreen] = useState(null);


  return (
    <motion.div initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className="z-[10]"
      onContextMenu={e=>e.preventDefault()}>
      <div
        style={screenWidth>800 ? {
          left: state.x,
          top:  state.y,
          scale: 1,
          width: state.width,
          height: state.height,
          backgroundColor: bgColor,
          // transition: "width 120ms ease, height 120ms ease, top 120ms ease, left 120ms ease, transform 120ms ease, scale 120ms ease"
        }:{
          left:0,
          top:0,
          scale: 1,
          width: window.innerWidth,
          height: window.innerHeight,
          backgroundColor: bgColor,
          // transition: "width 120ms ease, height 120ms ease, top 120ms ease, left 120ms ease, transform 120ms ease, scale 120ms ease"
        }}

        className="fixed text-white rounded-lg shadow-lg select-none border border-gray-700"
      >
        {/* HEADER */}
        <div
          className="h-10 pl-4 pr-1 flex  items-center rounded-t-lg"
        >
          {/* ddraggable area */}
          <div className="w-full cursor-grab" onMouseDown={(e) => startAction("drag", e)}>
          <span className="font-medium text-sm flex gap-2 items-center"><img src={iconImage} alt="" className="h-6 w-6 rounded" />{title}</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="group relative cursor-pointer hover:bg-white/10 p-2 rounded">
              <span className='absolute scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition duration-200 bottom-[120%] bg-[#111] text-white rounded-sm text-xs px-3 py-1 left-1/2 -translate-x-1/2'>Minimize</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="group-active:scale-90 size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
</svg>

            </button>
            <button onClick={() => {
              if (fullScreen == null) {
                const stateValue = state;
                setFullScreen(stateValue)
                setState({ x: 0, y: 0, width: screenWidth, height: window.innerHeight })
              } else {
                setState(prev=>({...prev,x:fullScreen.x,y:fullScreen.y,width:fullScreen.width,height:fullScreen.height}))
                setFullScreen(null)
              }
            }} className="group relative cursor-pointer hover:bg-white/10 p-2.5 rounded hidden md:block">
              <span className='absolute scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition duration-200 bottom-[120%] bg-[#111] text-white rounded-sm text-xs px-3 py-1 left-1/2 -translate-x-1/2'>Expand</span>
              {fullScreen &&  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="group-active:scale-90 size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
</svg>}
              {!fullScreen && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="group-active:scale-90 size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6" />
</svg>}
            </button>
            <button onClick={()=>setShow(false)} className="group relative cursor-pointer hover:bg-red-500/80 p-2 rounded">
              <span className='absolute scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition duration-200 bottom-[120%] bg-[#111] text-white rounded-sm text-xs px-3 py-1 left-1/2 -translate-x-1/2'>Close</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"className="size-6 group-active:scale-90">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="w-full h-[calc(100%-2.5rem)] overflow-auto @container">
          {children}
        </div>

        {/* LEFT */}
        <div
          onMouseDown={(e) => startAction("resize-left", e)}
          className="absolute top-10 left-0 w-2 h-[calc(100%-2.5rem)] cursor-ew-resize"
        />

        {/* RIGHT */}
        <div
          onMouseDown={(e) => startAction("resize-right", e)}
          className="absolute top-10 right-0 w-2 h-[calc(100%-2.5rem)] cursor-ew-resize"
        />

        {/* BOTTOM */}
        <div
          onMouseDown={(e) => startAction("resize-bottom", e)}
          className="absolute bottom-0 left-0 w-full h-2 cursor-ns-resize"
        />

        {/* CORNER */}
        <div
          onMouseDown={(e) => startAction("resize-corner", e)}
          className="absolute bottom-0 right-0 w-2 h-2 cursor-nwse-resize rounded-br-lg"
        />
      </div>
    </motion.div>
  );
}
