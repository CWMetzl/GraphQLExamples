import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { User } from './user.entity';
import { CreateUserInput } from './create-user.input';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findLastNameStartsWith(search: string): Promise<User[]> {

        return this.userRepository.find({
            where: {
                lastName: ILike(`${search}%`),
            },
        });
    }

    async findFirstNameStartsWith(search: string): Promise<User[]> {
        return this.userRepository.find({
            where: {
                firstName: ILike(`${search}%`),
            },
        });
    }

    async findOne(id: number): Promise<User> {
        return this.userRepository.findOneBy({ id });
    }

    async create(createUserInput: CreateUserInput): Promise<User> {
        const newUser = this.userRepository.create(createUserInput);
        return this.userRepository.save(newUser);
    }

    async remove(id: number): Promise<boolean> {
        const result = await this.userRepository.delete({ id });
        return result.affected > 0;
    }
}
