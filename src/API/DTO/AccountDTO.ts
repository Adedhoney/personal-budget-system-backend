export interface SignUpDTO {
    username: string;
    password: string;
    email: string;
}

export interface LoginDTO {
    password: string;
    email: string;
}

export interface ActivateUserDTO {
    id: string;
}

// export interface UpdateUserDTO{

// }
