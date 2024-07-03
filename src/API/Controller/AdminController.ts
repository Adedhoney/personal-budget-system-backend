import { IBaseQueryRequest } from '@application/Request/Request';
import { successResponse } from '@application/Utils';
import { IAdminService } from 'Service';
import { NextFunction, Request, RequestHandler, Response } from 'express';

export class AdminController {
    constructor(private readonly service: IAdminService) {
        this.service = service;
    }

    getAllUsers: RequestHandler = async (
        req: IBaseQueryRequest<{ pending?: string }>,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const users = await this.service.GetAllUsers(req.query.pending);

            return successResponse(res, 'Users', { users });
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
            const user = await this.service.GetUser(req.params.userId);

            return successResponse(res, 'User', { user });
        } catch (err) {
            next(err);
        }
    };

    activateUser: RequestHandler = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            await this.service.ActivateUser(req.params.userId);

            return successResponse(res, 'User Activated Successfully');
        } catch (err) {
            next(err);
        }
    };

    deleteUser: RequestHandler = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            await this.service.DeleteUser(req.params.userId);

            return successResponse(res, 'User Deleted');
        } catch (err) {
            next(err);
        }
    };

    makeAdmin: RequestHandler = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            await this.service.MakeAdmin(req.params.userId);

            return successResponse(res, 'User made admin');
        } catch (err) {
            next(err);
        }
    };
}
