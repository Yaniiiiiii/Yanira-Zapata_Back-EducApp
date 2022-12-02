import { Router } from 'express';
import { ResourceController } from '../controller/resources.controller/resources.controller';
import { ResourcesRepository } from '../repository/resources.repo';
import { UsersRepository } from '../repository/users.repo';

export const ResourceRouter = Router();

export const controller = new ResourceController(
    ResourcesRepository.getInstance(),
    UsersRepository.getInstance()
);

ResourceRouter.get('/', controller.allResources.bind(controller));
ResourceRouter.get('/:id)', controller.getResource.bind(controller));
ResourceRouter.get('/:key/:value', controller.findResource.bind(controller));
ResourceRouter.post('/', controller.createResource.bind(controller));
ResourceRouter.patch('/:id', controller.updateResource.bind(controller));
ResourceRouter.delete('/:id', controller.deleteResource.bind(controller));
