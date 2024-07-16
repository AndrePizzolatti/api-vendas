import { Request, Response } from 'express';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';

export default class ProfilesController {
  public async Show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const showProfile = new ShowProfileService();

    const user = await showProfile.execute({ id });

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { name, email, password, newPassword } = request.body;

    const updateProfile = new UpdateProfileService();

    const user = await updateProfile.execute({
      id,
      name,
      email,
      password,
      newPassword,
    });

    return response.json(user);
  }
}
