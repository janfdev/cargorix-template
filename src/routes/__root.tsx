import { createRootRouteWithContext, Outlet, useRouterState, Navigate } from '@tanstack/react-router';
import type { QueryClient } from '@tanstack/react-query';
import React from 'react';
import { SidebarWrapper } from '@/components/SidebarWrapper';
import { ThemeCustomizer } from '@/components/ThemeCustomizer';
import { isAuthenticated } from '@/lib/auth';

export interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const isLoginPage = currentPath === '/login';
  const authed = isAuthenticated();

  // If not logged in and trying to access private dashboard, redirect to /login
  if (!authed && !isLoginPage) {
    return <Navigate to="/login" />;
  }

  // If on login page, render clean login without sidebar
  if (isLoginPage) {
    return (
      <div
        className="min-h-screen bg-background text-foreground antialiased"
        style={{ fontFamily: "'Geist Mono', ui-monospace, monospace" }}
      >
        <Outlet />
        <ThemeCustomizer />
      </div>
    );
  }

  // Authenticated: Render full logistics workspace with sidebar
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
