import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';
import React from 'react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContainerProps {
  toasts: Toast[];
}

export const Toast: React.FC<ToastContainerProps> = ({ toasts }) => {
  const typeClasses: Record<ToastType, string> = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
  };

  const icons: Record<ToastType, JSX.Element> = {
    success: <CheckCircle className="w-6 h-6 mr-2" />,
    error: <XCircle className="w-6 h-6 mr-2" />,
    warning: <AlertCircle className="w-6 h-6 mr-2" />,
    info: <Info className="w-6 h-6 mr-2" />,
  };

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`p-4 rounded-lg shadow-lg text-white ${
            typeClasses[toast.type]
          }`}
        >
          {icons[toast.type]}
          <div>
            <strong>{[toast.type]}</strong>: {toast.message}
          </div>
        </div>
      ))}
    </div>
  );
};
