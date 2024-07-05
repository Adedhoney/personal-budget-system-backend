import { IBaseRequest } from '@application/Request/Request';
import { successResponse } from '@application/Utils';
import { LoginDTO, SignUpDTO } from 'API/DTO';
import { IAccountService } from 'Service';
import { NextFunction, Request, RequestHandler, Response } from 'express';

export class AccountController {
    constructor(private readonly service: IAccountService) {
        this.service = service;
    }

    signUp: RequestHandler = async (
        req: IBaseRequest<SignUpDTO>,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            await this.service.SignUp(req.body.data);

            return successResponse(res, 'SignUp Successful');
        } catch (err) {
            next(err);
        }
    };

    login: RequestHandler = async (
        req: IBaseRequest<LoginDTO>,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const data = await this.service.Login(req.body.data);

            return successResponse(res, 'Login Successful', { ...data });
        } catch (err) {
            next(err);
        }
    };

    getUser: RequestHandler = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const user = await this.service.GetUser(res.locals.authData.id);

            return successResponse(res, 'User', { user });
        } catch (err) {
            next(err);
        }
    };
}
