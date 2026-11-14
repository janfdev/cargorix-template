import { createFileRoute } from '@tanstack/react-router';
import React from 'react';
import { useQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/live-map/$id')({
  component: LiveMapIdComponent,
});


function LiveMapIdComponent() {
  return (
    <main className="size-full flex-1 px-4 py-6 sm:px-6 mx-auto max-w-360 space-y-6">
      <div><h1 className="text-3xl font-bold tracking-tight">Vehicle GPS Detail</h1><p className="text-muted-foreground mt-1 text-sm">Telemetry radar feed for targeted vehicle ID.</p></div>
    </main>
  );
}
