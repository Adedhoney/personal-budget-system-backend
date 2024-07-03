export interface User {
    id?: string;
    username: string;
    password: string;
    email: string;
    role: string;
    status: string;
    createdOn: string;
    lastModifiedOn: string;
}

export enum UserStatus {
    PENDING = 'pending',
    ACTIVE = 'active',
}

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
}
