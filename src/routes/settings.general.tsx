import { createFileRoute } from '@tanstack/react-router';
import React from 'react';
import { useQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/settings/general')({
  component: SettingsGeneralComponent,
});


function SettingsGeneralComponent() {
  return (
    <main className="size-full flex-1 px-4 py-6 sm:px-6 mx-auto max-w-360 space-y-6">
      <div><h1 className="text-3xl font-bold tracking-tight">General Settings</h1><p className="text-muted-foreground mt-1 text-sm">Organization preferences, dispatch defaults, and regional timezone.</p></div>
      <div className="p-6 rounded-2xl border border-border bg-card max-w-xl space-y-3 text-xs">
        <div><label className="text-muted-foreground">Company Name</label><input type="text" defaultValue="Cargorix Metro Logistics Corp" className="w-full mt-1 p-2 rounded-lg border border-border bg-background font-medium" /></div>
        <div><label className="text-muted-foreground">Primary Dispatch Hub</label><input type="text" defaultValue="Queens Central Distribution Hub" className="w-full mt-1 p-2 rounded-lg border border-border bg-background font-medium" /></div>
        <button className="px-4 py-2 rounded-xl bg-[#9de500] text-[#161b1d] font-bold">Save Settings</button>
      </div>
    </main>
  );
}
