import mongoose from 'mongoose';
import { ResourceModel } from '../entities/resources';
import { dbConnect } from '../services/dbconnect';
import { ResourcesRepository } from './resources.repo';

describe('Given a singleton instance of the class "ResourceRepository"', () => {
    const mockData = [
        {
            title: 'puzzle',
            subject: 'reading',
            grade: 'first',
        },
        {
            title: 'jigsaw',
            subject: 'writing',
            grade: 'second',
        },
    ];

    const setUpCollection = async () => {
        await dbConnect();
        await ResourceModel.deleteMany();
        await ResourceModel.insertMany(mockData);
        const data = await ResourceModel.find();
        return [data[0].id, data[1].id];
    };

    const repository = ResourcesRepository.getInstance();
    const badFormattedId = '1';
    const invalidId = '537b467da27b64c98b1916i2';
    let testIds: Array<string>;

    beforeAll(async () => {
        testIds = await setUpCollection();
        console.log(testIds);
    });
    describe('When it has been run getAll and it has called Model.find', () => {
        test('Then it returns the resources in the collection', async () => {
            const spyModel = jest.spyOn(ResourceModel, 'find');
            const result = await repository.getAll();
            expect(spyModel).toHaveBeenCalled();
            expect(result[0].subject).toEqual(mockData[0].subject);
        });
    });

    describe('When it has been run get and it has called ResourceModel.findById', () => {
        const spyModel = jest.spyOn(ResourceModel, 'findById');
        test('Then, if the ID is valid, it should return the resource', async () => {
            const result = await repository.get(testIds[0]);
            expect(spyModel).toHaveBeenCalled();
            expect(result.title).toEqual(mockData[0].title);
        });

        test('Then, if the ID is not well formatted, it should throw a Cast error', async () => {
            expect(async () => {
                await repository.get(badFormattedId);
            }).rejects.toThrowError(mongoose.Error.CastError);
            expect(spyModel).toHaveBeenCalled();
        });

        test('Then, if the ID is not valid, it should be throw a Validation error', async () => {
            expect(async () => {
                await repository.get(invalidId);
            }).rejects.toThrowError(mongoose.MongooseError);
            expect(spyModel).toHaveBeenCalled();
        });
    });
    describe('When fun is run and ResourceModel.findOne is called', () => {
        const spyModel = jest.spyOn(ResourceModel, 'findOne');
        test.skip('Then, if data is valid, it should return the found resource ', async () => {
            jest.fn();
            const result = await repository.find(mockData[0]);
            expect(spyModel).toHaveBeenCalled();
            expect(result).toEqual(mockData[0]);
        });

        test('Then, if the data is not valid, it should throw an error', async () => {
            expect(async () => {
                await repository.find({ title: 'science' });
            }).rejects.toThrowError(mongoose.MongooseError);
            expect(spyModel).toHaveBeenCalled();
        });
    });
});
