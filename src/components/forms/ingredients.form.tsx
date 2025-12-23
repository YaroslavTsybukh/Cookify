'use client';

import { useState, useTransition } from 'react';
import { Input, Form, Select, SelectItem, Button } from '@heroui/react';

import { IIngredientsFields } from '@/types';
import { useIngredientStore } from '@/store';
import { CATEGORY_OPTIONS, UNIT_OPTIONS } from '@/constants/select-options';

const initialState = {
    name: '',
    category: '',
    unit: '',
    pricePerUnit: null as number | null,
    description: '',
};

//TODO: разобрать функцию handleSubmit

export const IngredientsForm = () => {
    const [formData, setFormData] = useState<IIngredientsFields>(initialState);
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();
    const addIngredient = useIngredientStore((state) => state.addIngredient);

    const handleSubmit = (formData: FormData) => {
        startTransition(async () => {
            await addIngredient(formData);

            const storeError = useIngredientStore.getState().error;

            if (storeError) {
                setError(storeError);
            } else {
                setError(null);
                setFormData(initialState);
            }
        });
    };

    return (
        <Form className="w-full" action={handleSubmit}>
            {error && <p className="mb-4 text-red-500">{error}</p>}

            <Input
                isRequired
                name="name"
                type="text"
                placeholder="Введите название ингредиента"
                value={formData.name}
                classNames={{ inputWrapper: 'bg-default-100', input: 'text-sm focus:outline-none' }}
                validate={(value) => {
                    if (!value) return 'Название оябзательно';

                    return null;
                }}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <div className="flex w-full gap-2">
                <div className="w-1/3">
                    <Select
                        isRequired
                        name="category"
                        placeholder="Категория"
                        selectedKeys={formData.category ? [formData.category] : []}
                        classNames={{
                            trigger: 'bg-default-100 w-full',
                            innerWrapper: 'text-sm',
                            value: 'truncate',
                            selectorIcon: 'text-black',
                        }}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                        {CATEGORY_OPTIONS.map((option) => (
                            <SelectItem key={option.value} className="text-black">
                                {option.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                <div className="w-1/3">
                    <Select
                        isRequired
                        name="unit"
                        placeholder="Ед.изменрения"
                        selectedKeys={formData.unit ? [formData.unit] : []}
                        classNames={{
                            trigger: 'bg-default-100 w-full',
                            innerWrapper: 'text-sm',
                            value: 'truncate',
                            selectorIcon: 'text-black',
                        }}
                        onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    >
                        {UNIT_OPTIONS.map((option) => (
                            <SelectItem key={option.value} className="text-black">
                                {option.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                <div className="w-1/3">
                    <Input
                        isRequired
                        name="pricePerUnit"
                        placeholder="Цена"
                        type="number"
                        value={formData.pricePerUnit !== null ? formData.pricePerUnit.toString() : ''}
                        classNames={{
                            inputWrapper: 'bg-default-100',
                            input: 'text-sm focus:outline-none',
                        }}
                        onChange={(e) => {
                            const value = e.target.value ? parseFloat(e.target.value) : null;
                            setFormData({ ...formData, pricePerUnit: value });
                        }}
                        endContent={<span className="text-default-500 pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">₴</span>}
                        validate={(value) => {
                            if (!value) return 'Цена обязательна';

                            if (isNaN(parseFloat(value)) || parseFloat(value) < 0) return 'Цена должна быть положительной';

                            return null;
                        }}
                    />
                </div>
            </div>
            <Input
                name="description"
                placeholder="Введите описание (необязательно)"
                type="text"
                value={formData.description}
                classNames={{
                    inputWrapper: 'bg-default-100',
                    input: 'text-sm focus:outline-none',
                }}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />

            <div className="flex w-full items-center justify-end">
                <Button color="primary" type="submit" isLoading={isPending}>
                    Добавить ингредиент
                </Button>
            </div>
        </Form>
    );
};
