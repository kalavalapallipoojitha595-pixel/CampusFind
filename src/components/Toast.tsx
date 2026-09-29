import React from 'react';
import { useItems } from '../context/ItemsContext';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useItems();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isInfo = toast.type === 'info';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto rounded-xl p-4 shadow-lg border text-sm flex items-start gap-3 transition-all duration-300 bg-white ${
              isSuccess
                ? 'border-emerald-200 shadow-emerald-500/10'
                : isInfo
                ? 'border-blue-200 shadow-blue-500/10'
                : 'border-red-200 shadow-red-500/10'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
              {isInfo && <Info className="w-5 h-5 text-blue-600" />}
              {toast.type === 'error' && <AlertTriangle className="w-5 h-5 text-red-600" />}
            </div>

            <div className="flex-1">
              <h5 className="font-semibold text-slate-900 text-xs">{toast.title}</h5>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 p-0.5 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
