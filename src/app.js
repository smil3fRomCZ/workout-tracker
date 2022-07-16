require('dotenv').config();
const express = require('express');
const { default: helmet } = require('helmet');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const userRouter = require('./components/user/userRouter');
const exerciseRouter = require('./components/exercise/exerciseRouter');

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(helmet());

if (process.env.ENV === 'DEV') {
    app.use(morgan('short'));
}

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/exercises', exerciseRouter);

module.exports = app;
