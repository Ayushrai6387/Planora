"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { User, UserRole } from "@/types";
import { auth, keysPresent } from "@/lib/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut as firebaseSignOut } from "firebase/auth";
import { MockService } from "@/lib/mock";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  isDemo: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const isDemo = !keysPresent;

  useEffect(() => {
    if (keysPresent && auth) {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          // In real app, fetch additional user profile from Firestore here
          // For now, we infer role or use a placeholder
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            role: 'participant', // Default or fetched from DB
            collegeId: 'gtbit' // Default for now
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      // Check local storage for mock session
      const stored = localStorage.getItem('planora_demo_user');
      if (stored) {
        setUser(JSON.parse(stored));
      }
      setLoading(false);
    }
  }, []);

  const login = async (role: UserRole) => {
    setLoading(true);
    if (!keysPresent) {
      // Mock Login
      try {
        const demoUser = await MockService.login(role);
        setUser(demoUser);
        localStorage.setItem('planora_demo_user', JSON.stringify(demoUser));
        if (role === 'host') router.push('/dashboard/host');
        else if (role === 'participant') router.push('/dashboard/participant');
        else router.push('/dashboard/guest');
      } catch (error) {
        console.error("Mock login failed", error);
      }
    } else {
      // Real Firebase Login would go here (omitted for brevity in this snippet as we need UI for email/pass)
      // We will implement specific login pages for that.
      // This is just a helper for the "Quick Demo" buttons if they use this context.
    }
    setLoading(false);
  };

  const logout = async () => {
    if (keysPresent && auth) {
      await firebaseSignOut(auth);
    } else {
      localStorage.removeItem('planora_demo_user');
    }
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isDemo }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
