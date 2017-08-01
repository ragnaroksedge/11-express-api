'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('House Routes', function() {
  var house = null;

  describe('POST: /api/house', function() {
    it('should return status code 400', function(done) {
      request.post('localhost:8000/api/house')
      .send({ something: 'something' })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('BadRequestError');
        done();
      });
    });
    it('should return a house', function(done) {
      request.post('localhost:8000/api/house')
      .send({ name: 'Hodor', seat: 'Hodor', region: 'Hodor', words: 'Hodor' })
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Hodor');
        expect(res.body.seat).to.equal('Hodor');
        expect(res.body.region).to.equal('Hodor');
        expect(res.body.words).to.equal('Hodor');
        house = res.body;
        done();
      });
    });
  });

  describe('GET: /api/house', function() {
    it('should return status code 400', function(done) {
      request.get('localhost:8000/api/house?id=')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('BadRequestError');
        done();
      });
    });

    it('should return a house', function(done) {
      request.get(`localhost:8000/api/house?id=${house.id}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Hodor');
        expect(res.body.seat).to.equal('Hodor');
        expect(res.body.region).to.equal('Hodor');
        expect(res.body.words).to.equal('Hodor');
        done();
      });
    });
  });


  describe('GET: /api/fakeroute', function() {
    it('should return status code 404', function(done) {
      request.get('localhost:8000/api/fakeroute')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });
});
