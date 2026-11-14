import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import type { QueryClient } from '@tanstack/react-query';
import React from 'react';
import { SidebarWrapper } from '@/components/SidebarWrapper';
import { SiteHeader } from '@/components/SiteHeader';
import { ThemeCustomizer } from '@/components/ThemeCustomizer';

export interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased font-sans">
      <SidebarWrapper>
        <div className="flex min-h-screen flex-1 flex-col">
          <SiteHeader />
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </SidebarWrapper>
      <ThemeCustomizer />
    </div>
  );
}
