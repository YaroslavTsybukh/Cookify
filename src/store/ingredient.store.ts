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

                if (res.success) {
                    set((state) => ({
                        ingredients: [...state.ingredients, res.ingredient],
                        isLoading: false,
                    }));

                    addToast({
                        title: 'Готово',
                        description: 'Ингредиенты успешно добавлены ',
                        color: 'success',
                    });
                } else {
                    set({ isLoading: false, error: res.error });

                    addToast({
                        title: 'Ошибка',
                        description: 'Проверьте данные и повторите попытку',
                        color: 'danger',
                    });
                }
            } catch (e) {
                if (e instanceof Error) {
                    console.error('Error', e);

                    set({ isLoading: false, error: 'Ошибка при добавлении ингредиента' });

                    addToast({
                        title: 'Ошибка',
                        description: 'Не удалось добавить ингредиент. Попробуйте позже',
                        color: 'danger',
                    });
                }
            }
        },
    })),
);
