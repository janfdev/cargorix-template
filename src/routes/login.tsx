import { createFileRoute, Link } from '@tanstack/react-router';
import React, { useState } from 'react';
import { Truck, ArrowRight, Lock, Mail, AlertCircle, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { setAuthUser } from '@/lib/auth';

export const Route = createFileRoute('/login')({
  component: LoginComponent,
});

function LoginComponent() {
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
        throw new Error(data.error || 'Invalid email or password');
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
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-background antialiased font-mono">
      {/* Left Column: Form Panel */}
      <div className="flex flex-col justify-between p-6 sm:p-12 lg:p-16 border-r border-border">
        {/* Brand mark */}
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-[#9de500] text-[#161b1d] font-bold shadow-xs">
            <Truck className="size-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-foreground font-sans">Cargorix</span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">Logistics Cockpit</span>
          </div>
        </div>

        {/* Center: Auth Box */}
        <div className="w-full max-w-sm mx-auto my-12 space-y-6">
          <div className="space-y-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-foreground font-sans">Welcome back</h1>
            <p className="text-xs text-muted-foreground">
              Sign in with your corporate logistics account to access real-time dispatch and GPS telemetry.
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center gap-2.5">
              <AlertCircle className="size-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-foreground flex items-center justify-between">
                <span>Email address</span>
                <span className="text-[10px] text-muted-foreground font-normal">Internal corp only</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="operator@cargorix.corp"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-input bg-card text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-[#9de500] font-mono shadow-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-foreground">Password</label>
                <span className="text-[10px] text-muted-foreground hover:text-foreground cursor-pointer">Forgot password?</span>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-input bg-card text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-[#9de500] font-mono shadow-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-[#9de500] text-[#161b1d] font-bold text-xs flex items-center justify-center gap-2 shadow-xs hover:bg-[#9de500]/90 transition-all disabled:opacity-50 cursor-pointer"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Workspace'}</span>
              <ArrowRight className="size-3.5" />
            </button>
          </form>

          {/* Quick Demo Credentials */}
          <div className="p-3.5 rounded-xl bg-muted/40 border border-border space-y-1.5 text-[11px] text-muted-foreground font-mono">
            <div className="flex items-center justify-between text-foreground font-semibold">
              <span className="flex items-center gap-1.5"><ShieldCheck className="size-3.5 text-[#9de500]" /> Demo Dispatcher</span>
              <button 
                type="button" 
                onClick={() => { setEmail('admin@cargorix.corp'); setPassword('admin123'); }}
                className="text-[10px] text-[#9de500] hover:underline cursor-pointer"
              >
                Auto-fill
              </button>
            </div>
            <p>Email: <span className="text-foreground">admin@cargorix.corp</span></p>
            <p>Password: <span className="text-foreground">admin123</span></p>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="font-bold text-foreground hover:underline text-[#9de500]">
              Create an account
            </Link>
          </p>
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span>&copy; 2026 Cargorix Technologies Inc.</span>
          <span className="flex items-center gap-1"><CheckCircle2 className="size-3 text-[#9de500]" /> Coolify PostgreSQL</span>
        </div>
      </div>

      {/* Right Column: Hero Visual Showcase (Logistics Radar Theme) */}
      <div className="hidden lg:flex flex-col justify-between p-12 lg:p-16 bg-muted/20 relative overflow-hidden">
        {/* Abstract subtle radar graphic pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#9de500_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="relative z-10 flex justify-end">
          <span className="px-3 py-1 rounded-full border border-border bg-card/80 backdrop-blur text-[11px] font-mono text-muted-foreground flex items-center gap-1.5 shadow-xs">
            <span className="size-2 rounded-full bg-[#9de500] animate-pulse" />
            Live Network: 24 Vehicles Online
          </span>
        </div>

        <div className="relative z-10 space-y-6 max-w-lg">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#9de500]/15 text-[#161b1d] dark:text-[#9de500] text-xs font-mono font-bold">
              <Sparkles className="size-3 text-[#9de500]" /> Autonomous Fleet Orchestration
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground leading-tight font-sans">
              Next-generation telemetry for modern freight networks.
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Track multi-stop routes across New York, New Jersey, and Connecticut. Full visibility from warehouse gate to destination dock with sub-second radar latency.
            </p>
          </div>

          {/* Testimonial card */}
          <div className="p-4 rounded-2xl border border-border bg-card/90 backdrop-blur shadow-xs space-y-2">
            <p className="text-xs text-foreground font-medium italic">
              &ldquo;Cargorix transformed our dispatch throughput by 42% in the first quarter alone. The instant route sequencing and live driver telemetry are best-in-class.&rdquo;
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              <img src="/images/avatars/avatar-2.webp" alt="Sarah Johnson" className="size-7 rounded-full object-cover border border-border" />
              <div className="text-[11px] leading-tight">
                <p className="font-bold text-foreground font-sans">Sarah Johnson</p>
                <p className="text-muted-foreground text-[10px]">Head of Regional Dispatch, Metro Corp</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
          <span>System Status: All Systems Operational</span>
          <span>Latency: 18ms</span>
        </div>
      </div>
    </div>
  );
}
