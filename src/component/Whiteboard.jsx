// import { useState, useRef, useEffect, useCallback } from "react";

// const COLORS = [
//   { name: "Black", value: "#1a1a2e" },
//   { name: "Red", value: "#e63946" },
//   { name: "Blue", value: "#2196f3" },
//   { name: "Green", value: "#4caf50" },
//   { name: "Purple", value: "#9c27b0" },
//   { name: "Orange", value: "#ff9800" },
//   { name: "Pink", value: "#e91e63" },
// ];

// const THICKNESSES = [2, 4, 7, 12, 20];

// // Pre-drawn todo list SVG paths simulating handwriting
// function HandwrittenContent() {
//   return (
//     <svg
//       className="absolute inset-0 w-full h-full pointer-events-none"
//       viewBox="0 0 700 480"
//       preserveAspectRatio="xMidYMid meet"
//     >
//       <defs>
//         <filter id="roughen">
//           <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
//           <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.2" />
//         </filter>
//       </defs>

//       {/* ── Heading: "Todo List" ── */}
//       <g filter="url(#roughen)" fill="none" stroke="#1a1a2e" strokeLinecap="round" strokeLinejoin="round">
//         {/* T */}
//         <path d="M68,62 Q70,60 120,61 Q121,62 121,64" strokeWidth="3.2"/>
//         <path d="M94,61 Q95,80 94,130 Q94,133 93,135" strokeWidth="3.2"/>
//         {/* o */}
//         <path d="M130,95 Q128,80 140,77 Q158,74 163,89 Q167,104 157,114 Q148,121 136,115 Q126,107 130,95" strokeWidth="3"/>
//         {/* d */}
//         <path d="M188,65 Q189,65 189,135" strokeWidth="3"/>
//         <path d="M189,95 Q187,82 198,79 Q213,76 218,91 Q221,105 213,114 Q204,122 192,116 Q185,109 187,97" strokeWidth="3"/>
//         {/* o */}
//         <path d="M228,95 Q226,80 238,77 Q256,74 261,89 Q265,104 255,114 Q246,121 234,115 Q224,107 228,95" strokeWidth="3"/>
//         {/* space */}
//         {/* L */}
//         <path d="M285,65 Q286,65 285,132 Q290,134 328,135" strokeWidth="3.2"/>
//         {/* i */}
//         <path d="M338,88 Q339,92 338,132" strokeWidth="3"/>
//         <circle cx="338" cy="83" r="3" fill="#1a1a2e"/>
//         {/* s */}
//         <path d="M358,81 Q355,77 347,80 Q342,84 348,91 Q356,97 358,103 Q360,111 351,115 Q343,117 338,113" strokeWidth="3"/>
//         {/* t */}
//         <path d="M372,70 Q373,71 372,132" strokeWidth="3"/>
//         <path d="M362,90 Q367,89 384,89" strokeWidth="3"/>
//       </g>

//       {/* decorative underline */}
//       <path d="M62,148 Q130,143 270,145 Q330,146 390,144" stroke="#1a1a2e" strokeWidth="2.5" fill="none" strokeLinecap="round" filter="url(#roughen)"/>

//       {/* ══ UNCHECKED items ══ */}
//       {/* Checkbox outlines */}
//       {[180, 240, 300].map((y, i) => (
//         <rect key={i} x="65" y={y} width="24" height="24" rx="3" ry="3"
//           stroke="#333" strokeWidth="2.2" fill="white" filter="url(#roughen)"/>
//       ))}

//       {/* drink water */}
//       <g filter="url(#roughen)" fill="none" stroke="#1a1a2e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6">
//         {/* d */}
//         <path d="M104,190 Q105,190 105,210"/>
//         <path d="M105,196 Q103,188 112,186 Q122,184 126,194 Q129,204 122,210 Q114,215 106,209"/>
//         {/* r */}
//         <path d="M132,193 Q133,193 132,210"/>
//         <path d="M132,198 Q135,190 144,191"/>
//         {/* i */}
//         <path d="M149,193 Q150,196 149,210"/>
//         <circle cx="149" cy="189" r="2.5" fill="#1a1a2e"/>
//         {/* n */}
//         <path d="M157,193 Q158,193 157,210"/>
//         <path d="M157,197 Q161,190 170,191 Q177,193 177,200 L177,210"/>
//         {/* k */}
//         <path d="M183,184 Q184,184 183,210"/>
//         <path d="M183,200 L194,191"/>
//         <path d="M187,197 L194,210"/>
//         {/* space */}
//         {/* w */}
//         <path d="M202,193 L207,210 L213,200 L219,210 L224,193"/>
//         {/* a */}
//         <path d="M235,197 Q233,190 242,188 Q252,187 254,196 L254,210 Q248,213 240,211 Q232,208 233,202 Q235,196 244,195 L254,196"/>
//         {/* t */}
//         <path d="M263,187 Q264,188 263,210"/>
//         <path d="M256,195 Q260,194 273,194"/>
//         {/* e */}
//         <path d="M278,200 Q291,199 291,199 Q291,190 282,188 Q272,187 271,198 Q271,209 281,212 Q290,213 292,208"/>
//         {/* r */}
//         <path d="M298,193 Q299,193 298,210"/>
//         <path d="M298,198 Q301,190 310,191"/>
//       </g>

//       {/* Travel somewhere */}
//       <g filter="url(#roughen)" fill="none" stroke="#1a1a2e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6">
//         {/* T */}
//         <path d="M100,246 Q104,244 130,245"/>
//         <path d="M115,244 Q116,256 115,275"/>
//         {/* r */}
//         <path d="M135,253 Q136,253 135,275"/>
//         <path d="M135,258 Q138,251 147,252"/>
//         {/* a */}
//         <path d="M158,257 Q156,250 165,248 Q175,247 177,256 L177,275 Q171,278 163,276 Q155,273 156,267 Q158,261 167,260 L177,256"/>
//         {/* v */}
//         <path d="M183,250 L189,275 L196,250"/>
//         {/* e */}
//         <path d="M202,261 Q215,260 215,260 Q215,251 206,249 Q196,248 195,259 Q195,270 205,273 Q214,274 216,269"/>
//         {/* l */}
//         <path d="M222,244 Q223,244 222,275"/>
//         {/* space */}
//         {/* s */}
//         <path d="M242,251 Q239,247 231,250 Q226,254 232,261 Q240,267 242,273 Q244,281 235,285 Q227,287 222,283"/>
//         {/* o */}
//         <path d="M259,261 Q257,249 268,247 Q280,246 283,258 Q285,270 276,277 Q267,281 259,273 Q254,266 259,261"/>
//         {/* m */}
//         <path d="M291,253 Q292,253 291,275"/>
//         <path d="M291,258 Q295,250 304,251 Q311,253 312,260 L312,275"/>
//         <path d="M312,258 Q316,250 325,251 Q332,253 333,260 L333,275"/>
//         {/* e */}
//         <path d="M339,261 Q352,260 352,260 Q352,251 343,249 Q333,248 332,259 Q332,270 342,273 Q351,274 353,269"/>
//         {/* w */}
//         <path d="M358,253 L363,275 L369,265 L375,275 L380,253"/>
//         {/* h */}
//         <path d="M385,244 Q386,244 385,275"/>
//         <path d="M385,260 Q389,253 398,254 Q405,256 406,263 L406,275"/>
//         {/* e */}
//         <path d="M412,261 Q425,260 425,260 Q425,251 416,249 Q406,248 405,259 Q405,270 415,273 Q424,274 426,269"/>
//         {/* r */}
//         <path d="M431,253 Q432,253 431,275"/>
//         <path d="M431,258 Q434,251 443,252"/>
//         {/* e */}
//         <path d="M449,261 Q462,260 462,260 Q462,251 453,249 Q443,248 442,259 Q442,270 452,273 Q461,274 463,269"/>
//       </g>

//       {/* Move on */}
//       <g filter="url(#roughen)" fill="none" stroke="#1a1a2e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6">
//         {/* M */}
//         <path d="M100,306 L100,335 L113,315 L126,335 L126,306"/>
//         {/* o */}
//         <path d="M133,316 Q131,306 141,304 Q153,303 156,313 Q158,323 150,330 Q141,334 133,326 Q129,320 133,316"/>
//         {/* v */}
//         <path d="M162,306 L168,335 L175,306"/>
//         {/* e */}
//         <path d="M181,319 Q194,318 194,318 Q194,309 185,307 Q175,306 174,317 Q174,328 184,331 Q193,332 195,327"/>
//         {/* space */}
//         {/* o */}
//         <path d="M212,316 Q210,306 220,304 Q232,303 235,313 Q237,323 229,330 Q220,334 212,326 Q208,320 212,316"/>
//         {/* n */}
//         <path d="M241,306 Q242,306 241,335"/>
//         <path d="M241,311 Q245,304 254,305 Q261,307 262,314 L262,335"/>
//       </g>

//       {/* ══ CHECKED items ══ */}
//       {/* Checkbox with checkmark */}
//       {[360, 420].map((y, i) => (
//         <g key={i} filter="url(#roughen)">
//           <rect x="65" y={y} width="24" height="24" rx="3" ry="3"
//             stroke="#333" strokeWidth="2.2" fill="#e8f5e9"/>
//           <path d={`M70,${y+12} Q76,${y+19} 86,${y+6}`}
//             stroke="#2e7d32" strokeWidth="3" fill="none" strokeLinecap="round"/>
//         </g>
//       ))}

//       {/* Play football */}
//       <g filter="url(#roughen)" fill="none" stroke="#2e7d32" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6">
//         {/* P */}
//         <path d="M100,366 L100,398"/>
//         <path d="M100,366 Q120,364 121,373 Q122,382 101,382"/>
//         {/* l */}
//         <path d="M127,360 L127,398"/>
//         {/* a */}
//         <path d="M147,374 Q145,367 154,365 Q164,364 166,373 L166,398 Q160,401 152,399 Q144,396 145,390 Q147,384 156,383 L166,373"/>
//         {/* y */}
//         <path d="M173,367 L179,385"/>
//         <path d="M186,367 L179,385 L175,398"/>
//         {/* space */}
//         {/* f */}
//         <path d="M204,398 L204,368 Q204,360 214,360"/>
//         <path d="M196,378 L214,378"/>
//         {/* o */}
//         <path d="M222,380 Q220,370 230,368 Q242,367 245,377 Q247,387 239,394 Q230,398 222,390 Q218,384 222,380"/>
//         {/* o */}
//         <path d="M252,380 Q250,370 260,368 Q272,367 275,377 Q277,387 269,394 Q260,398 252,390 Q248,384 252,380"/>
//         {/* t */}
//         <path d="M284,360 L284,398"/>
//         <path d="M274,372 L294,372"/>
//         {/* b */}
//         <path d="M300,360 L300,398"/>
//         <path d="M300,375 Q303,368 312,368 Q322,369 324,378 Q325,388 317,394 Q308,398 300,390"/>
//         {/* a */}
//         <path d="M340,374 Q338,367 347,365 Q357,364 359,373 L359,398 Q353,401 345,399 Q337,396 338,390 Q340,384 349,383 L359,373"/>
//         {/* l */}
//         <path d="M365,360 L365,398"/>
//         {/* l */}
//         <path d="M372,360 L372,398"/>
//       </g>

//       {/* Learn full stack */}
//       <g filter="url(#roughen)" fill="none" stroke="#2e7d32" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6">
//         {/* L */}
//         <path d="M100,426 L100,455 L125,456"/>
//         {/* e */}
//         <path d="M131,441 Q144,440 144,440 Q144,431 135,429 Q125,428 124,439 Q124,450 134,453 Q143,454 145,449"/>
//         {/* a */}
//         <path d="M162,434 Q160,427 169,425 Q179,424 181,433 L181,455 Q175,458 167,456 Q159,453 160,447 Q162,441 171,440 L181,433"/>
//         {/* r */}
//         <path d="M188,429 L187,455"/>
//         <path d="M187,434 Q190,427 199,428"/>
//         {/* n */}
//         <path d="M205,429 L204,455"/>
//         <path d="M204,434 Q208,427 217,428 Q224,430 225,437 L225,455"/>
//         {/* space */}
//         {/* f */}
//         <path d="M244,455 L244,425 Q244,417 254,417"/>
//         <path d="M236,435 L254,435"/>
//         {/* u */}
//         <path d="M260,429 Q261,429 260,446 Q260,454 270,455 Q280,454 280,446 L280,429"/>
//         {/* l */}
//         <path d="M287,417 L287,455"/>
//         {/* l */}
//         <path d="M294,417 L294,455"/>
//         {/* space */}
//         {/* s */}
//         <path d="M316,430 Q313,426 305,429 Q300,433 306,440 Q314,446 316,452 Q318,460 309,464 Q301,466 296,462"/>
//         {/* t */}
//         <path d="M325,417 L325,455"/>
//         <path d="M315,429 L335,429"/>
//         {/* a */}
//         <path d="M352,434 Q350,427 359,425 Q369,424 371,433 L371,455 Q365,458 357,456 Q349,453 350,447 Q352,441 361,440 L371,433"/>
//         {/* c */}
//         <path d="M395,432 Q390,425 381,428 Q373,432 374,443 Q375,454 384,457 Q393,459 397,452"/>
//         {/* k */}
//         <path d="M403,417 L403,455"/>
//         <path d="M403,441 L414,429"/>
//         <path d="M407,437 L414,455"/>
//       </g>
//     </svg>
//   );
// }

// export default function CartoonWhiteboard() {
//   const canvasRef = useRef(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [tool, setTool] = useState("pencil");
//   const [color, setColor] = useState("#1a1a2e");
//   const [thickness, setThickness] = useState(4);
//   const lastPos = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//   }, []);

//   const getPos = (e, canvas) => {
//     const rect = canvas.getBoundingClientRect();
//     const scaleX = canvas.width / rect.width;
//     const scaleY = canvas.height / rect.height;
//     if (e.touches) {
//       return {
//         x: (e.touches[0].clientX - rect.left) * scaleX,
//         y: (e.touches[0].clientY - rect.top) * scaleY,
//       };
//     }
//     return {
//       x: (e.clientX - rect.left) * scaleX,
//       y: (e.clientY - rect.top) * scaleY,
//     };
//   };

//   const startDraw = useCallback((e) => {
//     e.preventDefault();
//     const canvas = canvasRef.current;
//     const pos = getPos(e, canvas);
//     setIsDrawing(true);
//     lastPos.current = pos;
//   }, []);

//   const draw = useCallback((e) => {
//     e.preventDefault();
//     if (!isDrawing) return;
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     const pos = getPos(e, canvas);

//     ctx.beginPath();
//     ctx.moveTo(lastPos.current.x, lastPos.current.y);
//     ctx.lineTo(pos.x, pos.y);
//     ctx.strokeStyle = tool === "eraser" ? "#f3ebd7" : color;
//     ctx.lineWidth = tool === "eraser" ? thickness * 4 : thickness;
//     ctx.lineCap = "round";
//     ctx.lineJoin = "round";
//     ctx.globalCompositeOperation = tool === "eraser" ? "source-over" : "source-over";
//     ctx.stroke();

//     lastPos.current = pos;
//   }, [isDrawing, tool, color, thickness]);

//   const stopDraw = useCallback(() => {
//     setIsDrawing(false);
//     lastPos.current = null;
//   }, []);

//   return (
//     <div className="min-h-screen flex items-center justify-center p-8">

//       {/* Outer cartoon frame */}
//       <div className="flex flex-col items-center gap-0" style={{ filter: "drop-shadow(6px 10px 0px #333)" }}>

//         {/* Whiteboard itself */}
//         <div className="relative" style={{
//           borderRadius: "42% 38% 44% 36% / 18% 22% 16% 20%",
//           border: "5px solid #2c1810",
//           background: "linear-gradient(145deg, #f9f4e8, #f2ead6, #ede3c8)",
//           boxShadow: "inset 2px 3px 12px rgba(0,0,0,0.08), inset -1px -2px 8px rgba(0,0,0,0.05)",
//           width: 720,
//           height: 500,
//           overflow: "hidden",
//         }}>
//           {/* Corner texture dots */}
//           {[[12,12],[696,12],[12,476],[696,476]].map(([x,y],i)=>(
//             <div key={i} className="absolute w-2 h-2 rounded-full" style={{left:x,top:y,background:"#2c181055"}}/>
//           ))}

//           {/* Subtle ruled lines */}
//           {Array.from({length:14}).map((_,i)=>(
//             <div key={i} className="absolute left-12 right-12 border-b border-blue-200 opacity-30"
//               style={{top: 155 + i * 26}}/>
//           ))}

//           {/* Pre-drawn handwritten content */}
//           <HandwrittenContent />

//           {/* Drawing canvas */}
//           <canvas
//             ref={canvasRef}
//             width={700}
//             height={480}
//             className="absolute inset-0 w-full h-full"
//             style={{ cursor: tool === "eraser" ? "cell" : "crosshair", touchAction: "none" }}
//             onMouseDown={startDraw}
//             onMouseMove={draw}
//             onMouseUp={stopDraw}
//             onMouseLeave={stopDraw}
//             onTouchStart={startDraw}
//             onTouchMove={draw}
//             onTouchEnd={stopDraw}
//           />
//         </div>

//         {/* Toolbar tray below */}
//         <div className="relative flex items-center gap-3 px-6 py-3 z-10"
//           style={{
//             background: "linear-gradient(to bottom, #8B4513, #6B3410)",
//             borderRadius: "0 0 32px 32px",
//             border: "4px solid #2c1810",
//             borderTop: "none",
//             boxShadow: "0 6px 0 #2c1810",
//             minWidth: 500,
//             justifyContent: "center",
//           }}>

//           {/* Pencil tool */}
//           <button
//             onClick={() => setTool("pencil")}
//             title="Pencil"
//             className="flex items-center justify-center w-10 h-10 rounded-xl transition-all"
//             style={{
//               background: tool === "pencil" ? "#FFD700" : "#f5f0e8",
//               border: "3px solid #2c1810",
//               boxShadow: tool === "pencil" ? "0 0 0 2px #ff6b35" : "2px 2px 0 #2c1810",
//               transform: tool === "pencil" ? "scale(1.15)" : "scale(1)",
//             }}
//           >
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2c1810" strokeWidth="2.5" strokeLinecap="round">
//               <path d="M17 3a2.85 2.85 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
//             </svg>
//           </button>

//           {/* Eraser tool */}
//           <button
//             onClick={() => setTool("eraser")}
//             title="Eraser"
//             className="flex items-center justify-center w-10 h-10 rounded-xl transition-all"
//             style={{
//               background: tool === "eraser" ? "#FFD700" : "#f5f0e8",
//               border: "3px solid #2c1810",
//               boxShadow: tool === "eraser" ? "0 0 0 2px #ff6b35" : "2px 2px 0 #2c1810",
//               transform: tool === "eraser" ? "scale(1.15)" : "scale(1)",
//             }}
//           >
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2c1810" strokeWidth="2.5" strokeLinecap="round">
//               <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/>
//               <path d="M22 21H7"/>
//               <path d="m5 11 9 9"/>
//             </svg>
//           </button>

//           {/* Divider */}
//           <div className="w-0.5 h-8 rounded" style={{ background: "#2c181060" }}/>

//           {/* Thickness */}
//           <div className="flex items-center gap-1.5">
//             <span className="text-xs font-bold" style={{ color: "#f5f0e8", fontFamily: "Georgia, serif" }}>Size</span>
//             <select
//               value={thickness}
//               onChange={e => setThickness(Number(e.target.value))}
//               className="rounded-lg px-2 py-1 text-sm font-bold"
//               style={{
//                 border: "3px solid #2c1810",
//                 background: "#f5f0e8",
//                 color: "#2c1810",
//                 fontFamily: "Georgia, serif",
//                 boxShadow: "2px 2px 0 #2c1810",
//               }}
//             >
//               {THICKNESSES.map(t => (
//                 <option key={t} value={t}>{t}px</option>
//               ))}
//             </select>
//           </div>

//           {/* Divider */}
//           <div className="w-0.5 h-8 rounded" style={{ background: "#2c181060" }}/>

//           {/* Color swatches */}
//           <div className="flex items-center gap-1.5">
//             {COLORS.map(c => (
//               <button
//                 key={c.value}
//                 title={c.name}
//                 onClick={() => { setColor(c.value); setTool("pencil"); }}
//                 className="rounded-full transition-all"
//                 style={{
//                   width: 26,
//                   height: 26,
//                   background: c.value,
//                   border: color === c.value && tool !== "eraser" ? "3px solid #FFD700" : "2.5px solid #2c1810",
//                   boxShadow: color === c.value && tool !== "eraser" ? "0 0 0 2px #2c1810, 0 0 8px #FFD700" : "1px 1px 0 #2c1810",
//                   transform: color === c.value && tool !== "eraser" ? "scale(1.25)" : "scale(1)",
//                 }}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Chalk tray at very bottom */}
//         <div style={{
//           width: 560,
//           height: 14,
//           background: "linear-gradient(to bottom, #5a2d0c, #4a2008)",
//           borderRadius: "0 0 20px 20px",
//           border: "3px solid #2c1810",
//           borderTop: "none",
//           boxShadow: "0 4px 0 #1a0c04",
//         }}/>
//       </div>
//     </div>
//   );
// }




// import { useState, useRef, useCallback } from "react";

// const COLORS = [
//   { name: "Black", value: "#1a1a2e" },
//   { name: "Red", value: "#e63946" },
//   { name: "Blue", value: "#2196f3" },
//   { name: "Green", value: "#4caf50" },
//   { name: "Purple", value: "#9c27b0" },
//   { name: "Orange", value: "#ff9800" },
//   { name: "Pink", value: "#e91e63" },
// ];

// const THICKNESSES = [2, 4, 7, 12, 20];

// function HandwrittenContent() {
//   return (
//     <svg
//       className="absolute inset-0 w-full h-full pointer-events-none"
//       viewBox="0 0 700 520"
//       preserveAspectRatio="xMidYMid meet"
//     >
//       <defs>
//         <filter id="roughen">
//           <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="4" result="noise" />
//           <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.0" />
//         </filter>
//       </defs>

//       {/* ── HEADING: "Todo List" ── */}
//       <g filter="url(#roughen)" fill="none" stroke="#1a1a2e" strokeLinecap="round" strokeLinejoin="round">
//         {/* T */}
//         <path d="M55,38 Q57,36 97,37" strokeWidth="3.5"/>
//         <path d="M76,37 Q77,52 76,95" strokeWidth="3.5"/>
//         {/* o */}
//         <path d="M107,65 Q105,52 115,50 Q130,48 134,61 Q137,74 128,82 Q120,87 110,81 Q103,75 107,65" strokeWidth="3"/>
//         {/* d */}
//         <path d="M150,40 Q151,40 151,95" strokeWidth="3"/>
//         <path d="M151,65 Q149,53 158,51 Q171,48 175,62 Q178,74 170,82 Q162,88 152,82" strokeWidth="3"/>
//         {/* o */}
//         <path d="M186,65 Q184,52 194,50 Q209,48 213,61 Q216,74 207,82 Q199,87 189,81 Q182,75 186,65" strokeWidth="3"/>
//         {/* L */}
//         <path d="M235,40 Q236,40 235,92 Q239,93 268,94" strokeWidth="3.5"/>
//         {/* i */}
//         <path d="M277,58 Q278,61 277,92" strokeWidth="3"/>
//         <circle cx="277" cy="53" r="3.5" fill="#1a1a2e"/>
//         {/* s */}
//         <path d="M295,52 Q292,48 284,51 Q279,55 284,61 Q292,66 294,72 Q296,79 288,82 Q281,84 277,80" strokeWidth="3"/>
//         {/* t */}
//         <path d="M308,42 Q309,43 308,92" strokeWidth="3"/>
//         <path d="M299,60 Q303,59 320,59" strokeWidth="3"/>
//       </g>

//       {/* decorative underline */}
//       <path d="M50,104 Q130,100 250,102 Q310,103 340,101"
//         stroke="#1a1a2e" strokeWidth="2.5" fill="none" strokeLinecap="round" filter="url(#roughen)"/>

//       {/* ══ UNCHECKED items – y: 125, 175, 225 ══ */}
//       {[125, 175, 225].map((y, i) => (
//         <rect key={i} x="52" y={y} width="17" height="17" rx="2.5" ry="2.5"
//           stroke="#444" strokeWidth="2" fill="white" filter="url(#roughen)"/>
//       ))}

//       {/* drink water */}
//       <g filter="url(#roughen)" fill="none" stroke="#1a1a2e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
//         <path d="M78,133 Q79,133 79,148"/>
//         <path d="M79,138 Q77,131 85,129 Q93,128 96,136 Q98,144 92,149 Q85,152 79,147"/>
//         <path d="M100,133 L100,148"/>
//         <path d="M100,137 Q102,131 109,132"/>
//         <path d="M113,133 L113,148"/>
//         <circle cx="113" cy="130" r="2" fill="#1a1a2e"/>
//         <path d="M118,133 L118,148"/>
//         <path d="M118,136 Q121,130 128,131 Q133,133 134,138 L134,148"/>
//         <path d="M139,127 L139,148"/>
//         <path d="M139,139 L147,131"/>
//         <path d="M142,137 L147,148"/>
//         <path d="M153,133 L157,148 L162,140 L167,148 L171,133"/>
//         <path d="M179,137 Q177,131 184,130 Q192,129 193,136 L193,148 Q188,151 182,149 Q175,147 176,142 Q178,137 185,136 L193,136"/>
//         <path d="M200,128 L200,148"/>
//         <path d="M194,136 Q197,135 208,135"/>
//         <path d="M212,140 Q222,139 222,139 Q222,132 215,131 Q207,130 207,139 Q207,148 215,150 Q222,151 224,147"/>
//         <path d="M228,133 L228,148"/>
//         <path d="M228,137 Q230,131 237,132"/>
//       </g>

//       {/* Travel somewhere */}
//       <g filter="url(#roughen)" fill="none" stroke="#1a1a2e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
//         <path d="M78,178 Q81,177 100,177"/>
//         <path d="M89,177 Q90,184 89,195"/>
//         <path d="M104,182 L104,195"/>
//         <path d="M104,186 Q106,181 113,182"/>
//         <path d="M120,185 Q118,179 125,178 Q133,177 135,184 L135,195 Q130,197 124,196 Q118,194 119,189 Q120,185 127,184 L135,184"/>
//         <path d="M139,179 L143,195 L148,179"/>
//         <path d="M152,187 Q162,186 162,186 Q162,179 155,178 Q147,177 147,186 Q147,195 155,197 Q162,198 163,194"/>
//         <path d="M167,176 L167,195"/>
//         <path d="M180,180 Q177,177 171,179 Q167,182 172,187 Q178,191 180,196 Q182,202 174,204 Q168,205 165,202"/>
//         <path d="M194,187 Q192,179 200,178 Q210,177 212,185 Q214,193 207,198 Q200,201 193,195 Q190,190 194,187"/>
//         <path d="M218,182 L218,195"/>
//         <path d="M218,185 Q221,179 228,180 Q233,181 234,186 L234,195"/>
//         <path d="M234,185 Q237,179 244,180 Q249,181 250,186 L250,195"/>
//         <path d="M254,187 Q264,186 264,186 Q264,179 257,178 Q249,177 249,186 Q249,195 257,197 Q264,198 265,194"/>
//         <path d="M268,182 L272,195 L277,188 L282,195 L286,182"/>
//         <path d="M289,176 L289,195"/>
//         <path d="M289,186 Q292,180 299,181 Q304,182 305,187 L305,195"/>
//         <path d="M309,187 Q319,186 319,186 Q319,179 312,178 Q304,177 304,186 Q304,195 312,197 Q319,198 320,194"/>
//         <path d="M323,182 L323,195"/>
//         <path d="M323,186 Q325,181 332,182"/>
//         <path d="M336,187 Q346,186 346,186 Q346,179 339,178 Q331,177 331,186 Q331,195 339,197 Q346,198 347,194"/>
//       </g>

//       {/* Move on */}
//       <g filter="url(#roughen)" fill="none" stroke="#1a1a2e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
//         <path d="M78,228 L78,248 L88,234 L98,248 L98,228"/>
//         <path d="M104,236 Q102,228 110,226 Q120,225 122,233 Q124,241 117,246 Q109,249 103,243 Q100,239 104,236"/>
//         <path d="M127,228 L132,248 L137,228"/>
//         <path d="M141,237 Q151,236 151,236 Q151,228 144,227 Q136,226 136,235 Q136,244 144,246 Q151,247 152,243"/>
//         <path d="M165,236 Q163,228 171,226 Q181,225 183,233 Q185,241 178,246 Q170,249 164,243 Q161,239 165,236"/>
//         <path d="M188,228 L188,248"/>
//         <path d="M188,232 Q191,226 198,227 Q203,228 204,233 L204,248"/>
//       </g>

//       {/* ══ CHECKED items – y: 275, 325 ══ */}
//       {[275, 325].map((y, i) => (
//         <g key={i} filter="url(#roughen)">
//           <rect x="52" y={y} width="17" height="17" rx="2.5" ry="2.5"
//             stroke="#444" strokeWidth="2" fill="#e8f5e9"/>
//           <path d={`M55,${y+9} Q60,${y+14} 68,${y+4}`}
//             stroke="#2e7d32" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
//         </g>
//       ))}

//       {/* Play football */}
//       <g filter="url(#roughen)" fill="none" stroke="#2e7d32" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
//         <path d="M78,278 L78,300"/>
//         <path d="M78,278 Q94,276 95,283 Q96,290 79,290"/>
//         <path d="M100,274 L100,300"/>
//         <path d="M115,284 Q113,278 120,277 Q128,276 130,283 L130,300 Q125,302 119,301 Q112,299 113,294 Q114,290 121,289 L130,283"/>
//         <path d="M135,278 L140,292"/>
//         <path d="M146,278 L140,292 L137,302"/>
//         <path d="M158,300 L158,276 Q158,270 166,270"/>
//         <path d="M152,284 L166,284"/>
//         <path d="M172,287 Q170,279 178,278 Q188,277 190,285 Q192,293 185,298 Q177,301 171,295 Q168,291 172,287"/>
//         <path d="M197,287 Q195,279 203,278 Q213,277 215,285 Q217,293 210,298 Q202,301 196,295 Q193,291 197,287"/>
//         <path d="M222,271 L222,300"/>
//         <path d="M215,281 L230,281"/>
//         <path d="M235,271 L235,300"/>
//         <path d="M235,283 Q237,277 244,278 Q252,279 253,286 Q254,294 247,298 Q239,301 235,294"/>
//         <path d="M266,284 Q264,278 271,277 Q279,276 281,283 L281,300 Q276,302 270,301 Q263,299 264,294 Q265,290 272,289 L281,283"/>
//         <path d="M286,271 L286,300"/>
//         <path d="M291,271 L291,300"/>
//       </g>

//       {/* Learn full stack */}
//       <g filter="url(#roughen)" fill="none" stroke="#2e7d32" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
//         <path d="M78,328 L78,350 L100,351"/>
//         <path d="M104,339 Q114,338 114,338 Q114,331 107,330 Q99,329 99,338 Q99,347 107,349 Q114,350 115,346"/>
//         <path d="M128,334 Q126,328 133,327 Q141,326 143,333 L143,350 Q138,352 132,351 Q125,349 126,344 Q127,340 134,339 L143,333"/>
//         <path d="M148,329 L148,350"/>
//         <path d="M148,333 Q150,328 157,329"/>
//         <path d="M161,329 L161,350"/>
//         <path d="M161,332 Q164,327 171,328 Q176,329 177,334 L177,350"/>
//         <path d="M193,350 L193,328 Q193,321 201,321"/>
//         <path d="M187,335 L201,335"/>
//         <path d="M206,329 L206,344 Q206,350 214,351 Q222,350 222,344 L222,329"/>
//         <path d="M227,321 L227,350"/>
//         <path d="M232,321 L232,350"/>
//         <path d="M250,330 Q247,327 240,329 Q235,332 240,337 Q247,341 249,346 Q251,353 243,355 Q236,357 232,354"/>
//         <path d="M258,321 L258,350"/>
//         <path d="M251,330 L265,330"/>
//         <path d="M278,334 Q276,328 283,327 Q291,326 293,333 L293,350 Q288,352 282,351 Q275,349 276,344 Q277,340 284,339 L293,333"/>
//         <path d="M312,333 Q308,327 300,329 Q293,333 294,342 Q295,351 303,353 Q311,355 314,350"/>
//         <path d="M319,321 L319,350"/>
//         <path d="M319,339 L328,329"/>
//         <path d="M322,336 L328,350"/>
//       </g>

//       {/* Toolbar background strip */}
//       <rect x="0" y="402" width="700" height="118" fill="#6B3410"/>
//       <rect x="0" y="402" width="700" height="5" fill="#3d1a04"/>
//     </svg>
//   );
// }

// export default function CartoonWhiteboard() {
//   const canvasRef = useRef(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [tool, setTool] = useState("pencil");
//   const [color, setColor] = useState("#1a1a2e");
//   const [thickness, setThickness] = useState(4);
//   const lastPos = useRef(null);

//   const getPos = (e, canvas) => {
//     const rect = canvas.getBoundingClientRect();
//     const scaleX = canvas.width / rect.width;
//     const scaleY = canvas.height / rect.height;
//     if (e.touches) {
//       return {
//         x: (e.touches[0].clientX - rect.left) * scaleX,
//         y: (e.touches[0].clientY - rect.top) * scaleY,
//       };
//     }
//     return {
//       x: (e.clientX - rect.left) * scaleX,
//       y: (e.clientY - rect.top) * scaleY,
//     };
//   };

//   const startDraw = useCallback((e) => {
//     e.preventDefault();
//     const canvas = canvasRef.current;
//     const pos = getPos(e, canvas);
//     if (pos.y > 400) return;
//     setIsDrawing(true);
//     lastPos.current = pos;
//   }, []);

//   const draw = useCallback((e) => {
//     e.preventDefault();
//     if (!isDrawing) return;
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     const pos = getPos(e, canvas);
//     if (pos.y > 400) return;

//     ctx.beginPath();
//     ctx.moveTo(lastPos.current.x, lastPos.current.y);
//     ctx.lineTo(pos.x, pos.y);
//     ctx.strokeStyle = tool === "eraser" ? "#f5f0e8" : color;
//     ctx.lineWidth = tool === "eraser" ? thickness * 4 : thickness;
//     ctx.lineCap = "round";
//     ctx.lineJoin = "round";
//     ctx.stroke();
//     lastPos.current = pos;
//   }, [isDrawing, tool, color, thickness]);

//   const stopDraw = useCallback(() => {
//     setIsDrawing(false);
//     lastPos.current = null;
//   }, []);

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center p-8"
//       style={{
//         backgroundColor: "#d4c5a9",
//         backgroundImage: "radial-gradient(circle at 30% 40%, #e8d9b5 0%, #c9b89a 100%)",
//       }}
//     >
//       <div style={{ filter: "drop-shadow(8px 12px 0px #4a3520)" }}>
//         {/* Whiteboard */}
//         <div
//           className="relative"
//           style={{
//             width: 720,
//             height: 540,
//             borderRadius: "44% 36% 40% 38% / 16% 20% 14% 18%",
//             border: "6px solid #2c1810",
//             background: "linear-gradient(150deg, #faf5ea 0%, #f3e9d0 60%, #ece0c2 100%)",
//             boxShadow:
//               "inset 3px 4px 14px rgba(0,0,0,0.07), inset -2px -3px 10px rgba(0,0,0,0.05)",
//             overflow: "hidden",
//           }}
//         >
//           {/* Ruled lines in writing area only */}
//           {Array.from({ length: 13 }).map((_, i) => (
//             <div
//               key={i}
//               className="absolute left-10 right-10 border-b border-sky-300 opacity-20"
//               style={{ top: 108 + i * 22 }}
//             />
//           ))}

//           {/* Corner bolts */}
//           {[[22,22],[694,22],[22,514],[694,514]].map(([x,y],i)=>(
//             <div key={i} className="absolute w-3 h-3 rounded-full border-2 border-stone-600"
//               style={{ left:x-6, top:y-6, background:"#c8a96e", zIndex:10 }}/>
//           ))}

//           {/* Handwriting SVG */}
//           <HandwrittenContent />

//           {/* Drawing canvas – clicks on toolbar area are ignored via startDraw guard */}
//           <canvas
//             ref={canvasRef}
//             width={700}
//             height={520}
//             className="absolute inset-0 w-full h-full"
//             style={{
//               cursor: tool === "eraser" ? "cell" : "crosshair",
//               touchAction: "none",
//               zIndex: 5,
//             }}
//             onMouseDown={startDraw}
//             onMouseMove={draw}
//             onMouseUp={stopDraw}
//             onMouseLeave={stopDraw}
//             onTouchStart={startDraw}
//             onTouchMove={draw}
//             onTouchEnd={stopDraw}
//           />

//           {/* ── Toolbar inside whiteboard ── */}
//           <div
//             className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-3 px-6"
//             style={{
//               height: 78,
//               background: "linear-gradient(to bottom, #8B4513 0%, #5c2a08 100%)",
//               borderTop: "4px solid #2c1810",
//               zIndex: 20,
//             }}
//           >
//             {/* Pencil button */}
//             <button
//               onClick={() => setTool("pencil")}
//               title="Pencil"
//               style={{
//                 width: 40, height: 40,
//                 display: "flex", alignItems: "center", justifyContent: "center",
//                 borderRadius: 10,
//                 background: tool === "pencil" ? "#FFD700" : "#f5f0e8",
//                 border: "3px solid #2c1810",
//                 boxShadow: tool === "pencil"
//                   ? "0 0 0 2px #ff6b35, 2px 2px 0 #2c1810"
//                   : "2px 2px 0 #2c1810",
//                 transform: tool === "pencil" ? "scale(1.12)" : "scale(1)",
//                 transition: "all 0.15s",
//                 cursor: "pointer",
//                 flexShrink: 0,
//               }}
//             >
//               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2c1810" strokeWidth="2.5" strokeLinecap="round">
//                 <path d="M17 3a2.85 2.85 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
//               </svg>
//             </button>

//             {/* Eraser button */}
//             <button
//               onClick={() => setTool("eraser")}
//               title="Eraser"
//               style={{
//                 width: 40, height: 40,
//                 display: "flex", alignItems: "center", justifyContent: "center",
//                 borderRadius: 10,
//                 background: tool === "eraser" ? "#FFD700" : "#f5f0e8",
//                 border: "3px solid #2c1810",
//                 boxShadow: tool === "eraser"
//                   ? "0 0 0 2px #ff6b35, 2px 2px 0 #2c1810"
//                   : "2px 2px 0 #2c1810",
//                 transform: tool === "eraser" ? "scale(1.12)" : "scale(1)",
//                 transition: "all 0.15s",
//                 cursor: "pointer",
//                 flexShrink: 0,
//               }}
//             >
//               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2c1810" strokeWidth="2.5" strokeLinecap="round">
//                 <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/>
//                 <path d="M22 21H7"/>
//                 <path d="m5 11 9 9"/>
//               </svg>
//             </button>

//             {/* Divider */}
//             <div style={{ width: 2, height: 36, background: "#ffffff28", borderRadius: 2, flexShrink: 0 }}/>

//             {/* Size selector */}
//             <div style={{ display:"flex", alignItems:"center", gap:6, flexShrink:0 }}>
//               <span style={{
//                 color: "#f5ead0", fontFamily: "Georgia,serif",
//                 fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase"
//               }}>Size</span>
//               <select
//                 value={thickness}
//                 onChange={e => setThickness(Number(e.target.value))}
//                 style={{
//                   border: "2.5px solid #2c1810",
//                   borderRadius: 8,
//                   background: "#f5f0e8",
//                   color: "#2c1810",
//                   fontFamily: "Georgia,serif",
//                   fontWeight: "bold",
//                   fontSize: 12,
//                   padding: "3px 5px",
//                   boxShadow: "2px 2px 0 #2c1810",
//                   cursor: "pointer",
//                 }}
//               >
//                 {THICKNESSES.map(t => (
//                   <option key={t} value={t}>{t}px</option>
//                 ))}
//               </select>
//             </div>

//             {/* Divider */}
//             <div style={{ width: 2, height: 36, background: "#ffffff28", borderRadius: 2, flexShrink: 0 }}/>

//             {/* Color swatches */}
//             <div style={{ display:"flex", alignItems:"center", gap:6 }}>
//               {COLORS.map(c => (
//                 <button
//                   key={c.value}
//                   title={c.name}
//                   onClick={() => { setColor(c.value); setTool("pencil"); }}
//                   style={{
//                     width: 26, height: 26,
//                     borderRadius: "50%",
//                     background: c.value,
//                     border: color === c.value && tool !== "eraser"
//                       ? "3px solid #FFD700"
//                       : "2.5px solid #2c1810",
//                     boxShadow: color === c.value && tool !== "eraser"
//                       ? "0 0 0 2px #2c1810, 0 0 8px #FFD700"
//                       : "1px 1px 0 #2c1810",
//                     transform: color === c.value && tool !== "eraser" ? "scale(1.22)" : "scale(1)",
//                     transition: "transform 0.15s, box-shadow 0.15s",
//                     cursor: "pointer",
//                     flexShrink: 0,
//                   }}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Chalk ledge */}
//         <div style={{
//           height: 14,
//           background: "linear-gradient(to bottom,#5c2a08,#3d1a04)",
//           border: "4px solid #2c1810",
//           borderTop: "none",
//           borderRadius: "0 0 28px 28px",
//           boxShadow: "0 5px 0 #1a0c04",
//         }}/>
//       </div>
//     </div>
//   );
// }




import { useState, useRef, useCallback } from "react";

const COLORS = [
  { name: "Black", value: "#1a1a2e" },
  { name: "Red", value: "#e63946" },
  { name: "Blue", value: "#2196f3" },
  { name: "Green", value: "#4caf50" },
  { name: "Purple", value: "#9c27b0" },
  { name: "Orange", value: "#ff9800" },
  { name: "Pink", value: "#e91e63" },
];

const THICKNESSES = [2, 4, 7, 12, 20];

function HandwrittenContent() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 700 520"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <filter id="roughen">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.0" />
        </filter>
      </defs>

      {/* ── HEADING: "Todo List" ── */}
      <g filter="url(#roughen)" fill="none" stroke="#1a1a2e" strokeLinecap="round" strokeLinejoin="round">
        {/* T */}
        <path d="M55,38 Q57,36 97,37" strokeWidth="3.5"/>
        <path d="M76,37 Q77,52 76,95" strokeWidth="3.5"/>
        {/* o */}
        <path d="M107,65 Q105,52 115,50 Q130,48 134,61 Q137,74 128,82 Q120,87 110,81 Q103,75 107,65" strokeWidth="3"/>
        {/* d */}
        <path d="M150,40 Q151,40 151,95" strokeWidth="3"/>
        <path d="M151,65 Q149,53 158,51 Q171,48 175,62 Q178,74 170,82 Q162,88 152,82" strokeWidth="3"/>
        {/* o */}
        <path d="M186,65 Q184,52 194,50 Q209,48 213,61 Q216,74 207,82 Q199,87 189,81 Q182,75 186,65" strokeWidth="3"/>
        {/* L */}
        <path d="M235,40 Q236,40 235,92 Q239,93 268,94" strokeWidth="3.5"/>
        {/* i */}
        <path d="M277,58 Q278,61 277,92" strokeWidth="3"/>
        <circle cx="277" cy="53" r="3.5" fill="#1a1a2e"/>
        {/* s */}
        <path d="M295,52 Q292,48 284,51 Q279,55 284,61 Q292,66 294,72 Q296,79 288,82 Q281,84 277,80" strokeWidth="3"/>
        {/* t */}
        <path d="M308,42 Q309,43 308,92" strokeWidth="3"/>
        <path d="M299,60 Q303,59 320,59" strokeWidth="3"/>
      </g>

      {/* decorative underline */}
      <path d="M50,104 Q130,100 250,102 Q310,103 340,101"
        stroke="#1a1a2e" strokeWidth="2.5" fill="none" strokeLinecap="round" filter="url(#roughen)"/>

      {/* ══ UNCHECKED items – y: 125, 175, 225 ══ */}
      {[125, 175, 225].map((y, i) => (
        <rect key={i} x="52" y={y} width="17" height="17" rx="2.5" ry="2.5"
          stroke="#444" strokeWidth="2" fill="white" filter="url(#roughen)"/>
      ))}

      {/* drink water */}
      <g filter="url(#roughen)" fill="none" stroke="#1a1a2e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M78,133 Q79,133 79,148"/>
        <path d="M79,138 Q77,131 85,129 Q93,128 96,136 Q98,144 92,149 Q85,152 79,147"/>
        <path d="M100,133 L100,148"/>
        <path d="M100,137 Q102,131 109,132"/>
        <path d="M113,133 L113,148"/>
        <circle cx="113" cy="130" r="2" fill="#1a1a2e"/>
        <path d="M118,133 L118,148"/>
        <path d="M118,136 Q121,130 128,131 Q133,133 134,138 L134,148"/>
        <path d="M139,127 L139,148"/>
        <path d="M139,139 L147,131"/>
        <path d="M142,137 L147,148"/>
        <path d="M153,133 L157,148 L162,140 L167,148 L171,133"/>
        <path d="M179,137 Q177,131 184,130 Q192,129 193,136 L193,148 Q188,151 182,149 Q175,147 176,142 Q178,137 185,136 L193,136"/>
        <path d="M200,128 L200,148"/>
        <path d="M194,136 Q197,135 208,135"/>
        <path d="M212,140 Q222,139 222,139 Q222,132 215,131 Q207,130 207,139 Q207,148 215,150 Q222,151 224,147"/>
        <path d="M228,133 L228,148"/>
        <path d="M228,137 Q230,131 237,132"/>
      </g>

      {/* Travel somewhere */}
      <g filter="url(#roughen)" fill="none" stroke="#1a1a2e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M78,178 Q81,177 100,177"/>
        <path d="M89,177 Q90,184 89,195"/>
        <path d="M104,182 L104,195"/>
        <path d="M104,186 Q106,181 113,182"/>
        <path d="M120,185 Q118,179 125,178 Q133,177 135,184 L135,195 Q130,197 124,196 Q118,194 119,189 Q120,185 127,184 L135,184"/>
        <path d="M139,179 L143,195 L148,179"/>
        <path d="M152,187 Q162,186 162,186 Q162,179 155,178 Q147,177 147,186 Q147,195 155,197 Q162,198 163,194"/>
        <path d="M167,176 L167,195"/>
        <path d="M180,180 Q177,177 171,179 Q167,182 172,187 Q178,191 180,196 Q182,202 174,204 Q168,205 165,202"/>
        <path d="M194,187 Q192,179 200,178 Q210,177 212,185 Q214,193 207,198 Q200,201 193,195 Q190,190 194,187"/>
        <path d="M218,182 L218,195"/>
        <path d="M218,185 Q221,179 228,180 Q233,181 234,186 L234,195"/>
        <path d="M234,185 Q237,179 244,180 Q249,181 250,186 L250,195"/>
        <path d="M254,187 Q264,186 264,186 Q264,179 257,178 Q249,177 249,186 Q249,195 257,197 Q264,198 265,194"/>
        <path d="M268,182 L272,195 L277,188 L282,195 L286,182"/>
        <path d="M289,176 L289,195"/>
        <path d="M289,186 Q292,180 299,181 Q304,182 305,187 L305,195"/>
        <path d="M309,187 Q319,186 319,186 Q319,179 312,178 Q304,177 304,186 Q304,195 312,197 Q319,198 320,194"/>
        <path d="M323,182 L323,195"/>
        <path d="M323,186 Q325,181 332,182"/>
        <path d="M336,187 Q346,186 346,186 Q346,179 339,178 Q331,177 331,186 Q331,195 339,197 Q346,198 347,194"/>
      </g>

      {/* Move on */}
      <g filter="url(#roughen)" fill="none" stroke="#1a1a2e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M78,228 L78,248 L88,234 L98,248 L98,228"/>
        <path d="M104,236 Q102,228 110,226 Q120,225 122,233 Q124,241 117,246 Q109,249 103,243 Q100,239 104,236"/>
        <path d="M127,228 L132,248 L137,228"/>
        <path d="M141,237 Q151,236 151,236 Q151,228 144,227 Q136,226 136,235 Q136,244 144,246 Q151,247 152,243"/>
        <path d="M165,236 Q163,228 171,226 Q181,225 183,233 Q185,241 178,246 Q170,249 164,243 Q161,239 165,236"/>
        <path d="M188,228 L188,248"/>
        <path d="M188,232 Q191,226 198,227 Q203,228 204,233 L204,248"/>
      </g>

      {/* ══ CHECKED items – y: 275, 325 ══ */}
      {[275, 325].map((y, i) => (
        <g key={i} filter="url(#roughen)">
          <rect x="52" y={y} width="17" height="17" rx="2.5" ry="2.5"
            stroke="#444" strokeWidth="2" fill="#e8f5e9"/>
          <path d={`M55,${y+9} Q60,${y+14} 68,${y+4}`}
            stroke="#2e7d32" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        </g>
      ))}

      {/* Play football */}
      <g filter="url(#roughen)" fill="none" stroke="#2e7d32" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M78,278 L78,300"/>
        <path d="M78,278 Q94,276 95,283 Q96,290 79,290"/>
        <path d="M100,274 L100,300"/>
        <path d="M115,284 Q113,278 120,277 Q128,276 130,283 L130,300 Q125,302 119,301 Q112,299 113,294 Q114,290 121,289 L130,283"/>
        <path d="M135,278 L140,292"/>
        <path d="M146,278 L140,292 L137,302"/>
        <path d="M158,300 L158,276 Q158,270 166,270"/>
        <path d="M152,284 L166,284"/>
        <path d="M172,287 Q170,279 178,278 Q188,277 190,285 Q192,293 185,298 Q177,301 171,295 Q168,291 172,287"/>
        <path d="M197,287 Q195,279 203,278 Q213,277 215,285 Q217,293 210,298 Q202,301 196,295 Q193,291 197,287"/>
        <path d="M222,271 L222,300"/>
        <path d="M215,281 L230,281"/>
        <path d="M235,271 L235,300"/>
        <path d="M235,283 Q237,277 244,278 Q252,279 253,286 Q254,294 247,298 Q239,301 235,294"/>
        <path d="M266,284 Q264,278 271,277 Q279,276 281,283 L281,300 Q276,302 270,301 Q263,299 264,294 Q265,290 272,289 L281,283"/>
        <path d="M286,271 L286,300"/>
        <path d="M291,271 L291,300"/>
      </g>

      {/* Learn full stack */}
      <g filter="url(#roughen)" fill="none" stroke="#2e7d32" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M78,328 L78,350 L100,351"/>
        <path d="M104,339 Q114,338 114,338 Q114,331 107,330 Q99,329 99,338 Q99,347 107,349 Q114,350 115,346"/>
        <path d="M128,334 Q126,328 133,327 Q141,326 143,333 L143,350 Q138,352 132,351 Q125,349 126,344 Q127,340 134,339 L143,333"/>
        <path d="M148,329 L148,350"/>
        <path d="M148,333 Q150,328 157,329"/>
        <path d="M161,329 L161,350"/>
        <path d="M161,332 Q164,327 171,328 Q176,329 177,334 L177,350"/>
        <path d="M193,350 L193,328 Q193,321 201,321"/>
        <path d="M187,335 L201,335"/>
        <path d="M206,329 L206,344 Q206,350 214,351 Q222,350 222,344 L222,329"/>
        <path d="M227,321 L227,350"/>
        <path d="M232,321 L232,350"/>
        <path d="M250,330 Q247,327 240,329 Q235,332 240,337 Q247,341 249,346 Q251,353 243,355 Q236,357 232,354"/>
        <path d="M258,321 L258,350"/>
        <path d="M251,330 L265,330"/>
        <path d="M278,334 Q276,328 283,327 Q291,326 293,333 L293,350 Q288,352 282,351 Q275,349 276,344 Q277,340 284,339 L293,333"/>
        <path d="M312,333 Q308,327 300,329 Q293,333 294,342 Q295,351 303,353 Q311,355 314,350"/>
        <path d="M319,321 L319,350"/>
        <path d="M319,339 L328,329"/>
        <path d="M322,336 L328,350"/>
      </g>
    </svg>
  );
}

export default function CartoonWhiteboard() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("#1a1a2e");
  const [thickness, setThickness] = useState(4);
  const lastPos = useRef(null);

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if (e.touches) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDraw = useCallback((e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const pos = getPos(e, canvas);
    if (pos.y > 400) return;
    setIsDrawing(true);
    lastPos.current = pos;
  }, []);

  const draw = useCallback((e) => {
    e.preventDefault();
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pos = getPos(e, canvas);
    if (pos.y > 400) return;

    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = tool === "eraser" ? "#f5f0e8" : color;
    ctx.lineWidth = tool === "eraser" ? thickness * 4 : thickness;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    lastPos.current = pos;
  }, [isDrawing, tool, color, thickness]);

  const stopDraw = useCallback(() => {
    setIsDrawing(false);
    lastPos.current = null;
  }, []);

  return (
      <div style={{
            transform: "rotateX(5deg) rotateY(-15deg) rotateZ(10deg)",
            transformStyle: "preserve-3d",
            position: "relative", filter: "drop-shadow(6px 10px 0px #4a352088)"
          }}>
        {/* Sketch border SVG – sits outside/over the board */}
        <svg
          style={{
            position: "absolute",
            inset: -14,
            width: "calc(100% + 28px)",
            height: "calc(100% + 28px)",
            pointerEvents: "none",
            zIndex: 30,
            overflow: "visible",
          }}
          viewBox="-14 -14 748 568"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="sketchFilter" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="6" seed="3" result="noise"/>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G"/>
            </filter>
          </defs>
          {/* Multiple overlapping sketch strokes for a hand-drawn pencil border feel */}
          <g filter="url(#sketchFilter)" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* Main outer stroke – dark, thicker */}
            <rect x="6" y="6" width="708" height="528" rx="60" ry="60"
              stroke="#2c1810" strokeWidth="4.5" opacity="0.85"/>
            {/* Second stroke – slightly offset, medium */}
            <rect x="3" y="8" width="713" height="523" rx="58" ry="62"
              stroke="#3a2215" strokeWidth="2.8" opacity="0.55" strokeDasharray="6 3"/>
            {/* Third stroke – thinner, more offset, lighter */}
            <rect x="9" y="3" width="703" height="533" rx="64" ry="56"
              stroke="#1a0e06" strokeWidth="2" opacity="0.35"/>
            {/* Inner thin shadow stroke */}
            <rect x="13" y="13" width="694" height="514" rx="52" ry="52"
              stroke="#4a2e1a" strokeWidth="1.5" opacity="0.25"/>
            {/* Extra hatchy wobble layer */}
            <rect x="4" y="5" width="712" height="530" rx="62" ry="60"
              stroke="#2c1810" strokeWidth="1.2" opacity="0.2" strokeDasharray="18 8 4 6"/>
          </g>
        </svg>

        {/* Whiteboard */}
        <div
          className="relative"
          style={{
            width: 720,
            height: 540,
            borderRadius: "12% 12% 12% 12% / 16% 20% 14% 18%",
            border: "none",
            background: "linear-gradient(150deg, #faf5ea 0%, #f3e9d0 60%, #ece0c2 100%)",
            boxShadow:
              "inset 3px 4px 14px rgba(0,0,0,0.07), inset -2px -3px 10px rgba(0,0,0,0.05)",
            overflow: "hidden",
          }}
        >
          {/* Ruled lines in writing area only */}
          {Array.from({ length: 13 }).map((_, i) => (
            <div
              key={i}
              className="absolute left-10 right-10 border-b border-sky-300 opacity-20"
              style={{ top: 108 + i * 22 }}
            />
          ))}

          {/* Corner bolts */}
          {[[22,22],[694,22],[22,514],[694,514]].map(([x,y],i)=>(
            <div key={i} className="absolute w-3 h-3 rounded-full border-2 border-stone-600"
              style={{ left:x-6, top:y-6, background:"#c8a96e", zIndex:10 }}/>
          ))}

          {/* Handwriting SVG */}
          <HandwrittenContent />

          {/* Drawing canvas – clicks on toolbar area are ignored via startDraw guard */}
          <canvas
            ref={canvasRef}
            width={700}
            height={520}
            className="absolute inset-0 w-full h-full"
            style={{
              cursor: tool === "eraser" ? "cell" : "crosshair",
              touchAction: "none",
              zIndex: 5,
            }}
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={stopDraw}
            onMouseLeave={stopDraw}
            onTouchStart={startDraw}
            onTouchMove={draw}
            onTouchEnd={stopDraw}
          />

          {/* ── Toolbar inside whiteboard ── */}
          <div
            className="absolute bottom-4 left-0 right-0 mx-10 rounded-full flex items-center justify-center gap-3 px-6"
            style={{
              height: 78,
              background: "linear-gradient(to bottom, #8B4513 0%, #5c2a08 100%)",
              borderTop: "4px solid #2c1810",
              zIndex: 20,
            }}
          >
            {/* Pencil button */}
            <button
              onClick={() => setTool("pencil")}
              title="Pencil"
              className="target-hand"
              style={{
                width: 40, height: 40,
                display: "flex", alignItems: "center", justifyContent: "center",
                borderRadius: 10,
                background: tool === "pencil" ? "#FFD700" : "#f5f0e8",
                border: "3px solid #2c1810",
                boxShadow: tool === "pencil"
                  ? "0 0 0 2px #ff6b35, 2px 2px 0 #2c1810"
                  : "2px 2px 0 #2c1810",
                transform: tool === "pencil" ? "scale(1.12)" : "scale(1)",
                transition: "all 0.15s",
                cursor: "none",
                flexShrink: 0,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2c1810" strokeWidth="2.5" strokeLinecap="round">
                <path d="M17 3a2.85 2.85 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
              </svg>
            </button>

            {/* Eraser button */}
            <button
              onClick={() => setTool("eraser")}
              title="Eraser"
              className="target-hand"
              style={{
                width: 40, height: 40,
                display: "flex", alignItems: "center", justifyContent: "center",
                borderRadius: 10,
                background: tool === "eraser" ? "#FFD700" : "#f5f0e8",
                border: "3px solid #2c1810",
                boxShadow: tool === "eraser"
                  ? "0 0 0 2px #ff6b35, 2px 2px 0 #2c1810"
                  : "2px 2px 0 #2c1810",
                transform: tool === "eraser" ? "scale(1.12)" : "scale(1)",
                transition: "all 0.15s",
                cursor: "none",
                flexShrink: 0,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2c1810" strokeWidth="2.5" strokeLinecap="round">
                <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/>
                <path d="M22 21H7"/>
                <path d="m5 11 9 9"/>
              </svg>
            </button>

            {/* Divider */}
            <div style={{ width: 2, height: 36, background: "#ffffff28", borderRadius: 2, flexShrink: 0 }}/>

            {/* Size selector */}
            <div style={{ display:"flex", alignItems:"center", gap:6, flexShrink:0 }}>
              <span style={{
                color: "#f5ead0", fontFamily: "Georgia,serif",
                fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase"
              }}>Size</span>
              <select
                value={thickness}
                onChange={e => setThickness(Number(e.target.value))}
                className="target-hand"
                style={{
                  border: "2.5px solid #2c1810",
                  borderRadius: 8,
                  background: "#f5f0e8",
                  color: "#2c1810",
                  fontFamily: "Georgia,serif",
                  fontWeight: "bold",
                  fontSize: 12,
                  padding: "3px 5px",
                  boxShadow: "2px 2px 0 #2c1810",
                  cursor: "none",
                }}
              >
                {THICKNESSES.map(t => (
                  <option key={t} value={t}>{t}px</option>
                ))}
              </select>
            </div>

            {/* Divider */}
            <div style={{ width: 2, height: 36, background: "#ffffff28", borderRadius: 2, flexShrink: 0 }}/>

            {/* Color swatches */}
            <div style={{ display:"flex", alignItems:"center", gap:6 }}>
              {COLORS.map(c => (
                <button
                  key={c.value}
                  title={c.name}
                  onClick={() => { setColor(c.value); setTool("pencil"); }}
                  className="target-hand"
                  style={{
                    width: 26, height: 26,
                    borderRadius: "50%",
                    background: c.value,
                    border: color === c.value && tool !== "eraser"
                      ? "3px solid #FFD700"
                      : "2.5px solid #2c1810",
                    boxShadow: color === c.value && tool !== "eraser"
                      ? "0 0 0 2px #2c1810, 0 0 8px #FFD700"
                      : "1px 1px 0 #2c1810",
                    transform: color === c.value && tool !== "eraser" ? "scale(1.22)" : "scale(1)",
                    transition: "transform 0.15s, box-shadow 0.15s",
                    cursor: "none",
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

  
      </div>
  );
}