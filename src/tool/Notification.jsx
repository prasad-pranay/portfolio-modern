import React from "react";

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icons = {
  success: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  close: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
};

const THEMES = {
  success: { color: "#6ee7b7", bg: "rgba(110,231,183,0.06)", border: "rgba(110,231,183,0.15)" },
  error:   { color: "#f87171", bg: "rgba(248,113,113,0.06)", border: "rgba(248,113,113,0.15)" },
  warning: { color: "#c9a96e", bg: "rgba(201,169,110,0.06)", border: "rgba(201,169,110,0.15)" },
  info:    { color: "#7eb8c9", bg: "rgba(126,184,201,0.06)", border: "rgba(126,184,201,0.15)" },
};

// ─── Context ──────────────────────────────────────────────────────────────────
export const NotificationContext = React.createContext(null);

// ─── Single Notification Item (class component) ───────────────────────────────
class NotificationItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 100,
      visible: false,
      leaving: false,
    };
    this.interval = null;
    this.startTime = null;
  }

  componentDidMount() {
    // Trigger entrance
    requestAnimationFrame(() => {
      requestAnimationFrame(() => this.setState({ visible: true }));
    });

    const { duration = 4000 } = this.props;
    this.startTime = Date.now();

    this.interval = setInterval(() => {
      const elapsed = Date.now() - this.startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      this.setState({ progress: remaining });
      if (remaining === 0) {
        this.dismiss();
      }
    }, 30);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  dismiss = () => {
    clearInterval(this.interval);
    this.setState({ leaving: true });
    setTimeout(() => {
      this.props.onDismiss(this.props.id);
    }, 400);
  };

  render() {
    const { title, message, type = "info" } = this.props;
    const { progress, visible, leaving } = this.state;
    const theme = THEMES[type] || THEMES.info;

    const translateY = visible && !leaving ? "0px" : "-110%";
    const opacity = visible && !leaving ? 1 : 0;

    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          background: "#111",
          border: `1px solid ${theme.border}`,
          overflow: "hidden",
          transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease",
          transform: `translateY(${translateY})`,
          opacity,
          fontFamily: "'Georgia', 'Times New Roman', serif",
          boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)`,
        }}
      >
        {/* Progress bar — top */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "rgba(255,255,255,0.05)" }}>
          <div
            style={{
              height: "100%",
              background: theme.color,
              width: `${progress}%`,
              transition: "width 0.03s linear",
              boxShadow: `0 0 6px ${theme.color}80`,
            }}
          />
        </div>

        {/* Content */}
        <div style={{ padding: "16px 16px 14px", display: "flex", gap: "12px", alignItems: "flex-start" }}>
          {/* Icon */}
          <div
            style={{
              flexShrink: 0,
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: theme.bg,
              border: `1px solid ${theme.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: theme.color,
              marginTop: "1px",
            }}
          >
            {Icons[type]}
          </div>

          {/* Text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
              fontSize: "13px",
              color: "#f0ece4",
              fontWeight: "normal",
              lineHeight: 1.3,
              marginBottom: message ? "4px" : 0,
            }}>
              {title}
            </p>
            {message && (
              <p style={{
                fontSize: "11px",
                color: "#666",
                lineHeight: 1.6,
                fontFamily: "monospace",
                letterSpacing: "0.01em",
              }}>
                {message}
              </p>
            )}
          </div>

          {/* Close button */}
          <button
            onClick={this.dismiss}
            style={{
              flexShrink: 0,
              color: "#444",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "2px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#aaa")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#444")}
          >
            {Icons.close}
          </button>
        </div>

        {/* Type label bottom-right */}
        <div style={{
          position: "absolute",
          bottom: "6px",
          right: "12px",
          fontSize: "8px",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: theme.color,
          opacity: 0.5,
          fontFamily: "monospace",
        }}>
          {type}
        </div>
      </div>
    );
  }
}

// ─── Notification Provider (class component) ──────────────────────────────────
class NotificationProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { notifications: [] };
    this.counter = 0;
  }

  show = ({ title, message, type = "info", duration = 4000 }) => {
    const id = ++this.counter;
    this.setState((prev) => ({
      notifications: [...prev.notifications, { id, title, message, type, duration }],
    }));
    return id;
  };

  dismiss = (id) => {
    this.setState((prev) => ({
      notifications: prev.notifications.filter((n) => n.id !== id),
    }));
  };

  render() {
    const { notifications } = this.state;

    return (
      <NotificationContext.Provider value={{ show: this.show }}>
        {this.props.children}

        {/* Portal-style fixed container */}
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "320px",
            maxWidth: "calc(100vw - 40px)",
          }}
        >
          {notifications.map((n) => (
            <NotificationItem
              key={n.id}
              {...n}
              onDismiss={this.dismiss}
            />
          ))}
        </div>
      </NotificationContext.Provider>
    );
  }
}

// ─── Hook for easy access ─────────────────────────────────────────────────────
export function useNotification() {
  const ctx = React.useContext(NotificationContext);
  if (!ctx) throw new Error("useNotification must be used within NotificationProvider");
  return ctx;
}






// { type: "success", title: "Changes saved", message: "Your project was saved successfully." },
//           { type: "error",   title: "Upload failed", message: "The file exceeded the 5MB size limit." },
//           { type: "warning", title: "Session expiring", message: "You'll be logged out in 5 minutes." },
//           { type: "info",    title: "New update available", message: "Version 2.1.0 is ready to install." }




// const { show } = useNotification();

// show({
//   type: "success",
//   title: "Done!",
//   message: "Optional detail here.",
//   duration: 4000,
// });