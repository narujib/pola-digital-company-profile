"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { loginRequest } from "@/features/auth/auth.api";
import {
  getToken,
  setToken,
  setUser,
  getUser,
  clearAuth,
  type StoredUser,
} from "@/lib/auth-storage";
import { ApiError } from "@/lib/http";

// ==========================================
// Types
// ==========================================

interface AuthContextValue {
  isAuthenticated: boolean;
  user: StoredUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// ==========================================
// Context
// ==========================================

const AuthContext = createContext<AuthContextValue | null>(null);

// ==========================================
// Provider
// ==========================================

export function AuthProvider({ children }: { children: ReactNode }) {
  // Start with server-safe defaults to avoid hydration mismatch
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUserState] = useState<StoredUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Hydrate from localStorage after mount (client-only)
  useEffect(() => {
    const token = getToken();
    const storedUser = getUser();

    if (token && storedUser) {
      setIsAuthenticated(true);
      setUserState(storedUser);
    }

    setLoading(false);
  }, []);

  // Login → call API → save token → set state
  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await loginRequest({ email, password });

      setToken(result.data.token);
      setUser(result.data.user);
      setIsAuthenticated(true);
      setUserState(result.data.user);
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout → clear storage → redirect
  const logout = useCallback(() => {
    clearAuth();
    setIsAuthenticated(false);
    setUserState(null);
    window.location.href = "/admin/login";
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ==========================================
// Hook
// ==========================================

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Re-export ApiError for convenience
export { ApiError };
