import { CustomError, HTTPError } from './error';

describe('Given the error interface', () => {
    let error: CustomError;
    beforeEach(() => {
        error = new HTTPError(418, 'An error has ocurred', 'Not found');
    });
    test('then the following properties and types of error should appear', () => {
        expect(error).toBeInstanceOf(HTTPError);
        expect(error).toHaveProperty('statusCode', 418);
        expect(error).toHaveProperty('statusMessage', 'An error has ocurred');
        expect(error).toHaveProperty('message', 'Not found');
        expect(error).toHaveProperty('name', 'HTTPError');
    });
});
