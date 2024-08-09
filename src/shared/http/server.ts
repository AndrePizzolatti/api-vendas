import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import { pagination } from 'typeorm-pagination';
import routes from './routes';
import errorHandler from '@shared/http/middlewares/errorHandler';
import rateLimiter from '@shared/http/middlewares/raterLimiter';
import '@shared/typeorm';

const app = express();

app.use(cors());
app.use(express.json());

app.use(rateLimiter);

app.use(pagination);

app.use(routes);

app.use(errors());

app.use(errorHandler);

app.listen(3333, () => console.log('Server started!'));
