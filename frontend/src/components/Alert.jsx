import { AlertCircle, CheckCircle2, Info } from "lucide-react";

export default function Alert({ type = "info", message }) {
  const styles =
    type === "error"
      ? "bg-red-50 text-red-700 border-red-200"
      : type === "success"
      ? "bg-green-50 text-green-700 border-green-200"
      : "bg-blue-50 text-blue-700 border-blue-200";

  const Icon =
    type === "error" ? AlertCircle : type === "success" ? CheckCircle2 : Info;

  return (
    <div
      className={`flex items-center gap-2 border rounded-lg p-3 ${styles}`}
      role="alert"
    >
      <Icon size={18} />
      <span className="text-sm">{message}</span>
    </div>
  );
}
