"use client";
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import authManager from "@/handler/AuthManager";
import { AxiosError } from "axios";
import { User } from "@/types/users";
interface AuthContextType {
  user: Partial<User> | User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  login: (email: string, password: string) => Promise<Partial<User>>;
  register: (email: string, password1: string, password2: string, role: string) => Promise<Partial<User>>
  logout: () => Promise<void>;
  changePassword: (newPassword1: string, newPassword2: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  getUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Partial<User> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Fetch user data on mount to maintain session
  useEffect(() => {
    const fetchUserOnLoad = async () => {
      if(isAuthenticated) {
        setLoading(true);
        try {
          await getUser();
          setIsAuthenticated(true);
        } catch {
          setIsAuthenticated(false);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchUserOnLoad();
  }, [isAuthenticated]);

  // Handle login
  const login = async (email: string, password: string): Promise<Partial<User>> => {
    await setUser(null);
    await setLoading(true);
    try {
      await authManager.login(email, password);
      await getUser();
      setIsAuthenticated(true);
      return user!;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Handle registration
  const register = async (email: string, password1: string, password2: string, role: string): Promise<Partial<User>> => {
    setUser(null);
    setLoading(true);
    try {
      await authManager.register(email, password1, password2, role);
      await getUser();
      setIsAuthenticated(true);
      return user!;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const logout = async () => {
    setLoading(true);
    try {
      await authManager.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      setError((err as AxiosError).message || "Logout failed");
    } finally {
      setLoading(false);
    }
  };

  // Change user password
  const changePassword = async (newPassword1: string, newPassword2: string) => {
    setLoading(true);
    try {
      await authManager.changePassword(newPassword1, newPassword2);
    } catch (err) {
      setError((err as AxiosError).message || "Password change failed");
    } finally {
      setLoading(false);
    }
  };

  // Reset user password
  const resetPassword = async (email: string) => {
    setLoading(true);
    try {
      await authManager.resetPassword(email);
    } catch (err) {
      setError((err as AxiosError).message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  // Fetch user data
  const getUser = async () => {
    setLoading(true);
    try {
      const userData = await authManager.getUser();
      await setUser(userData);
      setIsAuthenticated(true);
    } catch (err) {
      setUser(null);
      setIsAuthenticated(false);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        isAuthenticated,
        setIsAuthenticated,
        login,
        register,
        logout,
        changePassword,
        resetPassword,
        getUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth Context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
