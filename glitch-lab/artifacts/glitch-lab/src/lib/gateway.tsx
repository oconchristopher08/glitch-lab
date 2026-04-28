import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { useLocation } from "wouter";
import BootOverlay from "@/components/BootOverlay";
import { createClient } from "@/lib/supabase/client";

type GatewayCtx = {
  enterLab: (target?: string) => void;
};

const Ctx = createContext<GatewayCtx | null>(null);

export function GatewayProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(false);
  const [target, setTarget] = useState("/app/chainster");
  const [, setLocation] = useLocation();

  const enterLab = useCallback(async (t = "/app/chainster") => {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      setLocation("/auth/login");
      return;
    }
    setTarget(t);
    setActive(true);
  }, [setLocation]);

  const handleComplete = useCallback(() => {
    setLocation(target);
    setActive(false);
  }, [setLocation, target]);

  return (
    <Ctx.Provider value={{ enterLab }}>
      {children}
      {active && <BootOverlay onComplete={handleComplete} />}
    </Ctx.Provider>
  );
}

export function useGateway(): GatewayCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useGateway must be used inside <GatewayProvider>");
  return ctx;
}
