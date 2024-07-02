export interface User {
    id?: string;
    username: string;
    password: string;
    email: string;
    role: string;
    status: string;
}

export enum Status {
    PENDING = 'pending',
    ACTIVE = 'active',
}

export enum Role {
    USER = 'user',
    ADMIN = 'admin',
}
