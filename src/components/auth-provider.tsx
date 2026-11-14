"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

export type UserRole = string | null;

export function getPortalUrl(role?: string | null): string {
  switch (role) {
    case "Admin":
      return "http://localhost:3000";
    case "Sign company":
      return "http://localhost:3002";
    case "Installer":
    case "Photographer":
      return "http://localhost:3003";
    case "Warehouse manager":
    case "Agent":
    case "Assistant":
    case "Team Lead":
    case "Office Manager":
      return "http://localhost:3004";
    default:
      return "http://localhost:3004";
  }
}

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const BACKEND_URL = "http://localhost:5000";
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("auth_token") || localStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      const response = await fetch(`${BACKEND_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        const u = data?.data?.user || data?.user || data?.data;
        if (u && u.email) {
          setUser({
            id: u._id || u.id || "1",
            email: u.email,
            name: u.name || u.email.split("@")[0],
            role: u.role || "Agent",
          });
        }
      } else {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok || data.success === false) {
        throw new Error(data.message || "Invalid email or password");
      }

      const token = data?.data?.accessToken || data?.token;
      const refreshToken = data?.data?.refreshToken;
      const u = data?.data?.user || data?.user;
      if (!token || !u) {
        throw new Error("Invalid response from authentication server");
      }

      localStorage.setItem("auth_token", token);
      localStorage.setItem("token", token);
      if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(u));
      setUser({
        id: u._id || u.id || "1",
        email: u.email || email,
        name: u.name || email.split("@")[0],
        role: u.role || "Agent",
      });

      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch(`${BACKEND_URL}/auth/logout`, { method: "POST", credentials: "include" });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      router.push("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    return {
      user: null,
      isLoading: true,
      isAuthenticated: false,
      login: async () => {},
      logout: async () => {},
      checkAuth: async () => {},
    };
  }
  return context;
}

export function useRequireAuth(role?: UserRole) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, user, role, router]);

  return { user, isLoading };
}
