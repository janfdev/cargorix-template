import { createFileRoute } from '@tanstack/react-router';
import React from 'react';
import { useQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/settings/team')({
  component: SettingsTeamComponent,
});


function SettingsTeamComponent() {
  const { data: team = [] } = useQuery({
    queryKey: ['team'],
    queryFn: async () => [
      { name: 'Ethan Brooks', role: 'Fleet Operations Lead', email: 'ethan@cargorix.corp', avatar: '/images/avatars/avatar-1.webp' },
      { name: 'Sarah Johnson', role: 'Dispatch Supervisor', email: 'sarah@cargorix.corp', avatar: '/images/avatars/avatar-2.webp' },
      { name: 'Michael Chen', role: 'Senior Logistics Specialist', email: 'chen@cargorix.corp', avatar: '/images/avatars/avatar-3.webp' },
    ]
  });

  return (
    <main className="size-full flex-1 px-4 py-6 sm:px-6 mx-auto max-w-360 space-y-6">
      <div><h1 className="text-3xl font-bold tracking-tight">Team & Users</h1><p className="text-muted-foreground mt-1 text-sm">Internal staff accounts, roles, and dispatch authorizations.</p></div>
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-muted/40 border-b border-border">
            <tr>
              <th className="px-4 py-3 font-semibold text-muted-foreground">Member</th>
              <th className="px-4 py-3 font-semibold text-muted-foreground">Role</th>
              <th className="px-4 py-3 font-semibold text-muted-foreground">Email</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {team.map((t: any) => (
              <tr key={t.email} className="hover:bg-muted/30">
                <td className="px-4 py-3 flex items-center gap-2.5 font-medium"><img src={t.avatar} className="size-7 rounded-full object-cover" /><span>{t.name}</span></td>
                <td className="px-4 py-3 text-muted-foreground">{t.role}</td>
                <td className="px-4 py-3 font-mono">{t.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
