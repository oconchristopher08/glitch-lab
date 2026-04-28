import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      setLocation("/auth/login");
    }
  }, [user, loading, setLocation]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="font-mono-tech text-[10px] tracking-[4px] text-[#00ff88]/50 blink">
          ● VERIFYING...
        </div>
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
}
