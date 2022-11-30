import { debug } from 'console';
import {
    ProtoResourceI,
    ResourceI,
    ResourceModel,
} from '../entities/resources.js';
import { id, ResourcesRepo } from './repo.interface.js';

export class ResourcesRepository implements ResourcesRepo {
    static instance: ResourcesRepository;

    public static getInstance(): ResourcesRepository {
        if (!ResourcesRepository.instance) {
            ResourcesRepository.instance = new ResourcesRepository();
        }
        return ResourcesRepository.instance;
    }

    #Model = ResourceModel;
    private constructor() {
        debug('instance');
    }

    async getAll(): Promise<Array<ResourceI>> {
        return this.#Model.find().populate('owner', { resources: 0 });
    }

    async get(id: id): Promise<ResourceI> {
        const result = await this.#Model
            .findById(id)
            .populate('owner', { resources: 0 });
        return result as ResourceI;
    }

    async find(search: { [key: string]: string }): Promise<Array<ResourceI>> {
        const result = await this.#Model.findOne(search).populate('owner', {
            resources: 0,
        });
        return result as unknown as ResourceI[];
    }

    async post(data: Partial<ProtoResourceI>): Promise<ResourceI> {
        const result = await (
            await this.#Model.create(data)
        ).populate('owner', {
            resources: 0,
        });

        return result as ResourceI;
    }

    async patch(id: id, data: Partial<ResourceI>): Promise<ResourceI> {
        const result = await this.#Model
            .findByIdAndUpdate(id, data, {
                new: true,
            })
            .populate('owner', {
                resources: 0,
            });
        if (!result) throw new Error('Sorry, id not found');
        return result as ResourceI;
    }
    async delete(id: id): Promise<void> {
        const result = await this.#Model
            .findByIdAndDelete(id)
            .populate('owner', {
                resources: 0,
            });
        if (result === null) throw new Error('Sorry, id not found');
        return;
    }
}
