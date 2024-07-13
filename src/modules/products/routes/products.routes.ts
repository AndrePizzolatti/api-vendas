import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';
import { celebrate, Joi, Segments } from 'celebrate';
import auth from '@middlewares/auth';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get('/', auth, productsController.index);

productsRouter.get(
  '/:id',
  auth,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productsController.Show,
);

productsRouter.post(
  '/',
  auth,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    },
  }),
  productsController.create,
);

productsRouter.put(
  '/:id',
  auth,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productsController.update,
);

productsRouter.delete(
  '/:id',
  auth,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productsController.delete,
);

export default productsRouter;
