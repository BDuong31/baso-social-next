import { AuthProvider } from '@/context/auth-context';
import QueryProvider from '@/providers/query-provider/query-provider';
import { SessionProvider } from "next-auth/react";
import React from 'react';

interface AppProvidersProps {
    children: React.ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
    return (
            <AuthProvider>
                <SessionProvider>
                    <QueryProvider>{children}</QueryProvider>
                </SessionProvider>
            </AuthProvider>
    );
}
