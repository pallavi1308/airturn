import { useState } from "react";
import PageContainer from "../components/PageContainer";
import StatusBadge from "../components/StatusBadge";
import { Link } from "react-router-dom";

const P = { deep: "#0A1931", card: "#1A3D63", accent: "#4A7FA7", muted: "#B3CFE5", text: "#F6FAFD" };

const flights = [
  { id: 1, flight_number: "EK202", airline: "Emirates",         gate: "A12", status: "CLEANING", eta: "14:20" },
  { id: 2, flight_number: "QR145", airline: "Qatar Airways",    gate: "B7",  status: "BOARDING", eta: "15:05" },
  { id: 3, flight_number: "LH778", airline: "Lufthansa",        gate: "D9",  status: "READY",    eta: "15:40" },
  { id: 4, flight_number: "BA331", airline: "British Airways",  gate: "C3",  status: "DELAYED",  eta: "16:00" },
];

export default function Turnarounds() {
  const [search, setSearch] = useState("");
  const filtered = flights.filter((f) => f.flight_number.toLowerCase().includes(search.toLowerCase()));

  return (
    <PageContainer>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-5xl font-bold" style={{ color: P.text }}>Turnarounds</h1>
          <p className="mt-2" style={{ color: P.muted }}>Aircraft turnaround operations</p>
        </div>
        <button className="px-5 py-3 rounded transition font-semibold"
          style={{ backgroundColor: P.accent, color: P.text }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = P.card)}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = P.accent)}
        >+ Create Turnaround</button>
      </div>

      <div className="mb-6">
        <input type="text" placeholder="Search flight..." value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 p-3 rounded outline-none"
          style={{ backgroundColor: P.card, border: `1px solid ${P.accent}`, color: P.text }} />
      </div>

      <div className="overflow-x-auto rounded-xl" style={{ backgroundColor: P.card, border: `1px solid ${P.accent}` }}>
        <table className="w-full">
          <thead style={{ borderBottom: `1px solid ${P.accent}` }}>
            <tr className="text-left text-sm" style={{ color: P.muted }}>
              {["Flight","Airline","Gate","Status","Departure ETA","Actions"].map((h) => (
                <th key={h} className="p-4">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((flight) => (
              <tr key={flight.id} className="transition" style={{ borderBottom: `1px solid rgba(74,127,167,0.3)` }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(74,127,167,0.1)")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <td className="p-4 font-semibold" style={{ color: P.text }}>{flight.flight_number}</td>
                <td className="p-4" style={{ color: P.muted }}>{flight.airline}</td>
                <td className="p-4" style={{ color: P.muted }}>{flight.gate}</td>
                <td className="p-4"><StatusBadge status={flight.status} /></td>
                <td className="p-4" style={{ color: P.muted }}>{flight.eta}</td>
                <td className="p-4">
                  <Link to={`/turnarounds/${flight.id}`} style={{ color: P.accent }}
                    onMouseEnter={e => (e.target.style.color = P.text)}
                    onMouseLeave={e => (e.target.style.color = P.accent)}
                  >View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageContainer>
  );
}
