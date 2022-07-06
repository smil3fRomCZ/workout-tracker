require('dotenv').config();
const express = require('express');
const { default: helmet } = require('helmet');
const morgan = require('morgan');
const userRouter = require('./components/user/userRouter');

const app = express();

app.use(helmet());
process.env.ENV && app.use(morgan('common'));
app.use(express.json());

// Routes
app.use('/users', userRouter);

module.exports = app;
