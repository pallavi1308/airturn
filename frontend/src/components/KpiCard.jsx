export default function KpiCard({ title, value, color }) {
  return (
    <div
      className="rounded-xl p-6"
      style={{ backgroundColor: "#1A3D63", border: "1px solid #4A7FA7" }}
    >
      <p className="text-sm" style={{ color: "#B3CFE5" }}>{title}</p>
      <h2 className={`text-4xl font-bold mt-3 ${color}`}>{value}</h2>
    </div>
  );
}
