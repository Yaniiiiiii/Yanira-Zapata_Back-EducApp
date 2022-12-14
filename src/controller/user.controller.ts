import { NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';
import { UserErrorController } from '../Error/error.management.js';
import { ExtraRequest } from '../middlewares/interceptors.js';
import { ResourcesRepo, UserRepo } from '../repository/repo.interface.js';
import { Auth } from '../services/auth/auth.js';
import { Password } from '../services/auth/password.js';
/* istanbul ignore file */
export class UserController {
    password = new Password();
    token = new Auth();
    error = new UserErrorController();

    constructor(
        public readonly repository: UserRepo,
        public readonly resourceRepo: ResourcesRepo
    ) {}
    async register(req: Request, resp: Response, next: NextFunction) {
        try {
            const user = await this.repository.addUser(req.body);
            resp.status(200);
            resp.json({ user });
        } catch (error) {
            next(this.error.register(error as Error));
        }
    }

    async login(req: Request, resp: Response, next: NextFunction) {
        try {
            console.log(1);
            const user = await this.repository.query('email', req.body.email);
            // if (Object.keys(user).length === 0)
            //     throw new Error('Sorry, User not found.');
            // console.log(user, '2');
            const checkUser = await this.password.validate(
                req.body.password,
                user.password
            );
            console.log(3);

            if (!checkUser) throw new Error('Sorry, password not valid.');
            const token = await this.token.createToken({
                id: user.id.toString(),
                name: user.name,
            });
            // console.log(4);
            // resp.status(200);
            // resp.json({ token: token, user: user });
            // console.log(5);
        } catch (error) {
            next(this.error.login(error as Error));
        }
    }

    async deleteUser(req: ExtraRequest, resp: Response, next: NextFunction) {
        try {
            if (!req.payload) throw new Error('Sorry, invalid payload');
            const user = await this.repository.deleteUser(req.payload.id);
            resp.json(user);
        } catch (error) {
            next(this.error.login(error as Error));
        }
    }

    async addFavorites(req: ExtraRequest, resp: Response, next: NextFunction) {
        try {
            if (req.payload === undefined) {
                throw new Error('Invalid payload');
            }
            const user = await this.repository.getOne(req.payload.id);
            const addFav = await this.resourceRepo.get(req.params.id);

            // if (user.favorites.includes(addFav.id)) {
            //     throw new Error('The resource already exist');
            // }

            // user.favorites.push(addFav.id);

            // const userUpdate = await this.repository.updateUser(
            //     user.id.toString(),
            //     {
            //         favorites: user.favorites,
            //     }
            // );

            // resp.status(200);
            // resp.json(userUpdate);
        } catch (error) {
            next(this.error.register(error as Error));
        }
    }

    async deleteFavorites(
        req: ExtraRequest,
        resp: Response,
        next: NextFunction
    ) {
        try {
            if (!req.payload) throw new Error('Not found payload');
            const user = await this.repository.getOne(req.payload.id);

            const deleteFav = await this.resourceRepo.get(req.params.id);

            // const updateWithoutResource = user.favorites.filter(
            //     (resource) => resource.toString() !== deleteFav.id.toString()
            // );

            // const updateUser = await this.repository.updateUser(
            //     user.id.toString(),
            //     {
            //         favorites: updateWithoutResource,
            //     }
            // );

            resp.json(updateUser);
        } catch (error) {
            next(this.error.register(error as Error));
        }
    }
}
