import { AuthProvider } from '@/context/auth-context';
import QueryProvider from '@/providers/query-provider/query-provider';
import React from 'react';

interface AppProvidersProps {
    children: React.ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
    return (
        <AuthProvider>
            <QueryProvider>{children}</QueryProvider>
        </AuthProvider>
    );
}