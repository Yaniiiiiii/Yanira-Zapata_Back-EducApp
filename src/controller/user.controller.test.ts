import { UserController } from './user.controller';
import { UsersRepository } from '../repository/users.repo';
import { ResourcesRepository } from '../repository/resources.repo';
import { NextFunction, Request, Response } from 'express';

// jest.mock('../repository/users.repo');

describe('Given the UserController', () => {
    const mockUser = [
        {
            id: '1',
            name: 'Ana',
            email: 'ana@gmail.com',
            passwd: '12345',
        },
        {
            id: '2',
            name: 'Julia',
            email: 'julia@gmail.com',
            passwd: '54321',
        },
    ];
    const mockToken = 'ghjjhyuopsidh12344573198723lpoiu';

    const repository = UsersRepository.getInstance();
    const resourceRepo = ResourcesRepository.getInstance();
    UsersRepository.prototype.getOne = jest.fn().mockResolvedValue(mockUser);
    UsersRepository.prototype.create = jest.fn().mockResolvedValue(mockToken);
    UsersRepository.prototype.query = jest.fn().mockResolvedValue([mockUser]);

    const userController = new UserController(repository, resourceRepo);
    const next: NextFunction = jest.fn();
    const req: Partial<Request> = {};
    const resp: Partial<Response> = {
        json: jest.fn(),
        status: jest.fn().mockReturnValue(200),
    };

    describe('When the register is run', () => {
        test('Then it should return the user', async () => {
            req.body = { name: 'Ana' };
            await userController.register(
                req as Request,
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
            };
            await userController.login(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.json).toHaveBeenCalledWith(mockToken);
        });
    });
});
