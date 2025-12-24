import { Session } from 'next-auth';

import { IIngredient } from '@/types';

type SessionStatus = 'authenticated' | 'unauthenticated' | 'loading';

export interface IAuthStore {
    isAuth: boolean;
    status: SessionStatus;
    session: Session | null;
    setAuthState: (status: SessionStatus, session: Session | null) => void;
}

export interface IIngredientStore {
    ingredients: IIngredient[];
    isLoading: boolean;
    error: string | null;
    addIngredient: (formData: FormData) => void;
}
