import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="text-center py-16">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-full mb-4">
        <AlertCircle className="text-red-500" size={32} />
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mb-2">Something went wrong</h3>
      <p className="text-slate-600 mb-6">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
