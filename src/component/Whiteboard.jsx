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
      <div className="w-max" style={{
            transform: "rotateX(0deg) rotateY(-25deg) rotateZ(10deg)",
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
            width: 500,
            height: 300,
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
            className="absolute bottom-0 left-0 right-0 mx-0 rounded-xl flex items-center justify-center gap-3 px-6"
            style={{
              height: 55,
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