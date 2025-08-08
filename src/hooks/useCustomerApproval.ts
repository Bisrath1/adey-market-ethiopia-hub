import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';

interface UseCustomerApprovalReturn {
  isApproved: boolean;
  isLoading: boolean;
  approvalStatus: string | null;
}

export const useCustomerApproval = (): UseCustomerApprovalReturn => {
  const { user } = useAuth();
  const { isAdmin, isLoading: isRoleLoading } = useUserRole();

  const [isApproved, setIsApproved] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    const fetchApprovalStatus = async () => {
      if (!user) {
        if (!isCancelled) {
          setIsApproved(false);
          setApprovalStatus(null);
          setIsLoading(false);
        }
        return;
      }

      if (isAdmin) {
        // Admin bypasses approval check
        if (!isCancelled) {
          setIsApproved(true);
          setApprovalStatus('approved');
          setIsLoading(false);
        }
        return;
      }

      try {
        const { data, error } = await supabase
          .from('customers')
          .select('approval_status')
          .eq('user_id', user.id)
          .maybeSingle();

        if (!isCancelled) {
          if (error) {
            console.error('Error fetching approval status:', error);
            setIsApproved(false);
            setApprovalStatus(null);
          } else {
            const status = data?.approval_status || null;
            setApprovalStatus(status);
            setIsApproved(status === 'approved');
          }
          setIsLoading(false);
        }
      } catch (err) {
        if (!isCancelled) {
          console.error('Error fetching approval status:', err);
          setIsApproved(false);
          setApprovalStatus(null);
          setIsLoading(false);
        }
      }
    };

    if (!isRoleLoading) {
      fetchApprovalStatus();
    }

    return () => {
      isCancelled = true;
    };
  }, [user, isAdmin, isRoleLoading]);

  return { isApproved, isLoading, approvalStatus };
};
