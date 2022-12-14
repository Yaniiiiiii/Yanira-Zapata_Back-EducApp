import { debug } from 'console';
import { UserI, UserModel } from '../entities/users.js';
import { id, UserRepo } from './repo.interface.js';
import { Password } from '../services/auth/password.js';
/* istanbul ignore file */
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

    async addUser(data: Partial<UserI>): Promise<UserI> {
        if (typeof data.password !== 'string')
            throw new Error('Introduce a correct password');
        data.password = await this.password.encrypt(data.password);
        const result = await this.#Model.create(data);
        return result;
    }

    async deleteUser(id: id): Promise<id> {
        await this.#Model.findByIdAndDelete(id);
        return id;
    }

    async query(key: string, value: string): Promise<UserI> {
        const result = await this.#Model
            .find({ [key]: value })
            .populate('favorites');

        return result[0] as unknown as UserI;
    }

    async updateUser(id: id, data: Partial<UserI>): Promise<UserI> {
        const result = await this.#Model
            .findByIdAndUpdate(id, data, {
                new: true,
            })
            .populate('favorites');
        return result as UserI;
    }
}
