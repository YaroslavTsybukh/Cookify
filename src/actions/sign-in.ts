'use server';

import { signIn } from '@/auth/auth';

export const signInWithCredentials = async (email: string, password: string) => {
    try {
        await signIn('credentials', {
            email,
            password,
            redirect: false,
        });
    } catch (e) {
        if (e instanceof Error) {
            console.error('Ошибка авторизации:', e.message);

            throw e;
        }
    }
};
