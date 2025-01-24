import type { Metadata } from 'next';
import React from 'react';

import AppProviders from '@/providers/app-provider';
import { ThemeProvider } from '@/providers/theme-provider/theme-provider';

import './globals.css';

//-----------------------------------------------------------------------------------------------

// export const metadata: Metadata = {
//   title: 'Social Network',
//   description: 'Generated by create next app',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="min-h-screen block relative bg-cushion h-full w-full before:fixed before:inset-0">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppProviders>{children}</AppProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
