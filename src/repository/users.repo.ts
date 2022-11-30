import { debug } from 'console';
import { UserI, UserModel } from '../entities/users.js';
import { id, UserRepo } from './repo.interface.js';
import { Password } from '../services/auth/password.js';

export class UsersRepository implements UserRepo {
    password = new Password();
    static instance: UsersRepository;

    public static getInstance(): UsersRepository {
        if (!UsersRepository.instance) {
            UsersRepository.instance = new UsersRepository();
        }
        return UsersRepository.instance;
    }

    #Model = UserModel;
    private constructor() {
        debug('instance');
    }

    async getOne(id: id): Promise<UserI> {
        debug('get, id');
        const result = await this.#Model.findById(id);
        if (!result) throw new Error('Sorry, id not found');
        return result;
    }

    async create(data: Partial<UserI>): Promise<UserI> {
        debug('post', data);
        if (typeof data.password !== 'string') throw new Error('');
        data.password = await this.password.encrypt(data.password);
        const result = await this.#Model.create(data);
        return result;
    }
    async find(search: { [key: string]: string }): Promise<UserI> {
        debug('find', { search });
        const result = await this.#Model.findOne(search);
        if (!result) throw new Error('Sorry, id not found');
        return result;
    }

    async updateUser(id: id, data: Partial<UserI>): Promise<UserI> {
        const result = await this.#Model
            .findByIdAndUpdate(id, data, {
                new: true,
            })
            .populate('resources', {
                users: 0,
            });
        if (!result) throw new Error('Sorry, id not found');
        return result as UserI;
    }
}
