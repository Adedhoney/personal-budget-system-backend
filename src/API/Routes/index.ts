import { AccountRepository, RecordRepository } from '@domain/Repository';
import { Database } from '@infrastructure/Database';
import {
    AccountController,
    AdminController,
    RecordController,
} from 'API/Controller';
import { Authentication, Authorization, Validation } from 'API/Middleware';
import {
    CreateRecordSchema,
    LogInSchema,
    SignUpSchema,
    UpdateRecordSchema,
} from 'API/Schema';
import config from '@application/Config/config';
import { AccountService, AdminService, RecordService } from 'Service';

import { Router } from 'express';

const router = Router();
const database = new Database();

const acctrepo = new AccountRepository(database);
const recordrepo = new RecordRepository(database);
const acctservice = new AccountService(acctrepo);
const acctctr = new AccountController(acctservice);
const adminctr = new AdminController(new AdminService(acctrepo));
const recordctr = new RecordController(new RecordService(recordrepo));

const Auth = Authentication(acctrepo);

(async () => {
    await acctservice.ActivateSuperAdmin(
        config.SUPER_ADMIN_EMAIL!,
        config.SUPER_ADMIN_PASSWORD!,
    );
    console.log('Super Admin Activated');
})();

router.post('/account/sign-up', Validation(SignUpSchema), acctctr.signUp);
router.post('/account/login', Validation(LogInSchema), acctctr.login);
router.get('/account', Auth, acctctr.getUser);

router.post(
    '/record',
    Auth,
    Validation(CreateRecordSchema),
    recordctr.createRecord,
);
router.post(
    '/record/update/:id',
    Auth,
    Validation(UpdateRecordSchema),
    recordctr.updateRecord,
);
router.get('/record', Auth, recordctr.getAllRecords);
router.get('/record/:id', Auth, recordctr.getRecord);
router.delete('/record/:id', Auth, recordctr.deleteRecord);

// Admin Routes
router.get('/admin/user', Auth, Authorization, adminctr.getAllUsers); //add ?pending=true for pending users
router.get('/admin/user/:userId', Auth, Authorization, adminctr.getUser);
router.post(
    '/admin/user/activate/:userId',
    Auth,
    Authorization,
    adminctr.activateUser,
);
router.post(
    '/admin/account/make-admin/:userId',
    Auth,
    Authorization,
    adminctr.activateUser,
);
router.delete(
    '/admin/account/:userId',
    Auth,
    Authorization,
    adminctr.activateUser,
);

export { router };
