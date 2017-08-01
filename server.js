'use strict';

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('house:server');
const House = require('./model/house.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.get('/test', function(req, res) {
  debug('GET: /test');
  res.json({ msg: 'hello from/test land' });
});

app.post('/api/house', jsonParser, function(req, res, next) {
  debug('POST: /api/house');

  House.createHouse(req.body)
  .then(house => res.json(house))
  .catch(err => next(err));
});

app.get('/api/house', function(req, res, next) {
  debug('GET: /api/house');

  House.fetchHouse(req.query.id)
  .then(house => res.json(house))
  .catch(err => next(err));
});

app.delete('/api/house', function(req, res, next) {
  debug('DELETE: /api/house');
  House.deleteHouse(req.query.id)
  .then(() => res.sendStatus(204))
  .catch(err => next(err));
});

app.use(function(err, req, res, next) {
  debug('error middleware');
  console.error(err.message);

  if(err.status) {
    res.status(err.status).send(err.name);
    return;
  }

  err = createError(500, err.message);
  res.status(err.status).send(err.name);
});

app.listen(PORT, () => {
  debug('server:', PORT);
});
