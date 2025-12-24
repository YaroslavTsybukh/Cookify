import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { IAuthStore } from '@/types';

export const useAuthStore = create<IAuthStore>()(
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
