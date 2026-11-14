import { createFileRoute, Link } from '@tanstack/react-router';
import React, { useState } from 'react';
import { Truck, ArrowRight, Lock, Mail, AlertCircle, CheckCircle2, User, ShieldCheck } from 'lucide-react';
import { setAuthUser } from '@/lib/auth';

export const Route = createFileRoute('/register')({
  component: RegisterComponent,
});

function RegisterComponent() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('DISPATCHER');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password, role }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Registration failed');
      }

      setAuthUser(data.user);
      window.location.href = '/live-map';
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-background antialiased font-mono">
      {/* Left Column: Register Form */}
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

        {/* Center: Register Box */}
        <div className="w-full max-w-sm mx-auto my-8 space-y-6">
          <div className="space-y-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-foreground font-sans">Create an account</h1>
            <p className="text-xs text-muted-foreground">
              Register as an authorized operations dispatcher or fleet coordinator.
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center gap-2.5">
              <AlertCircle className="size-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-3.5 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-foreground">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Alexander Wright"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-input bg-card text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-[#9de500] font-mono shadow-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-foreground">Work Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="a.wright@cargorix.corp"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-input bg-card text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-[#9de500] font-mono shadow-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-input bg-card text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-[#9de500] font-mono shadow-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-foreground">Operational Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-card text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-[#9de500] font-mono shadow-xs"
              >
                <option value="DISPATCHER">Dispatcher (Route & Schedule Management)</option>
                <option value="FLEET_MANAGER">Fleet Manager (Telemetry & Vehicles)</option>
                <option value="LOGISTICS_OPERATOR">Logistics Operator (Warehouse & Stock)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-[#9de500] text-[#161b1d] font-bold text-xs flex items-center justify-center gap-2 shadow-xs hover:bg-[#9de500]/90 transition-all disabled:opacity-50 cursor-pointer pt-2"
            >
              <span>{loading ? 'Creating Account...' : 'Complete Registration'}</span>
              <ArrowRight className="size-3.5" />
            </button>
          </form>

          <p className="text-center text-xs text-muted-foreground">
            Already have an authorized account?{' '}
            <Link to="/login" className="font-bold text-foreground hover:underline text-[#9de500]">
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span>&copy; 2026 Cargorix Technologies Inc.</span>
          <span className="flex items-center gap-1"><CheckCircle2 className="size-3 text-[#9de500]" /> Coolify PostgreSQL</span>
        </div>
      </div>

      {/* Right Column: Hero Visual Showcase */}
      <div className="hidden lg:flex flex-col justify-between p-12 lg:p-16 bg-muted/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#9de500_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="relative z-10 flex justify-end">
          <span className="px-3 py-1 rounded-full border border-border bg-card/80 backdrop-blur text-[11px] font-mono text-muted-foreground flex items-center gap-1.5 shadow-xs">
            <ShieldCheck className="size-3.5 text-[#9de500]" />
            Enterprise RBAC Enforced
          </span>
        </div>

        <div className="relative z-10 space-y-6 max-w-lg">
          <div className="space-y-3">
            <div className="inline-flex px-2.5 py-1 rounded-lg bg-[#9de500]/15 text-[#161b1d] dark:text-[#9de500] text-xs font-mono font-bold">
              Mission Control Architecture
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground leading-tight font-sans">
              Connect your logistics workforce into a single operational brain.
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Every dispatched order, live truck telemetry ping, and warehouse stock movement is synchronized across operators in real time.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3.5 rounded-xl border border-border bg-card/80 backdrop-blur space-y-1">
              <span className="text-[10px] text-muted-foreground uppercase">Orders Synced</span>
              <p className="text-lg font-bold text-foreground font-sans">30+ Live</p>
            </div>
            <div className="p-3.5 rounded-xl border border-border bg-card/80 backdrop-blur space-y-1">
              <span className="text-[10px] text-muted-foreground uppercase">Telemetry Latency</span>
              <p className="text-lg font-bold text-[#9de500] font-sans">&lt; 20ms</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
          <span>Security Protocol: TLS 1.3 / Postgre Dual Engine</span>
          <span>Region: us-east (NYC-1)</span>
        </div>
      </div>
    </div>
  );
}
