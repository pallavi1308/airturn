import Navbar from "./Navbar";

export default function PageContainer({ children }) {
  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: "#0A1931" }}>
      <Navbar />
      <div className="p-8">{children}</div>
    </div>
  );
}
