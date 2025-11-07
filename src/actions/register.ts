'use server';

import { IRegisterFields } from '@/types';
import { prisma, saltAndHashPassword } from '@/utils';

export const registerUser = async ({ email, password, confirmPassword }: IRegisterFields) => {
    if (confirmPassword !== password) return { error: 'Пароли не совпадают' };

    if (password.length < 6) return { error: 'Пароль должен быть не менее 6 символов' };

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) return { error: 'Пользователь с таким email уже существует' };

        const pwHash = await saltAndHashPassword(password);

        const user = await prisma.user.create({
            data: {
                email,
                password: pwHash,
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
