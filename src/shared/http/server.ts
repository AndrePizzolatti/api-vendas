import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import errorHandler from '@middlewares/errorHandler';
import '@shared/typeorm';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(errorHandler);

app.listen(3333, () => console.log('Server started!'));
