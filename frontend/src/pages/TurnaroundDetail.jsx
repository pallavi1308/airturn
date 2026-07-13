import PageContainer from "../components/PageContainer";
import StatusBadge from "../components/StatusBadge";

const P = { deep: "#0A1931", card: "#1A3D63", accent: "#4A7FA7", muted: "#B3CFE5", text: "#F6FAFD" };
const card = { backgroundColor: P.card, border: `1px solid ${P.accent}` };

const tasks = [
  { title: "Cabin Cleaning", status: "COMPLETED" },
  { title: "Fueling",        status: "IN_PROGRESS" },
  { title: "Catering",       status: "PENDING" },
  { title: "Boarding Prep",  status: "BLOCKED" },
];

const STEPS = ["ARRIVED","DEBOARDING","CLEANING","FUELING","BOARDING","READY","PUSHBACK"];

export default function TurnaroundDetail() {
  return (
    <PageContainer>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-5xl font-bold" style={{ color: P.text }}>EK202</h1>
          <p className="mt-2" style={{ color: P.muted }}>Emirates • Gate A12</p>
        </div>
        <StatusBadge status="CLEANING" />
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-10">
        {[["Aircraft","A6-EON"],["Arrival","13:40"],["Departure","14:20"],["Progress","45%"]].map(([label, val]) => (
          <div key={label} className="rounded-xl p-5" style={card}>
            <p className="text-sm" style={{ color: P.muted }}>{label}</p>
            <h2 className="text-2xl font-bold mt-2" style={{ color: P.text }}>{val}</h2>
          </div>
        ))}
      </div>

      <div className="rounded-xl p-6 mb-10" style={card}>
        <h2 className="text-2xl font-bold mb-6" style={{ color: P.text }}>Gate Readiness Timeline</h2>
        <div className="flex flex-wrap gap-4">
          {STEPS.map((step) => (
            <div key={step} className="px-4 py-3 rounded-lg text-sm font-semibold"
              style={{ backgroundColor: "rgba(74,127,167,0.2)", color: P.muted }}>
              {step}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl p-6" style={card}>
        <h2 className="text-2xl font-bold mb-6" style={{ color: P.text }}>Operational Tasks</h2>
        <div className="space-y-4">
          {tasks.map((task, i) => (
            <div key={i} className="flex justify-between items-center rounded-lg p-4"
              style={{ backgroundColor: P.deep }}>
              <h3 className="font-semibold" style={{ color: P.text }}>{task.title}</h3>
              <StatusBadge status={task.status} />
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
