import { Password } from './password';
import bc from 'bcryptjs';

describe('Given the password class', () => {
    const password = new Password();
    test('then the method passwordEncrypt should return a string', async () => {
        bc.hash = jest.fn().mockResolvedValue('');
        const result = await password.passwordEncrypt('');
        expect(result).toBe('');
    });
    test('then the method passwordValidate should return a promise', async () => {
        bc.compare = jest.fn().mockResolvedValue(true);
        bc.hash = jest.fn().mockResolvedValue('');
        const result = await password.passwordValidate('', '');
        expect(result).toBe(true);
    });
    test('then the method passwordValidate should return a promise', async () => {
        bc.compare = jest.fn().mockResolvedValue(false);
        bc.hash = jest.fn().mockResolvedValue('2');
        const result = await password.passwordValidate('', '2');
        expect(result).toBe(false);
    });
});
