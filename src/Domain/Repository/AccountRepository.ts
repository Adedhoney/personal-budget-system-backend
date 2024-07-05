import { IDatabase } from '@infrastructure/Database';
import { User, UserStatus } from '../Models';

export interface IAccountRepository {
    readonly database: IDatabase;
    saveUser(user: User): Promise<void>;
    getUserById(id: string): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
    getUserByUserName(username: string): Promise<User>;
    getUsers(pending?: boolean): Promise<User[]>;
    updateUser(id: string, user: User): Promise<void>;
    activateUser(id: string): Promise<void>;
    makeAdmin(id: string): Promise<void>;
    deleteUser(id: string): Promise<void>;
    activateSuperAdmin(user: User): Promise<void>;
}

export class AccountRepository implements IAccountRepository {
    constructor(readonly database: IDatabase) {}

    public async activateSuperAdmin(user: User): Promise<void> {
        const connection = await this.database.getConnection();
        await connection.beginTransaction();
        try {
            await connection.query(
                "DELETE FROM users WHERE role = 'superAdmin'",
            );
            await connection.query(
                'INSERT INTO users (id, username, password, email, role, status, createdOn, lastModifiedOn) VALUES(?,?,?,?,?,?,?,?)',
                [
                    user.id,
                    user.username,
                    user.password,
                    user.email,
                    user.role,
                    user.status,
                    user.createdOn,
                    user.lastModifiedOn,
                ],
            );
            await connection.commit();
        } catch (err) {
            console.log({ err });
            await connection.rollback();

            throw new Error((err as Error).message);
        }
    }
    public async saveUser(user: User): Promise<void> {
        await this.database.excute(
            'INSERT INTO users (id, username, password, email, role, status, createdOn, lastModifiedOn) VALUES(?,?,?,?,?,?,?,?)',
            [
                user.id,
                user.username,
                user.password,
                user.email,
                user.role,
                user.status,
                user.createdOn,
                user.lastModifiedOn,
            ],
        );
    }

    public async getUserById(id: string): Promise<User> {
        const user = await this.database.excute(
            `SELECT * FROM users WHERE id = '${id}'`,
        );
        return user[0] as User;
    }

    public async getUserByEmail(email: string): Promise<User> {
        const user = await this.database.excute(
            `SELECT * FROM users WHERE email = '${email}'`,
        );
        return user[0] as User;
    }

    public async getUserByUserName(username: string): Promise<User> {
        const user = await this.database.excute(
            `SELECT * FROM users WHERE username = '${username}'`,
        );
        return user[0] as User;
    }

    public async getUsers(pending = false): Promise<User[]> {
        let where = '';
        if (pending) {
            where = `WHERE status = ${UserStatus.PENDING}`;
        }

        const user = await this.database.excute(
            `SELECT id, username, email, role, status, createdOn, lastModifiedOn FROM users ${where}`,
        );
        return user as User[];
    }

    public async updateUser(id: string, user: User): Promise<void> {
        await this.database.excute(
            `UPDATE users SET username = ?, password = ?, email = ?, lastModifiedOn = ? WHERE id = '${id}'`,
            [user.username, user.password, user.email, user.lastModifiedOn],
        );
    }

    public async activateUser(id: string): Promise<void> {
        await this.database.excute(
            `UPDATE users SET status = 'active' WHERE id = '${id}'`,
        );
    }

    public async makeAdmin(id: string): Promise<void> {
        await this.database.excute(
            `UPDATE users SET role = 'admin' WHERE id = '${id}'`,
        );
    }

    public async deleteUser(id: string): Promise<void> {
        await this.database.excute(`DELETE FROM users WHERE id = '${id}'`);
    }
}
