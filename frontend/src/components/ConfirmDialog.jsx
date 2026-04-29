const ConfirmDialog = ({
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  danger = false,
  loading = false,
  onCancel,
  onConfirm,
}) => {
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/30 px-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-md border border-zinc-200 bg-white p-5 shadow-lg">
        <h2 className="text-xl font-semibold text-zinc-950">{title}</h2>
        <p className="mt-2 text-sm text-zinc-600">{message}</p>

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 disabled:opacity-60"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`rounded-md px-4 py-2 text-sm font-medium text-white transition disabled:opacity-60 ${danger ? "bg-red-500 hover:bg-red-600" : "bg-pale-sky-500 hover:bg-pale-sky-600"}`}
          >
            {loading ? "Working..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
