/** EXTERNAL DEPENDENCIES */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

/** ROUTERS */
const indexRouter = require('./routes/index');
const todoRouter = require('./routes/todo');


/** OUR MIDDLEWARE */
const { setCors } = require('./middleware/security');

/** INIT THE SERVER */
const app = express();

/** LOGS */
app.use(logger('dev'));

/** CONNECT TO MONGO */
mongoose.connect('mongodb://localhost:27017/to-do-list', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

mongoose.connection.on(
  'error',
  console.error.bind(console, 'connection error:')
);

mongoose.connection.on('open', () => {
  console.log(`Connected to the database...`);
});

/** REQUEST PARSERS */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(setCors);

/** STATIC FILES */
app.use(express.static(path.join(__dirname, 'public')));

/** ROUTES */
app.use('/', indexRouter);
app.use('/todo', todoRouter);

/** ERROR HANDLING */
app.use(function(req, res, next) {
  const err = new Error('Looks like something is broken...');
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(400).send({
    error: {
      message: err.message
    }
  });
});

module.exports = app;