import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Geist, Geist_Mono } from 'next/font/google';

import { siteConfig, layoutConfig } from '@/config';
import { Header } from '@/components';
import { Providers } from '@/providers/provider';
import { auth } from '@/auth/auth';
import './globals.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: siteConfig.title,
    description: siteConfig.description,
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();

    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Providers>
                    <SessionProvider session={session}>
                        <Header />
                        <main
                            className="flex w-full flex-col items-center justify-start"
                            style={{ height: `calc(100vh - ${layoutConfig.headerHeight} - ${layoutConfig.footerHeight})` }}
                        >
                            {children}
                        </main>
                        <footer className="flex w-full items-center justify-center py-3" style={{ height: layoutConfig.footerHeight }}>
                            <p>{siteConfig.description}</p>
                        </footer>
                    </SessionProvider>
                </Providers>
            </body>
        </html>
    );
}
