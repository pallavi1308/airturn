import { useState } from "react";
import PageContainer from "../components/PageContainer";

const P = {
  deep:   "#0A1931",
  card:   "#1A3D63",
  accent: "#4A7FA7",
  muted:  "#B3CFE5",
  text:   "#F6FAFD",
};

const COLUMNS = [
  { id: "PENDING",     label: "Pending",     dotColor: "#B3CFE5",  borderColor: "#4A7FA7" },
  { id: "IN_PROGRESS", label: "In Progress", dotColor: "#fbbf24",  borderColor: "#d97706" },
  { id: "COMPLETED",   label: "Completed",   dotColor: "#4ade80",  borderColor: "#16a34a" },
  { id: "BLOCKED",     label: "Blocked",     dotColor: "#f87171",  borderColor: "#dc2626" },
];

const PRIORITY_STYLES = {
  HIGH:   { color: "#f87171", background: "rgba(239,68,68,0.1)",   border: "1px solid rgba(239,68,68,0.3)" },
  MEDIUM: { color: "#fbbf24", background: "rgba(234,179,8,0.1)",   border: "1px solid rgba(234,179,8,0.3)" },
  LOW:    { color: "#B3CFE5", background: "rgba(179,207,229,0.1)", border: "1px solid rgba(179,207,229,0.3)" },
};

const MOCK_TASKS = [
  { id: 1, title: "Cabin Cleaning",        flight: "EK202", gate: "A12", assigned_role: "CLEANING",    priority: "HIGH",   status: "IN_PROGRESS", sla_target: "14:00" },
  { id: 2, title: "Aircraft Fueling",      flight: "EK202", gate: "A12", assigned_role: "FUELING",     priority: "HIGH",   status: "PENDING",     sla_target: "13:55" },
  { id: 3, title: "Catering Load",         flight: "QR145", gate: "B7",  assigned_role: "CATERING",    priority: "MEDIUM", status: "PENDING",     sla_target: "14:45" },
  { id: 4, title: "Boarding Preparation",  flight: "QR145", gate: "B7",  assigned_role: "GROUND",      priority: "MEDIUM", status: "BLOCKED",     sla_target: "14:50" },
  { id: 5, title: "Passenger Deboarding",  flight: "LH778", gate: "D9",  assigned_role: "GROUND",      priority: "HIGH",   status: "COMPLETED",   sla_target: "15:00" },
  { id: 6, title: "Baggage Unload",        flight: "LH778", gate: "D9",  assigned_role: "RAMP",        priority: "HIGH",   status: "COMPLETED",   sla_target: "15:10" },
  { id: 7, title: "Safety Inspection",     flight: "BA331", gate: "C3",  assigned_role: "ENGINEERING", priority: "HIGH",   status: "BLOCKED",     sla_target: "15:30" },
  { id: 8, title: "Pushback Coordination", flight: "BA331", gate: "C3",  assigned_role: "GROUND",      priority: "LOW",    status: "PENDING",     sla_target: "15:55" },
];

export default function TaskBoard() {
  const [tasks, setTasks] = useState(MOCK_TASKS);
  const [filterFlight, setFilterFlight] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [draggedId, setDraggedId] = useState(null);

  const filtered = tasks.filter((t) => {
    const flightMatch = filterFlight ? t.flight.toLowerCase().includes(filterFlight.toLowerCase()) : true;
    const priorityMatch = filterPriority ? t.priority === filterPriority : true;
    return flightMatch && priorityMatch;
  });

  const tasksByStatus = (status) => filtered.filter((t) => t.status === status);

  const handleDragStart = (e, id) => { setDraggedId(id); e.dataTransfer.effectAllowed = "move"; };
  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    if (draggedId == null) return;
    setTasks((prev) => prev.map((t) => (t.id === draggedId ? { ...t, status: newStatus } : t)));
    setDraggedId(null);
  };
  const handleDragOver = (e) => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; };

  const counts = COLUMNS.reduce((acc, col) => {
    acc[col.id] = tasks.filter((t) => t.status === col.id).length;
    return acc;
  }, {});

  const inputStyle = { backgroundColor: P.deep, border: `1px solid ${P.accent}`, color: P.text };

  return (
    <PageContainer>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-5xl font-bold" style={{ color: P.text }}>Task Board</h1>
          <p className="mt-2" style={{ color: P.muted }}>Drag tasks between columns to update status</p>
        </div>
        <button
          className="px-5 py-3 rounded transition font-semibold"
          style={{ backgroundColor: P.accent, color: P.text }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = P.card)}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = P.accent)}
        >
          + New Task
        </button>
      </div>

      {/* Summary bar */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {COLUMNS.map((col) => (
          <div key={col.id} className="rounded-xl p-4"
            style={{ backgroundColor: P.card, borderLeft: `4px solid ${col.borderColor}`, border: `1px solid ${P.accent}`, borderLeftWidth: "4px" }}
          >
            <p className="text-xs uppercase tracking-wider" style={{ color: P.muted }}>{col.label}</p>
            <p className="text-3xl font-bold mt-1" style={{ color: P.text }}>{counts[col.id]}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <input type="text" placeholder="Filter by flight..." value={filterFlight}
          onChange={(e) => setFilterFlight(e.target.value)}
          className="p-3 rounded w-56 text-sm outline-none" style={inputStyle}
        />
        <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}
          className="p-3 rounded text-sm outline-none" style={inputStyle}
        >
          <option value="">All Priorities</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-4 gap-4">
        {COLUMNS.map((col) => (
          <div key={col.id} onDrop={(e) => handleDrop(e, col.id)} onDragOver={handleDragOver}
            className="rounded-xl p-4 min-h-96"
            style={{ backgroundColor: "rgba(26,61,99,0.4)", border: `1px solid ${P.accent}` }}
          >
            <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: `1px solid ${P.accent}` }}>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: col.dotColor }} />
              <h2 className="font-semibold text-sm uppercase tracking-wider" style={{ color: P.muted }}>
                {col.label}
              </h2>
              <span className="ml-auto text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: P.deep, color: P.muted }}>
                {tasksByStatus(col.id).length}
              </span>
            </div>

            <div className="space-y-3">
              {tasksByStatus(col.id).map((task) => (
                <div key={task.id} draggable onDragStart={(e) => handleDragStart(e, task.id)}
                  className="rounded-lg p-4 cursor-grab active:cursor-grabbing transition select-none"
                  style={{
                    backgroundColor: P.card,
                    border: `1px solid ${P.accent}`,
                    opacity: draggedId === task.id ? 0.5 : 1,
                  }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-sm leading-tight" style={{ color: P.text }}>{task.title}</h3>
                    <span className="text-xs px-2 py-0.5 rounded font-medium ml-2 flex-shrink-0"
                      style={PRIORITY_STYLES[task.priority]}
                    >
                      {task.priority}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-xs px-2 py-1 rounded font-mono"
                      style={{ backgroundColor: "rgba(74,127,167,0.2)", color: P.muted }}
                    >
                      {task.flight}
                    </span>
                    <span className="text-xs" style={{ color: P.muted }}>Gate {task.gate}</span>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs" style={{ color: P.muted }}>{task.assigned_role}</span>
                    <span className="text-xs" style={{ color: P.muted }}>SLA: {task.sla_target}</span>
                  </div>
                </div>
              ))}

              {tasksByStatus(col.id).length === 0 && (
                <div className="text-center py-8 text-sm rounded-lg"
                  style={{ color: P.muted, border: `2px dashed ${P.accent}` }}
                >
                  Drop tasks here
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
