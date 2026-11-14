import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import type { QueryClient } from '@tanstack/react-query';
import React from 'react';
import { SidebarWrapper } from '@/components/SidebarWrapper';
import { ThemeCustomizer } from '@/components/ThemeCustomizer';

export interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div
      className="min-h-screen bg-background text-foreground antialiased"
      style={{ fontFamily: "'Geist Mono', ui-monospace, monospace" }}
    >
      <SidebarWrapper>
        <Outlet />
      </SidebarWrapper>
      <ThemeCustomizer />
    </div>
  );
}
