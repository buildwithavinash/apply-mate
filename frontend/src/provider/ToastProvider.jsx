import { useCallback, useMemo, useState } from "react";
import { MdCheckCircle, MdError, MdInfo } from "react-icons/md";
import { ToastContext } from "../context/ToastContext";

const toastStyles = {
  success: {
    icon: <MdCheckCircle />,
    classes: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  error: {
    icon: <MdError />,
    classes: "border-red-200 bg-red-50 text-red-700",
  },
  info: {
    icon: <MdInfo />,
    classes: "border-pale-sky-200 bg-pale-sky-50 text-pale-sky-700",
  },
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((message, type = "info") => {
    const id = crypto.randomUUID();

    setToasts((current) => [
      ...current,
      {
        id,
        message,
        type,
      },
    ]);

    window.setTimeout(() => removeToast(id), 3200);
  }, [removeToast]);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-16 z-100 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2">
        {toasts.map((toast) => {
          const style = toastStyles[toast.type] || toastStyles.info;

          return (
            <div key={toast.id} className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium shadow-sm ${style.classes}`}>
              <span className="text-lg">{style.icon}</span>
              <p>{toast.message}</p>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};
