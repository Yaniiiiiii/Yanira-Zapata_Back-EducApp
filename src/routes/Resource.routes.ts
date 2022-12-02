import { Router } from 'express';
import { ResourceController } from '../controller/resources.controller/resources.controller.js';
import { logged } from '../middlewares/interceptors.js';
import { ResourcesRepository } from '../repository/resources.repo.js';
import { UsersRepository } from '../repository/users.repo.js';

export const ResourceRouter = Router();

export const controller = new ResourceController(
    ResourcesRepository.getInstance(),
    UsersRepository.getInstance()
);

ResourceRouter.get('/', controller.allResources.bind(controller));
ResourceRouter.get('/:id', controller.getResource.bind(controller));
ResourceRouter.get('/:key/:value', controller.findResource.bind(controller));
ResourceRouter.post('/', logged, controller.createResource.bind(controller));
ResourceRouter.patch(
    '/:id',
    logged,
    controller.updateResource.bind(controller)
);
ResourceRouter.delete(
    '/:id',
    logged,
    controller.deleteResource.bind(controller)
);
