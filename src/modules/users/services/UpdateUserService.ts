import { getCustomRepository } from 'typeorm';
import UserRepository from '../typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';

interface IRequest {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

class UpdateUserService {
  public async execute({ id, name, email, avatar }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);

    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError('User not found');
    }

    const userExists = await usersRepository.findByName(name);

    if (userExists && name !== user.name) {
      throw new AppError('There is already one user with this name');
    }

    user.name = name;
    user.email = email;
    user.avatar = avatar;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
