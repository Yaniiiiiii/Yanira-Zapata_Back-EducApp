import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { HTTPError } from '../Error/interfaces/error.js';
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
    const authString = req.get('Authorization');
    if (!authString || !authString?.startsWith('Bearer')) {
        next(
            new HTTPError(
                403,
                'Forbidden',
                'Some of your credentials are not correct.'
            )
        );
        return;
    }
    try {
        const token = authString.slice(7);
        const auth = new Auth();
        req.payload = auth.readToken(token);
        next();
    } catch (error) {
        next(
            new HTTPError(
                403,
                'Forbidden',
                'Some of your credentials are not correct.'
            )
        );
    }
};

export const verifyUser = async (
    req: ExtraRequest,
    res: Response,
    next: NextFunction
) => {
    const repo = ResourcesRepository.getInstance();
    try {
        const resource = await repo.get(req.params.id);
        if (req.payload && resource.owner._id.toString() !== req.payload.id) {
            next(
                new HTTPError(
                    403,
                    'Forbidden',
                    'Some of your credentials are not correct.'
                )
            );
        }
        next();
    } catch (error) {
        next(error);
    }
};
