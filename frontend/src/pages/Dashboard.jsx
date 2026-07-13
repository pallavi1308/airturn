import PageContainer from "../components/PageContainer";
import KpiCard from "../components/KpiCard";
import FlightCard from "../components/FlightCard";

export default function Dashboard() {
  const flights = [
    { id: 1, flight_number: "EK202", airline: "Emirates", aircraft_registration: "A6-EON", gate_number: "A12", status: "CLEANING", progress: 45 },
    { id: 2, flight_number: "QR145", airline: "Qatar Airways", aircraft_registration: "A7-BCF", gate_number: "B7", status: "BOARDING", progress: 78 },
    { id: 3, flight_number: "BA331", airline: "British Airways", aircraft_registration: "G-XWBD", gate_number: "C3", status: "DELAYED", progress: 60 },
    { id: 4, flight_number: "LH778", airline: "Lufthansa", aircraft_registration: "D-AIXT", gate_number: "D9", status: "READY", progress: 100 },
  ];

  return (
    <PageContainer>
      <div className="mb-10">
        <h1 className="text-5xl font-bold" style={{ color: "#F6FAFD" }}>Operational Dashboard</h1>
        <p className="mt-3" style={{ color: "#B3CFE5" }}>Real-time airport turnaround operations overview</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <KpiCard title="Active Flights"    value="24" color="text-blue-300" />
        <KpiCard title="Delayed Flights"   value="3"  color="text-red-400" />
        <KpiCard title="Gates Occupied"    value="18" color="text-yellow-400" />
        <KpiCard title="Ready Departures"  value="11" color="text-green-400" />
      </div>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold" style={{ color: "#F6FAFD" }}>Active Turnarounds</h2>
          <button
            className="px-4 py-2 rounded transition font-semibold"
            style={{ backgroundColor: "#4A7FA7", color: "#F6FAFD" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#1A3D63")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#4A7FA7")}
          >
            + Add Flight
          </button>
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          {flights.map((flight) => (
            <FlightCard key={flight.id} flight={flight} />
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
