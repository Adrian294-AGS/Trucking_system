import "@/assets/style/notif.css";

const iconMap = {
  success: "✔", error: "✖", warning: "⚠", info: "ℹ"
};

export default function ToastContainer({ toasts, onRemove }) {
  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`}>
          <div className="toast-accent" />
          <div className="toast-icon-wrap">{iconMap[t.type]}</div>
          <div className="toast-body">
            <p className="toast-title">{t.title}</p>
            <p className="toast-msg">{t.message}</p>
          </div>
          <button className="toast-close" onClick={() => onRemove(t.id)}>✕</button>
          <div
            className="toast-progress"
            style={{ animationDuration: `${t.duration}ms` }}
          />
        </div>
      ))}
    </div>
  );
}