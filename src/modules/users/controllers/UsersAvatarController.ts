import { Request, Response } from 'express';
import ListUserService from '../services/ListUserService';
import ShowUserService from '../services/ShowUserService';
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import AppError from '@shared/errors/AppError';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const avatar = request.file?.filename;

    if (!avatar) {
      throw new AppError('Missing avatar file.');
    }

    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({ id, avatar });

    return response.json(user);
  }
}
