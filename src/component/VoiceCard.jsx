import { useState, useEffect, useRef, useCallback } from "react";

const NUM_BARS = 28;

function WaveformBars({ isActive, analyser }) {
  const [heights, setHeights] = useState(Array(NUM_BARS).fill(3));
  const rafRef = useRef(null);
  const dataRef = useRef(new Uint8Array(128));

  useEffect(() => {
    if (!isActive) {
      setHeights(Array(NUM_BARS).fill(3));
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    const tick = () => {
      if (analyser) {
        analyser.getByteFrequencyData(dataRef.current);
        const step = Math.floor(dataRef.current.length / NUM_BARS);
        const newH = Array.from({ length: NUM_BARS }, (_, i) => {
          const v = dataRef.current[i * step] / 255;
          return Math.max(3, Math.round(v * 44));
        });
        setHeights(newH);
      } else {
        setHeights(prev =>
          prev.map((_, i) => {
            const t = Date.now() / 300 + i * 0.4;
            return Math.max(3, Math.round(18 + Math.sin(t) * 14 + Math.sin(t * 1.7 + i) * 8));
          })
        );
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [isActive, analyser]);

  return (
    <div className="flex items-center gap-[2px] h-14">
      {heights.map((h, i) => (
        <div
          key={i}
          style={{
            height: `${h}px`,
            transition: isActive ? "height 80ms ease" : "height 400ms ease",
            background: isActive
              ? `linear-gradient(to top, #a78bfa, #f0abfc ${(h / 48) * 100}%)`
              : "rgba(255,255,255,0.15)",
            borderRadius: "99px",
            width: "3px",
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  );
}

export default function VoiceDialogCard({SetMsgText}) {
  const [status, setStatus] = useState("idle"); // idle | listening | done
  const [transcript, setTranscript] = useState("");
  const [interim, setInterim] = useState("");
  const [analyser, setAnalyser] = useState(null);

  const recognitionRef = useRef(null);
  const streamRef = useRef(null);
  const audioCtxRef = useRef(null);
  const pauseTimerRef = useRef(null);

  const stopAll = useCallback(() => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (_) {}
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    setAnalyser(null);
  }, []);

  const handleClose = useCallback(() => {
    setInterim("");
      if(transcript.length>1){
        SetMsgText(transcript)
    }
    stopAll();
    setStatus("idle");
    setTranscript("");
  }, [stopAll]);

  const startListening = useCallback(async () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    setTranscript("");
    setInterim("");
    setStatus("listening");

    // Mic stream for waveform
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;
      const source = ctx.createMediaStreamSource(stream);
      const an = ctx.createAnalyser();
      an.fftSize = 256;
      source.connect(an);
      setAnalyser(an);
    } catch (_) {
      // waveform will use fake animation
    }

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SR();
    recognitionRef.current = rec;
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-US";

    rec.onresult = (e) => {
      let final = "";
      let inter = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) final += t + " ";
        else inter = t;
      }
      if (final) setTranscript(p => p + final);
      setInterim(inter);

      // Pause detection — auto-close after 2s silence
      clearTimeout(pauseTimerRef.current);
      pauseTimerRef.current = setTimeout(() => {
        stopAll();
        setStatus("done");
        setInterim("");
      }, 2000);
    };

    rec.onerror = () => {
      stopAll();
      setStatus("idle");
    };

    rec.start();
  }, [stopAll]);

  // Cleanup on unmount
  useEffect(() => () => { stopAll(); clearTimeout(pauseTimerRef.current); }, [stopAll]);

  const isListening = status === "listening";
  const showCard = status !== "idle";

  useEffect(() => {
    if(status=="done"){
      if(transcript.length>1){
        SetMsgText(transcript)
      }
    }
  }, [status])
  

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >

      {/* Ambient blobs */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0,
      }}>
        <div style={{
          position: "absolute", width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)",
          top: "10%", left: "20%", filter: "blur(40px)",
          animation: "drift1 8s ease-in-out infinite alternate",
        }} />
        <div style={{
          position: "absolute", width: 300, height: 300, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)",
          bottom: "15%", right: "18%", filter: "blur(40px)",
          animation: "drift2 10s ease-in-out infinite alternate",
        }} />
      </div>

      <style>{`
        @keyframes drift1 { from { transform: translate(0,0) scale(1); } to { transform: translate(30px, 20px) scale(1.1); } }
        @keyframes drift2 { from { transform: translate(0,0) scale(1); } to { transform: translate(-20px, 30px) scale(1.08); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes fadeDown { from { opacity: 1; transform: translateY(0) scale(1); } to { opacity: 0; transform: translateY(10px) scale(0.97); } }
        @keyframes pulseRing { 0%,100% { transform: scale(1); opacity: 0.5; } 50% { transform: scale(1.18); opacity: 0.15; } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        .mic-btn { transition: transform 0.15s ease, box-shadow 0.15s ease; }
        .mic-btn:hover { transform: scale(1.06); }
        .mic-btn:active { transform: scale(0.96); }
      `}</style>

      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>

        {/* Voice Card */}
        {showCard && <>
          <div className="z-[100] absolute left-1/2 -translate-x-1/2 bottom-[100%] scale-100">
            <div style={{
            animation: "fadeUp 0.35s cubic-bezier(0.22,1,0.36,1) forwards",
            width: 340,
            borderRadius: 24,
            padding: "20px 22px",
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "0 8px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.09)",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Top shimmer line */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 1,
              background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.6), rgba(240,171,252,0.4), transparent)",
              backgroundSize: "200% auto",
              animation: "shimmer 3s linear infinite",
            }} />

            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: isListening ? "#a78bfa" : "#6b7280",
                  boxShadow: isListening ? "0 0 8px #a78bfa, 0 0 16px #a78bfa60" : "none",
                  transition: "all 0.3s ease",
                  animation: isListening ? "pulseRing 1.4s ease-in-out infinite" : "none",
                }} />
                <span style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: 12, fontWeight: 600, letterSpacing: "0.08em",
                  color: isListening ? "rgba(167,139,250,0.9)" : "rgba(255,255,255,0.4)",
                  textTransform: "uppercase",
                  transition: "color 0.3s ease",
                }}>
                  {isListening ? "Listening" : "Done"}
                </span>
              </div>
              <button
                onClick={handleClose}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  borderRadius: 8,
                  width: 26, height: 26,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", color: "rgba(255,255,255,0.4)",
                  fontSize: 14, lineHeight: 1,
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={e => { e.target.style.background = "rgba(255,255,255,0.12)"; e.target.style.color = "rgba(255,255,255,0.8)"; }}
                onMouseLeave={e => { e.target.style.background = "rgba(255,255,255,0.06)"; e.target.style.color = "rgba(255,255,255,0.4)"; }}
              >✕</button>
            </div>

            {/* Waveform */}
            <div style={{
              display: "flex", justifyContent: "center",
              padding: "4px 0 10px",
            }}>
              <WaveformBars isActive={isListening} analyser={analyser} />
            </div>

            {/* Transcript */}
            <div style={{
              minHeight: 48,
              fontSize: 14.5,
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.88)",
              fontWeight: 300,
              letterSpacing: "0.01em",
            }}>
              {transcript && (
                <span>{transcript}</span>
              )}
              {interim && (
                <span style={{ color: "rgba(167,139,250,0.65)", fontStyle: "italic" }}>{interim}</span>
              )}
              {!transcript && !interim && isListening && (
                <span style={{ color: "rgba(255,255,255,0.25)", fontStyle: "italic" }}>Start speaking…</span>
              )}
            </div>

            {/* Bottom glow */}
            <div style={{
              position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
              width: "60%", height: 1,
              background: isListening
                ? "linear-gradient(90deg, transparent, rgba(167,139,250,0.4), transparent)"
                : "transparent",
              transition: "background 0.5s ease",
            }} />
          </div>
          </div>
          <div className="fixed top-0 left-0 w-full h-full bg-black/40" />
        </>}

        {/* Mic Button */}
        <div className="scale-80" style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {isListening && (
            <>
              <div style={{
                position: "absolute", inset: -16, borderRadius: "50%",
                border: "1.5px solid rgba(167,139,250,0.25)",
                animation: "pulseRing 1.6s ease-in-out infinite",
              }} />
              <div style={{
                position: "absolute", inset: -30, borderRadius: "50%",
                border: "1px solid rgba(167,139,250,0.1)",
                animation: "pulseRing 1.6s ease-in-out 0.4s infinite",
              }} />
            </>
          )}
          <button
            className="mic-btn"
            onClick={isListening ? () => { stopAll(); setStatus("done"); setInterim(""); } : startListening}
            style={{
              width: 64, height: 64, borderRadius: "50%",
              background: isListening
                ? "linear-gradient(135deg, #7c3aed, #a855f7, #ec4899)"
                : "rgba(255,255,255,0.06)",
              border: isListening
                ? "none"
                : "1.5px solid rgba(255,255,255,0.14)",
              boxShadow: isListening
                ? "0 0 0 1px rgba(167,139,250,0.3), 0 8px 32px rgba(139,92,246,0.5)"
                : "0 4px 16px rgba(0,0,0,0.4)",
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
              backdropFilter: "blur(12px)",
            }}
          >
            {isListening ? (
              /* Stop icon */
              <div style={{
                width: 18, height: 18, borderRadius: 4,
                background: "rgba(255,255,255,0.95)",
              }} />
            ) : (
              /* Mic icon */
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="9" y="2" width="6" height="12" rx="3" fill="rgba(255,255,255,0.75)" />
                <path d="M5 10a7 7 0 0014 0" stroke="rgba(255,255,255,0.75)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                <line x1="12" y1="17" x2="12" y2="21" stroke="rgba(255,255,255,0.75)" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="9" y1="21" x2="15" y2="21" stroke="rgba(255,255,255,0.75)" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}