const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

/**
 * system config.
 */
const PORT = 3000;
const DBNAME = 'dbcrafts';
const MONGO_URI = `mongodb://localhost/${DBNAME}`;

/**
 * Routes.
 */
const apiRouter = require('./routes/api');
const catalogRouter = require('./routes/catalog');

/**
 * DB connection.
 */
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

/**
 * handle parsing request body
 */
app.use(express.json());

/**
 * Route handlers.
 */
app.use('/api', apiRouter);
app.use('/api/catalog', catalogRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

/**
 * Handle unknown routes.
 */
app.use('*', (req, res) => {
  console.log(req);
  res.sendStatus(404);
});

/**
 * Global Error.
 */
app.use((err, req, res, next) => {
  console.log('Global Error', err);
  const defaultError = {
    log: 'Express error handler caught: unknown middleware error',
    status: 400,
    message: {
      err: 'Unexpected error occured',
    },
  };

  const errObj = Object.assign(defaultError, err);
  console.log('SEREVER ERROR:', errObj.log);
  return res.status(errObj.status).json(errObj.message);
});

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
