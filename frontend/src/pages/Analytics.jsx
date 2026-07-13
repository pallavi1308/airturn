import { useState } from "react";
import PageContainer from "../components/PageContainer";

const P = { deep: "#0A1931", card: "#1A3D63", accent: "#4A7FA7", muted: "#B3CFE5", text: "#F6FAFD" };

function BarChart({ data, label, color = P.accent, unit = "" }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div>
      <p className="text-sm mb-3" style={{ color: P.muted }}>{label}</p>
      <div className="flex items-end gap-2 h-32">
        {data.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <span className="text-xs" style={{ color: P.muted }}>{d.value}{unit}</span>
            <div className="w-full rounded-t transition-all duration-500"
              style={{ height: `${Math.max((d.value / max) * 100, 4)}%`, backgroundColor: color, opacity: 0.7 + (i / data.length) * 0.3 }} />
            <span className="text-xs truncate w-full text-center" style={{ color: P.muted }}>{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DonutChart({ segments, size = 120 }) {
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  let cumulative = 0;
  const cx = size / 2, cy = size / 2, r = size * 0.35, strokeWidth = size * 0.18;
  const circumference = 2 * Math.PI * r;
  return (
    <svg width={size} height={size}>
      {segments.map((seg, i) => {
        const ratio = seg.value / total;
        const offset = circumference * (1 - cumulative);
        const dash = circumference * ratio;
        cumulative += ratio;
        return (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={seg.color}
            strokeWidth={strokeWidth} strokeDasharray={`${dash} ${circumference}`}
            strokeDashoffset={offset} transform={`rotate(-90 ${cx} ${cy})`} />
        );
      })}
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central"
        fill={P.text} fontSize={size * 0.18} fontWeight="bold">{total}</text>
    </svg>
  );
}

const KPI_DATA = [
  { label: "Avg Turnaround Time", value: "42", unit: "min", target: "45 min", delta: "-6.7%", positive: true },
  { label: "On-Time Departures",  value: "87", unit: "%",   target: "85%",    delta: "+2.4%", positive: true },
  { label: "Gate Utilization",    value: "76", unit: "%",   target: "80%",    delta: "-4.0%", positive: false },
  { label: "Incidents This Week", value: "6",  unit: "",    target: "< 10",   delta: "-25%",  positive: true },
];

const TURNAROUND_BY_HOUR  = [{ label:"06:00",value:3},{ label:"08:00",value:7},{ label:"10:00",value:12},{ label:"12:00",value:9},{ label:"14:00",value:14},{ label:"16:00",value:11},{ label:"18:00",value:8},{ label:"20:00",value:5}];
const DELAY_CAUSES        = [{ label:"Late Crew",value:4},{ label:"ATC",value:6},{ label:"Fueling",value:3},{ label:"Catering",value:2},{ label:"Weather",value:8},{ label:"Tech",value:5}];
const TASK_COMPLETION_DAYS= [{ label:"Mon",value:94},{ label:"Tue",value:88},{ label:"Wed",value:91},{ label:"Thu",value:96},{ label:"Fri",value:82},{ label:"Sat",value:79},{ label:"Sun",value:85}];
const STATUS_DISTRIBUTION = [{ label:"COMPLETED",value:48,color:"#22c55e"},{ label:"IN_PROGRESS",value:12,color:"#fbbf24"},{ label:"PENDING",value:18,color:P.muted},{ label:"BLOCKED",value:4,color:"#f87171"}];
const TOP_PERFORMERS      = [{ name:"Ground Team Alpha",tasks:34,rate:"98%"},{ name:"Cabin Crew B",tasks:28,rate:"96%"},{ name:"Ramp Team Delta",tasks:22,rate:"94%"},{ name:"Catering Unit 3",tasks:19,rate:"91%"},{ name:"Engineering Bay",tasks:15,rate:"88%"}];
const RANGE_OPTIONS       = ["Today","This Week","This Month","Last 30 Days"];

const card = { backgroundColor: P.card, border: `1px solid ${P.accent}` };

export default function Analytics() {
  const [range, setRange] = useState("Today");

  return (
    <PageContainer>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-5xl font-bold" style={{ color: P.text }}>Analytics</h1>
          <p className="mt-2" style={{ color: P.muted }}>Operational performance metrics & insights</p>
        </div>
        <div className="flex rounded-lg overflow-hidden" style={{ border: `1px solid ${P.accent}`, backgroundColor: P.deep }}>
          {RANGE_OPTIONS.map((r) => (
            <button key={r} onClick={() => setRange(r)} className="px-4 py-2 text-sm transition"
              style={{ backgroundColor: range === r ? P.accent : "transparent", color: range === r ? P.text : P.muted }}>
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {KPI_DATA.map((kpi) => (
          <div key={kpi.label} className="rounded-xl p-6" style={card}>
            <p className="text-xs uppercase tracking-wider mb-3" style={{ color: P.muted }}>{kpi.label}</p>
            <div className="flex items-end gap-1">
              <span className="text-4xl font-bold" style={{ color: P.text }}>{kpi.value}</span>
              <span className="mb-1" style={{ color: P.muted }}>{kpi.unit}</span>
            </div>
            <div className="flex justify-between items-center mt-3">
              <span className="text-xs" style={{ color: P.muted }}>Target: {kpi.target}</span>
              <span className="text-xs font-semibold" style={{ color: kpi.positive ? "#4ade80" : "#f87171" }}>{kpi.delta}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="col-span-2 rounded-xl p-6" style={card}>
          <h2 className="text-lg font-bold mb-6" style={{ color: P.text }}>Turnarounds by Hour</h2>
          <BarChart data={TURNAROUND_BY_HOUR} label="Number of turnarounds per time slot" color={P.accent} />
        </div>
        <div className="rounded-xl p-6" style={card}>
          <h2 className="text-lg font-bold mb-4" style={{ color: P.text }}>Task Status Breakdown</h2>
          <div className="flex justify-center mb-4"><DonutChart segments={STATUS_DISTRIBUTION} size={130} /></div>
          <div className="space-y-2">
            {STATUS_DISTRIBUTION.map((s) => (
              <div key={s.label} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-xs" style={{ color: P.muted }}>{s.label}</span>
                </div>
                <span className="text-xs font-semibold" style={{ color: P.text }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="rounded-xl p-6" style={card}>
          <h2 className="text-lg font-bold mb-6" style={{ color: P.text }}>Task Completion Rate (%)</h2>
          <BarChart data={TASK_COMPLETION_DAYS} label="Daily task completion percentage" color="#4ade80" unit="%" />
        </div>
        <div className="rounded-xl p-6" style={card}>
          <h2 className="text-lg font-bold mb-6" style={{ color: P.text }}>Delay Causes</h2>
          <BarChart data={DELAY_CAUSES} label="Number of delays by root cause" color="#fbbf24" />
        </div>
      </div>

      <div className="rounded-xl p-6" style={card}>
        <h2 className="text-lg font-bold mb-4" style={{ color: P.text }}>Top Performing Teams</h2>
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider" style={{ color: P.muted, borderBottom: `1px solid ${P.accent}` }}>
              {["Rank","Team","Tasks Completed","Completion Rate","Performance"].map((h) => (
                <th key={h} className="pb-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TOP_PERFORMERS.map((team, i) => (
              <tr key={team.name} className="transition" style={{ borderBottom: `1px solid rgba(74,127,167,0.3)` }}>
                <td className="py-4 text-sm">
                  <span className="font-bold" style={{ color: i===0?"#fbbf24":i===1?P.muted:i===2?"#fb923c":P.muted }}>#{i+1}</span>
                </td>
                <td className="py-4 text-sm font-medium" style={{ color: P.text }}>{team.name}</td>
                <td className="py-4 text-sm" style={{ color: P.muted }}>{team.tasks}</td>
                <td className="py-4 text-sm font-semibold" style={{ color: "#4ade80" }}>{team.rate}</td>
                <td className="py-4">
                  <div className="w-32 rounded-full h-2" style={{ backgroundColor: P.deep }}>
                    <div className="h-2 rounded-full" style={{ width: team.rate, backgroundColor: P.accent }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageContainer>
  );
}
