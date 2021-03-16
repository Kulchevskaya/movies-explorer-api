/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index.js');
const errorHandler = require('./middlewares/errorHandler.js');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/filmsdb' } = process.env;
const app = express();

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

mongoose.connection.on('open', () => console.log('DB connected'));

app.use(cors());
app.use(express.json());
app.use(requestLogger);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);
app.use(helmet());

app.use(routes);

app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
