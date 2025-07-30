import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  showMessage?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectTo = '/register',
  showMessage = true 
}) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // Show loading spinner while auth state is being determined
  if (isLoading) {
    return (
      <div className="min-h-screen bg-ethiopian-cream/30 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <Loader2 className="w-8 h-8 animate-spin text-ethiopian-gold mb-4" />
            <p className="text-center text-gray-600">Loading...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If user is not authenticated, redirect to registration with message
  if (!user) {
    const redirectUrl = `${redirectTo}?redirect=${encodeURIComponent(location.pathname)}&message=${encodeURIComponent('You need to register or sign in to access this section.')}`;
    return <Navigate to={redirectUrl} replace />;
  }

  // User is authenticated, render the protected content
  return <>{children}</>;
};