import { NextFunction, Request, Response } from 'express';
import { userInfo } from 'os';
import { UserErrorController } from '../Error/error.management.js';
import { ResourcesRepo, UserRepo } from '../repository/repo.interface.js';
import { Auth } from '../services/auth/auth.js';
import { Password } from '../services/auth/password.js';

export class UserContoller {
    password = new Password();
    token = new Auth();
    errorUserManagement = new UserErrorController();

    constructor(
        public readonly repository: UserRepo,
        public readonly resourcesRepo: ResourcesRepo
    ) {}
    async register(req: Request, resp: Response, next: NextFunction) {
        try {
            const user = await this.repository.create(req.body);
            resp.json({ user });
        } catch (error) {
            next(this.errorUserManagement);
        }
    }

    async login(req: Request, resp: Response, next: NextFunction) {
        try {
            const user = await this.repository.query('email', req.body.email);
            const checkUser = await this.password.validate(
                req.body.password,
                user[0].password
            );
            const token = await this.token.createToken({
                id: user[0].id.toString(),
                name: user[0].name,
            });
        } catch (error) {
            next(this.errorUserManagement);
        }
    }
}
