require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const path = require('path');
const createError = require('http-errors');

const app = express();

/* Config */

/*  */

/* Views */

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

/* Middlewares */

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));

app.use((req, res, next) => {
  res.locals.currentUser = req.user;

  next();
});

/* Routes */

app.use((req, res, next) => {
  next(createError(404, 'Page not found'));
})

app.use((error, req, res, next) => {
  console.error(error);

  const status = error.status || 500;

  res.status(status).render('error', {
    message: error.message,
  })
})

const port = Number(process.env.PORT || 3000);

app.listen(port, () => {
  console.log(`App started on port ${port}`);
})