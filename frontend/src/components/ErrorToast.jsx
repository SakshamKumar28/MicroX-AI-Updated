import { AlertCircle, X } from 'lucide-react';
import { useState } from 'react';

const ErrorToast = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-lg border border-destructive bg-destructive/10 px-4 py-3 shadow-elevated max-w-md animate-in slide-in-from-bottom-5">
      <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
      <p className="text-sm font-medium text-destructive">{message}</p>
      <button
        onClick={handleClose}
        className="ml-auto flex-shrink-0 rounded-full p-1 hover:bg-destructive/20 transition-colors"
      >
        <X className="h-4 w-4 text-destructive" />
      </button>
    </div>
  );
};

export default ErrorToast;
