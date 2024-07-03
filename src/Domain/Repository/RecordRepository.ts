import { IDatabase } from '@infrastructure/Database';
import { Record } from '../Models';

export interface IAccountRepository {
    readonly database: IDatabase;
    saveRecord(record: Record): Promise<void>;
    getAllUserRecord(userId: string): Promise<Record[]>;
    getRecord(id: string): Promise<Record>;
    updateRecord(id: string, record: Record): Promise<void>;
    deleteRecord(id: string): Promise<void>;
}

export class AccountRepository implements IAccountRepository {
    constructor(readonly database: IDatabase) {}
    public async saveRecord(record: Record): Promise<void> {
        await this.database.excute(
            'INSERT INTO records (id, userId, date, description, category, amount, createdOn, lastModifiedOn) VALUES(?,?,?,?,?,?,?,?)',
            [
                record.id,
                record.userId,
                record.date,
                record.description,
                record.category,
                record.amount,
                record.createdOn,
                record.lastModifiedOn,
            ],
        );
    }

    public async getAllUserRecord(userId: string): Promise<Record[]> {
        const records = await this.database.excute(
            `SELECT * FROM records WHERE userId = '${userId}'`,
        );
        return records as Record[];
    }

    public async getRecord(id: string): Promise<Record> {
        const record = await this.database.excute(
            `SELECT * FROM records WHERE id = '${id}'`,
        );
        return record[0] as Record;
    }

    public async updateRecord(id: string, record: Record): Promise<void> {
        await this.database.excute(
            `UPDATE records SET date = ?, description =? , category = ? , amount =? , lastModifiedOn) WHERE id = '${id}'`,
            [
                record.date,
                record.description,
                record.category,
                record.amount,
                record.lastModifiedOn,
            ],
        );
    }

    public async deleteRecord(id: string): Promise<void> {
        await this.database.excute(`DELETE FROM records WHERE id = '${id}'`);
    }
}
