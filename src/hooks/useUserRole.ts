import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export type UserRole = 'admin' | 'user' | null;

export const useUserRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState<UserRole>(null);
  const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
  const fetchUserRole = async () => {
    if (!user) {
      console.log("No user logged in");
      setRole(null);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching user role:', error);
        setRole(null);
      } else {
        console.log('Fetched role:', data?.role);
        setRole(data?.role || null);
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
      setRole(null);
    } finally {
      setIsLoading(false);
    }
  };

  fetchUserRole();
}, [user]);


  return { role, isLoading, isAdmin: role === 'admin', isUser: role === 'user' };
};