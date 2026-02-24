// import { useState, useEffect, useRef } from "react";

// const tracks = [
//   {
//     id: 1,
//     title: "Midnight Bloom",
//     artist: "Aurora Waves",
//     album: "Ethereal",
//     duration: 217,
//     color: "#c9a96e",
//     cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&q=80",
//   },
//   {
//     id: 2,
//     title: "Silent Hours",
//     artist: "Neon Dusk",
//     album: "Solitude",
//     duration: 184,
//     color: "#7eb8c9",
//     cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=80",
//   },
//   {
//     id: 3,
//     title: "Velvet Haze",
//     artist: "The Soft Tones",
//     album: "Nocturne",
//     duration: 198,
//     color: "#c97eb8",
//     cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80",
//   },
// ];

// function formatTime(s) {
//   const m = Math.floor(s / 60);
//   const sec = Math.floor(s % 60);
//   return `${m}:${sec.toString().padStart(2, "0")}`;
// }

// // Icons
// const PlayIcon = () => (
//   <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-0.5">
//     <path d="M8 5v14l11-7z" />
//   </svg>
// );
// const PauseIcon = () => (
//   <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
//     <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
//   </svg>
// );
// const PrevIcon = () => (
//   <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
//     <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
//   </svg>
// );
// const NextIcon = () => (
//   <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
//     <path d="M6 18l8.5-6L6 6v12zm2-8.14 4.96 3.14L8 16.14V9.86zM16 6h2v12h-2z" />
//   </svg>
// );
// const VolumeIcon = ({ muted }) =>
//   muted ? (
//     <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
//       <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0 0 17.73 18l2 2L21 18.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z" />
//     </svg>
//   ) : (
//     <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
//       <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
//     </svg>
//   );
// const ShuffleIcon = () => (
//   <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
//     <path d="M10.59 9.17 5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" />
//   </svg>
// );
// const RepeatIcon = () => (
//   <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
//     <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" />
//   </svg>
// );

// export default function MusicCard() {
//   const [trackIndex, setTrackIndex] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [volume, setVolume] = useState(75);
//   const [muted, setMuted] = useState(false);
//   const [shuffle, setShuffle] = useState(false);
//   const [repeat, setRepeat] = useState(false);
//   const [dragging, setDragging] = useState(false);
//   const intervalRef = useRef(null);
//   const progressRef = useRef(null);

//   const track = tracks[trackIndex];
//   const elapsed = (progress / 100) * track.duration;

//   // Simulate playback
//   useEffect(() => {
//     if (isPlaying && !dragging) {
//       intervalRef.current = setInterval(() => {
//         setProgress((p) => {
//           if (p >= 100) {
//             handleNext();
//             return 0;
//           }
//           return p + 100 / track.duration;
//         });
//       }, 1000);
//     }
//     return () => clearInterval(intervalRef.current);
//   }, [isPlaying, trackIndex, dragging]);

//   const handleNext = () => {
//     setProgress(0);
//     setTrackIndex((i) => (shuffle ? Math.floor(Math.random() * tracks.length) : (i + 1) % tracks.length));
//   };
//   const handlePrev = () => {
//     setProgress(0);
//     setTrackIndex((i) => (i - 1 + tracks.length) % tracks.length);
//   };

//   const handleProgressClick = (e) => {
//     const rect = progressRef.current.getBoundingClientRect();
//     const pct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
//     setProgress(pct);
//   };

//   return (
//     <div className="bg-[#0c0c0c] flex items-center justify-center p-3"
//       style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>

//       <div
//         className="relative w-full max-w-sm rounded-none overflow-hidden"
//         style={{
//           background: "#111",
//           boxShadow: `0 0 0 1px rgba(255,255,255,0.06), 0 32px 64px rgba(0,0,0,0.6)`,
//         }}
//       >
//         {/* Album art */}
//         <div className="relative w-full overflow-hidden">
//           <img
//             key={track.id}
//             src={track.cover}
//             alt={track.title}
//             className="w-full h-full object-cover transition-all duration-700"
//             style={{
//               filter: isPlaying ? "brightness(0.85) saturate(1.1)" : "brightness(0.55) saturate(0.7) grayscale(0.3)",
//               transform: isPlaying ? "scale(1.04)" : "scale(1)",
//               transition: "filter 0.8s ease, transform 8s ease",
//             }}
//           />

//           {/* Gradient overlay */}
//           <div
//             className="absolute inset-0"
//             style={{
//               background: "linear-gradient(to top, #111 0%, rgba(17,17,17,0.3) 50%, transparent 100%)",
//             }}
//           />

//           {/* Track number badge */}
//           <div className="absolute top-4 right-4">
//             <span
//               className="text-[9px] tracking-widest text-white/40 uppercase px-2 py-1 border border-white/10"
//               style={{ fontFamily: "monospace" }}
//             >
//               {String(trackIndex + 1).padStart(2, "0")} / {String(tracks.length).padStart(2, "0")}
//             </span>
//           </div>

//           {/* Spinning disc indicator */}
//           <div className="absolute top-4 left-4">
//             <div
//               className="w-8 h-8 rounded-full border-2 border-white/10 flex items-center justify-center"
//               style={{
//                 animation: isPlaying ? "spin 4s linear infinite" : "none",
//                 background: "rgba(0,0,0,0.4)",
//               }}
//             >
//               <div className="w-2 h-2 rounded-full bg-white/30" />
//             </div>
//           </div>
//         </div>

//         {/* Info + controls */}
//         <div className="px-6 pt-5 pb-6 space-y-5">

//           {/* Track info */}
//           <div className="flex items-start justify-between">
//             <div>
//               <h3 className="text-base font-normal text-[#f0ece4] leading-tight">{track.title}</h3>
//               <p className="text-xs text-[#555] mt-0.5" style={{ fontFamily: "monospace" }}>
//                 {track.artist} · {track.album}
//               </p>
//             </div>
//             {/* Accent dot */}
//             <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: track.color }} />
//           </div>

//           {/* Progress bar */}
//           <div className="space-y-1.5">
//             <div
//               ref={progressRef}
//               className="relative h-1 bg-white/8 cursor-pointer group"
//               onClick={handleProgressClick}
//             >
//               {/* Filled */}
//               <div
//                 className="absolute left-0 top-0 h-full transition-all duration-300"
//                 style={{ width: `${progress}%`, background: track.color }}
//               />
//               {/* Thumb */}
//               <div
//                 className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
//                 style={{
//                   left: `calc(${progress}% - 6px)`,
//                   background: track.color,
//                   boxShadow: `0 0 8px ${track.color}80`,
//                 }}
//               />
//             </div>
//             <div className="flex justify-between">
//               <span className="text-[9px] text-[#444]" style={{ fontFamily: "monospace" }}>
//                 {formatTime(elapsed)}
//               </span>
//               <span className="text-[9px] text-[#444]" style={{ fontFamily: "monospace" }}>
//                 {formatTime(track.duration)}
//               </span>
//             </div>
//           </div>

//           {/* Main controls */}
//           <div className="flex items-center justify-between">

//             {/* Shuffle */}
//             <button
//               onClick={() => setShuffle(!shuffle)}
//               className={`transition-colors duration-200 ${shuffle ? "text-[#c9a96e]" : "text-[#444] hover:text-[#777]"}`}
//             >
//               <ShuffleIcon />
//             </button>

//             {/* Prev */}
//             <button
//               onClick={handlePrev}
//               className="text-[#777] hover:text-[#f0ece4] transition-colors duration-200 p-2"
//             >
//               <PrevIcon />
//             </button>

//             {/* Play / Pause */}
//             <button
//               onClick={() => setIsPlaying(!isPlaying)}
//               className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
//               style={{
//                 background: track.color,
//                 boxShadow: `0 0 20px ${track.color}50`,
//               }}
//             >
//               <span className="text-[#0c0c0c]">
//                 {isPlaying ? <PauseIcon /> : <PlayIcon />}
//               </span>
//             </button>

//             {/* Next */}
//             <button
//               onClick={handleNext}
//               className="text-[#777] hover:text-[#f0ece4] transition-colors duration-200 p-2"
//             >
//               <NextIcon />
//             </button>

//             {/* Repeat */}
//             <button
//               onClick={() => setRepeat(!repeat)}
//               className={`transition-colors duration-200 ${repeat ? "text-[#c9a96e]" : "text-[#444] hover:text-[#777]"}`}
//             >
//               <RepeatIcon />
//             </button>
//           </div>

//           {/* Volume control */}
//           <div className="flex items-center gap-3 pt-1">
//             <button
//               onClick={() => setMuted(!muted)}
//               className="text-[#444] hover:text-[#777] transition-colors duration-200 flex-shrink-0"
//             >
//               <VolumeIcon muted={muted} />
//             </button>
//             <div className="relative flex-1 h-0.5 bg-white/8 cursor-pointer group"
//               onClick={(e) => {
//                 const rect = e.currentTarget.getBoundingClientRect();
//                 setVolume(Math.round(Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))));
//                 setMuted(false);
//               }}
//             >
//               <div
//                 className="absolute left-0 top-0 h-full transition-all duration-150"
//                 style={{ width: muted ? "0%" : `${volume}%`, background: "rgba(255,255,255,0.25)" }}
//               />
//               <div
//                 className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity"
//                 style={{ left: `calc(${muted ? 0 : volume}% - 5px)` }}
//               />
//             </div>
//             <span
//               className="text-[9px] text-[#333] w-6 text-right flex-shrink-0"
//               style={{ fontFamily: "monospace" }}
//             >
//               {muted ? "0" : volume}
//             </span>
//           </div>

//           {/* Track list dots */}
//           <div className="flex items-center justify-center gap-2 pt-1">
//             {tracks.map((t, i) => (
//               <button
//                 key={t.id}
//                 onClick={() => { setTrackIndex(i); setProgress(0); }}
//                 className="transition-all duration-300"
//                 style={{
//                   width: i === trackIndex ? "20px" : "6px",
//                   height: "3px",
//                   borderRadius: "2px",
//                   background: i === trackIndex ? track.color : "rgba(255,255,255,0.12)",
//                 }}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       <style>{`
//         @keyframes spin {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// }


import { useState, useEffect, useRef } from "react";

const tracks = [
  {
    id: 1,
    title: "Midnight Bloom",
    artist: "Aurora Waves",
    duration: 217,
    color: "#c9a96e",
    cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&q=80",
  },
  {
    id: 2,
    title: "Silent Hours",
    artist: "Neon Dusk",
    duration: 184,
    color: "#7eb8c9",
    cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&q=80",
  },
  {
    id: 3,
    title: "Velvet Haze",
    artist: "The Soft Tones",
    duration: 198,
    color: "#c97eb8",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&q=80",
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
  const [volume, setVolume] = useState(70);
  const [muted, setMuted] = useState(false);
  const intervalRef = useRef(null);
  const progressRef = useRef(null);
  const volumeRef = useRef(null);

  const track = tracks[trackIndex];
  const elapsed = (progress / 100) * track.duration;

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setTrackIndex((i) => (i + 1) % tracks.length);
            return 0;
          }
          return p + 100 / track.duration;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, trackIndex]);

  const handleNext = () => { setProgress(0); setTrackIndex((i) => (i + 1) % tracks.length); };
  const handlePrev = () => { setProgress(0); setTrackIndex((i) => (i - 1 + tracks.length) % tracks.length); };

  const handleProgressClick = (e) => {
    const rect = progressRef.current.getBoundingClientRect();
    setProgress(Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)));
  };

  const handleVolumeClick = (e) => {
    const rect = volumeRef.current.getBoundingClientRect();
    setVolume(Math.round(Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))));
    setMuted(false);
  };

  return (
    <div
      className=""
      style={{
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
                  className="transition-all duration-300"
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
                className="text-[#555] hover:text-[#aaa] transition-colors p-1"
              >
                <PrevIcon />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 flex-shrink-0"
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
                className="text-[#555] hover:text-[#aaa] transition-colors p-1"
              >
                <NextIcon />
              </button>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-1.5 flex-1 min-w-0 max-w-[110px]">
              <button
                onClick={() => setMuted(!muted)}
                className="text-[#444] hover:text-[#777] transition-colors flex-shrink-0"
              >
                <VolumeIcon muted={muted} />
              </button>
              <div
                ref={volumeRef}
                className="relative flex-1 h-0.5 bg-white/8 cursor-none target-hand group"
                onClick={handleVolumeClick}
              >
                <div
                  className="absolute left-0 top-0 h-full transition-all duration-150"
                  style={{
                    width: muted ? "0%" : `${volume}%`,
                    background: "rgba(255,255,255,0.2)",
                  }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ left: `calc(${muted ? 0 : volume}% - 4px)` }}
                />
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