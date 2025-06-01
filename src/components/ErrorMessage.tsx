
import { AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <Card className="glass-effect border-red-200/50 animate-fade-in">
      <CardContent className="p-6 text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-light mb-2">
          Oops! Something went wrong
        </h3>
        <p className="text-muted-light mb-4">{message}</p>
        {onRetry && (
          <Button onClick={onRetry} variant="outline" className="glass-effect">
            Try Again
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ErrorMessage;
