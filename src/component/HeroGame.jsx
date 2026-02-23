import { useState, useEffect, useRef, useCallback } from "react";
import { AiSvg, CssSvg, GithubSvg, HtmlSvg, JavascriptSvg, MongoDbSvg, NodeJsSvg, PythonSvg, ReactSvg, TypeScriptSvg } from "./SvgComponent";

const GAME_W = window.innerWidth - 80;
const GAME_H = 380;
const GROUND = 64;
const DINO_X = 90;
const DINO_W = 48;
const DINO_H_NORMAL = 58;
const DINO_H_CROUCH = 34;
const GRAVITY = 0.75;
const JUMP_FORCE = -15;
const INITIAL_SPEED = 10;

const COLLECTIBLES = [
  { id: "star",      label: "Star",      color: "#f59e0b",
    svg: <ReactSvg className="fill-white size-4" /> },
  { id: "heart",     label: "Heart",     color: "#ef4444",
    svg:<MongoDbSvg className="fill-white size-4" />  },
  { id: "lightning", label: "Lightning", color: "#8b5cf6",
    svg: <NodeJsSvg className="fill-white size-4" /> },
  { id: "moon",      label: "Moon",      color: "#06b6d4",
    svg:<PythonSvg className="fill-white size-4" />  },
  { id: "gem",       label: "Gem",       color: "#10b981",
    svg: <GithubSvg className="fill-white size-4" />  },
  { id: "flame",     label: "Flame",     color: "#f97316",
    svg: <AiSvg className="fill-white size-4" /> },
  { id: "snowflake", label: "Snowflake", color: "#60a5fa",
    svg: <TypeScriptSvg className="fill-white size-4" />  },
  { id: "crown",     label: "Crown",     color: "#fbbf24",
    svg: <HtmlSvg className="fill-white size-4" />  },
];

function BombSVG({ w = 44, h = 44 }) {
  return (
    <svg viewBox="0 0 48 48" width={w} height={h}>
      <path d="M32 10 Q38 4 42 8" stroke="#78716c" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <circle cx="42" cy="7" r="3" fill="#f97316" opacity="0.9"/>
      <circle cx="24" cy="27" r="16" fill="#1c1917"/>
      <ellipse cx="18" cy="21" rx="4" ry="3" fill="#292524" opacity="0.4"/>
      <ellipse cx="20" cy="19" rx="3" ry="2" fill="white" opacity="0.1"/>
    </svg>
  );
}

function DinoSprite({ isCrouching, isDead, legFrame }) {
  const w = isCrouching ? 66 : DINO_W;
  const h = isCrouching ? DINO_H_CROUCH : DINO_H_NORMAL;

  if (isDead) {
    return (
      <svg viewBox="0 0 48 58" width={DINO_W} height={DINO_H_NORMAL}>
        <rect x="10" y="18" width="28" height="22" fill="#374151" rx="2"/>
        <rect x="22" y="6" width="20" height="16" fill="#374151" rx="2"/>
        <text x="33" y="17" fontSize="7" fill="#ef4444" fontWeight="bold" textAnchor="middle">✕</text>
        <rect x="5" y="26" width="9" height="6" fill="#374151" rx="1"/>
        <rect x="1" y="32" width="8" height="5" fill="#374151" rx="1"/>
        <rect x="34" y="20" width="8" height="5" fill="#374151" rx="1"/>
        <rect x="17" y="40" width="8" height="14" fill="#374151" rx="1"/>
        <rect x="27" y="40" width="8" height="14" fill="#374151" rx="1"/>
      </svg>
    );
  }

  if (isCrouching) {
    return (
      <svg viewBox="0 0 66 34" width={w} height={h}>
        <rect x="14" y="4" width="36" height="20" fill="#374151" rx="3"/>
        <rect x="38" y="2" width="18" height="14" fill="#374151" rx="2"/>
        <rect x="50" y="5" width="4" height="4" fill="white" rx="1"/>
        <rect x="51" y="6" width="2" height="2" fill="#374151"/>
        <rect x="54" y="10" width="3" height="2" fill="#374151" rx="1"/>
        <rect x="8" y="8" width="10" height="6" fill="#374151" rx="1"/>
        <rect x="2" y="13" width="9" height="5" fill="#374151" rx="1"/>
        <rect x="40" y="17" width="8" height="5" fill="#374151" rx="1"/>
        {legFrame % 2 === 0 ? (
          <>
            <rect x="20" y="22" width="9" height="10" fill="#374151" rx="1"/>
            <rect x="31" y="22" width="9" height="6" fill="#374151" rx="1"/>
            <rect x="29" y="26" width="11" height="5" fill="#374151" rx="1"/>
          </>
        ) : (
          <>
            <rect x="20" y="22" width="9" height="6" fill="#374151" rx="1"/>
            <rect x="18" y="26" width="11" height="5" fill="#374151" rx="1"/>
            <rect x="31" y="22" width="9" height="10" fill="#374151" rx="1"/>
          </>
        )}
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 58" width={w} height={h}>
      <rect x="10" y="18" width="28" height="22" fill="#374151" rx="2"/>
      <rect x="22" y="6" width="20" height="16" fill="#374151" rx="2"/>
      <rect x="35" y="10" width="4" height="4" fill="white" rx="1"/>
      <rect x="36" y="11" width="2" height="2" fill="#374151"/>
      <rect x="39" y="16" width="3" height="2" fill="#374151" rx="1"/>
      <rect x="5" y="26" width="9" height="6" fill="#374151" rx="1"/>
      <rect x="1" y="32" width="8" height="5" fill="#374151" rx="1"/>
      <rect x="34" y="20" width="8" height="5" fill="#374151" rx="1"/>
      {legFrame % 2 === 0 ? (
        <>
          <rect x="17" y="40" width="8" height="14" fill="#374151" rx="1"/>
          <rect x="27" y="40" width="8" height="8" fill="#374151" rx="1"/>
          <rect x="25" y="46" width="10" height="5" fill="#374151" rx="1"/>
        </>
      ) : (
        <>
          <rect x="17" y="40" width="8" height="8" fill="#374151" rx="1"/>
          <rect x="15" y="46" width="10" height="5" fill="#374151" rx="1"/>
          <rect x="27" y="40" width="8" height="14" fill="#374151" rx="1"/>
        </>
      )}
    </svg>
  );
}


const BugSvg = ({className,w = 44, h = 44})=>{
    return <svg width={w} height={h} viewBox="0 0 24 24" fill="none" className={className}><path d="M14 21.71A7 7 0 0 1 5 15v-3.062A3.94 3.94 0 0 1 8.938 8h6.124A3.94 3.94 0 0 1 19 11.938V15a6.98 6.98 0 0 1-2 4.899"  strokeWidth="1.5" strokeLinecap="round"/><path d="M8.25 7.5a.75.75 0 0 0-1.5 0zm-.615-2.917a.75.75 0 1 0 1.246.834zM17.25 8.5v-1h-1.5v1zm-10.5-1v1h1.5v-1zm10.5 0c0-2.9-2.35-5.25-5.25-5.25v1.5a3.75 3.75 0 0 1 3.75 3.75zM12 2.25a5.25 5.25 0 0 0-4.365 2.333l1.246.834A3.75 3.75 0 0 1 12 3.75z" /><path d="M19 14h3M5 14H2M14.5 3.5 17 2M9.5 3.5 7 2m13.5 18-2-.8m2-11.2-2 .8M3.5 20l2-.8M3.5 8l2 .8M12 21.5V15" strokeWidth="1.5" strokeLinecap="round"/></svg>
}
export default function DinoGame() {
  const [gameState, setGameState] = useState("idle");
  const [renderTick, setRenderTick] = useState(0);
  const [collected, setCollected] = useState([]);

  const gsRef = useRef("idle");
  const dinoYRef = useRef(0);
  const dinoVelRef = useRef(0);
  const isCrouchRef = useRef(false);
  const isJumpingRef = useRef(false);
  const legFrameRef = useRef(0);
  const speedRef = useRef(INITIAL_SPEED);
  const itemsRef = useRef([]);
  const collectedRef = useRef([]);
  const nextSpawnRef = useRef(340);
  const distRef = useRef(0);
  const animRef = useRef(null);
  const tickRef = useRef(0);
  const explosionsRef = useRef([]);
  const winYRef = useRef(0);
  const spawnQueueRef = useRef([...COLLECTIBLES].sort(() => Math.random() - 0.5));
  const collectibleIdxRef = useRef(0);

  const getDinoRect = () => {
    const crouching = isCrouchRef.current;
    const dh = crouching ? DINO_H_CROUCH : DINO_H_NORMAL;
    const dw = crouching ? 66 : DINO_W;
    const bottom = GAME_H - GROUND + dinoYRef.current;
    return { left: DINO_X + 5, right: DINO_X + dw - 5, top: bottom - dh + 5, bottom: bottom - 3 };
  };

  const spawnItem = () => {
    const isCollectible = Math.random() < 0.45;
    const x = GAME_W + 50;
    if (isCollectible) {
      const c = spawnQueueRef.current[collectibleIdxRef.current % spawnQueueRef.current.length];
      const onGround = Math.random() < 0.5;
    //   const bottomPx = onGround ? GROUND + 28 : GROUND + 70 + Math.random() * 80;
    const bottomPx = onGround ? GROUND : GROUND + 80;
      itemsRef.current.push({ id: Date.now() + Math.random(), kind: "collectible", collectibleId: c.id, x, bottomPx, w: 30, h: 30 });
    } else {
      const onGround = Math.random() < 0.6;
      const bottomPx = onGround ? GROUND + 44 : GROUND + 80 + Math.random() * 70;
    //   itemsRef.current.push({ id: Date.now() + Math.random(), kind: "bomb", x, bottomPx, w: 44, h: 44 });
      itemsRef.current.push({ id: Date.now() + Math.random(), kind: "bomb", x, bottomPx, w: 44, h: 44, onGround });
    }
  };

  const handleJump = useCallback(() => {
    if (gsRef.current === "dead" || gsRef.current === "win") return;
    if (gsRef.current === "idle") { gsRef.current = "playing"; setGameState("playing"); }
    if (!isJumpingRef.current && !isCrouchRef.current) {
      dinoVelRef.current = JUMP_FORCE;
      isJumpingRef.current = true;
    }
  }, []);

  const handleCrouchStart = useCallback(() => {
    if (gsRef.current !== "playing") return;
    isCrouchRef.current = true;
  }, []);

  const handleCrouchEnd = useCallback(() => { isCrouchRef.current = false; }, []);

  const restart = useCallback(() => {
    dinoYRef.current = 0; dinoVelRef.current = 0;
    isCrouchRef.current = false; isJumpingRef.current = false;
    speedRef.current = INITIAL_SPEED; itemsRef.current = [];
    collectedRef.current = []; nextSpawnRef.current = 340;
    distRef.current = 0; tickRef.current = 0; legFrameRef.current = 0;
    explosionsRef.current = []; winYRef.current = 0;
    spawnQueueRef.current = [...COLLECTIBLES].sort(() => Math.random() - 0.5);
    collectibleIdxRef.current = 0;
    gsRef.current = "playing";
    setGameState("playing"); setCollected([]);
  }, []);

  useEffect(() => {
    const onDown = (e) => {
      if (e.code === "Space" || e.code === "ArrowUp") { 
        e.preventDefault()
        e.stopPropagation()
         handleJump();
    }
      if (e.code === "ArrowDown") { 
        e.preventDefault()
        e.stopPropagation()
        handleCrouchStart(); 
    }
      if (e.code === "Enter" && (gsRef.current === "dead" || gsRef.current === "win")) restart();
    };
    const onUp = (e) => { if (e.code === "ArrowDown") handleCrouchEnd(); };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => { window.removeEventListener("keydown", onDown); window.removeEventListener("keyup", onUp); };
  }, [handleJump, handleCrouchStart, handleCrouchEnd, restart]);

  useEffect(() => {
    const loop = () => {
      const gs = gsRef.current;

      if (gs === "win") {
        winYRef.current -= 7;
        setRenderTick(t => t + 1);
        animRef.current = requestAnimationFrame(loop);
        return;
      }
      if (gs !== "playing") { animRef.current = requestAnimationFrame(loop); return; }

      tickRef.current++;
      const tick = tickRef.current;

      // physics
      dinoVelRef.current += GRAVITY;
      dinoYRef.current += dinoVelRef.current;
      if (dinoYRef.current >= 0) { dinoYRef.current = 0; dinoVelRef.current = 0; isJumpingRef.current = false; }

      if (tick % 8 === 0) legFrameRef.current++;
      distRef.current += speedRef.current;
      if (tick % 450 === 0) speedRef.current = Math.min(speedRef.current + 0.4, 14);

      // move items
      itemsRef.current = itemsRef.current.map(it => ({ ...it, x: it.x - speedRef.current })).filter(it => it.x > -80);

      // spawn
      const rightmost = itemsRef.current.reduce((m, it) => Math.max(m, it.x), -Infinity);
      if (itemsRef.current.length === 0 || rightmost < GAME_W - nextSpawnRef.current) {
        spawnItem();
        nextSpawnRef.current = 200 + Math.random() * 300;
      }

      // collision
      const dr = getDinoRect();
      let died = false;
      const keep = [];

      for (const it of itemsRef.current) {
        const itemBottom = GAME_H - it.bottomPx;
        const itemTop = itemBottom - it.h;
        const itemLeft = it.x + 6;
        const itemRight = it.x + it.w - 6;
        const hit = dr.right > itemLeft && dr.left < itemRight && dr.bottom > itemTop + 6 && dr.top < itemBottom - 4;

        if (hit) {
          if (it.kind === "bomb") {
            explosionsRef.current.push({ id: it.id, x: it.x, y: itemTop, t: 0 });
            died = true;
          } else {
            if (!collectedRef.current.includes(it.collectibleId)) {
              collectedRef.current = [...collectedRef.current, it.collectibleId];
              collectibleIdxRef.current++;
              setCollected([...collectedRef.current]);
              if (collectedRef.current.length === COLLECTIBLES.length) {
                gsRef.current = "win";
                setGameState("win");
              }
            }
            continue;
          }
        }
        keep.push(it);
      }
      itemsRef.current = keep;

      explosionsRef.current = explosionsRef.current.map(e => ({ ...e, t: e.t + 1 })).filter(e => e.t < 28);

      if (died) { gsRef.current = "dead"; setGameState("dead"); }

      setRenderTick(t => t + 1);
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const crouching = isCrouchRef.current;
  const dinoH = crouching ? DINO_H_CROUCH : DINO_H_NORMAL;
  const dinoW = crouching ? 66 : DINO_W;
  const dinoBottomPx = GROUND + (-dinoYRef.current);
  const allWon = gsRef.current === "win";
  const showWinScreen = allWon && winYRef.current < -GAME_H;

  return (
    <div className="flex flex-col items-center justify-center">

      {/* Game */}
      <div
        className="relative overflow-x-hidden self-start"
        style={{ width: GAME_W, height: GAME_H}}
        onClick={handleJump}
      >
        {/* Ground line */}
        <div className="absolute w-full " style={{ bottom: GROUND, height: 2, background: "#d6d3d1" }} />

        {/* Scrolling ground dots */}
        {Array.from({ length: 22 }).map((_, i) => (
          <div key={i} className="absolute rounded-full" style={{
            bottom: GROUND - 12,
            left: ((i * 40 - (distRef.current * 0.5 % 40) + 40) % GAME_W),
            width: 3, height: 3, background: "#e7e5e4"
          }} />
        ))}

        {/* Dino */}
        <div className="absolute" style={{
          left: DINO_X,
          bottom: dinoBottomPx,
          width: dinoW,
          height: dinoH,
          transform: allWon ? `translateY(${winYRef.current}px)` : "none",
        }}>
          <DinoSprite isCrouching={crouching} isDead={gameState === "dead"} legFrame={legFrameRef.current} />
        </div>

        {/* Items */}
        {itemsRef.current.map(it => {
          const botCss = it.bottomPx;
          if (it.kind === "bomb") {
            return (
              <div key={it.id} className="absolute" style={{ left: it.x, bottom: botCss-44, width: it.w, height: it.h }}>
                <BugSvg className="stroke-white" w={it.w} h={it.h} />
              </div>
            );
          }
          const cDef = COLLECTIBLES.find(c => c.id === it.collectibleId);
          const got = collected.includes(it.collectibleId);
          return (
            <div key={it.id} className="absolute flex items-center justify-center" style={{
              left: it.x, bottom: botCss, width: it.w, height: it.h,
              opacity: got ? 0.2 : 1,
              animation: "bob 1.1s ease-in-out infinite",
              filter: `drop-shadow(0 0 4px ${cDef?.color ?? "#fff"})`,
            }}>
              {cDef?.svg}
            </div>
          );
        })}

        {/* Explosions */}
        {explosionsRef.current.map(exp => {
          const p = exp.t / 28;
          return (
            <div key={exp.id} className="absolute pointer-events-none" style={{
              left: exp.x - 24, top: exp.y - 24,
              width: 80, height: 80,
              opacity: 1 - p,
              transform: `scale(${0.6 + p * 2})`,
            }}>
              <svg viewBox="0 0 80 80" width="80" height="80">
                {[0,40,80,120,160,200,240,300].map((a, i) => (
                  <line key={i} x1="40" y1="40"
                    x2={40 + Math.cos(a * Math.PI / 180) * 32}
                    y2={40 + Math.sin(a * Math.PI / 180) * 32}
                    stroke={i % 2 === 0 ? "#f97316" : "#fbbf24"} strokeWidth="4" strokeLinecap="round"/>
                ))}
                <circle cx="40" cy="40" r="13" fill="#fef3c7" opacity="0.95"/>
                <circle cx="40" cy="40" r="7" fill="#f97316"/>
              </svg>
            </div>
          );
        })}

        {/* Idle */}
        {gameState === "idle" && (
          <div className="absolute inset-0 flex flex-col items-end justify-center gap-2 ">
            <div style={{ fontSize: 13, color: "#a8a29e", letterSpacing: "0.2em", textTransform: "uppercase" }}>Space / Click to Start</div>
            <div className="flex text-xs text-[#d6d3d1] items-center gap-1">↑ Jump · ↓ Crouch · Collect Skill · Dodge <BugSvg className="stroke-white size-4" /> Bugs</div>
          </div>
        )}

{/* Collectible tracker */}
        {gameState != "idle" && (
      <div className="flex items-end gap-2 absolute inset-0 justify-center">
        <span className="text-xs text-white uppercase">Collect</span>
        <div className="flex gap-1.5">
          {COLLECTIBLES.map(c => {
            const done = collected.includes(c.id);
            return (
              <div key={c.id} style={{
                opacity: done ? 1 : 0.18,
                transform: done ? "scale(1.2) translateY(-2px)" : "scale(1)",
                transition: "all 0.35s cubic-bezier(.34,1.56,.64,1)",
                filter: done ? `drop-shadow(0 0 5px ${c.color})` : "grayscale(1)",
              }}>
                {c.svg}
              </div>
            );
          })}
        </div>
        <span style={{ fontSize: 10, color: "#a8a29e", marginLeft: 4 }}>{collected.length}/{COLLECTIBLES.length}</span>
      </div>
        )}

        {/* Dead */}
        {gameState === "dead" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div style={{ fontSize: 24, fontWeight: "bold", color: "#292524", letterSpacing: "0.1em" }}>💥 BOOM</div>
            <div style={{ fontSize: 11, color: "#78716c", letterSpacing: "0.12em" }}>{collected.length} / {COLLECTIBLES.length} collected</div>
            <button onClick={(e) => { e.stopPropagation(); restart(); }}
              style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", border: "1.5px solid #a8a29e", padding: "7px 22px", background: "white", color: "#292524", cursor: "pointer", borderRadius: 8 }}>
              Try Again
            </button>
          </div>
        )}

        {/* Win */}
        {showWinScreen && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4" style={{ background: "rgba(255,255,255,0.94)" }}>
            <div style={{ fontSize: 28, fontWeight: "bold", color: "#292524", letterSpacing: "0.08em", animation: "pop 0.4s cubic-bezier(.34,1.56,.64,1)" }}>🎉 YOU WIN!</div>
            <div className="flex gap-2" style={{ animation: "pop 0.5s 0.1s cubic-bezier(.34,1.56,.64,1) both" }}>
              {COLLECTIBLES.map(c => (
                <div key={c.id} style={{ filter: `drop-shadow(0 0 6px ${c.color})` }}>{c.svg}</div>
              ))}
            </div>
            <div style={{ fontSize: 11, color: "#78716c", letterSpacing: "0.15em" }}>All icons collected!</div>
            <button onClick={(e) => { e.stopPropagation(); restart(); }}
              style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", border: "1.5px solid #a8a29e", padding: "7px 22px", background: "white", color: "#292524", cursor: "pointer", borderRadius: 8 }}>
              Play Again
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes pop { from{transform:scale(0.4);opacity:0} to{transform:scale(1);opacity:1} }
      `}</style>
    </div>
  );
}