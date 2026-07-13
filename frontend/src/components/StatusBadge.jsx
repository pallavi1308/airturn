export default function StatusBadge({ status }) {
  const styles = {
    ARRIVED:     { background: "rgba(74,127,167,0.2)",  color: "#B3CFE5", border: "1px solid rgba(74,127,167,0.4)" },
    CLEANING:    { background: "rgba(234,179,8,0.2)",   color: "#fbbf24", border: "1px solid rgba(234,179,8,0.4)" },
    BOARDING:    { background: "rgba(74,127,167,0.35)", color: "#F6FAFD", border: "1px solid rgba(74,127,167,0.5)" },
    READY:       { background: "rgba(34,197,94,0.2)",   color: "#4ade80", border: "1px solid rgba(34,197,94,0.4)" },
    DELAYED:     { background: "rgba(239,68,68,0.2)",   color: "#f87171", border: "1px solid rgba(239,68,68,0.4)" },
    PUSHBACK:    { background: "rgba(249,115,22,0.2)",  color: "#fb923c", border: "1px solid rgba(249,115,22,0.4)" },
    COMPLETED:   { background: "rgba(34,197,94,0.2)",   color: "#4ade80", border: "1px solid rgba(34,197,94,0.4)" },
    IN_PROGRESS: { background: "rgba(234,179,8,0.2)",   color: "#fbbf24", border: "1px solid rgba(234,179,8,0.4)" },
    PENDING:     { background: "rgba(179,207,229,0.1)", color: "#B3CFE5", border: "1px solid rgba(179,207,229,0.3)" },
    BLOCKED:     { background: "rgba(239,68,68,0.2)",   color: "#f87171", border: "1px solid rgba(239,68,68,0.4)" },
  };

  return (
    <span className="px-3 py-1 rounded-full text-xs font-semibold" style={styles[status] || styles.PENDING}>
      {status}
    </span>
  );
}
