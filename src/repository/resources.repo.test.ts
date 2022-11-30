import mongoose from 'mongoose';
import { ProtoResourceI, ResourceModel } from '../entities/resources';
import { dbConnect } from '../services/dbconnect';
import { ResourcesRepository } from './resources.repo';

describe('Given a singleton instance of the class "ResourceRepository"', () => {
    const mockData = [
        {
            title: 'puzzle',
            subject: 'math',
            grade: 'second',
        },
        {
            title: 'jigsaw',
            subject: 'reading',
            grade: 'first',
        },
    ];

    const setUpCollection = async () => {
        await dbConnect();
        await ResourceModel.deleteMany();
        await ResourceModel.insertMany(mockData);
        const data = await ResourceModel.find();
        console.log(data);
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
    describe('When it has been run GETALL and it has called Model.find', () => {
        test('Then it returns the resources in the collection', async () => {
            const spyModel = jest.spyOn(ResourceModel, 'find');
            const result = await repository.getAll();
            expect(spyModel).toHaveBeenCalled();
            expect(result[0].title).toEqual(mockData[0].title);
        });
    });
    describe('When POST is run and ResourceModel.create is called', () => {
        const spyModel = jest.spyOn(ResourceModel, 'create');
        test('Then, if the data is valid, it should return the resource', async () => {
            const newResource: Partial<ProtoResourceI> = {
                title: 'Puzzles',
                subject: 'math',
                grade: 'first',
            };
            const result = await repository.post(newResource);

            expect(spyModel).toHaveBeenCalled();
            expect(result.title).toBe(newResource.title);
        });
    });
    describe('When PATCH is run and ResourceModel.patch is called', () => {
        const spyModel = jest.spyOn(ResourceModel, 'findByIdAndUpdate');
        test('Then, if the data is valid, it should return the resource', async () => {
            const newTitle = 'ScapeRoom';
            const result = await repository.patch(testIds[0], {
                title: newTitle,
            });
            expect(spyModel).toHaveBeenCalled();
            expect(result.title).toEqual(newTitle);
        });
    });
    describe('When DELETE is run and ResourceModel.delete is called', () => {
        const spyModel = jest.spyOn(ResourceModel, 'findByIdAndDelete');
        test('Then, if the data is valid, it should return the id', async () => {
            const result = await repository.delete(testIds[0]);
            expect(spyModel).toHaveBeenCalled();
            expect(result).toEqual(testIds[2]);
        });
    });

    // describe('When GET is run and ResourceModel.findById is called', () => {
    //     const spyModel = jest.spyOn(ResourceModel, 'findById');
    //     test('Then, if the data is valid, it should return the resource', async () => {
    //         const result = await repository.get(testIds[0]);
    //         console.log(testIds[0]);
    //         console.log(result);
    //         console.log(result.subject);
    //         console.log(mockData[0].subject);
    //         expect(spyModel).toHaveBeenCalled();

    //         expect(result.subject).toEqual(mockData[0].subject);
    //     });
    // });
    // describe('When FIND is run and ResourceModel.findOne is called', () => {
    //     const spyModel = jest.spyOn(ResourceModel, 'findOne');
    //     test('Then, if the data is valid, it should return the resource', async () => {
    //         const search = {
    //             subject: 'reading',
    //         };
    //         const result = await repository.find(search);

    //         expect(spyModel).toHaveBeenCalled();

    //         expect(result).toContain(search);
    //     });
    // });
});
