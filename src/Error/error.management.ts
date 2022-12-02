import { HTTPError } from './interfaces/error.js';

export class UserErrorController {
    login(error: Error) {
        if (error.message === 'Sorry, User not found.') {
            const httpError = new HTTPError(
                404,
                'Sorry, User not found.',
                error.message
            );
            return httpError.message;
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

export class ErrorResourcesController {
    createResource(error: Error) {
        if (error.message === 'Invalid payload') {
            const httpError = new HTTPError(
                500,
                'Invalid Payload',
                error.message
            );
            return httpError.message;
        }
        const httpError = new HTTPError(
            500,
            'Sorry, out of service.',
            error.message
        );
        return httpError.message;
    }
    errorControl(error: Error) {
        const httpError = new HTTPError(
            500,
            'Sorry, out of service.',
            error.message
        );
        return httpError.message;
    }
}
