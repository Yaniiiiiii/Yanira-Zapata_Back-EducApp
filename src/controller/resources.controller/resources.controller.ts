import { NextFunction, Request, Response } from 'express';
import { ErrorResourcesController } from '../../Error/error.management.js';
import { ExtraRequest } from '../../middlewares/interceptors.js';
import { ResourcesRepo } from '../../repository/repo.interface.js';
import { UsersRepository } from '../../repository/users.repo.js';

export class ResourceController {
    error = new ErrorResourcesController();
    constructor(
        public readonly repository: ResourcesRepo,
        public readonly userRepo: UsersRepository
    ) {}

    async allResources(req: Request, resp: Response, next: NextFunction) {
        try {
            const resource = await this.repository.getAll();
            resp.json({ resource });
        } catch (error) {
            next(this.error.errorControl(error as Error));
        }
    }
    async getResource(req: Request, resp: Response, next: NextFunction) {
        try {
            const resource = await this.repository.get(req.params.id);
            resp.json({ resource });
        } catch (error) {
            next(this.error.errorControl(error as Error));
        }
    }
    async findResource(req: Request, resp: Response, next: NextFunction) {
        try {
            const resource = await this.repository.query(
                req.params.value,
                req.params.key
            );
            resp.json({ resource });
        } catch (error) {
            next(this.error.errorControl(error as Error));
        }
    }

    async createResource(
        req: ExtraRequest,
        resp: Response,
        next: NextFunction
    ) {
        try {
            if (!req.payload) {
                throw new Error('Invalid payload');
            }
            const user = await this.userRepo.getOne(req.payload.id);
            req.body.owner = user.id;
            const resource = await this.repository.post(req.body);
            user.resources.push(resource.id);
            this.userRepo.updateUser(user.id.toString(), {
                resources: user.resources,
            });
            resp.status(200);
            resp.json({ resource });
        } catch (error) {
            next(this.error.createResource(error as Error));
        }
    }
    async updateResource(req: Request, resp: Response, next: NextFunction) {
        try {
            const resource = await this.repository.patch(
                req.params.id,
                req.body
            );
            resp.json({ resource });
        } catch (error) {
            next(this.error.errorControl(error as Error));
        }
    }
    async deleteResource(req: Request, resp: Response, next: NextFunction) {
        try {
            const resource = await this.repository.delete(req.params.id);
            resp.json({ resource });
        } catch (error) {
            next(this.error.errorControl(error as Error));
        }
    }
}
