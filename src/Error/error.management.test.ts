import {
    ErrorMiddlewares,
    ErrorResourcesController,
    UserErrorController,
} from './error.management';
import { HTTPError } from './interfaces/error';

describe('Given ErrorUserController', () => {
    describe('When we call the class methods', () => {
        const errors = new UserErrorController();
        test('then the login should return a error message', () => {
            const mockError = new HTTPError(
                1000,
                'Incorrect Password',
                'Incorrect PWD'
            );
            const result = errors.login(mockError);
            expect(result).toBe('Incorrect PWD');
        });
        test('then the login should return a error message', () => {
            const mockError = new HTTPError(
                1000,
                'Incorrect Password',
                'Sorry, user not found.'
            );
            const result = errors.login(mockError);
            expect(result).toBe('Sorry, user not found.');
        });
        test('then the login should return a error message', () => {
            const mockError = new HTTPError(
                1000,
                'Incorrect Password',
                'Sorry, password not valid.'
            );
            const result = errors.login(mockError);
            expect(result).toBe('Sorry, password not valid.');
        });
        test('then the register should return a error message', () => {
            const mockError = new HTTPError(
                1000,
                'Incorrect Password',
                'Resource not found'
            );
            const result = errors.register(mockError);
            expect(result).toBe('Resource not found');
        });
        test('then the register should return a error message', () => {
            const mockError = new HTTPError(1000, 'Incorrect Password', '');
            const result = errors.register(mockError);
            expect(result).toBe('');
        });
    });
    describe('When we call the class methods of ErrorResourcesController', () => {
        const errors = new ErrorResourcesController();
        test('then the createResource should return a error message', () => {
            const mockError = new HTTPError(
                1000,
                'Incorrect Password',
                'Invalid payload'
            );
            const result = errors.createResource(mockError);
            expect(result).toBe('Invalid payload');
        });
        test('then the createResource should return a error message', () => {
            const mockError = new HTTPError(
                1000,
                'Incorrect Password',
                'Incorrect Password'
            );
            const result = errors.createResource(mockError);
            expect(result).toBe('Incorrect Password');
        });
        test('then the errorControl should return a error message', () => {
            const mockError = new HTTPError(
                1000,
                'Incorrect Password',
                'User not found'
            );
            const result = errors.errorControl(mockError);
            expect(result).toBe('User not found');
        });
    });
    describe('When we call the class methods of ErrorMiddlewares', () => {
        const errors = new ErrorMiddlewares();
        test('then the logged should return a error message', () => {
            const mockError = new HTTPError(
                1000,
                'Incorrect Password',
                'Some of your credentials are not correct.'
            );
            const result = errors.logged(mockError);
            expect(result).toBe('Some of your credentials are not correct.');
        });
    });
});
