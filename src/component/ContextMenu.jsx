import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SunIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const BotIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M12 2a2 2 0 0 1 2 2v7H10V4a2 2 0 0 1 2-2z" />
    <circle cx="9" cy="16" r="1.2" fill="currentColor" stroke="none" /><circle cx="15" cy="16" r="1.2" fill="currentColor" stroke="none" />
    <line x1="12" y1="2" x2="12" y2="4" />
  </svg>
);

const FileIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);

const MENU_WIDTH = 220;
const MENU_ITEM_HEIGHT = 44;
const MENU_PADDING = 8;
const ESTIMATED_HEIGHT = MENU_ITEM_HEIGHT * 3 + 24 + MENU_PADDING * 2 + 1; // 3 items + separator

function ContextMenu({setShowPortfolio, setShowleftside, dark, setDark}) {
  const [menu, setMenu] = useState({ visible: false, x: 0, y: 0 });
  
  const [ripple, setRipple] = useState(null);
  const menuRef = useRef(null);

  const computePosition = useCallback((rawX, rawY) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let x = rawX;
    let y = rawY;
    if (x + MENU_WIDTH + 12 > vw) x = rawX - MENU_WIDTH;
    if (y + ESTIMATED_HEIGHT + 12 > vh) y = rawY - ESTIMATED_HEIGHT;
    x = Math.max(8, x);
    y = Math.max(8, y);
    return { x, y };
  }, []);

  const handleContextMenu = useCallback((e) => {
    e.preventDefault();
    const pos = computePosition(e.clientX, e.clientY);
    setMenu({ visible: true, x: pos.x, y: pos.y });
  }, [computePosition]);

  const close = useCallback(() => setMenu(m => ({ ...m, visible: false })), []);

  function handleEscKey(event) {
  if (event.key === "Escape") {
    close()
  }
}

useEffect(() => {
    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("click", close);
    window.addEventListener("scroll", close);
    window.addEventListener("keydown", handleEscKey);
    return () => {
        window.removeEventListener("contextmenu", handleContextMenu);
        window.removeEventListener("click", close);
        window.removeEventListener("scroll", close);
        window.removeEventListener("keydown", handleEscKey);
    };
  }, [handleContextMenu, close]);

  const triggerRipple = (id) => {
    setRipple(id);
    setTimeout(() => setRipple(null), 400);
  };

  const handleToggleTheme = (e) => {
    e.stopPropagation();
    triggerRipple("theme");
    setDark(d => !d);
    document.documentElement.classList.toggle("dark")
    close();
  };

  const handleChatbot = (e) => {
    e.stopPropagation();
    triggerRipple("bot");
    setShowleftside(prev=>!prev)
    close();
  };

  const handleResume = (e) => {
    e.stopPropagation();
    triggerRipple("resume");
    setShowPortfolio(prev=>!prev)
    close();
  };

  const text = dark ? "#e8e8e8" : "#1a1a1a";
  const sub = dark ? "#6b6b6b" : "#9a9a9a";
  const menuBg = dark ? "rgba(20,20,20,0.92)" : "rgba(255,255,255,0.92)";
  const border = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  const hoverBg = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";
  const accentColor = dark ? "#a78bfa" : "#7c3aed";
  const separatorColor = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";

  const itemVariants = {
    hidden: { opacity: 0, x: -8 },
    visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.045, duration: 0.2, ease: "easeOut" } }),
  };

  const menuItems = [
    {
      id: "theme",
      icon: dark ? <SunIcon /> : <MoonIcon />,
      label: dark ? "Light Mode" : "Dark Mode",
      sub: "Toggle appearance",
      action: handleToggleTheme,
      accent: false,
    },
    {
      id: "bot",
      icon: <BotIcon />,
      label: "Chatbot",
      sub: "Start a conversation",
      action: handleChatbot,
      accent: false,
    },
    {
      id: "resume",
      icon: <FileIcon />,
      label: "View Résumé",
      sub: "Open PDF",
      action: handleResume,
      accent: true,
    },
  ];

  return (
      <AnimatePresence>
        {menu.visible && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.92, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -4 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "fixed",
              top: menu.y,
              left: menu.x,
              width: `${MENU_WIDTH}px`,
              background: menuBg,
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              border: `1px solid ${border}`,
              borderRadius: "14px",
              padding: `${MENU_PADDING}px`,
              zIndex: 9999,
              boxShadow: dark
                ? "0 24px 60px rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)"
                : "0 24px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
              transformOrigin: "top left",
            }}
          >
            {/* Header label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05 }}
              style={{
                padding: "4px 10px 8px",
                fontSize: "10px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: sub,
                fontWeight: 600,
              }}
            >
              Quick Actions
            </motion.div>

            {menuItems.map((item, i) => (
              <motion.button
                key={item.id}
                custom={i}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                onClick={item.action}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  width: "100%",
                  padding: "10px 10px",
                  borderRadius: "8px",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  transition: "background 0.15s ease",
                  position: "relative",
                  overflow: "hidden",
                  marginBottom: i < menuItems.length - 1 ? "1px" : "0",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = hoverBg)}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                {/* Ripple */}
                <AnimatePresence>
                  {ripple === item.id && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0.3 }}
                      animate={{ scale: 4, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "8px",
                        background: item.accent ? accentColor : (dark ? "#fff" : "#000"),
                        pointerEvents: "none",
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Icon */}
                <div style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  background: item.accent
                    ? (dark ? "rgba(167,139,250,0.15)" : "rgba(124,58,237,0.1)")
                    : (dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"),
                  color: item.accent ? accentColor : (dark ? "#c0c0c0" : "#555"),
                  transition: "background 0.15s",
                }}>
                  {item.icon}
                </div>

                {/* Text */}
                <div style={{ textAlign: "left", flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: "13.5px",
                    fontWeight: 500,
                    color: item.accent ? accentColor : text,
                    lineHeight: 1.2,
                    letterSpacing: "-0.01em",
                  }}>
                    {item.label}
                  </div>
                  <div style={{
                    fontSize: "11px",
                    color: sub,
                    marginTop: "1px",
                    fontWeight: 400,
                  }}>
                    {item.sub}
                  </div>
                </div>

                {/* Arrow */}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={sub} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.5 }}>
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </motion.button>
            ))}

            {/* Separator */}
            <div style={{
              height: "1px",
              background: separatorColor,
              margin: "6px 0",
            }} />

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                padding: "4px 10px 2px",
                fontSize: "10px",
                color: sub,
                fontWeight: 400,
                opacity: 0.6,
              }}
            >
              esc to dismiss
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
  );
}

export default ContextMenu;
