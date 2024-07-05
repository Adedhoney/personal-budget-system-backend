import config from '@application/Config/config';
import { readFileSync } from 'fs';
import mysql, { Pool, PoolConnection, PoolOptions } from 'mysql2/promise';

export type QueryParams = string | number | boolean | undefined;

export interface IDatabase {
    getConnection(): Promise<PoolConnection>;
    excute(query: string, params?: QueryParams[]): Promise<any[]>;
}

export class Database implements IDatabase {
    private connection: Pool;
    private connectionObject: PoolOptions = {
        host: config.DATABASE.host,
        user: config.DATABASE.user,
        password: config.DATABASE.password,
        database: config.DATABASE.database,
        port: config.DATABASE.port,
        ssl: {
            rejectUnauthorized: true,
            ca: config.DATABASE.ca,
        },
    };

    constructor() {
        this.connection = mysql.createPool(this.connectionObject);
    }

    async getConnection(): Promise<PoolConnection> {
        return await this.connection.getConnection();
    }

    async excute(query: string, params: QueryParams[] = []): Promise<any[]> {
        const [rows] = await this.connection.execute(query, params);
        return rows.constructor === Array ? rows : [rows];
    }
}
