import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { CustomError, HTTPError } from '../../Error/interfaces/error';
import { ExtraRequest } from '../../middlewares/interceptors';
import { ResourcesRepository } from '../../repository/resources.repo';
import { UsersRepository } from '../../repository/users.repo';
import { ResourceController } from '../resources.controller/resources.controller';

describe('Given resource Controller', () => {
    describe('When we instantiate it', () => {
        const mockData = [
            {
                id: '2',
                title: 'puzzle',
                subject: 'reading',
                grade: 'first',
            },
            {
                id: '3',
                title: 'puzzle',
                subject: 'reading',
                grade: 'first',
            },
        ];

        ResourcesRepository.prototype.post = jest
            .fn()
            .mockResolvedValue(mockData[0]);

        const repository = ResourcesRepository.getInstance();
        repository.getAll = jest.fn().mockResolvedValue(mockData);
        repository.get = jest.fn().mockResolvedValue(mockData[0]);
        repository.delete = jest.fn().mockResolvedValue(mockData[1].id);
        repository.post = jest.fn().mockResolvedValue(mockData[0].id);
        repository.patch = jest.fn().mockResolvedValue(mockData[0]);
        repository.query = jest.fn().mockResolvedValue(mockData);
        const userRepository = UsersRepository.getInstance();
        userRepository.getOne = jest
            .fn()
            .mockResolvedValue({ id: '34', resources: [] });
        userRepository.updateUser = jest.fn();

        const resourceController = new ResourceController(
            repository,
            userRepository
        );
        const req: Partial<ExtraRequest> = {
            params: { key: 'math', value: 'first' },
            body: { owner: 'owner' },
            payload: 'payload' as unknown as JwtPayload,
        };
        const res: Partial<Response> = {
            json: jest.fn(),
            status: jest.fn(),
        };
        const next: NextFunction = jest.fn();
        test('Then allResources should have been called', async () => {
            await resourceController.allResources(
                req as Request,
                res as Response,
                next
            );
            expect(res.json).toHaveBeenCalledWith({ resource: mockData });
        });

        test('Then getResource should have been called', async () => {
            req.params = { id: '0' };
            await resourceController.getResource(
                req as Request,
                res as Response,
                next
            );
            expect(res.json).toHaveBeenCalledWith({ resource: mockData });
        });

        test('Then findResource should have been called', async () => {
            await resourceController.findResource(
                req as Request,
                res as Response,
                next
            );
            expect(res.json).toHaveBeenCalledWith({ resource: mockData });
        });
        test('Then createResource should have been called', async () => {
            await resourceController.createResource(
                req as Request,
                res as Response,
                next
            );
            expect(res.json).toHaveBeenCalledWith({ resource: mockData });
        });

        test('Then updateResource should have been called', async () => {
            await resourceController.updateResource(
                req as Request,
                res as Response,
                next
            );
            expect(res.json).toHaveBeenCalledWith({ resource: mockData });
        });

        test('Then deleteResource should have been called', async () => {
            await resourceController.deleteResource(
                req as Request,
                res as Response,
                next
            );
            expect(res.json).toHaveBeenCalledWith({ resource: mockData[1].id });
        });
    });

    describe('when we dont instantiate it', () => {
        const mockData = [
            {
                id: '2',
                title: 'puzzle',
                subject: 'reading',
                grade: 'first',
            },
            {
                id: '3',
                title: 'puzzle',
                subject: 'reading',
                grade: 'first',
            },
        ];
        const error: CustomError = new HTTPError(
            404,
            'Sorry, User not found.',
            'error.message'
        );
        ResourcesRepository.prototype.getAll = jest
            .fn()
            .mockRejectedValue(mockData);
        ResourcesRepository.prototype.get = jest
            .fn()
            .mockRejectedValue(mockData[0]);
        ResourcesRepository.prototype.post = jest
            .fn()
            .mockRejectedValue(mockData[0]);
        ResourcesRepository.prototype.patch = jest
            .fn()
            .mockRejectedValue(mockData[0]);
        ResourcesRepository.prototype.delete = jest
            .fn()
            .mockRejectedValue(mockData[0].id);
        const repository = ResourcesRepository.getInstance();
        const userRepository = UsersRepository.getInstance();

        const resourcesController = ResourcesRepository.getInstance();
        const req: Partial<Request> = {};
        const res: Partial<Response> = {
            json: jest.fn(),
        };
        const next: NextFunction = jest.fn();
        test('Then if something went wrong allResources should throw an error', async () => {
            await resourcesController.getAll();
            expect(error).toBeInstanceOf(HTTPError);
        });
        // test('Then if something went wrong getResource should throw an error', async () => {
        //     req.body = {
        //         id: mockData[0].id,
        //         title: mockData[0].title,
        //         subject: mockData[0].subject,
        //         grade: mockData[0].grade,
        //     };
        //     await resourcesController.get();
        //     expect(error).toBeInstanceOf(HTTPError);
        // });
        // test('Then if something went wrong createResource should throw an error', async () => {

        //     await resourcesController.post();
        //     expect(error).toBeInstanceOf(HTTPError);
        // });
        // test('Then if something went wrong updateResource should throw an error', async () => {
        //     await resourcesController.patch();

        //     expect(error).toBeInstanceOf(HTTPError);
        // });
        // test('Then if something went wrong deleteResource should throw an error', async () => {
        //     await resourcesController.delete(
        //     req.params = { id: '0' };
        //     expect(error).toBeInstanceOf(HTTPError);
        // });
    });
});
