import { createFileRoute } from '@tanstack/react-router';
import React from 'react';
import { useQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/settings/activity')({
  component: SettingsActivityComponent,
});


function SettingsActivityComponent() {
  return (
    <main className="size-full flex-1 px-4 py-6 sm:px-6 mx-auto max-w-360 space-y-6">
      <div><h1 className="text-3xl font-bold tracking-tight">Activity Log</h1><p className="text-muted-foreground mt-1 text-sm">Read-only immutable audit trail of operational dispatch actions.</p></div>
      <div className="p-5 rounded-2xl border border-border bg-card text-xs text-muted-foreground font-mono">2026-11-14 02:45 UTC: System synced with Coolify PostgreSQL cargorix_db.</div>
    </main>
  );
}
