import { FC, FormEvent, useState } from 'react';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';

import { ILoginFields, IModal } from '@/types';
import { signInWithCredentials } from '@/actions';

export const LoginForm: FC<Pick<IModal, 'onClose'>> = ({ onClose }) => {
    const [formData, setFormData] = useState<ILoginFields>({
        email: '',
        password: '',
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        await signInWithCredentials(formData.email, formData.password);

        window.location.reload();

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

                    return null;
                }}
            />

            <div className="mt-6 flex w-full items-center justify-end gap-4">
                <Button variant="light" onPress={onClose}>
                    Отмена
                </Button>
                <Button color="primary" type="submit">
                    Войти
                </Button>
            </div>
        </Form>
    );
};
