'use client';

import { FC, FormEvent, useState } from 'react';
import { Form, Input, Button } from '@heroui/react';

import { IModal, IRegisterFields } from '@/types';
import { registerUser } from '@/actions';

export const RegistrationForm: FC<Pick<IModal, 'onClose'>> = ({ onClose }) => {
    const [formData, setFormData] = useState<IRegisterFields>({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        await registerUser(formData);

        onClose();
    };

    return (
        <Form className="w-full" onSubmit={handleSubmit}>
            <Input
                isRequired
                label="Email"
                labelPlacement="outside"
                name="email"
                placeholder="Введите email"
                type="email"
                value={formData.email}
                className="bg-default-100 text-sm focus:outline-none"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                validate={(value) => {
                    if (!value) return 'Почта обязательна';
                    if (!validateEmail(value)) return 'Некорректный имейл';

                    return null;
                }}
            />

            <Input
                isRequired
                label="Пароль"
                labelPlacement="outside"
                name="password"
                placeholder="Введите пароль"
                type="password"
                value={formData.password}
                className="bg-default-100 text-sm focus:outline-none"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                validate={(value) => {
                    if (!value) return 'Пароль обязателен';
                    if (value.length < 6) return 'Пароль должен быть не менее 6 символов';

                    return null;
                }}
            />

            <Input
                isRequired
                label="Подтвердите пароль"
                labelPlacement="outside"
                name="confirmPassword"
                placeholder="Подтвердите пароль"
                type="password"
                value={formData.confirmPassword}
                className="bg-default-100 text-sm focus:outline-none"
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                validate={(value) => {
                    if (!value) return 'Пароль для подтверждения обязателен';
                    if (value !== formData.password) return 'Пароли не совпадают';

                    return null;
                }}
            />

            <div className="mt-6 flex w-full items-center justify-end gap-4">
                <Button variant="light" onPress={onClose}>
                    Отмена
                </Button>
                <Button color="primary" type="submit">
                    Submit
                </Button>
            </div>
        </Form>
    );
};
