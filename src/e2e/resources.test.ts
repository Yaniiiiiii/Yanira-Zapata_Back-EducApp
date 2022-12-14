import mongoose, { Types } from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import { ResourceModel } from '../entities/resources';
import { UserModel } from '../entities/users';
import { Auth } from '../services/auth/auth';
import { dbConnect } from '../services/dbconnect';

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

describe('Given the "app" with the "/resources" route', () => {
    let testIds: Array<string>;
    const token = new Auth();
    let userToken: string;

    beforeAll(async () => {
        await dbConnect();
    });

    describe('When we do a get using a get method  form the resourceController', () => {
        test('Then if its all okey it should return a response status 200', async () => {
            await request(app).get('/resources').send().expect(200);
        });

        test('Then if the connection to Mongo its closed it should return a status = 500', async () => {
            await mongoose.disconnect();
            await request(app).get('/resources/').send().expect(500);
        });
    });
});
