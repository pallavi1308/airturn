import { useState } from "react";
import PageContainer from "../components/PageContainer";

const P = { deep: "#0A1931", card: "#1A3D63", accent: "#4A7FA7", muted: "#B3CFE5", text: "#F6FAFD" };

const STATUS_STYLES = {
  PENDING:      { background: "rgba(234,179,8,0.2)",   color: "#fbbf24", border: "1px solid rgba(234,179,8,0.3)" },
  ACKNOWLEDGED: { background: "rgba(34,197,94,0.2)",   color: "#4ade80", border: "1px solid rgba(34,197,94,0.3)" },
  REJECTED:     { background: "rgba(239,68,68,0.2)",   color: "#f87171", border: "1px solid rgba(239,68,68,0.3)" },
};

const MOCK_HANDOVERS = [
  { id: 1, created_by: "Ahmed Al-Rashid", shift: "Morning (06:00 - 14:00)", notes: "EK202 delayed by 20 mins due to late crew. Fueling completed for all gates. Gate A14 equipment serviced. Catering for QR145 completed ahead of schedule. No major incidents during shift.", supervisor_comment: "Good handover. Make sure Gate A12 tow tractor is inspected before next shift.", status: "ACKNOWLEDGED", created_at: "2026-05-05 14:02", flights_handled: ["EK202","QR145","LH778"], open_issues: 1 },
  { id: 2, created_by: "Sarah Mitchell", shift: "Afternoon (14:00 - 22:00)", notes: "Bird strike reported on EK203 during approach. Aircraft grounded for inspection. BA331 fuel spill contained near Gate C3, hazmat cleared. All other turnarounds completed on time. Boarding for LH779 smooth.", supervisor_comment: "", status: "PENDING", created_at: "2026-05-05 22:05", flights_handled: ["EK203","BA331","LH779","QR146"], open_issues: 2 },
  { id: 3, created_by: "James O'Brien", shift: "Night (22:00 - 06:00)", notes: "Quiet shift overall. Maintenance completed on Gate B7 jetbridge. Two cargo flights processed without issues. Ground crew fully briefed for morning rush. All equipment checks passed.", supervisor_comment: "Excellent shift. Gate B7 now operational.", status: "ACKNOWLEDGED", created_at: "2026-05-05 06:10", flights_handled: ["CG101","CG102"], open_issues: 0 },
];

const SHIFTS = ["Morning (06:00 - 14:00)","Afternoon (14:00 - 22:00)","Night (22:00 - 06:00)"];
const inputStyle = { backgroundColor: P.deep, border: `1px solid ${P.accent}`, color: P.text };

export default function Handovers() {
  const [handovers, setHandovers] = useState(MOCK_HANDOVERS);
  const [showCreate, setShowCreate] = useState(false);
  const [selected, setSelected] = useState(null);
  const [comment, setComment] = useState("");
  const [form, setForm] = useState({ shift: SHIFTS[0], notes: "", supervisor_comment: "" });

  const handleCreate = () => {
    if (!form.notes.trim()) return;
    const now = new Date().toISOString().slice(0, 16).replace("T", " ");
    setHandovers([{ id: handovers.length + 1, created_by: "You", shift: form.shift, notes: form.notes, supervisor_comment: form.supervisor_comment, status: "PENDING", created_at: now, flights_handled: [], open_issues: 0 }, ...handovers]);
    setShowCreate(false);
    setForm({ shift: SHIFTS[0], notes: "", supervisor_comment: "" });
  };

  const handleAcknowledge = (id) => {
    setHandovers((prev) => prev.map((h) => h.id === id ? { ...h, status: "ACKNOWLEDGED", supervisor_comment: comment } : h));
    if (selected?.id === id) setSelected((s) => ({ ...s, status: "ACKNOWLEDGED", supervisor_comment: comment }));
    setComment("");
  };

  const pendingCount = handovers.filter((h) => h.status === "PENDING").length;
  const acknowledgedCount = handovers.filter((h) => h.status === "ACKNOWLEDGED").length;
  const totalIssues = handovers.reduce((s, h) => s + h.open_issues, 0);

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
          <h1 className="text-5xl font-bold" style={{ color: P.text }}>Shift Handovers</h1>
          <p className="mt-2" style={{ color: P.muted }}>Shift-to-shift operational handover records</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="px-5 py-3 rounded transition font-semibold"
          style={{ backgroundColor: P.accent, color: P.text }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = P.card)}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = P.accent)}
        >+ New Handover</button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <KpiBox label="Pending Review" value={pendingCount}     valueColor="#fbbf24" borderColor="#d97706" />
        <KpiBox label="Acknowledged"   value={acknowledgedCount} valueColor="#4ade80" borderColor="#16a34a" />
        <KpiBox label="Open Issues"    value={totalIssues}       valueColor="#f87171" borderColor="#dc2626" />
      </div>

      <div className="flex gap-6">
        <div className="flex-1 space-y-4">
          {handovers.map((h) => (
            <div key={h.id} onClick={() => setSelected(h)} className="rounded-xl p-6 cursor-pointer transition"
              style={{ backgroundColor: P.card, border: `1px solid ${selected?.id === h.id ? P.accent : "rgba(74,127,167,0.4)"}` }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = P.accent)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = selected?.id === h.id ? P.accent : "rgba(74,127,167,0.4)")}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-lg" style={{ color: P.text }}>{h.shift}</h3>
                    <span className="text-xs px-2 py-0.5 rounded font-semibold" style={STATUS_STYLES[h.status]}>{h.status}</span>
                  </div>
                  <p className="text-sm" style={{ color: P.muted }}>By {h.created_by} • {h.created_at}</p>
                </div>
                {h.open_issues > 0 && (
                  <span className="text-xs px-2 py-1 rounded font-semibold" style={{ background: "rgba(239,68,68,0.2)", color: "#f87171", border: "1px solid rgba(239,68,68,0.3)" }}>
                    {h.open_issues} open issue{h.open_issues > 1 ? "s" : ""}
                  </span>
                )}
              </div>
              <p className="text-sm line-clamp-2 mb-4" style={{ color: P.muted }}>{h.notes}</p>
              {h.flights_handled.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {h.flights_handled.map((f) => (
                    <span key={f} className="text-xs px-2 py-1 rounded font-mono"
                      style={{ background: "rgba(74,127,167,0.2)", color: P.muted }}>
                      {f}
                    </span>
                  ))}
                </div>
              )}
              {h.supervisor_comment && (
                <div className="mt-4 rounded-lg p-3" style={{ backgroundColor: P.deep, borderLeft: "2px solid #4ade80" }}>
                  <p className="text-xs mb-1" style={{ color: P.muted }}>Supervisor comment:</p>
                  <p className="text-sm" style={{ color: P.text }}>{h.supervisor_comment}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {selected && (
          <div className="w-96 rounded-xl p-6 self-start sticky top-6" style={{ backgroundColor: P.card, border: `1px solid ${P.accent}` }}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg" style={{ color: P.text }}>Handover Detail</h2>
              <button onClick={() => setSelected(null)} style={{ color: P.muted }}>✕</button>
            </div>
            <div className="space-y-3 mb-5">
              {[["Shift", selected.shift], ["Submitted by", selected.created_by], ["Time", selected.created_at]].map(([label, val]) => (
                <div key={label}>
                  <p className="text-xs uppercase tracking-wider" style={{ color: P.muted }}>{label}</p>
                  <p className="font-semibold mt-1" style={{ color: P.text }}>{val}</p>
                </div>
              ))}
              <div>
                <p className="text-xs uppercase tracking-wider mb-2" style={{ color: P.muted }}>Status</p>
                <span className="text-xs px-2 py-1 rounded font-semibold" style={STATUS_STYLES[selected.status]}>{selected.status}</span>
              </div>
            </div>
            <div className="mb-5">
              <p className="text-xs uppercase tracking-wider mb-2" style={{ color: P.muted }}>Handover Notes</p>
              <p className="text-sm leading-relaxed" style={{ color: P.muted }}>{selected.notes}</p>
            </div>
            {selected.flights_handled.length > 0 && (
              <div className="mb-5">
                <p className="text-xs uppercase tracking-wider mb-2" style={{ color: P.muted }}>Flights Handled</p>
                <div className="flex flex-wrap gap-2">
                  {selected.flights_handled.map((f) => (
                    <span key={f} className="text-xs px-2 py-1 rounded font-mono"
                      style={{ background: "rgba(74,127,167,0.2)", color: P.muted }}>{f}</span>
                  ))}
                </div>
              </div>
            )}
            {selected.status === "PENDING" && (
              <div className="pt-4" style={{ borderTop: `1px solid ${P.accent}` }}>
                <p className="text-xs uppercase tracking-wider mb-2" style={{ color: P.muted }}>Supervisor Comment</p>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={3}
                  className="w-full p-3 rounded text-sm outline-none resize-none mb-3" style={inputStyle}
                  placeholder="Add a comment before acknowledging..." />
                <button onClick={() => handleAcknowledge(selected.id)}
                  className="w-full py-2 rounded font-semibold transition text-sm"
                  style={{ backgroundColor: "#16a34a", color: P.text }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#15803d")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#16a34a")}
                >✓ Acknowledge Handover</button>
              </div>
            )}
            {selected.supervisor_comment && (
              <div className="pt-4" style={{ borderTop: `1px solid ${P.accent}` }}>
                <p className="text-xs uppercase tracking-wider mb-2" style={{ color: P.muted }}>Supervisor Comment</p>
                <p className="text-sm" style={{ color: P.muted }}>{selected.supervisor_comment}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {showCreate && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="rounded-xl p-8 w-full max-w-lg" style={{ backgroundColor: P.card, border: `1px solid ${P.accent}` }}>
            <h2 className="text-2xl font-bold mb-6" style={{ color: P.text }}>New Shift Handover</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm" style={{ color: P.muted }}>Shift</label>
                <select value={form.shift} onChange={(e) => setForm({ ...form, shift: e.target.value })}
                  className="w-full mt-1 p-3 rounded outline-none" style={inputStyle}>
                  {SHIFTS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm" style={{ color: P.muted }}>Handover Notes *</label>
                <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={5}
                  className="w-full mt-1 p-3 rounded outline-none resize-none text-sm" style={inputStyle}
                  placeholder="Summarise the shift — flights handled, incidents, equipment issues, pending tasks..." />
              </div>
              <div>
                <label className="text-sm" style={{ color: P.muted }}>Supervisor Comment (optional)</label>
                <textarea value={form.supervisor_comment} onChange={(e) => setForm({ ...form, supervisor_comment: e.target.value })} rows={2}
                  className="w-full mt-1 p-3 rounded outline-none resize-none text-sm" style={inputStyle}
                  placeholder="Any notes from supervisor..." />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleCreate} className="flex-1 py-3 rounded font-semibold transition"
                style={{ backgroundColor: P.accent, color: P.text }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = P.deep)}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = P.accent)}
              >Submit Handover</button>
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
