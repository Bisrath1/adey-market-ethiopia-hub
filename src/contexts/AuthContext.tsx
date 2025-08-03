import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface Profile {
  full_name?: string | null;
  // add other profile fields if needed
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  register: (email: string, password: string, name?: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch profile data by user id
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Profile fetch error:', error);
        setProfile(null);
      } else {
        setProfile(data);
      }
    } catch (e) {
      console.error('Unexpected error in fetchProfile:', e);
      setProfile(null);
    }
  };

useEffect(() => {
  console.log("Setting up auth state listener");
  const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
    console.log("Auth state changed:", event, session);
    setSession(session);
    setUser(session?.user ?? null);
    if (session?.user) {
      fetchProfile(session.user.id);
    } else {
      setProfile(null);
    }
    setIsLoading(false);
  });

  return () => {
    console.log("Cleaning up auth listener");
    subscription.unsubscribe();
  };
}, []);
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
        return { error: error.message };
      }

      if (data.user) {
        await fetchProfile(data.user.id);
      }

      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });

      navigate("/register");

      return {};
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
      return { error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name?: string) => {
    try {
      setIsLoading(true);
      const redirectUrl = `${window.location.origin}/`;

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: name,
          },
        },
      });

      if (error) {
        toast({
          title: "Registration Failed",
          description: error.message,
          variant: "destructive",
        });
        return { error: error.message };
      }

      const userId = data.user?.id;
      if (userId) {
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: userId,
            full_name: name,
          });

        if (insertError) {
          toast({
            title: "Profile Save Failed",
            description: insertError.message,
            variant: "destructive",
          });
          return { error: insertError.message };
        }

        await fetchProfile(userId);
      }

      toast({
        title: "Registration Successful!",
        description: "Please check your email to confirm your account.",
      });

      navigate("/register");

      return {};
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      toast({
        title: "Registration Failed",
        description: errorMessage,
        variant: "destructive",
      });
      return { error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };
const logout = async () => {
  console.log('Logging out...');
  try {
    const sessionBefore = await supabase.auth.getSession();
    console.log('Current session before logout:', sessionBefore);

    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
        toast({
          title: 'Logout Failed',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }
    } catch (signOutError) {
      console.error('signOut() threw an exception:', signOutError);
      return;
    }

    const sessionAfter = await supabase.auth.getSession();
    console.log('Session after logout:', sessionAfter);

    setProfile(null);
    setUser(null);
    setSession(null);

    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
    console.log('Logout successful, navigating to /login');
    
  } catch (error) {
    console.error('Logout exception:', error);
  }
};




  return (
    <AuthContext.Provider value={{ user, session, profile, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
