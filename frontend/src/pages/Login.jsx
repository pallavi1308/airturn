import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageContainer from "../components/PageContainer";
import api from "../services/api";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <div className="flex justify-center py-16">
        <form
          onSubmit={handleLogin}
          className="p-8 rounded-xl w-full max-w-md"
          style={{ backgroundColor: "#1A3D63", border: "1px solid #4A7FA7" }}
        >
          <h1 className="text-3xl font-bold mb-6 text-center" style={{ color: "#F6FAFD" }}>
            Login
          </h1>

          <div className="mb-4">
            <label className="text-sm" style={{ color: "#B3CFE5" }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 p-3 rounded outline-none"
              style={{ backgroundColor: "#0A1931", border: "1px solid #4A7FA7", color: "#F6FAFD" }}
              required
            />
          </div>

          <div className="mb-6">
            <label className="text-sm" style={{ color: "#B3CFE5" }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 p-3 rounded outline-none"
              style={{ backgroundColor: "#0A1931", border: "1px solid #4A7FA7", color: "#F6FAFD" }}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded font-semibold transition"
            style={{ backgroundColor: "#4A7FA7", color: "#F6FAFD" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#1A3D63")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#4A7FA7")}
          >
            {loading ? "Signing In..." : "Login"}
          </button>

          <p className="text-center mt-6" style={{ color: "#B3CFE5" }}>
            No account?{" "}
            <Link to="/register" style={{ color: "#4A7FA7" }}>Register</Link>
          </p>
        </form>
      </div>
    </PageContainer>
  );
}
