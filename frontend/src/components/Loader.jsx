import { Loader2 } from 'lucide-react';

const Loader = ({ message = 'Processing...' }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="text-lg font-medium text-muted-foreground">{message}</p>
    </div>
  );
};

export default Loader;
