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
    });
});
