export interface Record {
    id?: string;
    userId: string;
    date: number;
    description: string;
    category: string;
    amount: number;
    createdOn: number;
    lastModifiedOn: number;
}

export enum RecordCategory {
    INCOME = 'income',
    EXPENSE = 'expense',
}
