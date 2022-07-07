require('dotenv').config();
const express = require('express');
const { default: helmet } = require('helmet');
const morgan = require('morgan');
const userRouter = require('./components/user/userRouter');

const app = express();

app.use(express.json());
app.use(helmet());
process.env.ENV && app.use(morgan('short'));

// Routes
app.use('/api/v1/users', userRouter);

module.exports = app;
