import { CustomError } from '@application/Error/Error';
import {
    decryptPassword,
    encryptPassword,
    generateAuthToken,
    generateRandomId,
    getCurrentTimeStamp,
} from '@application/Utils';
import { User, UserRole, UserStatus } from '@domain/Models';
import { IAccountRepository } from '@domain/Repository';
import { LoginDTO, SignUpDTO } from 'API/DTO';

export interface IAccountService {
    SignUp(data: SignUpDTO): Promise<void>;
    Login(data: LoginDTO): Promise<{ token: string; user: User }>;
    GetUser(id: string): Promise<User>;
    // UpdateProfile(data: )
}

export class AccountService implements IAccountService {
    constructor(private acctrepo: IAccountRepository) {
        this.acctrepo = acctrepo;
    }

    async SignUp(data: SignUpDTO): Promise<void> {
        const emailExists = await this.acctrepo.getUserByEmail(data.email);

        if (emailExists) {
            throw new CustomError(
                'Account already exists, Log in instead.',
                400,
            );
        }
        const password = await encryptPassword(data.password);
        const id = generateRandomId();

        const date = getCurrentTimeStamp();

        const user = {
            id,
            username: data.username,
            password,
            email: data.email,
            role: UserRole.USER,
            status: UserStatus.PENDING,
            createdOn: date,
            lastModifiedOn: date,
        };

        // No time to add email verification
        await this.acctrepo.saveUser(user);
    }

    async Login(data: LoginDTO): Promise<{ token: string; user: User }> {
        const user = await this.acctrepo.getUserByEmail(data.email);
        console.log(data.email);
        if (!user) {
            throw new CustomError('Account not found', 400);
        }
        const validPassword = await decryptPassword(
            data.password as string,
            user.password as string,
        );
        if (!validPassword) {
            throw new CustomError('Invalid username or password', 400);
        }

        const token = generateAuthToken(
            user.id!,
            user.email,
            user.role === UserRole.ADMIN,
        );

        delete user.password;

        return { token, user };
    }

    async GetUser(id: string): Promise<User> {
        const user = await this.acctrepo.getUserById(id);

        delete user.password;

        return user;
    }
}
