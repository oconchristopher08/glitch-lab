import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import AuthCallback from "@/pages/AuthCallback";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import BootPage from "@/pages/BootPage";
import ChainsterPage from "@/pages/ChainsterPage";
import GlitchAgentPage from "@/pages/GlitchAgentPage";
import ProfilePage from "@/pages/ProfilePage";
import AppShell from "@/components/system/AppShell";
import ProtectedRoute from "@/components/ProtectedRoute";
import { GatewayProvider } from "@/lib/gateway";
import SystemTape from "@/components/SystemTape";

const queryClient = new QueryClient();

function AppRoutes() {
  return (
    <Switch>
      {/* Landing */}
      <Route path="/" component={Home} />

      {/* Auth */}
      <Route path="/auth/login" component={LoginPage} />
      <Route path="/auth/signup" component={SignupPage} />
      <Route path="/auth/callback" component={AuthCallback} />

      {/* Boot screen (post-login transition) */}
      <Route path="/boot" component={BootPage} />

      {/* /app root → redirect to default module */}
      <Route path="/app">
        {() => <Redirect to="/app/chainster" />}
      </Route>

      {/* Protected OS modules */}
      <Route path="/app/chainster">
        {() => (
          <ProtectedRoute>
            <AppShell>
              <ChainsterPage />
            </AppShell>
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/app/404">
        {() => (
          <ProtectedRoute>
            <AppShell>
              <GlitchAgentPage />
            </AppShell>
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/app/profile">
        {() => (
          <ProtectedRoute>
            <AppShell>
              <ProfilePage />
            </AppShell>
          </ProtectedRoute>
        )}
      </Route>

      {/* Legacy redirect */}
      <Route path="/feed">
        {() => <Redirect to="/app/chainster" />}
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <GatewayProvider>
          <SystemTape />
          <AppRoutes />
        </GatewayProvider>
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
