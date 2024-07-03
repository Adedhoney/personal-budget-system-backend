export interface User {
    id?: string;
    username: string;
    password?: string;
    email: string;
    role: string;
    status: string;
    createdOn?: number;
    lastModifiedOn?: number;
}

export enum UserStatus {
    PENDING = 'pending',
    ACTIVE = 'active',
}

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
}
