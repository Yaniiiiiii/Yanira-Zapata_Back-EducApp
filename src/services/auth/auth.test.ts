import { Auth } from './auth';
import jwt from 'jsonwebtoken';

describe('Given the auth class', () => {
    const auth = new Auth();

    test('then the method getSecret should return a string', async () => {
        const secret = 'secret';
        jest.fn().mockReturnValue('');
        const result = auth.getSecret(secret);
        expect(result).toBe('secret');
    });
    test('then the method getSecret should return a error when the token is not a string', async () => {
        expect(() => {
            auth.getSecret('');
        }).toThrow(Error);
    });
    test('then the method createToken should return a Token', async () => {
        jwt.sign = jest.fn().mockReturnValue('payload');
        const mockpayload = {
            id: '',
            name: '',
            role: '',
        };
        const result = auth.createToken(mockpayload);
        expect(result).toBe('payload');
    });
    test('then the method readToken should return the payload', async () => {
        jwt.verify = jest.fn().mockReturnValue('payload');
        const token = '';
        const result = auth.readToken(token);

        expect(result).toBe('payload');
    });
});
