import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const P = {
  deep:   "#0A1931",
  card:   "#1A3D63",
  accent: "#4A7FA7",
  muted:  "#B3CFE5",
  text:   "#F6FAFD",
};

const STATS = [
  { value: "340+", label: "Flights Managed Daily" },
  { value: "99.2%", label: "On-Time Turnaround Rate" },
  { value: "42min", label: "Average Turnaround Time" },
  { value: "18", label: "Gates Coordinated" },
];

const FEATURES = [
  {
    icon: "✈",
    title: "Live Turnarounds",
    desc: "Track every aircraft from arrival to pushback in real time across all gates.",
  },
  {
    icon: "📋",
    title: "Task Board",
    desc: "Drag-and-drop Kanban for ground crew tasks — fueling, cleaning, catering and more.",
  },
  {
    icon: "🚨",
    title: "Incident Center",
    desc: "Report and resolve operational incidents with severity tracking and supervisor sign-off.",
  },
  {
    icon: "🔄",
    title: "Shift Handovers",
    desc: "Structured shift notes with supervisor acknowledgement so nothing falls through the cracks.",
  },
  {
    icon: "📊",
    title: "Analytics",
    desc: "Performance dashboards for turnaround times, delay causes, and team completion rates.",
  },
  {
    icon: "🔐",
    title: "Role-Based Access",
    desc: "JWT auth ensures crew, supervisors, and viewers each see and do exactly what they need.",
  },
];

function AnimatedCounter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const numeric = parseFloat(target.replace(/[^0-9.]/g, ""));
  const isFloat = target.includes(".");

  useEffect(() => {
    let start = 0;
    const duration = 1800;
    const step = numeric / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= numeric) {
        setCount(numeric);
        clearInterval(timer);
      } else {
        setCount(isFloat ? parseFloat(start.toFixed(1)) : Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, []);

  const prefix = target.match(/^[^0-9]*/)?.[0] || "";
  const postfix = target.match(/[^0-9.]+$/)?.[0] || "";
  return <>{prefix}{isFloat ? count.toFixed(1) : count}{postfix}</>;
}

export default function Home() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: P.deep, color: P.text, fontFamily: "'Georgia', serif" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ position: "relative", overflow: "hidden", padding: "100px 2rem 80px", textAlign: "center" }}>
        {/* Radial glow */}
        <div style={{
          position: "absolute", top: "-80px", left: "50%", transform: "translateX(-50%)",
          width: "700px", height: "500px", borderRadius: "50%",
          background: `radial-gradient(ellipse, rgba(74,127,167,0.18) 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />

        {/* Grid lines decoration */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.04,
          backgroundImage: `linear-gradient(${P.muted} 1px, transparent 1px), linear-gradient(90deg, ${P.muted} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }} />

        <div style={{
          position: "relative", maxWidth: "820px", margin: "0 auto",
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}>
          <div style={{
            display: "inline-block", fontSize: "12px", fontFamily: "monospace",
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: P.accent, border: `1px solid ${P.accent}`,
            padding: "6px 16px", borderRadius: "999px", marginBottom: "32px",
          }}>
            Airport Operations Platform
          </div>

          <h1 style={{
            fontFamily: "'Georgia', 'Times New Roman', serif",
            fontSize: "clamp(2.8rem, 6vw, 4.8rem)",
            fontWeight: "700", lineHeight: "1.1",
            color: P.text, margin: "0 0 24px",
            letterSpacing: "-0.02em",
          }}>
            Every second on the{" "}
            <span style={{ color: P.accent, fontStyle: "italic" }}>ground</span>
            <br />counts.
          </h1>

          <p style={{
            fontSize: "1.15rem", lineHeight: "1.7",
            color: P.muted, maxWidth: "560px", margin: "0 auto 48px",
            fontFamily: "Arial, sans-serif", fontWeight: "400",
          }}>
            AirTurn gives ground crews and supervisors a single view of every
            turnaround — tasks, incidents, handovers, and analytics — all in real time.
          </p>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/register" style={{
              display: "inline-block", padding: "14px 36px",
              backgroundColor: P.accent, color: P.text,
              borderRadius: "6px", fontFamily: "Arial, sans-serif",
              fontWeight: "600", fontSize: "0.95rem",
              textDecoration: "none", letterSpacing: "0.02em",
              transition: "background 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#3a6a8f")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = P.accent)}
            >
              Get Started
            </Link>
            <Link to="/login" style={{
              display: "inline-block", padding: "14px 36px",
              backgroundColor: "transparent", color: P.muted,
              border: `1px solid ${P.accent}`, borderRadius: "6px",
              fontFamily: "Arial, sans-serif", fontWeight: "600",
              fontSize: "0.95rem", textDecoration: "none",
              transition: "color 0.2s, border-color 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.color = P.text; e.currentTarget.style.borderColor = P.text; }}
              onMouseLeave={e => { e.currentTarget.style.color = P.muted; e.currentTarget.style.borderColor = P.accent; }}
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{
        borderTop: `1px solid rgba(74,127,167,0.3)`,
        borderBottom: `1px solid rgba(74,127,167,0.3)`,
        backgroundColor: "rgba(26,61,99,0.35)",
        padding: "40px 2rem",
      }}>
        <div style={{
          maxWidth: "900px", margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "32px", textAlign: "center",
        }}>
          {STATS.map((s) => (
            <div key={s.label}>
              <div style={{
                fontFamily: "'Georgia', serif", fontSize: "2.4rem",
                fontWeight: "700", color: P.text, lineHeight: "1",
              }}>
                <AnimatedCounter target={s.value} />
              </div>
              <div style={{
                marginTop: "8px", fontSize: "0.8rem", color: P.muted,
                fontFamily: "Arial, sans-serif", letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: "80px 2rem", maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <h2 style={{
            fontFamily: "'Georgia', serif", fontSize: "2.2rem",
            fontWeight: "700", color: P.text, margin: "0 0 12px",
          }}>
            Built for the ramp.
          </h2>
          <p style={{ color: P.muted, fontFamily: "Arial, sans-serif", fontSize: "1rem" }}>
            Every tool your team needs, nothing they don't.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}>
          {FEATURES.map((f, i) => (
            <div key={i} style={{
              backgroundColor: "rgba(26,61,99,0.5)",
              border: `1px solid rgba(74,127,167,0.35)`,
              borderRadius: "10px", padding: "28px 24px",
              transition: "border-color 0.2s, background 0.2s",
              cursor: "default",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = P.accent;
                e.currentTarget.style.backgroundColor = "rgba(26,61,99,0.8)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(74,127,167,0.35)";
                e.currentTarget.style.backgroundColor = "rgba(26,61,99,0.5)";
              }}
            >
              <div style={{ fontSize: "1.8rem", marginBottom: "14px" }}>{f.icon}</div>
              <h3 style={{
                fontFamily: "'Georgia', serif", fontSize: "1.1rem",
                fontWeight: "700", color: P.text, margin: "0 0 10px",
              }}>
                {f.title}
              </h3>
              <p style={{
                color: P.muted, fontFamily: "Arial, sans-serif",
                fontSize: "0.9rem", lineHeight: "1.6", margin: 0,
              }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        textAlign: "center", padding: "60px 2rem 80px",
        borderTop: `1px solid rgba(74,127,167,0.2)`,
      }}>
        <h2 style={{
          fontFamily: "'Georgia', serif", fontSize: "2rem",
          fontWeight: "700", color: P.text, margin: "0 0 16px",
        }}>
          Ready to streamline your ops?
        </h2>
        <p style={{ color: P.muted, fontFamily: "Arial, sans-serif", marginBottom: "36px" }}>
          Join your team on AirTurn today.
        </p>
        <Link to="/register" style={{
          display: "inline-block", padding: "15px 44px",
          backgroundColor: P.accent, color: P.text,
          borderRadius: "6px", fontFamily: "Arial, sans-serif",
          fontWeight: "600", fontSize: "1rem",
          textDecoration: "none",
          transition: "background 0.2s",
        }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#3a6a8f")}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = P.accent)}
        >
          Create Your Account →
        </Link>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: `1px solid rgba(74,127,167,0.2)`,
        padding: "24px 2rem", textAlign: "center",
        color: P.accent, fontFamily: "Arial, sans-serif",
        fontSize: "0.85rem",
      }}>
        ✈ AirTurn — Airport Turnaround Coordination Platform
      </footer>
    </div>
  );
}