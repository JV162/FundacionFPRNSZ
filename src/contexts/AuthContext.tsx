import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '../types/auth';
import { supabase } from '../lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Función para obtener el perfil del usuario desde la tabla users
  const getUserProfile = async (supabaseUser: SupabaseUser): Promise<User | null> => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', supabaseUser.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      if (!data) {
        console.log('No user profile found for:', supabaseUser.id);
        return null;
      }

      return {
        id: data.id,
        email: data.email,
        name: data.name,
        role: data.role,
        created_at: data.created_at
      };
    } catch (error) {
      console.error('Error in getUserProfile:', error);
      return null;
    }
  };

  useEffect(() => {
    // Obtener la sesión actual
    const getSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          setUser(null);
          setLoading(false);
          return;
        }

        if (session?.user) {
          const userProfile = await getUserProfile(session.user);
          setUser(userProfile);
        } else {
          setUser(null);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error in getSession:', error);
        setUser(null);
        setLoading(false);
      }
    };

    getSession();

    // Escuchar cambios en el estado de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        
        if (session?.user) {
          const userProfile = await getUserProfile(session.user);
          setUser(userProfile);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // El onAuthStateChange se encargará de actualizar el usuario
    } catch (error) {
      console.error('Error in login:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      // El onAuthStateChange se encargará de limpiar el usuario
    } catch (error) {
      console.error('Error in logout:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      // Registrar en Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        // Crear perfil en la tabla users
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            email: data.user.email!,
            name: name,
            role: 'donor' // Por defecto, los nuevos usuarios son donantes
          });

        if (profileError) {
          console.error('Error creating user profile:', profileError);
          throw new Error('Error al crear el perfil del usuario');
        }

        // El onAuthStateChange se encargará de actualizar el usuario
      }
    } catch (error) {
      console.error('Error in register:', error);
      throw error;
    }
  };

  const value = {
    user,
    login,
    logout,
    register,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};