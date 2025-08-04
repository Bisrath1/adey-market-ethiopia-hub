import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useCustomerApproval = () => {
  const { user } = useAuth();
  const [isApproved, setIsApproved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [approvalStatus, setApprovalStatus] = useState<string | null>(null);

  useEffect(() => {
    const fetchApprovalStatus = async () => {
      if (!user) {
        setIsApproved(false);
        setApprovalStatus(null);
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('customers')
          .select('approval_status')
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error('Error fetching approval status:', error);
          setIsApproved(false);
          setApprovalStatus(null);
        } else {
          const status = data?.approval_status;
          setApprovalStatus(status);
          setIsApproved(status === 'approved');
        }
      } catch (error) {
        console.error('Error fetching approval status:', error);
        setIsApproved(false);
        setApprovalStatus(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApprovalStatus();
  }, [user]);

  return { isApproved, isLoading, approvalStatus };
};