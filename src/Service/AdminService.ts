import { User } from '@domain/Models';
import { IAccountRepository } from '@domain/Repository';

export interface IAdminService {
    getAllUsers(): Promise<User[]>;
    getPendingUsers(): Promise<User[]>;
    activateUser(id: string): Promise<void>;
    // editUser(id: string): Promise<User>;
    deleteUser(id: string): Promise<void>;
}

export class AdminService implements IAdminService {
    constructor(private acctrepo: IAccountRepository) {
        this.acctrepo = acctrepo;
    }

    async getAllUsers(): Promise<User[]> {
        const users = await this.acctrepo.getUsers();
        return users;
    }

    async getPendingUsers(): Promise<User[]> {
        const users = await this.acctrepo.getUsers(true);
        return users;
    }

    async activateUser(id: string): Promise<void> {
        await this.acctrepo.activateUser(id);
    }

    async deleteUser(id: string): Promise<void> {
        await this.acctrepo.activateUser(id);
    }
}
