import { UserModel } from '../entities/users';
import { dbConnect } from '../services/dbconnect';
import { UsersRepository } from './users.repo';

describe('Given a singleton instance of the class "UsersRepository"', () => {
    const mockData = [
        {
            name: 'Luis',
            email: 'luis@gmail.com',
            password: '12345',
        },
        {
            name: 'Alvaro',
            email: 'alvaro@gmail.com',
            password: '54321',
        },
    ];
    const mockNewUser = {
        name: 'Yanira',
        email: 'yanira@gmail.com',
        password: '45678',
    };
    const mockUserWrongPass = {
        name: 'Yani',
        email: 'yani@gmail.com',
        password: undefined,
    };

    const repository = UsersRepository.getInstance();
    let testIds: Array<string>;
    const setUpCollection = async () => {
        await dbConnect();
        await UserModel.deleteMany();
        await UserModel.insertMany(mockData);
        const data = await UserModel.find();

        return [data[0].id, data[1].id];
    };

    beforeAll(async () => {
        testIds = await setUpCollection();
    });

    describe('When getOne is run"', () => {
        test('Then it should return user', async () => {
            const result = await repository.getOne(testIds[1]);
            expect(result.email).toEqual(mockData[1].email);
        });
    });
    describe('When addUser is run"', () => {
        test('Then it returns the resources in the collection', async () => {
            await repository.addUser(mockNewUser);
            expect(mockNewUser.name).toEqual('Yanira');
        });
        test('then if the password is not a string it should throw an error', async () => {
            expect(
                async () => await repository.addUser(mockUserWrongPass)
            ).rejects.toThrowError('');
        });
    });
    describe('When query is run"', () => {
        test('Then it returns the user', async () => {
            const result = await repository.query('name', 'Luis');
            const test = result[0];
            expect(test.name).toEqual(mockData[0].name);
        });
    });
    describe('When updateUser is run"', () => {
        test('Then it returns the resources the modified User', async () => {
            const result = await repository.updateUser(testIds[0], mockData[0]);
            expect(result.name).toBe(mockData[0].name);
        });
    });
});
