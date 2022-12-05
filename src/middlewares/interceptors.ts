import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { ErrorMiddlewares } from '../Error/error.management.js';
import { ResourcesRepository } from '../repository/resources.repo.js';
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
    if (!authString || !authString?.startsWith('Bearer'))
        throw new Error('Some of your credentials are not correct.');
    try {
        const token = authString.slice(7);
        req.payload = auth.readToken(token);
        next();
    } catch (error) {
        next(errors.logged(error as Error));
    }
};

export const verifyUser = async (
    req: ExtraRequest,
    res: Response,
    next: NextFunction
) => {
    const errors = new ErrorMiddlewares();
    const repo = ResourcesRepository.getInstance();
    try {
        const resource = await repo.get(req.body.id);
        if (req.payload && resource.owner._id.toString() !== req.payload.id) {
            next();
        }
    } catch (error) {
        next(errors.logged(error as Error));
    }
};
