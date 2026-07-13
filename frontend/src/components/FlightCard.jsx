import StatusBadge from "./StatusBadge";

export default function FlightCard({ flight }) {
  return (
    <div
      className="rounded-xl p-5"
      style={{ backgroundColor: "#1A3D63", border: "1px solid #4A7FA7" }}
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: "#F6FAFD" }}>
            {flight.flight_number}
          </h2>
          <p className="mt-1" style={{ color: "#B3CFE5" }}>{flight.airline}</p>
        </div>
        <StatusBadge status={flight.status} />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
        <div>
          <p style={{ color: "#B3CFE5" }}>Aircraft</p>
          <p className="mt-1" style={{ color: "#F6FAFD" }}>{flight.aircraft_registration}</p>
        </div>
        <div>
          <p style={{ color: "#B3CFE5" }}>Gate</p>
          <p className="mt-1" style={{ color: "#F6FAFD" }}>{flight.gate_number}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-6">
        <div className="flex justify-between text-sm mb-2">
          <span style={{ color: "#B3CFE5" }}>Turnaround Progress</span>
          <span style={{ color: "#F6FAFD" }}>{flight.progress}%</span>
        </div>
        <div className="w-full rounded-full h-3" style={{ backgroundColor: "#0A1931" }}>
          <div
            className="h-3 rounded-full transition-all"
            style={{ width: `${flight.progress}%`, backgroundColor: "#4A7FA7" }}
          />
        </div>
      </div>
    </div>
  );
}
