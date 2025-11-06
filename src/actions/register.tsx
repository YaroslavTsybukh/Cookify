'use server';

import { IRegisterFields } from '@/types';
import prisma from '@/utils/prisma';

export const registerUser = async ({ email, password, confirmPassword }: IRegisterFields) => {
    try {
        const user = await prisma.user.create({
            data: {
                email,
                password,
            },
        });

        return user;
    } catch (e) {
        if (e instanceof Error) {
            console.error('Ошибка регистрации', e.message);

            return { error: 'Ошибка при регистрации' };
        }
    }
};
