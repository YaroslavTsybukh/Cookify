import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { addToast } from '@heroui/toast';

import { createIngredient } from '@/actions';
import { IIngredientStore } from '@/types';

export const useIngredientStore = create<IIngredientStore>()(
    devtools((set) => ({
        ingredients: [],
        isLoading: false,
        error: null,
        addIngredient: async (formData: FormData) => {
            set({ isLoading: true, error: null });

            try {
                const res = await createIngredient(formData);

                set((state) => ({
                    ingredients: [...state.ingredients, res],
                    isLoading: false,
                }));

                addToast({
                    title: 'Готово',
                    description: 'Ингредиенты успешно добавлены ',
                    color: 'success',
                });
            } catch (e) {
                const message = e instanceof Error ? e.message : 'Ошибка при добавлении ингредиента';
                console.error('Error', e);

                set({ isLoading: false, error: message });

                addToast({
                    title: 'Ошибка',
                    description: 'Не удалось добавить ингредиент. Попробуйте позже',
                    color: 'danger',
                });
            }
        },
    })),
);
