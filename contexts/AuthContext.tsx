"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../lib/api";

interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  fullName: string;
  phoneNumber: string;
  profilePictureUrl: string | null;
  userType: string;
  accountStatus: string;
  authProvider: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  twoFactorEnabled: boolean;
  lastLoginAt: string;
  passwordChangedAt: string;
  accountLockedUntil: string | null;
  failedLoginAttempts: number;
  termsAcceptedAt: string | null;
  privacyPolicyAcceptedAt: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: string | null;
  updatedBy: string | null;
  deletedAt: string | null;
  deletedBy: string | null;
  roles: string[] | null;
  attributes: Record<string, string>;
  isDeleted: boolean;
  isAccountLocked: boolean;
  isAccountActive: boolean;
}

interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
    user: User;
    permissions: string[];
    roles: string[];
    loginTime: string;
    requiresPasswordChange: boolean;
    requiresTwoFactor: boolean;
  };
  timestamp: string;
}

interface AuthContextType {
  user: User | null;
  permissions: string[];
  roles: string[];
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (usernameOrEmail: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Try different parameter combinations that your backend might expect
      const loginPayloads = [
        { usernameOrEmail, password }, // Your current format
        { username: usernameOrEmail, password }, // Alternative format 1
        { email: usernameOrEmail, password }, // Alternative format 2 (if email)
      ];

      let response;
      let lastError;

      // Try each payload format
      for (const payload of loginPayloads) {
        try {
          response = await api.post<LoginResponse>("/auth/login", payload);
          break; // Success, exit loop
        } catch (error: any) {
          lastError = error;
          console.log(`Login attempt with payload ${JSON.stringify(payload)} failed:`, error.response?.data?.message);
        }
      }

      // If all attempts failed, throw the last error
      if (!response) {
        throw lastError;
      }

      const { data } = response.data;

      if (!data?.accessToken || !data?.user) {
        throw new Error("No token or user received from server.");
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("permissions", JSON.stringify(data.permissions));
        localStorage.setItem("roles", JSON.stringify(data.roles));
      }

      setUser(data.user);
      setPermissions(data.permissions);
      setRoles(data.roles);
      setIsAuthenticated(true);
    } catch (error: any) {
      console.error("Login error:", error);
      console.error("Error response:", error?.response?.data);
      throw error?.response?.data?.message || error?.message || "Login failed.";
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      localStorage.removeItem("permissions");
      localStorage.removeItem("roles");
    }

    setUser(null);
    setPermissions([]);
    setRoles([]);
    setIsAuthenticated(false);
  };

  const checkAuth = async () => {
    try {
      setIsLoading(true);

      if (typeof window === "undefined") {
        setIsAuthenticated(false);
        return;
      }

      const token = localStorage.getItem("accessToken");

      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      const storedUser = localStorage.getItem("user");
      const storedPermissions = localStorage.getItem("permissions");
      const storedRoles = localStorage.getItem("roles");

      if (storedUser && storedPermissions && storedRoles) {
        setUser(JSON.parse(storedUser));
        setPermissions(JSON.parse(storedPermissions));
        setRoles(JSON.parse(storedRoles));
        setIsAuthenticated(true);
      } else {
        logout();
      }
    } catch (error) {
      console.error("Auth check error:", error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value: AuthContextType = {
    user,
    permissions,
    roles,
    isLoading,
    isAuthenticated,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};