import { ResourceI } from '../entities/resources.js';
import { UserI } from '../entities/users.js';

export type id = string | number;

export interface ResourcesRepo {
    getAll: () => Promise<Array<ResourceI>>;
    get: (id: id) => Promise<ResourceI>;
    query: (key: string, value: string) => Promise<Array<ResourceI>>;
    post: (data: Partial<ResourceI>) => Promise<ResourceI>;
    patch: (id: id, data: Partial<ResourceI>) => Promise<ResourceI>;
    delete: (id: id) => Promise<void>;
}

export interface UserRepo {
    getOne: (id: id) => Promise<UserI>;
    create: (data: Partial<UserI>) => Promise<UserI>;
    updateUser: (id: id, data: Partial<UserI>) => Promise<UserI>;
    find: (key: string, value: string) => Promise<UserI>;
    //delete: (id: id) => Promise<id>;
}
