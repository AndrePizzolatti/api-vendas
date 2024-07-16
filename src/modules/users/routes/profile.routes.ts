import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ProfileController from '../controllers/ProfileController';
import auth from '@shared/http/middlewares/auth';

const profilesRouter = Router();
const profileController = new ProfileController();

profilesRouter.get('/', auth, profileController.Show);

profilesRouter.put(
  '/',
  auth,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string(),
      newPassword: Joi.string().optional(),
      newPasswordConfirmation: Joi.string()
        .valid(Joi.ref('newPassword'))
        .when('newPassword', { is: Joi.exist(), then: Joi.required() }),
    },
  }),
  profileController.update,
);

export default profilesRouter;
