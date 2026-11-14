import { createFileRoute, Navigate } from '@tanstack/react-router';
import React from 'react';

export const Route = createFileRoute('/')({
  component: () => <Navigate to="/live-map" />,
});
