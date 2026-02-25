import { useState, useEffect } from "react";
import { useNotification } from "../tool/Notification";

const WIN_LINES = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6],
];

function checkWinner(board) {
  for (const [a,b,c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c])
      return { winner: board[a], line: [a,b,c] };
  }
  return null;
}

// Minimax — O is maximizer, X is minimizer
function minimax(board, isMaximizing, depth = 0) {
  const result = checkWinner(board);
  if (result?.winner === "O") return 10 - depth;
  if (result?.winner === "X") return depth - 10;
  if (board.every(Boolean)) return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = "O";
        best = Math.max(best, minimax(board, false, depth + 1));
        board[i] = null;
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = "X";
        best = Math.min(best, minimax(board, true, depth + 1));
        board[i] = null;
      }
    }
    return best;
  }
}

function getBestMove(board) {
  let bestVal = -Infinity, bestMove = -1;
  const clone = [...board];
  for (let i = 0; i < 9; i++) {
    if (!clone[i]) {
      clone[i] = "O";
      const val = minimax(clone, false);
      clone[i] = null;
      if (val > bestVal) { bestVal = val; bestMove = i; }
    }
  }
  return bestMove;
}

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [gameOver, setGameOver] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [xTurn, setXTurn] = useState(true);

  const result = checkWinner(board);
  const isDraw = !result && board.every(Boolean);
  const winLine = result?.line || [];
    const {show} = useNotification()
    const [notiShowed,setNotiShowed] = useState(false)
  // AI move
  useEffect(() => {
    if (!xTurn && !result && !isDraw && !gameOver) {
      setThinking(true);
      const timer = setTimeout(() => {
        const move = getBestMove([...board]);
        if (move !== -1) {
          const next = [...board];
          next[move] = "O";
          setBoard(next);
          setXTurn(true);
        }
        setThinking(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [xTurn]);

  useEffect(() => {
    if(!notiShowed){
        if(isDraw){
            show({type: "info", title: "Draw!", message: "Huh! Close call, wanna rematch?"})
            setNotiShowed(true)
        }
        if(result!=null && result.winner=="O"){
            show({type: "success", title: "Winnnn!", message: "You won! congrats."})
            setNotiShowed(true)
        }else if(result!=null && result.winner=="X"){
            show({type: "error", title: "Got You >", message: "Wanna rematch?"})
            setNotiShowed(true)
        }
    }
    if (result || isDraw) {
        setGameOver(true);
    }
  }, [result, isDraw]);

  function play(i) {
    if (board[i] || !xTurn || gameOver || thinking) return;
    const next = [...board];
    next[i] = "X";
    setBoard(next);
    setXTurn(false);
  }

  function reset() {
    setBoard(Array(9).fill(null));
    setXTurn(true);
    setGameOver(false);
    setThinking(false);
    setNotiShowed(false)
  }

  return (
    <div className="z-[250] flex items-center justify-center transition-colors duration-300 scale-80" style={{
            transform: "rotateX(20deg) rotateY(30deg) rotateZ(-15deg)",
            transformStyle: "preserve-3d",
            position: "relative", 
            filter: "drop-shadow(4px 4px 0px #61616188)"
          }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Mono:wght@400;500&display=swap');
        .serif { font-family: 'DM Serif Display', serif; }
        .mono  { font-family: 'DM Mono', monospace; }
        @keyframes pop {
          0%   { transform: scale(0.5); opacity: 0; }
          65%  { transform: scale(1.12); }
          100% { transform: scale(1); opacity: 1; }
        }
        .pop { animation: pop 0.22s ease forwards; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .blink { animation: blink 1s ease infinite; }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(8px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .fade-up { animation: fadeUp 0.4s ease forwards; }
      `}</style>

      <div className="flex flex-col items-center gap-7 fade-up">
        {/* Board */}
        <div className="grid grid-cols-3 gap-2">
          {board.map((val, i) => {
            const isWin = winLine.includes(i);
            const canPlay = !val && xTurn && !gameOver && !thinking;
            return (
              <button
                key={i}
                onClick={() => play(i)}
                className={[
                  "w-[82px] h-[82px] rounded-2xl border flex items-center justify-center",
                  "transition-all duration-200 select-none cursor-none target-hand",
                  isWin
                    ? "bg-stone-800 dark:bg-stone-100 border-stone-800 dark:border-stone-100"
                    : "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800",
                  canPlay
                    && "hover:bg-stone-50 dark:hover:bg-stone-800 hover:scale-[1.03]",
                ].join(" ")}
              >
                {val && (
                  <span
                    key={`${val}-${i}`}
                    className={[
                      "pop serif text-3xl leading-none",
                      isWin
                        ? "text-stone-100 dark:text-stone-900"
                        : val === "X"
                          ? "text-stone-800 dark:text-stone-100"
                          : "text-stone-400 dark:text-stone-500",
                    ].join(" ")}
                  >
                    {val}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Reset */}
        {(gameOver || isDraw) && <div  className="w-full h-full absolute flex items-center justify-center bg-white/10 dark:bg-black/10 backdrop-blur-sm">
            <button
          onClick={reset}
          className="mono text-[11px] cursor-none target-hand tracking-widest uppercase text-stone-400 dark:text-stone-600
            hover:text-stone-700 dark:hover:text-stone-300 transition-colors duration-200
            border-1 px-5 py-2 rounded-sm dark:border-white/50 hover:border-stone-400 dark:hover:border-stone-500 "
        >
          new game
        </button>
        </div>}

      </div>
    </div>
  );
}