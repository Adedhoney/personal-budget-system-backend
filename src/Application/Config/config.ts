// import { getFileRootDir } from '@application/Utils';
import dotenv from 'dotenv';

dotenv.config();

const envs = [
    'DB_HOST',
    'DB_PASSWORD',
    'DB_PORT',
    'DB_USERNAME',
    'DB_NAME',
    'PORT',
    'NODE_ENV',
    'JWT_SECRET',
    'SUPER_ADMIN_PASSWORD',
    'SUPER_ADMIN_EMAIL',
];

envs.forEach((value, index) => {
    if (!process.env[envs[index]]) {
        const message = 'Fatal Error: env ' + envs[index] + ' not defined';

        throw new Error(message);
    }
});

export default {
    ENVIRONMENT: process.env.NODE_ENV,
    PORT: Number(process.env.PORT),
    DATABASE: {
        port: Number(process.env.DB_PORT) || 3306,
        host: process.env.DB_HOST as string,
        user: process.env.DB_USERNAME as string,
        password: process.env.DB_PASSWORD as string,
        database: process.env.DB_NAME as string,
    },
    JWT_SECRET: process.env.JWT_SECRET,
    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD,
    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL,
};
