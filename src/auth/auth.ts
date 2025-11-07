import bcryptjs from 'bcryptjs';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Credentials from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import { ZodError } from 'zod';

import { signInSchema } from '@/schema/zod';
import { prisma, getUserFromDb } from '@/utils';

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            name: 'Account',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials) => {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        throw new Error('Email и пароль обязательны');
                    }

                    const { email, password } = await signInSchema.parseAsync(credentials);

                    const user = await getUserFromDb(email);

                    if (!user || !user.password) {
                        throw new Error('Неверный ввод данных');
                    }

                    const isPasswordValid = await bcryptjs.compare(password, user.password);

                    if (!isPasswordValid) {
                        throw new Error('Неверный ввод данных');
                    }

                    return { id: user.id, email: user.email };
                } catch (error) {
                    if (error instanceof ZodError) {
                        return null;
                    }
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
        maxAge: 3600,
    },
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
    },
});
