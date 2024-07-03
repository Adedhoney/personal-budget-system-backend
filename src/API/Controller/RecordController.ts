import { IBaseRequest } from '@application/Request/Request';
import { successResponse } from '@application/Utils';
import { CreateRecordDTO, LoginDTO, SignUpDTO, UpdateRecordDTO } from 'API/DTO';
import { IRecordService } from 'Service';
import { NextFunction, Request, RequestHandler, Response } from 'express';

export class RecordController {
    constructor(private readonly service: IRecordService) {
        this.service = service;
    }

    createRecord: RequestHandler = async (
        req: IBaseRequest<CreateRecordDTO>,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const record = await this.service.CreateRecord(
                req.body.data,
                res.locals.authData.id,
            );

            return successResponse(res, 'Record create successful', { record });
        } catch (err) {
            next(err);
        }
    };

    updateRecord: RequestHandler = async (
        req: IBaseRequest<UpdateRecordDTO>,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const record = await this.service.UpdateRecord(
                req.body.data,
                req.params.id,
                res.locals.authData.id,
            );

            return successResponse(res, 'Record update successful', { record });
        } catch (err) {
            next(err);
        }
    };

    getRecord: RequestHandler = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const record = await this.service.GetRecord(
                req.params.id,
                res.locals.authData.id,
            );

            return successResponse(res, 'Record', { record });
        } catch (err) {
            next(err);
        }
    };

    getAllRecords: RequestHandler = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const records = await this.service.GetAllRecords(
                res.locals.authData.id,
            );

            return successResponse(res, 'Record', { records });
        } catch (err) {
            next(err);
        }
    };

    deleteRecord: RequestHandler = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            await this.service.DeleteRecord(
                req.params.id,
                res.locals.authData.id,
            );

            return successResponse(res, 'User Deleted');
        } catch (err) {
            next(err);
        }
    };
}
