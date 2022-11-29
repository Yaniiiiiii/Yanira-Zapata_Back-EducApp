import { ResourceI } from '../entities/resources';
import { UserI } from '../entities/users';

export type id = string | number;

export interface ResourcesRepo {
    getAll: () => Promise<Array<ResourceI>>;
    get: (id: id) => Promise<ResourceI>;
    find: (search: any) => Promise<Array<ResourceI>>;
    post: (data: Partial<ResourceI>) => Promise<ResourceI>;
    patch: (id: id, data: Partial<ResourceI>) => Promise<ResourceI>;
    delete: (id: id) => Promise<id>;
}

export interface UserRepo {
    post: (data: Partial<UserI>) => Promise<UserI>;
    patch: (id: id) => Promise<id>;
    //delete: (id: id) => Promise<id>;
}
