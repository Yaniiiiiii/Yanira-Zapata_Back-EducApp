import { UserController } from './user.controller';
import { UsersRepository } from '../repository/users.repo';
import { ResourcesRepository } from '../repository/resources.repo';
import { NextFunction, Request, Response } from 'express';
import { ExtraRequest } from '../middlewares/interceptors';

describe('Given the UserController', () => {
    const mockUser = [
        {
            id: '1',
            name: 'Ana',
            email: 'ana@gmail.com',
            passwd: '12345',
            favorites: [],
        },
        {
            id: '2',
            name: 'Julia',
            email: 'julia@gmail.com',
            passwd: '54321',
            favorites: [],
        },
    ];

    const mockResource = [
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

    const mockToken = 'ghjjhyuopsidh12344573198723lpoiu';

    const repository = UsersRepository.getInstance();
    const resourceRepo = ResourcesRepository.getInstance();

    UsersRepository.prototype.getOne = jest.fn().mockResolvedValue(mockUser);
    UsersRepository.prototype.addUser = jest.fn().mockResolvedValue(mockToken);
    UsersRepository.prototype.query = jest.fn().mockResolvedValue(mockUser);
    UsersRepository.prototype.deleteUser = jest
        .fn()
        .mockResolvedValue(mockUser);

    const userController = new UserController(repository, resourceRepo);
    userController.password.validate = jest.fn().mockReturnValue(true);
    userController.token.createToken = jest.fn().mockResolvedValue(mockToken);
    const req: Partial<ExtraRequest> = {
        body: { name: '', passwd: '' },
        payload: {
            id: '1',
        },
    };
    const resp: Partial<Response> = {
        json: jest.fn(),
        status: jest.fn().mockReturnValue(200),
    };

    const next: NextFunction = jest.fn();

    describe('When the register is run', () => {
        test('Then it should return the user', async () => {
            req.body = { name: 'Ana' };
            await userController.register(
                req as ExtraRequest,
                resp as Response,
                next as NextFunction
            );
            expect(resp.status).toHaveBeenCalledWith(200);
            expect(resp.json).toHaveBeenCalled();
        });
    });

    describe('When the login is run and the password is correct', () => {
        test('Then it should return a token', async () => {
            req.body = {
                id: mockUser[0].id,
                name: mockUser[0].name,
                email: mockUser[0].email,
                passwd: mockUser[0].passwd,
            };
            await userController.login(
                req as ExtraRequest,
                resp as Response,
                next as NextFunction
            );
            expect(resp.json).toHaveBeenCalledWith({ token: mockToken });
            expect(resp.status).toHaveBeenCalledWith(200);
        });
    });

    describe('When delete User is run', () => {
        test('Then it should be called with the users token', async () => {
            repository.deleteUser = jest.fn().mockResolvedValue(mockUser[0].id);
            await userController.deleteUser(
                req as ExtraRequest,
                resp as Response,
                next
            );
            expect(resp.json).toHaveBeenCalledWith({
                user: mockToken,
            });
        });

        test('Then it should return', async () => {
            repository.deleteUser = jest.fn().mockResolvedValue(mockUser[0].id);
            await userController.deleteUser(
                req as ExtraRequest,
                resp as Response,
                next
            );
            expect(resp.json).toBeCalledWith(mockUser[0].id);
        });
    });

    describe('When the addFavorites is run', () => {
        test('Then it should return a token', async () => {
            resourceRepo.get = jest.fn().mockResolvedValue(mockResource[0]);
            repository.getOne = jest.fn().mockResolvedValue(mockUser[0]);
            repository.updateUser = jest.fn().mockResolvedValue({
                id: mockUser[0].id,
                name: mockUser[0].name,
                email: mockUser[0].email,
                favorites: [],
                password: mockUser[0].passwd,
            });
            req.body = {
                id: mockUser[0].id,
                name: mockUser[0].name,
                email: mockUser[0].email,
                favorites: mockUser[0].favorites,
                passwd: mockUser[0].passwd,
            };
            req.payload = { id: '1' };
            await userController.addFavorites(
                req as Request,
                resp as Response,
                next
            );
            expect(resp.status).toHaveBeenCalled();
            expect(resp.json).toHaveBeenCalled();
        });
    });

    describe('When the deleteFav is run', () => {
        test('Then it should return a token', async () => {
            resourceRepo.get = jest.fn().mockResolvedValue(mockResource[0]);
            repository.getOne = jest.fn().mockResolvedValue(mockUser[0]);

            req.body = {
                id: mockUser[0].id,
                name: mockUser[0].name,
                email: mockUser[0].email,
                favorites: mockUser[0].favorites,
                passwd: mockUser[0].passwd,
            };
            req.payload = { id: '1' };
            await userController.deleteFavorites(
                req as Request,
                resp as Response,
                next
            );
            expect(resp.status).toHaveBeenCalled();
            expect(resp.json).toHaveBeenCalled();
        });
    });
});
