import { getCustomRepository } from 'typeorm';
import UserRepository from '../typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';
import path from 'path';
import uploadConfig from '@config/upload';
import { promises } from 'fs';

interface IRequest {
  id: string;
  avatar: string;
}

class UpdateUserService {
  public async execute({ id, avatar }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);

    const user = await usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found');
    }

    if (user.avatar) {
      const userAvatarPath = path.join(uploadConfig.directory, user.avatar);
      const userAvatatExists = await promises.stat(userAvatarPath);

      if (userAvatatExists) {
        await promises.unlink(userAvatarPath);
      }
    }

    user.avatar = avatar;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
