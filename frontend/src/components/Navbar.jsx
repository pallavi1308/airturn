import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/turnarounds", label: "Turnarounds" },
  { to: "/tasks", label: "Task Board" },
  { to: "/incidents", label: "Incidents" },
  { to: "/handovers", label: "Handovers" },
  { to: "/analytics", label: "Analytics" },
];

export default function Navbar() {
  const token = localStorage.getItem("token");
  const location = useLocation();

  let userName = null;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      userName = payload.email?.split("@")[0];
    } catch { /* ignore */ }
  }

  return (
    <nav
      className="backdrop-blur px-8 py-0 flex items-stretch"
      style={{ backgroundColor: "#0A1931", borderBottom: "1px solid #1A3D63" }}
    >
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center text-2xl font-bold mr-8 py-4 flex-shrink-0 transition"
        style={{ color: "#B3CFE5" }}
        onMouseEnter={e => (e.target.style.color = "#F6FAFD")}
        onMouseLeave={e => (e.target.style.color = "#B3CFE5")}
      >
        ✈ AirTurn
      </Link>

      {/* Main nav links */}
      {token && (
        <div className="flex items-stretch gap-1 flex-1">
          {NAV_LINKS.map(({ to, label }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className="flex items-center px-4 text-sm font-medium border-b-2 transition"
                style={{
                  borderBottomColor: active ? "#4A7FA7" : "transparent",
                  color: active ? "#F6FAFD" : "#B3CFE5",
                }}
                onMouseEnter={e => {
                  if (!active) {
                    e.currentTarget.style.color = "#F6FAFD";
                    e.currentTarget.style.borderBottomColor = "#4A7FA7";
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    e.currentTarget.style.color = "#B3CFE5";
                    e.currentTarget.style.borderBottomColor = "transparent";
                  }
                }}
              >
                {label}
              </Link>
            );
          })}
        </div>
      )}

      {/* Auth section */}
      <div className="flex items-center gap-4 ml-auto py-4">
        {!token ? (
          <>
            <Link
              to="/login"
              className="text-sm transition"
              style={{ color: "#B3CFE5" }}
              onMouseEnter={e => (e.target.style.color = "#F6FAFD")}
              onMouseLeave={e => (e.target.style.color = "#B3CFE5")}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-sm px-4 py-2 rounded transition font-semibold"
              style={{ backgroundColor: "#4A7FA7", color: "#F6FAFD" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#1A3D63")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#4A7FA7")}
            >
              Register
            </Link>
          </>
        ) : (
          <>
            {userName && (
              <span className="text-sm" style={{ color: "#B3CFE5" }}>
                👤 <span className="capitalize" style={{ color: "#F6FAFD" }}>{userName}</span>
              </span>
            )}
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
              className="text-sm px-4 py-2 rounded transition"
              style={{ backgroundColor: "#1A3D63", color: "#B3CFE5" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#4A7FA7")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#1A3D63")}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
