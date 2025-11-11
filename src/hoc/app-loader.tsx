'use client';

import { FC, PropsWithChildren, useEffect } from 'react';
import { useSession } from 'next-auth/react';

import { useAuthStore } from '@/store';

export const AppLoader: FC<PropsWithChildren> = ({ children }) => {
    const { data: session, status } = useSession();
    const setAuthState = useAuthStore((state) => state.setAuthState);

    useEffect(() => {
        setAuthState(status, session);
    }, [session, status, setAuthState]);

    return <>{children}</>;
};
