import { CustomError } from '@application/Error/Error';
import { User, UserStatus } from '@domain/Models';
import { IAccountRepository } from '@domain/Repository';

export interface IAdminService {
    GetAllUsers(pending?: string): Promise<User[]>;
    ActivateUser(id: string): Promise<void>;
    GetUser(id: string): Promise<User>;
    MakeAdmin(id: string): Promise<void>;
    // editUser(id: string): Promise<User>;
    DeleteUser(id: string): Promise<void>;
}

export class AdminService implements IAdminService {
    constructor(private acctrepo: IAccountRepository) {
        this.acctrepo = acctrepo;
    }

    async GetAllUsers(pending = 'false'): Promise<User[]> {
        if (pending === 'true') {
            const users = await this.acctrepo.getUsers(true);
            return users;
        }
        const users = await this.acctrepo.getUsers();
        return users;
    }

    async GetUser(id: string): Promise<User> {
        const user = await this.acctrepo.getUserById(id);
        delete user.password;
        return user;
    }

    async ActivateUser(id: string): Promise<void> {
        const user = await this.acctrepo.getUserById(id);
        if (!user) {
            throw new CustomError('User not found', 400);
        }
        if (user.status === UserStatus.ACTIVE) {
            return;
        }
        await this.acctrepo.activateUser(id);
    }

    async MakeAdmin(id: string): Promise<void> {
        await this.acctrepo.makeAdmin(id);
    }

    async DeleteUser(id: string): Promise<void> {
        await this.acctrepo.deleteUser(id);
    }
}
