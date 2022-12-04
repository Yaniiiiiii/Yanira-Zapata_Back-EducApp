import { NextFunction, Request, Response } from 'express';
import { CustomError, HTTPError } from '../Error/interfaces/error';
import {
    UserErrorController,
    ErrorResourcesController,
} from '../Error/error.management';
import { errorManager } from './error';

describe('Given the errorManager ', () => {
    UserErrorController.prototype.login = jest
        .fn()
        .mockResolvedValue(HTTPError);
    UserErrorController.prototype.register = jest
        .fn()
        .mockResolvedValue(HTTPError);
    ErrorResourcesController.prototype.createResource = jest
        .fn()
        .mockResolvedValue(HTTPError);
    ErrorResourcesController.prototype.errorControl = jest
        .fn()
        .mockResolvedValue(HTTPError);

    describe('When it is invoked', () => {
        const req = {};
        const resp = {
            status: jest.fn().mockReturnValue({}),
            json: jest.fn().mockReturnValue({}),
            end: jest.fn().mockReturnValue({}),
        };
        const next = jest.fn();
        const mockError = {
            name: 'Error',
            statusCode: 500,
            statusMessage: 'Server Error',
            message: 'Error',
        };

        test('Then it should call the next function', () => {
            errorManager(
                mockError,
                req as Request,
                resp as unknown as Response,
                next as NextFunction
            );
            expect(resp.status).toBeCalled();
        });

        test('If it is a ValidationError, then it should call the next function with a 406 status', () => {
            mockError.name = 'ValidationError';
            errorManager(
                mockError,
                req as Request,
                resp as unknown as Response,
                next as NextFunction
            );
            expect(resp.status).toBeCalled();
        });

        test('If there is no error.statuscode then it should return a status 500', () => {
            const mockBadError = {
                name: 'Error',
                statusMessage: 'Internal Server Error',
                message: 'Error',
            };

            errorManager(
                mockBadError as CustomError,
                req as Request,
                resp as unknown as Response,
                next as NextFunction
            );
            expect(resp.status).toBeCalled();
        });
    });
});
