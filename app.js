require('dotenv').config();
require('./db');
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');

// Routers require
const postRoutes = require('./routes/postRoutes');
const authRouter = require('./routes/auth');
const droneRouter = require('./routes/droneRoutes');
const reviewDrone = require('./routes/reviewDroneRoutes');

const app = express();

// cookies and loggers
app.use(cors({
  origin: process.env.ORIGIN
}));
app.set('trust proxy', 1);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes intro
app.use('/', postRoutes);
app.use('/auth', authRouter);
app.use('/drones', droneRouter);
app.use('/reviews', reviewDrone)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).json({
    message: err.message || 'Server Error!!!'
  });
});

module.exports = app;
