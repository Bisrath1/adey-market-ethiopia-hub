import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole'; // Make sure this path is correct

export const useCustomerApproval = () => {
  const { user } = useAuth();
  const { isAdmin, isLoading: isRoleLoading } = useUserRole(); // ⬅️ get admin flag
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

      if (isAdmin) {
        // ⬅️ Bypass check for admin
        setIsApproved(true);
        setApprovalStatus('approved');
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('customers')
          .select('approval_status')
          .eq('user_id', user.id)
          .maybeSingle();

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

    // Wait until user role is loaded
    if (!isRoleLoading) {
      fetchApprovalStatus();
    }
  }, [user, isAdmin, isRoleLoading]);

  return { isApproved, isLoading, approvalStatus };
};
