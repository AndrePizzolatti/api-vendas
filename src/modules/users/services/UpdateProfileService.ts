import { getCustomRepository } from 'typeorm';
import UserRepository from '../typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';
import { compare, hash } from 'bcryptjs';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password?: string;
  newPassword?: string;
}

class UpdateUserService {
  public async execute({
    id,
    name,
    email,
    password,
    newPassword,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);

    const user = await usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found');
    }

    const userEmailExists = await usersRepository.findByEmail(email);

    if (userEmailExists && name !== user.email) {
      throw new AppError('There is already one user with this email');
    }

    if (newPassword && !password) {
      throw new AppError('Old password is required.');
    }

    if (newPassword && password) {
      const checkPassword = await compare(password, user.password);

      if (!checkPassword) {
        throw new AppError('Passwords does not match.');
      }

      user.password = await hash(newPassword, 8);
    }

    user.name = name;
    user.email = email;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
