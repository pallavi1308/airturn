import { useState } from "react";
import PageContainer from "../components/PageContainer";

const P = { deep: "#0A1931", card: "#1A3D63", accent: "#4A7FA7", muted: "#B3CFE5", text: "#F6FAFD" };

const SEVERITY_STYLES = {
  CRITICAL: { background: "rgba(239,68,68,0.2)",   color: "#f87171", border: "1px solid rgba(239,68,68,0.4)" },
  HIGH:     { background: "rgba(249,115,22,0.2)",  color: "#fb923c", border: "1px solid rgba(249,115,22,0.4)" },
  MEDIUM:   { background: "rgba(234,179,8,0.2)",   color: "#fbbf24", border: "1px solid rgba(234,179,8,0.4)" },
  LOW:      { background: "rgba(179,207,229,0.1)", color: P.muted,   border: "1px solid rgba(179,207,229,0.3)" },
};

const STATUS_STYLES = {
  OPEN:          { background: "rgba(239,68,68,0.2)",  color: "#f87171" },
  INVESTIGATING: { background: "rgba(234,179,8,0.2)",  color: "#fbbf24" },
  RESOLVED:      { background: "rgba(34,197,94,0.2)",  color: "#4ade80" },
  CLOSED:        { background: "rgba(179,207,229,0.1)", color: P.muted },
};

const MOCK_INCIDENTS = [
  { id: "INC-001", title: "Ground Support Equipment Failure", description: "Tow tractor #7 broke down at Gate A12 during pushback of EK202. Backup requested from ramp.", flight: "EK202", gate: "A12", severity: "CRITICAL", status: "INVESTIGATING", reporter: "Ahmed Al-Rashid", created_at: "2026-05-05 13:42", updated_at: "2026-05-05 13:55", category: "Equipment" },
  { id: "INC-002", title: "Passenger Medical Emergency", description: "Passenger reported chest pains during deboarding. Medical team dispatched to Gate B7.", flight: "QR145", gate: "B7", severity: "HIGH", status: "RESOLVED", reporter: "Sarah Mitchell", created_at: "2026-05-05 12:15", updated_at: "2026-05-05 12:48", category: "Medical" },
  { id: "INC-003", title: "Fuel Spill — Ramp Area", description: "Minor fuel spill detected near Gate C3 during fueling ops. Hazmat containment deployed.", flight: "BA331", gate: "C3", severity: "HIGH", status: "OPEN", reporter: "James O'Brien", created_at: "2026-05-05 14:03", updated_at: "2026-05-05 14:03", category: "Safety" },
  { id: "INC-004", title: "Catering Cart Collision", description: "Catering cart collided with airbridge at Gate D9 causing minor structural damage. No injuries.", flight: "LH778", gate: "D9", severity: "MEDIUM", status: "CLOSED", reporter: "Maria Schmidt", created_at: "2026-05-05 11:30", updated_at: "2026-05-05 12:10", category: "Equipment" },
  { id: "INC-005", title: "Unattended Baggage Alert", description: "Unattended bag reported in baggage claim area. Security notified, area cordoned off.", flight: "N/A", gate: "Baggage Claim", severity: "HIGH", status: "INVESTIGATING", reporter: "Aisha Patel", created_at: "2026-05-05 14:20", updated_at: "2026-05-05 14:25", category: "Security" },
  { id: "INC-006", title: "Bird Strike on Landing", description: "Confirmed bird strike on approach. Aircraft undergoing mandatory inspection before next departure.", flight: "EK203", gate: "A14", severity: "CRITICAL", status: "OPEN", reporter: "Tower Control", created_at: "2026-05-05 14:35", updated_at: "2026-05-05 14:35", category: "Safety" },
];

const CATEGORIES = ["All", "Equipment", "Medical", "Safety", "Security"];
const STATUSES   = ["All", "OPEN", "INVESTIGATING", "RESOLVED", "CLOSED"];
const SEVERITIES = ["All", "CRITICAL", "HIGH", "MEDIUM", "LOW"];

const selectStyle = { backgroundColor: P.deep, border: `1px solid ${P.accent}`, color: P.text };
const inputStyle  = { backgroundColor: P.deep, border: `1px solid ${P.accent}`, color: P.text };

export default function Incidents() {
  const [incidents, setIncidents] = useState(MOCK_INCIDENTS);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterSeverity, setFilterSeverity] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [selected, setSelected] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [newIncident, setNewIncident] = useState({ title: "", description: "", flight: "", gate: "", severity: "MEDIUM", category: "Equipment" });

  const filtered = incidents.filter((i) => {
    return (filterStatus === "All" || i.status === filterStatus)
      && (filterSeverity === "All" || i.severity === filterSeverity)
      && (filterCategory === "All" || i.category === filterCategory);
  });

  const openCount = incidents.filter((i) => i.status === "OPEN").length;
  const criticalCount = incidents.filter((i) => i.severity === "CRITICAL" && i.status !== "CLOSED").length;
  const investigatingCount = incidents.filter((i) => i.status === "INVESTIGATING").length;
  const resolvedToday = incidents.filter((i) => i.status === "RESOLVED").length;

  const handleCreate = () => {
    if (!newIncident.title || !newIncident.description) return;
    const now = new Date().toISOString().slice(0, 16).replace("T", " ");
    const inc = { ...newIncident, id: `INC-00${incidents.length + 1}`, status: "OPEN", reporter: "You", created_at: now, updated_at: now };
    setIncidents([inc, ...incidents]);
    setShowCreate(false);
    setNewIncident({ title: "", description: "", flight: "", gate: "", severity: "MEDIUM", category: "Equipment" });
  };

  const updateStatus = (id, status) => {
    setIncidents((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
    if (selected?.id === id) setSelected((s) => ({ ...s, status }));
  };

  const KpiBox = ({ label, value, valueColor, borderColor }) => (
    <div className="rounded-xl p-5" style={{ backgroundColor: P.card, borderLeft: `4px solid ${borderColor}`, border: `1px solid ${P.accent}`, borderLeftWidth: "4px" }}>
      <p className="text-xs uppercase tracking-wider" style={{ color: P.muted }}>{label}</p>
      <p className="text-4xl font-bold mt-1" style={{ color: valueColor }}>{value}</p>
    </div>
  );

  return (
    <PageContainer>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-5xl font-bold" style={{ color: P.text }}>Incident Center</h1>
          <p className="mt-2" style={{ color: P.muted }}>Real-time airport incident tracking and response</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="px-5 py-3 rounded transition font-semibold"
          style={{ backgroundColor: "#dc2626", color: P.text }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#b91c1c")}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#dc2626")}
        >
          + Report Incident
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <KpiBox label="Open"            value={openCount}          valueColor="#f87171" borderColor="#dc2626" />
        <KpiBox label="Critical Active" value={criticalCount}      valueColor="#fb923c" borderColor="#ea580c" />
        <KpiBox label="Investigating"   value={investigatingCount} valueColor="#fbbf24" borderColor="#d97706" />
        <KpiBox label="Resolved Today"  value={resolvedToday}      valueColor="#4ade80" borderColor="#16a34a" />
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        {[["Status", STATUSES, filterStatus, setFilterStatus], ["Severity", SEVERITIES, filterSeverity, setFilterSeverity], ["Category", CATEGORIES, filterCategory, setFilterCategory]].map(([label, options, val, setter]) => (
          <select key={label} value={val} onChange={(e) => setter(e.target.value)} className="p-2 rounded text-sm outline-none" style={selectStyle}>
            {options.map((s) => <option key={s}>{s}</option>)}
          </select>
        ))}
        <span className="text-sm self-center" style={{ color: P.muted }}>{filtered.length} incident{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      <div className="flex gap-6">
        <div className="flex-1 space-y-3">
          {filtered.map((incident) => (
            <div key={incident.id} onClick={() => setSelected(incident)} className="rounded-xl p-5 cursor-pointer transition"
              style={{ backgroundColor: P.card, border: `1px solid ${selected?.id === incident.id ? P.accent : "rgba(74,127,167,0.4)"}` }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = P.accent)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = selected?.id === incident.id ? P.accent : "rgba(74,127,167,0.4)")}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono" style={{ color: P.muted }}>{incident.id}</span>
                    <span className="text-xs px-2 py-0.5 rounded font-semibold" style={SEVERITY_STYLES[incident.severity]}>{incident.severity}</span>
                    <span className="text-xs px-2 py-0.5 rounded" style={STATUS_STYLES[incident.status]}>{incident.status}</span>
                    <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: "rgba(74,127,167,0.2)", color: P.muted }}>{incident.category}</span>
                  </div>
                  <h3 className="font-semibold" style={{ color: P.text }}>{incident.title}</h3>
                  <p className="text-sm mt-1 line-clamp-1" style={{ color: P.muted }}>{incident.description}</p>
                </div>
              </div>
              <div className="flex gap-4 mt-3 text-xs" style={{ color: P.muted }}>
                <span>✈ {incident.flight}</span>
                <span>🚪 {incident.gate}</span>
                <span>👤 {incident.reporter}</span>
                <span className="ml-auto">{incident.created_at}</span>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-16" style={{ color: P.muted }}>No incidents match your filters.</div>
          )}
        </div>

        {selected && (
          <div className="w-96 rounded-xl p-6 self-start sticky top-6" style={{ backgroundColor: P.card, border: `1px solid ${P.accent}` }}>
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-mono" style={{ color: P.muted }}>{selected.id}</span>
              <button onClick={() => setSelected(null)} style={{ color: P.muted }}>✕</button>
            </div>
            <h2 className="text-xl font-bold mb-3" style={{ color: P.text }}>{selected.title}</h2>
            <div className="flex gap-2 mb-4">
              <span className="text-xs px-2 py-1 rounded font-semibold" style={SEVERITY_STYLES[selected.severity]}>{selected.severity}</span>
              <span className="text-xs px-2 py-1 rounded" style={STATUS_STYLES[selected.status]}>{selected.status}</span>
            </div>
            <p className="text-sm mb-6" style={{ color: P.muted }}>{selected.description}</p>
            <div className="space-y-2 text-sm mb-6">
              {[["Flight", selected.flight], ["Gate", selected.gate], ["Category", selected.category], ["Reporter", selected.reporter], ["Reported", selected.created_at]].map(([label, val]) => (
                <div key={label} className="flex justify-between">
                  <span style={{ color: P.muted }}>{label}</span>
                  <span style={{ color: P.text }}>{val}</span>
                </div>
              ))}
            </div>
            <div className="pt-4" style={{ borderTop: `1px solid ${P.accent}` }}>
              <p className="text-xs uppercase tracking-wider mb-2" style={{ color: P.muted }}>Update Status</p>
              <div className="grid grid-cols-2 gap-2">
                {["OPEN", "INVESTIGATING", "RESOLVED", "CLOSED"].map((s) => (
                  <button key={s} onClick={() => updateStatus(selected.id, s)}
                    className="text-xs py-2 rounded transition font-semibold"
                    style={{ backgroundColor: selected.status === s ? P.accent : P.deep, color: selected.status === s ? P.text : P.muted }}
                    onMouseEnter={e => { if (selected.status !== s) e.currentTarget.style.backgroundColor = "rgba(74,127,167,0.3)"; }}
                    onMouseLeave={e => { if (selected.status !== s) e.currentTarget.style.backgroundColor = P.deep; }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {showCreate && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="rounded-xl p-8 w-full max-w-lg" style={{ backgroundColor: P.card, border: `1px solid ${P.accent}` }}>
            <h2 className="text-2xl font-bold mb-6" style={{ color: P.text }}>Report Incident</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm" style={{ color: P.muted }}>Title *</label>
                <input value={newIncident.title} onChange={(e) => setNewIncident({ ...newIncident, title: e.target.value })}
                  className="w-full mt-1 p-3 rounded outline-none" style={inputStyle} placeholder="Brief incident title" />
              </div>
              <div>
                <label className="text-sm" style={{ color: P.muted }}>Description *</label>
                <textarea value={newIncident.description} onChange={(e) => setNewIncident({ ...newIncident, description: e.target.value })}
                  rows={3} className="w-full mt-1 p-3 rounded outline-none resize-none" style={inputStyle} placeholder="Describe what happened..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm" style={{ color: P.muted }}>Flight</label>
                  <input value={newIncident.flight} onChange={(e) => setNewIncident({ ...newIncident, flight: e.target.value })}
                    className="w-full mt-1 p-3 rounded outline-none" style={inputStyle} placeholder="e.g. EK202" />
                </div>
                <div>
                  <label className="text-sm" style={{ color: P.muted }}>Gate</label>
                  <input value={newIncident.gate} onChange={(e) => setNewIncident({ ...newIncident, gate: e.target.value })}
                    className="w-full mt-1 p-3 rounded outline-none" style={inputStyle} placeholder="e.g. A12" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm" style={{ color: P.muted }}>Severity</label>
                  <select value={newIncident.severity} onChange={(e) => setNewIncident({ ...newIncident, severity: e.target.value })}
                    className="w-full mt-1 p-3 rounded outline-none" style={selectStyle}>
                    {["CRITICAL","HIGH","MEDIUM","LOW"].map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm" style={{ color: P.muted }}>Category</label>
                  <select value={newIncident.category} onChange={(e) => setNewIncident({ ...newIncident, category: e.target.value })}
                    className="w-full mt-1 p-3 rounded outline-none" style={selectStyle}>
                    {["Equipment","Medical","Safety","Security"].map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleCreate} className="flex-1 py-3 rounded font-semibold transition"
                style={{ backgroundColor: "#dc2626", color: P.text }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#b91c1c")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#dc2626")}
              >Submit Report</button>
              <button onClick={() => setShowCreate(false)} className="flex-1 py-3 rounded font-semibold transition"
                style={{ backgroundColor: P.deep, color: P.muted }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(74,127,167,0.2)")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = P.deep)}
              >Cancel</button>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
