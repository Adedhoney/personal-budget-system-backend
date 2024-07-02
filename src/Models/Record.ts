export interface User {
    id?: string;
    userId: string;
    date: string;
    description: string;
    category: string;
    amount: number;
}

export enum Category {
    INCOME = 'income',
    EXPENSE = ' expense',
}
