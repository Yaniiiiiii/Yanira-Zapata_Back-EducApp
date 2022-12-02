import { NextFunction, Request, Response } from 'express';
import { ResourcesRepo } from '../../repository/repo.interface.js';
import { UsersRepository } from '../../repository/users.repo.js';

export class ResourceController {
    constructor(
        public readonly repository: ResourcesRepo,
        public readonly userRepo: UsersRepository
    ) {}

    async allResources(req: Request, resp: Response, next: NextFunction) {
        try {
            const resource = await this.repository.getAll();
            resp.json({ resource });
        } catch (error) {
            next();
        }
    }
    async getResource(req: Request, resp: Response, next: NextFunction) {
        try {
            const resource = await this.repository.get(req.params.id);
            resp.json({ resource });
        } catch (error) {
            next();
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
            next();
        }
    }
    async createResource(req: Request, resp: Response, next: NextFunction) {
        try {
            const user = await this.repository.get(req.params.id);
            resp.json({ user });
            const resource = await this.repository.post(req.body);
            resp.json({ resource });
        } catch (error) {
            next();
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
            next();
        }
    }
    async deleteResource(req: Request, resp: Response, next: NextFunction) {
        try {
            const resource = await this.repository.delete(req.params.id);
            resp.json({ resource });
        } catch (error) {
            next();
        }
    }
}
