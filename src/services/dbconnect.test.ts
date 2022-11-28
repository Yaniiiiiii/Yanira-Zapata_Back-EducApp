<<<<<<< HEAD
import mongoose from 'mongoose';
import { dbConnect } from './dbconnect';

describe('Given dbconnect service', () => {
    test('should connect with the database', async () => {
        const spyConnect = jest.spyOn(mongoose, 'connect');
        await dbConnect();
        expect(spyConnect).toHaveBeenCalled();
    });
    test('should connect with the database with other dbName', async () => {
        process.env.NODE_ENV = '';
        const spyConnect = jest.spyOn(mongoose, 'connect');
        const result = await dbConnect();
        expect(spyConnect).toHaveBeenCalled();
        expect(result.connection.db.databaseName).toBe('resources');
    });
    afterEach(() => {
        mongoose.disconnect();
=======
import { dbConnect } from './dbconnect';
import mongoose, { Mongoose } from 'mongoose';

describe('Given the db connect file', () => {
    describe('when we connect to the db ', () => {
        test('then the connection should be the type of mongoose', async () => {
            const result = await dbConnect();
            expect(typeof result).toBe(typeof mongoose);
            mongoose.disconnect();
        });
        describe('when we connection of NODE_ENV is not "test" ', () => {
            test('then it should connect to resources', async () => {
                process.env.NODE_ENV = 'other';
                const result = await dbConnect();
                expect(result).toBeInstanceOf(Mongoose);
                mongoose.disconnect();
            });
        });
>>>>>>> 3825b771804f1392370f39942c28a879a1a1a217
    });
});
