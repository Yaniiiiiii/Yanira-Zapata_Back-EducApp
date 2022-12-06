import { error } from 'console';
import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { ErrorMiddlewares } from '../Error/error.management.js';

import { UsersRepository } from '../repository/users.repo.js';
import { Auth } from '../services/auth/auth.js';

export interface ExtraRequest extends Request {
    payload?: JwtPayload;
}

export const logged = (
    req: ExtraRequest,
    res: Response,
    next: NextFunction
) => {
    const auth = new Auth();
    const errors = new ErrorMiddlewares();

    const authString = req.get('Authorization');
    if (!authString || !authString?.startsWith('Bearer')) {
        next(
            errors.logged(
                new Error('Some of your credentials are not correct.')
            )
        );
    }
    try {
        const token = (authString as string).slice(7);
        req.payload = auth.readToken(token);
        next();
    } catch (error) {
        next(errors.logged(error as Error));
    }
};

export const verifyUser = async (
    req: ExtraRequest,
    _res: Response,
    next: NextFunction
) => {
    const userRepo = UsersRepository.getInstance();
    try {
        const errors = new ErrorMiddlewares();

        const user = await userRepo.getOne((req.payload as JwtPayload).id);
        if (!req.payload || user.id !== req.payload.id) {
            next(
                errors.logged(
                    new Error('Some of your credentials are not correct.')
                )
            );
        }
        next();
    } catch (error) {
        next(error);
    }
};
