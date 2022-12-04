import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { ExtraRequest } from '../../middlewares/interceptors';
import { ResourcesRepository } from '../../repository/resources.repo';
import { UsersRepository } from '../../repository/users.repo';
import { ResourceController } from '../resources.controller/resources.controller';

describe('Given resource Controller', () => {
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

    describe('When we instantiate it', () => {
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
        test('Then if something went wrong allResources should throw an error', async () => {
            repository.getAll = jest.fn().mockRejectedValue(new Error('Error'));

            await resourceController.allResources(
                req as ExtraRequest,
                res as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith('Error');
        });
        test('Then if something went wrong getResource should throw an error', async () => {
            repository.get = jest.fn().mockRejectedValue(new Error('Error'));

            await resourceController.getResource(
                req as ExtraRequest,
                res as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith('Error');
        });
        test('Then if something went wrong findResource should throw an error', async () => {
            repository.get = jest.fn().mockRejectedValue(new Error('Error,'));

            await resourceController.findResource(
                req as ExtraRequest,
                res as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith('Error');
        });
        test('Then if something went wrong createResource should throw an error', async () => {
            repository.post = jest.fn().mockRejectedValue(new Error('Error'));

            await resourceController.createResource(
                req as ExtraRequest,
                res as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith('Error');
        });
        test('Then if something went wrong updateResource should throw an error', async () => {
            repository.patch = jest.fn().mockRejectedValue(new Error('Error'));

            await resourceController.updateResource(
                req as ExtraRequest,
                res as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith('Error');
        });
        test('Then if something went wrong deleteResource should throw an error', async () => {
            repository.delete = jest.fn().mockRejectedValue(new Error('Error'));

            await resourceController.deleteResource(
                req as ExtraRequest,
                res as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith('Error');
        });
    });
});
