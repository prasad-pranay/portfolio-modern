import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tracks = [
  {
    id: 1,
    title: "Resonance",
    artist: "HOME",
    duration: 214,
    color: "#c9a96e",
    cover: "/resonance.jpg",
    path: "/resonance.mp3"
  },
  {
    id: 2,
    title: "Nightcall",
    artist: "Kavinsky",
    duration: 257,
    color: "#7eb8c9",
    cover: "/nightcall.jpg",
    path: "/nightcall.mp3"
  },
];

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-0.5">
    <path d="M8 5v14l11-7z" />
  </svg>
);
const PauseIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);
const PrevIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
  </svg>
);
const NextIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M6 18l8.5-6L6 6v12zm2-8.14 4.96 3.14L8 16.14V9.86zM16 6h2v12h-2z" />
  </svg>
);
const VolumeIcon = ({ muted }) =>
  muted ? (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
      <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0 0 17.73 18l2 2L21 18.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
    </svg>
  );

export default function MusicCard() {
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(100);
  const intervalRef = useRef(null);
  const progressRef = useRef(null);
  const [showVolume, setShowVolume] = useState(false);

  const track = tracks[trackIndex];
  const elapsed = (progress / 100) * track.duration;

  const [sound, setSound] = useState(null);
  useEffect(() => {
    const newSound = new Audio(tracks[trackIndex]["path"]);

    setIsPlaying(false)
    if(sound!=null){
      console.log("we were caleed")
      sound.pause()
      sound.currentTime = 0
    }
    setSound(newSound);

    // return () => {
    //   newSound.pause();
    //   newSound.currentTime = 0;
    // };

  }, [trackIndex]);

  useEffect(() => {
    if(sound!=null){
      sound.volume = volume/100
    }
  }, [volume])
  

  useEffect(() => {
    if (isPlaying) {
      if(sound!=null){
        sound.play()
      }
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setTrackIndex((i) => (i + 1) % tracks.length);
            return 0;
          }
          return p + 100 / track.duration;
        });
      }, 1000);
    } else {
      if(sound!=null){
        sound.pause()
      }
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying]);

  const handleNext = () => { setProgress(0); setTrackIndex((i) => (i + 1) % tracks.length); };
  const handlePrev = () => { setProgress(0); setTrackIndex((i) => (i - 1 + tracks.length) % tracks.length); };

  const handleProgressClick = (e) => {
    const rect = progressRef.current.getBoundingClientRect();
    setProgress(Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)));
  };

  // const handleVolumeClick = (e) => {
  //   const rect = volumeRef.current.getBoundingClientRect();
  //   setVolume(Math.round(Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))));
  //   setMuted(false);
  // };

  return (
    <div
      className="z-[200]"
      style={{
            transform: "rotateX(0deg) rotateY(30deg) rotateZ(1deg)",
            transformStyle: "preserve-3d",
  
        position: "relative", filter: "drop-shadow(6px 10px 0px #25242488)",
        fontFamily: "'Georgia', 'Times New Roman', serif"
      }}
    >
      {/* Horizontal card */}
      <div
        className="relative flex flex-row overflow-hidden rounded"
        style={{
          width: "100%",
          maxWidth: "480px",
          background: "#141414",
          boxShadow: `0 0 0 1px rgba(255,255,255,0.06), 0 24px 48px rgba(0,0,0,0.7)`,
        }}
      >
        {/* Left — square album art */}
        <div className="relative flex-shrink-0" style={{ width: "130px", height: "130px" }}>
          <img
            key={track.id}
            src={track.cover}
            alt={track.title}
            className="w-full h-full object-cover"
            style={{
              filter: isPlaying
                ? "brightness(0.9) saturate(1.1)"
                : "brightness(0.5) saturate(0.5) grayscale(0.4)",
              transition: "filter 0.8s ease",
            }}
          />
          {/* Right-side fade into card */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to right, transparent 60%, #141414 100%)",
            }}
          />
          {/* Spinning disc */}
          <div
            className="absolute bottom-2 left-2 w-6 h-6 rounded-full border border-white/10 flex items-center justify-center"
            style={{
              animation: isPlaying ? "spin 4s linear infinite" : "none",
              background: "rgba(0,0,0,0.5)",
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: track.color }} />
          </div>
        </div>

        {/* Right — info + controls */}
        <div className="flex flex-col justify-between flex-1 px-4 py-3 min-w-0">

          {/* Top: title + track dots */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="text-sm font-normal text-[#f0ece4] truncate leading-tight">
                {track.title}
              </h3>
              <p className="text-[10px] text-[#555] mt-0.5 truncate" style={{ fontFamily: "monospace" }}>
                {track.artist}
              </p>
            </div>
            {/* Track dots */}
            <div className="flex items-center gap-1 flex-shrink-0 mt-1">
              {tracks.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => { setTrackIndex(i); setProgress(0); }}
                  className={`${i != trackIndex && "hover:scale-500"} transition-all duration-300 cursor-none target-hand`}
                  style={{
                    width: i === trackIndex ? "14px" : "4px",
                    height: "3px",
                    borderRadius: "2px",
                    background: i === trackIndex ? track.color : "rgba(255,255,255,0.12)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Middle: progress bar */}
          <div className="space-y-1">
            <div
              ref={progressRef}
              className="relative h-0.5 bg-white/8 cursor-none target-hand group"
              onClick={handleProgressClick}
            >
              <div
                className="absolute left-0 top-0 h-full transition-all duration-300"
                style={{ width: `${progress}%`, background: track.color }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  left: `calc(${progress}% - 5px)`,
                  background: track.color,
                  boxShadow: `0 0 6px ${track.color}`,
                }}
              />
            </div>
            <div className="flex justify-between">
              <span className="text-[8px] text-[#444]" style={{ fontFamily: "monospace" }}>
                {formatTime(elapsed)}
              </span>
              <span className="text-[8px] text-[#444]" style={{ fontFamily: "monospace" }}>
                {formatTime(track.duration)}
              </span>
            </div>
          </div>

          {/* Bottom: controls + volume */}
          <div className="flex items-center justify-between gap-2">

            {/* Playback controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrev}
                className="text-[#555] hover:text-[#aaa] transition-colors p-1  cursor-none target-hand"
              >
                <PrevIcon />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className=" cursor-none target-hand w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 flex-shrink-0"
                style={{
                  background: track.color,
                  boxShadow: isPlaying ? `0 0 12px ${track.color}60` : "none",
                }}
              >
                <span className="text-[#0c0c0c]">
                  {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </span>
              </button>

              <button
                onClick={handleNext}
                className="text-[#555] hover:text-[#aaa] transition-colors p-1  cursor-none target-hand"
              >
                <NextIcon />
              </button>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-1.5 flex-1 min-w-0 max-w-[110px]">
              {/* <input type="range" value={volume} onChange={e=>setVolume(e.target.value)} className="h-1 bg-white w-15 " /> */}
                <div className="relative flex items-center">

      {/* Volume Button */}
      <svg 
        onClick={() => setShowVolume(!showVolume)}
      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition size-5 stroke-black dark:stroke-white">
  {volume>0 && 
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
  }
  {volume==0 && 
<path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
}
</svg>


      {/* Popup Slider */}
      <AnimatePresence>
        {showVolume && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-12 -left-10 -translate-x-1/2 
            bg-black/80 backdrop-blur-md px-4 py-3 rounded-xl shadow-lg"
          >

            <input
              type="range"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              className="
              w-28 h-1
              appearance-none
              bg-white/40
              rounded-full
              cursor-none
              target-hand
              accent-white
              "
            />

          </motion.div>
        )}
      </AnimatePresence>

    </div>
             </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}