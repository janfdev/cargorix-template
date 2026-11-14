import { createFileRoute, useNavigate } from '@tanstack/react-router';
import React, { useState } from 'react';
import { Truck, ShieldCheck, ArrowRight, Lock, Mail, AlertCircle } from 'lucide-react';
import { setAuthUser } from '@/lib/auth';

export const Route = createFileRoute('/login')({
  component: LoginComponent,
});

function LoginComponent() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@cargorix.corp');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Authentication failed');
      }

      setAuthUser(data.user);
      window.location.href = '/live-map';
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-4 py-12 relative overflow-hidden">
      {/* Background radial accent glow */}
      <div className="absolute -top-40 -left-40 size-96 rounded-full bg-[#9de500]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 size-96 rounded-full bg-[#9de500]/10 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-[#9de500] text-[#161b1d] font-bold shadow-lg shadow-[#9de500]/20 mb-2">
            <Truck className="size-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Cargorix Cockpit</h1>
          <p className="text-xs text-muted-foreground font-mono">
            Logistics & Fleet Operations Platform
          </p>
        </div>

        {/* Card Form */}
        <div className="p-6 rounded-3xl border border-border bg-card shadow-xl space-y-5">
          <div className="space-y-1">
            <h2 className="text-sm font-semibold text-foreground">Sign In to Workspace</h2>
            <p className="text-xs text-muted-foreground">
              Enter your corporate credentials to access real-time dispatch.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center gap-2">
              <AlertCircle className="size-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-medium text-foreground flex items-center gap-1.5">
                <Mail className="size-3.5 text-muted-foreground" />
                <span>Work Email</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="operator@cargorix.corp"
                className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-[#9de500] font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-medium text-foreground flex items-center gap-1.5">
                <Lock className="size-3.5 text-muted-foreground" />
                <span>Password</span>
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-[#9de500] font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-[#9de500] text-[#161b1d] font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:bg-[#9de500]/90 transition-all disabled:opacity-50"
            >
              <span>{loading ? 'Verifying...' : 'Authenticate & Enter'}</span>
              <ArrowRight className="size-3.5" />
            </button>
          </form>

          {/* Demo hint */}
          <div className="pt-3 border-t border-border/60 text-[11px] text-muted-foreground space-y-1 font-mono">
            <div className="flex items-center gap-1.5 text-foreground font-semibold">
              <ShieldCheck className="size-3.5 text-[#9de500]" />
              <span>PostgreSQL Production Demo Account:</span>
            </div>
            <p>Email: <span className="text-foreground font-medium">admin@cargorix.corp</span></p>
            <p>Password: <span className="text-foreground font-medium">admin123</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
