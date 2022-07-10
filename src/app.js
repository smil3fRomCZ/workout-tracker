require('dotenv').config();
const express = require('express');
const { default: helmet } = require('helmet');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const userRouter = require('./components/user/userRouter');

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(helmet());
process.env.ENV && app.use(morgan('short'));

// Routes
app.use('/api/v1/users', userRouter);

module.exports = app;
