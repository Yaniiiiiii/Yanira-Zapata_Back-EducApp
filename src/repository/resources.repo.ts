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

    async query(key: string, value: string): Promise<Array<ResourceI>> {
        const result = await this.#Model
            .find({ [key]: value })
            .populate('owner', {
                resources: 0,
            });
        return result as unknown as Array<ResourceI>;
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
        return result as ResourceI;
    }
    async delete(id: id): Promise<id> {
        await this.#Model.findByIdAndDelete(id).populate('owner', {
            resources: 0,
        });
        return id;
    }
}
