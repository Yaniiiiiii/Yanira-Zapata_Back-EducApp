import { HTTPError } from './interfaces/error.js';

export class UserErrorController {
    login(error: Error) {
        if (error.message === 'Sorry, User not found.') {
            const httpError = new HTTPError(
                404,
                'Sorry, User not found.',
                error.message
            );
            return httpError;
        }

        if (error.message === 'Sorry, password not valid.') {
            const httpError = new HTTPError(
                403,
                'Sorry, password not valid.',
                error.message
            );
            return httpError;
        }

        const httpError = new HTTPError(
            503,
            'Service unavailable',
            (error as Error).message
        );
        return httpError;
    }
    register(error: Error) {
        const httpError = new HTTPError(
            503,
            'Service unavailable',
            (error as Error).message
        );
        return httpError;
    }
}
