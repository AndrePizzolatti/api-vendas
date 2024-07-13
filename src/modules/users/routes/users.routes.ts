import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from '../controllers/UsersController';
import auth from '@middlewares/auth';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UserAvatarController from '../controllers/UsersAvatarController';

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig);

usersRouter.get('/', auth, usersController.index);

usersRouter.get(
  '/:id',
  auth,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  usersController.Show,
);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.put(
  '/:id',
  auth,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      avatar: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  usersController.update,
);

usersRouter.patch(
  '/avatar',
  auth,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
