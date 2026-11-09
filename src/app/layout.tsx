import "./globals.css";
import React from "react";
import type { Metadata } from "next";
import { SidebarWrapper } from "@/components/SidebarWrapper";

export const metadata: Metadata = {
  title: "Cargorix - Shadcn Logistic App Template",
  description: "Logistics and supply chain admin dashboard for managing orders, shipments, fleet, inventory and warehouses.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="light system"
      style={{
        fontFamily: "'Geist Mono', monospace",
        colorScheme: "light",
      } as React.CSSProperties}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@300;400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/assets/css/fonts.css" />
      </head>
      <body className="flex min-h-full w-full flex-auto flex-col antialiased">
        <SidebarWrapper>
          {children}
        </SidebarWrapper>
      </body>
    </html>
  );
}
