import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, Info, AlertCircle } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useStore();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />,
    info: <Info className="w-4 h-4 text-neutral-700 shrink-0" />,
    error: <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />,
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-fade-in pointer-events-none">
      <div className="bg-neutral-900 text-white px-4 py-3 rounded shadow-xl border border-neutral-700 flex items-center gap-3 text-sm">
        {icons[toast.type]}
        <span className="font-normal tracking-wide">{toast.message}</span>
      </div>
    </div>
  );
};

