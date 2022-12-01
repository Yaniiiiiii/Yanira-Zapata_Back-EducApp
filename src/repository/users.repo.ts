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
        debug('getOne', id);
        const result = await this.#Model
            .findById(id)
            .populate('resources', { owner: 0 });
        return result as UserI;
    }

    async create(data: Partial<UserI>): Promise<UserI> {
        debug('create', data);
        if (typeof data.password !== 'string')
            throw new Error('Introduce a correct password');
        data.password = await this.password.encrypt(data.password);
        const result = await this.#Model.create(data);
        return result;
    }

    async query(key: string, value: string): Promise<Array<UserI>> {
        const result = await this.#Model.find({ [key]: value });
        return result as unknown as Array<UserI>;
    }

    async updateUser(id: id, data: Partial<UserI>): Promise<UserI> {
        const result = await this.#Model
            .findByIdAndUpdate(id, data, {
                new: true,
            })
            .populate('resources', {
                users: 0,
            });
        return result as UserI;
    }
}
