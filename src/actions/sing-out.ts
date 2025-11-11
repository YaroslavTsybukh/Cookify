'use server';

import { signOut } from '@/auth/auth';

export const signOutFunc = async () => {
    try {
        return await signOut({ redirect: false });
    } catch (e) {
        if (e instanceof Error) {
            console.error('Ошибка авторизации', e);

            throw e;
        }
    }
};
