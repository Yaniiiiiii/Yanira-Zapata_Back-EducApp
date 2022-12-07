import { UserController } from './user.controller';
import { UsersRepository } from '../repository/users.repo';
import { ResourcesRepository } from '../repository/resources.repo';
import { NextFunction, Request, Response } from 'express';
import { ExtraRequest } from '../middlewares/interceptors';
import { Password } from '../services/auth/password';
import { Auth } from '../services/auth/auth';

jest.mock('../services/auth/password');
jest.mock('../services/auth/auth');
Password.prototype.validate = jest.fn().mockReturnValueOnce(true);
Auth.prototype.createToken = jest
    .fn()
    .mockReturnValue('ghjjhyuopsidh12344573198723lpoiu');

describe('Given the UserController', () => {
    const mockResource = [
        {
            id: 'reading',
            title: 'puzzle',
            subject: 'reading',
            grade: 'first',
        },
    ];
    const mockUsers = [
        {
            id: '1',
            name: 'Ana',
            email: 'ana@gmail.com',
            favorites: [mockResource],
        },
        {
            id: '2',
            name: 'Julia',
            email: 'julia@gmail.com',
            favorites: [],
        },
    ];
    const withoutresource = [
        {
            id: '1',
            name: 'Ana',
            email: 'ana@gmail.com',
            favorites: [],
        },
    ];

    const mockToken = 'ghjjhyuopsidh12344573198723lpoiu';

    const repository = UsersRepository.getInstance();
    const resourceRepo = ResourcesRepository.getInstance();
    repository.getOne = jest.fn().mockResolvedValue(mockUsers);
    repository.addUser = jest.fn().mockResolvedValue(mockToken);
    repository.query = jest.fn().mockResolvedValue(mockUsers);
    repository.deleteUser = jest.fn().mockResolvedValue(mockUsers);

    const userController = new UserController(repository, resourceRepo);

    let req: Partial<ExtraRequest> = {
        body: { email: '', password: '' },
        payload: {
            id: '1',
        },
    };
    const resp: Partial<Response> = {};
    (resp.json = jest.fn().mockReturnValue(resp)),
        (resp.status = jest.fn().mockReturnValue(resp));

    const next: NextFunction = jest.fn();

    describe('When the register is run', () => {
        test('Then it should return the user', async () => {
            const user = { name: 'Ana' };
            (repository.addUser as jest.Mock).mockResolvedValueOnce(user);

            await userController.register(
                req as ExtraRequest,
                resp as Response,
                next as NextFunction
            );
            expect(resp.status).toHaveBeenCalledWith(200);
            expect(resp.json).toHaveBeenCalledWith({ user });
        });
    });

    describe('When the register is NOT run', () => {
        test('Then it should return an error', async () => {
            (repository.addUser as jest.Mock).mockRejectedValue(
                new Error('Error')
            );

            await userController.register(
                req as ExtraRequest,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalled();
        });
    });

    describe('When the login is run and the password is correct', () => {
        test('Then it should return a token and the user', async () => {
            (repository.query as jest.Mock).mockReturnValue(mockUsers);

            await userController.login(
                req as ExtraRequest,
                resp as Response,
                next as NextFunction
            );
            expect(resp.json).toHaveBeenCalledWith({
                token: mockToken,
                user: mockUsers,
            });
        });
        test('Then if user does NOT exit, it should return an error', async () => {
            (repository.getOne as jest.Mock).mockRejectedValue(
                new Error('Error')
            );

            await userController.register(
                req as ExtraRequest,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalled();
        });
        test('Then if user does NOT exit, it should return an error', async () => {
            (repository.query as jest.Mock).mockRejectedValue(
                new Error('Error')
            );

            await userController.login(
                req as ExtraRequest,
                resp as Response,
                next as NextFunction
            );
            expect(next).toBeCalled();
        });
    });

    describe('When delete User is run', () => {
        test('Then it should be called with the users token', async () => {
            repository.deleteUser = jest
                .fn()
                .mockResolvedValueOnce(mockUsers[0].id);
            await userController.deleteUser(
                req as ExtraRequest,
                resp as Response,
                next as NextFunction
            );

            expect(resp.json).toHaveBeenCalledWith({
                token: mockToken,
                user: mockUsers,
            });
        });

        test('Then if the payload is not correct it should return an error', async () => {
            repository.deleteUser = jest
                .fn()
                .mockResolvedValue(mockUsers[0].id);
            await userController.deleteUser(
                req as ExtraRequest,
                resp as Response,
                next
            );
            expect(resp.json).toBeCalledWith(mockUsers[0].id);
        });
        // test('Then if there is a http error it should throw an error', async () => {
        //     repository.deleteUser = jest.fn().mockResolvedValueOnce(HTTPError);
        //     await userController.deleteUser(
        //         req as ExtraRequest,
        //         resp as Response,
        //         next
        //     );

        //     expect(next).toBeCalled();
        // });
    });

    describe('When the addFavorites is run', () => {
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
        const mockUsersfav = {
            id: '1',
            name: 'Ana',
            email: 'ana@gmail.com',
            favorites: [mockResource[0]],
        };
        test('Then it should return ', async () => {
            resourceRepo.get = jest.fn().mockResolvedValue(mockResource[0]);
            repository.getOne = jest.fn().mockResolvedValue(mockUsersfav);
            await userController.addFavorites(
                req as ExtraRequest,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalled();
        });
        test('Then if the resource already exits it it should return an error', async () => {
            resourceRepo.get = jest.fn().mockResolvedValue({ id: '2' });
            repository.getOne = jest.fn().mockResolvedValue(mockUsersfav);
            await userController.addFavorites(
                req as ExtraRequest,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalled();
        });
        test('Then it should return ', async () => {
            resourceRepo.get = jest.fn().mockResolvedValue(mockResource[0]);
            repository.getOne = jest.fn().mockResolvedValue(mockUsers[0]);
            repository.updateUser = jest.fn().mockResolvedValue({
                id: mockUsers[0].id,
                name: mockUsers[0].name,
                email: mockUsers[0].email,
                favorites: [],
            });
            await userController.addFavorites(
                req as Request,
                resp as Response,
                next
            );
            expect(resp.status).toHaveBeenCalled();
            expect(resp.json).toHaveBeenCalled();
        });
        test('Then it should return Error with the resource is already in fav', async () => {
            resourceRepo.get = jest.fn().mockResolvedValueOnce(mockResource[0]);
            repository.getOne = jest
                .fn()
                .mockResolvedValueOnce(mockUsers[0].favorites);
            repository.updateUser = jest.fn().mockResolvedValueOnce({
                id: mockUsers[0].id,
                name: mockUsers[0].name,
                email: mockUsers[0].email,
                favorites: [mockResource[0]],
            });

            await userController.addFavorites(
                req as ExtraRequest,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalled();
        });
        test('Then if it cannot add it to favorites should throw an error', async () => {
            repository.updateUser = jest
                .fn()
                .mockResolvedValueOnce(mockUsers[0]);
            await userController.addFavorites(
                req as ExtraRequest,
                resp as Response,
                next
            );

            expect(next).toBeCalled();
        });
    });

    describe('When the deleteFav is run', () => {
        test('Then it should return  ', async () => {
            const mockresourcedelete = [
                {
                    id: 1,
                    title: 'puzzle',
                    subject: 'reading',
                    grade: 'first',
                },
                {
                    id: 2,
                    title: 'asdasd',
                    subject: '',
                    grade: '',
                },
            ];

            const mockdelete = {
                id: 1,
                name: 'Ana',
                email: 'ana@gmail.com',
                favorites: [mockresourcedelete[0], mockresourcedelete[1]],
            };
            repository.getOne = jest.fn().mockResolvedValueOnce(mockdelete);
            resourceRepo.get = jest
                .fn()
                .mockResolvedValueOnce(mockresourcedelete[0]);
            repository.updateUser = jest.fn().mockResolvedValueOnce({
                id: 1,
                name: 'Ana',
                email: 'ana@gmail.com',
                favorites: [mockresourcedelete[1]],
            });

            await userController.deleteFavorites(
                req as ExtraRequest,
                resp as Response,
                next as NextFunction
            );

            expect(resp.json).toHaveBeenCalledWith({
                updateUser: {
                    id: 1,
                    name: 'Ana',
                    email: 'ana@gmail.com',
                    favorites: [mockresourcedelete[1]],
                },
            });
        });

        test('Then it should return an error if the user is not updated', async () => {
            repository.getOne = jest.fn().mockResolvedValue(mockUsers[0]);
            resourceRepo.get = jest.fn().mockResolvedValue(mockResource);
            repository.updateUser = jest.fn().mockResolvedValue(mockResource);

            await userController.deleteFavorites(
                req as Request,
                resp as Response,
                next
            );
            expect(next).toBeCalled();
        });
    });
    describe('Test withoutpayload', () => {
        test('Then it should return error invalid payload', async () => {
            req = {};
            resourceRepo.get = jest.fn().mockResolvedValueOnce(mockResource[1]);
            repository.getOne = jest.fn().mockResolvedValueOnce(mockUsers[0]);
            repository.updateUser = jest.fn().mockResolvedValueOnce({
                id: mockUsers[0].id,
                name: mockUsers[0].name,
                email: mockUsers[0].email,
                favorites: [mockResource[0]],
            });
            await userController.addFavorites(
                req as ExtraRequest,
                resp as Response,
                next
            );
            expect(next).toHaveBeenCalled();
        });

        test('This should return the user updated...', async () => {
            repository.getOne = jest.fn().mockResolvedValueOnce([]);
            resourceRepo.get = jest.fn().mockResolvedValueOnce([]);
            await userController.deleteFavorites(
                req as ExtraRequest,
                resp as Response,
                next
            );
            expect(next).toHaveBeenCalled();
        });
        test('this should return the user', async () => {
            repository.deleteUser = jest.fn().mockReturnValueOnce(undefined);
            await userController.deleteUser(
                req as ExtraRequest,
                resp as Response,
                next
            );
            expect(next).toHaveBeenCalled();
        });
    });
});
