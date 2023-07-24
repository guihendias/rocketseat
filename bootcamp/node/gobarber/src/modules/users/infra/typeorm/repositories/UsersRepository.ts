import { getRepository, Not, Repository } from 'typeorm';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '../entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDRO from '@modules/users/dtos/IFindAllProvidersDTO';

class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async findAllProviders({
        except_user_id,
    }: IFindAllProvidersDRO): Promise<User[]> {
        let users;

        if (except_user_id) {
            users = await this.ormRepository.find({
                where: {
                    id: Not(except_user_id),
                },
            });
        } else {
            users = await this.ormRepository.find();
        }

        return users;
    }
    async findById(id: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne(id);

        return user;
    }
    async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: { email },
        });

        return user;
    }
    save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }

    public async create(data: ICreateUserDTO): Promise<User> {
        const user = this.ormRepository.create(data);

        await this.ormRepository.save(user);

        return user;
    }
}

export default UsersRepository;
