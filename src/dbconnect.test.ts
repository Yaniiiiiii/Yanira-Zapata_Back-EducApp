import { dbConnect } from './dbconnect';
import mongoose from 'mongoose';

describe('Given the db connect file', () => {
    describe('when we connect to the db ', () => {
        test('then the connection should be the type of mongoose', async () => {
            const result = await dbConnect();
            expect(typeof result).toBe(typeof mongoose);
            mongoose.disconnect();
        });
        describe('when we connection of NODE_ENV is not "test" ', () => {
            test('then it should connect to resources', () => {
                process.env.NODE_ENV = 'other';
                const result = dbConnect();
                expect(result).toBeInstanceOf(Promise);
                mongoose.disconnect();
            });
        });
    });
});
