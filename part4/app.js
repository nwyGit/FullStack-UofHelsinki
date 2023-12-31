import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import config from './utils/config.js';
import logger from './utils/logger.js';
import middleware from './utils/middleware.js';
import blogsRouter from './controllers/blogs.js';
import usersRouter from './controllers/users.js';
import loginRouter from './controllers/login.js';
import testingRouter from './controllers/testing.js';

const app = express();

mongoose.set('strictQuery', false);

//logger.info('connecting to', config.MONGODB_URI);

mongoose
	.connect(config.MONGODB_URI)
	.then(() => {
		logger.info('connected to MongoDB');
	})
	.catch((error) => {
		logger.info('error connecting to MongoDB:', error.message);
	});

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
app.use(middleware.requestLogger);
morgan.token('req-body', (req) => JSON.stringify(req.body));
app.use(
	morgan(
		':method :url :status :res[content-length] - :response-time ms :req-body'
	)
);

app.use(middleware.tokenExtractor);

app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);
app.use('/api/blogs', middleware.userExtractor, blogsRouter);

if (process.env.NODE_ENV === 'test') {
	app.use('/api/testing', testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
