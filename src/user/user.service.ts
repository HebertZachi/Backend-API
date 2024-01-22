import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/user-dto';
import { UpdateUserDto } from './dtos/user-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  getAllUsers(): Promise<User[]> {
    const user = this.userRepository.find();
    return user;
  }

  async getUserById(id: number): Promise<User> {
    return await this.userRepository.findOneByOrFail({ id });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const userExist = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (userExist) {
      throw new ConflictException('Email already exists');
    }
    const user = this.userRepository.create(createUserDto);
    const safePassword = await bcrypt.hash(createUserDto.password, 14);
    user.password = safePassword;
    return await this.userRepository.save(user);
  }

  async updateUser(id: number, body: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneOrFail({ where: { id } });
    if (!user) {
      throw new Error(`User ${id} not found`);
    }
    Object.assign(user, body);
    return await this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.userRepository.findOneOrFail({ where: { id } });
    if (!user) {
      throw new Error(`User ${id} not found`);
    }
    return await this.userRepository.remove(user);
  }
}
