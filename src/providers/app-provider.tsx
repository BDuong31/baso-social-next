import { AuthProvider } from '@/context/auth-context';
import QueryProvider from '@/providers/query-provider/query-provider';
import { SessionProvider } from "next-auth/react";
import { I18nextProvider } from 'react-i18next';
import i18n from '@/utils/i18n';
import React from 'react';

interface AppProvidersProps {
    children: React.ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
    return (
            <AuthProvider>
                <SessionProvider>
                    <QueryProvider>
                        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
                    </QueryProvider>
                </SessionProvider>
            </AuthProvider>
    );
}
