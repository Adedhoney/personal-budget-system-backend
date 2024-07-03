export interface Record {
    id?: string;
    userId: string;
    date: string;
    description: string;
    category: string;
    amount: number;
    createdOn: string;
    lastModifiedOn: string;
}

export enum RecordCategory {
    INCOME = 'income',
    EXPENSE = ' expense',
}
