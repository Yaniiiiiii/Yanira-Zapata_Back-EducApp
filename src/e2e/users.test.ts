import { UserModel } from '../entities/users';
import { dbConnect } from '../services/dbconnect';
import request from 'supertest';
import { app } from '../app';
import mongoose from 'mongoose';
import { Auth } from '../services/auth/auth';
import { ResourceModel } from '../entities/resources';

const mockData = [
    { name: 'Susi', email: 'susi@gmail.com', password: 'susi1' },
    { name: 'Sara', email: 'sara@gmail.com', password: 'sara1' },
    {
        name: 'Celia',
        email: 'celia@gmail.com',
        password:
            '$2a$10$dzhL8lG/MNzqduexBTgGTuuD1U0J3aVcUCckka9EE83wKLnK2WRV6',
    },
];

const collection = async () => {
    await dbConnect();
    await UserModel.deleteMany();
    await UserModel.insertMany(mockData);
    await ResourceModel.deleteMany();
    const data = await UserModel.find();
    const testIds = [data[0].id, data[1].id];
    return testIds;
};

describe('Given the "app" with the "/users" route', () => {
    let testIds: Array<string>;
    const token = new Auth();
    let userToken: string;

    beforeAll(async () => {
        await dbConnect();
    });

    beforeEach(async () => {
        testIds = await collection();

        userToken = token.createToken({
            id: testIds[0],
            name: mockData[0].name,
        });
    });

    describe('Given the "app" with users/ route', () => {
        test('When the connection to mongoose is correct', async () => {
            const newUser = {
                name: 'Florida',
                email: 'test',
                password: 'florida1',
            };

            await request(app)
                .post('/users/register')
                .send(newUser)
                .expect(200);
        });

        test('Then if there are problems doing the register, it should return a status 404', async () => {
            await request(app).post('/users').send().expect(404);
        });

        test('Then if there are problems with the server, it should return a status 503', async () => {
            await mongoose.disconnect();
            await request(app).post('/users/register').send().expect(503);
        });
    });

    describe('When the login method from the "UserController"', () => {
        const mockUser = {
            name: 'Celia',
            email: 'celia@gmail.com',
            password: 'celia1',
        };

        const loginData = {
            email: mockUser.email,
            password: mockUser.password,
        };

        test('Then if it is correct, it should return a status 200', async () => {
            await request(app).post('/users/login').send(loginData).expect(200);
        });

        test('If Service unavailable it should return a error', async () => {
            await request(app).post('/users/login').send({}).expect(503);
        });

        test('If the password is not correct it should return a error', async () => {
            await request(app)
                .post('/users/login')
                .send(mockData[0])
                .expect(403);
        });

        test('If the email is not correct it should return a error', async () => {
            await request(app).post('/users').send('s').expect(404);
        });
    });

    describe('When the addFavorites method is run', () => {
        const mockResource = [
            {
                id: 'reading',
                title: 'puzzle',
                subject: 'reading',
                grade: 'first',
            },
        ];
        const mockUser = {
            name: 'Celia',
            email: 'celia@gmail.com',
            password: 'celia1',
            favorites: [mockResource],
        };

        test('Then if the resource is not found, it should return a status 404', async () => {
            await request(app)
                .post('/users/addFavorites/id')
                .set('Authorization', `Bearer ${userToken}`)
                .send({})
                .expect(404);
        });
        // test('Then if the resource is not found, it should return a status 404', async () => {
        //     await request(app)
        //         .post('/users/addFavorites/id')
        //         .set('Authorization', `Bearer ${userToken}`)
        //         .send(mockResource[0].id)
        //         .expect(200);
        // });
    });
    describe('When the deleteFavorites method is run', () => {
        const mockResource = [
            {
                id: 'reading',
                title: 'puzzle',
                subject: 'reading',
                grade: 'first',
            },
        ];
        const mockUser = {
            name: 'Celia',
            email: 'celia@gmail.com',
            password: 'celia1',
            favorites: [mockResource],
        };

        test('Then if the resource is not found, it should return a status 404', async () => {
            await request(app)
                .post('/users/deleteFavorites/id')
                .set('Authorization', `Bearer ${userToken}`)
                .send({})
                .expect(404);
        });

        afterAll(async () => {
            await mongoose.disconnect();
        });
    });
});
