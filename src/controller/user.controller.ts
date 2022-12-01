import { NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';
import { ResourcesRepo, UserRepo } from '../repository/repo.interface.js';
import { Auth } from '../services/auth/auth.js';
import { Password } from '../services/auth/password.js';

export class UserController {
    password = new Password();
    token = new Auth();

    constructor(
        public readonly repository: UserRepo,
        public readonly resourcesRepo: ResourcesRepo
    ) {}
    async register(req: Request, resp: Response, next: NextFunction) {
        try {
            const user = await this.repository.create(req.body);
            resp.status(200);
            resp.json({ user });
        } catch (error) {
            next();
        }
    }

    async login(req: Request, resp: Response, next: NextFunction) {
        try {
            const user = await this.repository.query('email', req.body.email);
            //            if (user.length === 0) throw new Error('Sorry, User not found.');
            const checkUser = await this.password.validate(
                req.body.password,
                user[0].password
            );
            if (!checkUser) throw new Error('Sorry, password not valid.');
            const token = await this.token.createToken({
                id: user[0].id.toString(),
                name: user[0].name,
            });
            resp.status(200).json({ token });
        } catch (error) {
            next();
        }
    }
}
