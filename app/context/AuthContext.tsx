"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { usePathname } from "next/navigation"; // ✅ 현재 경로 가져오기

interface User {
  username?: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname(); // ✅ 현재 경로 감지

  async function fetchUser() {
    try {
      const res = await fetch("/api/session");

      if (!res.ok) {
        if (res.status === 401) {
          setUser(null); // ✅ 로그인 안 된 경우 `null` 설정
        } else {
          throw new Error(`Failed to fetch user: ${res.status}`);
        }
      } else {
        const userData = await res.json();
        setUser(userData);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser(); // ✅ 페이지 변경될 때마다 실행
  }, [pathname]); // ✅ `pathname` 변경 시 실행됨

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
