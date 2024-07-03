import { CustomError } from '@application/Error/Error';
import { generateRandomId, getCurrentTimeStamp } from '@application/Utils';
import { Record, RecordCategory, User } from '@domain/Models';
import { IAccountRepository, IRecordRepository } from '@domain/Repository';
import { UpdateRecordDTO, CreateRecordDTO } from 'API/DTO';

export interface IRecordService {
    CreateRecord(data: CreateRecordDTO, userId: string): Promise<Record>;
    UpdateRecord(
        data: UpdateRecordDTO,
        id: string,
        userId: string,
    ): Promise<Record>;
    GetRecord(id: string, userId: string): Promise<Record>; //will use filter for date
    GetAllRecords(userId: string): Promise<Record[]>; //will use filter for date
    DeleteRecord(id: string, userId: string): Promise<void>;
}

export class RecordService implements IRecordService {
    constructor(private recordrepo: IRecordRepository) {
        this.recordrepo = recordrepo;
    }
    async CreateRecord(data: CreateRecordDTO, userId: string): Promise<Record> {
        const id = generateRandomId();
        const date = getCurrentTimeStamp();

        if (
            !(Object.values(RecordCategory) as string[]).includes(data.category)
        ) {
            throw new CustomError("category must be 'income' or 'expense'");
        }

        const record = {
            id,
            userId,
            ...data,
            createdOn: date,
            lastModifiedOn: date,
        };

        await this.recordrepo.saveRecord(record);
        return record;
    }

    async UpdateRecord(
        data: UpdateRecordDTO,
        id: string,
        userId: string,
    ): Promise<Record> {
        const date = getCurrentTimeStamp();

        if (
            data.category &&
            !(Object.values(RecordCategory) as string[]).includes(data.category)
        ) {
            throw new CustomError("category must be 'income' or 'expense'");
        }

        const record = await this.recordrepo.getRecord(id, userId);

        const newRecord = {
            ...record,
            ...data,
            lastModifiedOn: date,
        } as Record;

        await this.recordrepo.updateRecord(id, newRecord, userId);
        return record;
    }

    async GetRecord(id: string, userId: string): Promise<Record> {
        const record = await this.recordrepo.getRecord(id, userId);
        return record;
    }
    async GetAllRecords(userId: string): Promise<Record[]> {
        const records = await this.recordrepo.getAllUserRecord(userId);
        return records;
    }

    async DeleteRecord(id: string, userId: string): Promise<void> {
        await this.recordrepo.deleteRecord(id, userId);
    }
}
