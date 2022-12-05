import { NextFunction, Response } from 'express';
import { Error } from 'mongoose';
import { ErrorMiddlewares } from '../Error/error.management';
import { HTTPError } from '../Error/interfaces/error';
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
    });
});
