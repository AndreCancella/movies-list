import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entity/user.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,
    ) { }

    async create(userData: Partial<Users>): Promise<Users> {
        const user = this.userRepository.create(userData);
        return this.userRepository.save(user);
    }

    async findById(id: number): Promise<Users> {
        const options: FindOneOptions<Users> = { where: { id: id } };
        return this.userRepository.findOne(options);
    }

    async findByUserName(username: string): Promise<Users> {
        const options: FindOneOptions<Users> = { where: { username: username } };
        return this.userRepository.findOne(options);
      }
}
