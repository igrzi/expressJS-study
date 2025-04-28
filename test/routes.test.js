import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../index';

describe('GET /users', function(){
  it('respond with json', function(done){
    request(app)
      .get('/users')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        done()
      });
  })
});
