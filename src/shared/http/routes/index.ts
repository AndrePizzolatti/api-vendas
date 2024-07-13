import uploadConfig from '@config/upload';
import productsRouter from '@modules/products/routes/products.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import usersRouter from '@modules/users/routes/users.routes';
import express from 'express';

const routes = express.Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/files', express.static(uploadConfig.directory));

export default routes;
