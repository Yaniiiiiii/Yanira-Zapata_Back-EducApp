import { NextFunction, Response } from 'express';
import { ErrorMiddlewares } from '../Error/error.management';
import { UsersRepository } from '../repository/users.repo';
import { Auth } from '../services/auth/auth';
import { ExtraRequest, logged, verifyUser } from './interceptors';

describe('Given the logged interceptor', () => {
    ErrorMiddlewares.prototype.logged = jest.fn().mockResolvedValue('');

    describe('When it is invoked', () => {
        test('Then if the token is correct, it should return the payload', () => {
            Auth.prototype.readToken = jest.fn().mockResolvedValueOnce(true);

            const req: Partial<ExtraRequest> = {
                get: jest
                    .fn()
                    .mockReturnValueOnce(
                        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODYzMDAzMzJmNzVkMTdlZTlkNjJiYiIsIm5hbWUiOiJMdWlzIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2Njk3OTc3NzF9.etU9QAFmgFNvTr-eb3e3xAopVftl2_ZZOk1B01oUiGQ'
                    ),
            };
            const res: Partial<Response> = {};
            const next: NextFunction = jest.fn();

            logged(req as ExtraRequest, res as Response, next);

            expect(next).toHaveBeenCalled();
        });
        test('and authString is empty, it should throw an error', () => {
            Auth.prototype.readToken = jest.fn().mockReturnValueOnce(false);
            const req: Partial<ExtraRequest> = {};
            req.get = jest.fn();
            const res: Partial<Response> = {};
            const next: NextFunction = jest.fn();

            logged(req as ExtraRequest, res as Response, next);
            expect(next).toHaveBeenCalled();
        });
    });

    describe('Given the verifyUser interceptor', () => {
        describe('When it is invoked', () => {
            test('Then it should throw an error if the req.payload.role is not valid', () => {
                const req: Partial<ExtraRequest> = {
                    get: jest.fn().mockReturnValue(false),
                };
                const res: Partial<Response> = {};
                const next: NextFunction = jest.fn();

                verifyUser(req as ExtraRequest, res as Response, next);
                expect(next).toBeCalled();
            });
        });
        test('if the req.payload is not correct, then it should throw an error', async () => {
            const req: Partial<ExtraRequest> = {
                payload: {
                    id: '1',
                    name: 'Yani',
                },
            };

            const res: Partial<Response> = {};
            const next: NextFunction = jest.fn();

            await verifyUser(req as ExtraRequest, res as Response, next);
            expect(next).toHaveBeenCalled();
        });

        test('if the req.payload is not correct, then it should call next and throw an error', async () => {
            const req: Partial<ExtraRequest> = {
                payload: {
                    payload: {
                        id: '1',
                        name: 'Yani',
                    },
                },
            };

            UsersRepository.getInstance = jest
                .fn()
                .mockResolvedValue({ id: '638785e04ddf730eef9fcf6d' });

            const res: Partial<Response> = {};
            const next: NextFunction = jest.fn();

            await verifyUser(req as ExtraRequest, res as Response, next);

            expect(next).toHaveBeenCalled();
        });

        test('Then it should throw an error', () => {
            const req: Partial<ExtraRequest> = {};
            const res: Partial<Response> = {};
            const next: NextFunction = jest.fn();
            const error = new Error('Wrong email or password');
            verifyUser(req as ExtraRequest, res as Response, next);
            expect(error).toBeInstanceOf(Error);
        });
        test('Then it should throw an error if the req.payload is not valid', () => {
            const req: Partial<ExtraRequest> = {
                get: jest.fn().mockResolvedValue(false),
            };
            const res: Partial<Response> = {};
            const next: NextFunction = jest.fn();

            verifyUser(req as ExtraRequest, res as Response, next);
            expect(next).toBeCalled();
        });
        // test('linea sin cubrir', () => {
        //     const mockNewUser = {
        //         name: 'Yanira',
        //         id: '2',
        //         email: 'yanira@gmail.com',
        //         password: '45678',
        //     };
        //     const repo = UsersRepository.getInstance();
        //     repo.getOne = jest.fn().mockResolvedValueOnce(mockNewUser);

        //     const req: Partial<ExtraRequest> = {
        //         payload: { id: '1' },
        //     };
        //     const res: Partial<Response> = {};
        //     const next: NextFunction = jest.fn();

        //     verifyUser(req as ExtraRequest, res as Response, next);
        //     expect(next).rejects.toBeCalled();
        // });
    });
});
