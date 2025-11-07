import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { IAuth } from '@/types';

export const useAuthStore = create<IAuth>()(
    devtools((set) => ({
        isAuth: false,
        status: 'loading',
        session: null,
        setAuthState: (status, session) =>
            set(
                {
                    isAuth: status === 'authenticated',
                    status,
                    session,
                },
                undefined,
                'auth/setAuthState',
            ),
    })),
);
