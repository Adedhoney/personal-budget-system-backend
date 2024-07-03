export interface CreateRecordDTO {
    date: number;
    description: string;
    category: string;
    amount: number;
}
export interface UpdateRecordDTO {
    date?: number;
    description?: string;
    category?: string;
    amount?: number;
}
