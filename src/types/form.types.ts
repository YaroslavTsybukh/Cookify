export interface ILoginFields {
    email: string;
    password: string;
}

export interface IRegisterFields {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface IIngredientsFields {
    name: string;
    category: string;
    unit: string;
    pricePerUnit: null | number;
    description: string;
}
