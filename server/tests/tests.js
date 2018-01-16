process.env.NODE_ENV = 'test';

import mongoose from "mongoose";
import superTest from 'supertest';
import chai from 'chai';

const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;

import {app} from '../server';

const testArr = [1,2,3,4,5,6];
let timeout = 30000;
describe('Unit test for Login & Registration', () => {

        describe('Test init', function () {
            this.timeout(timeout);
            it('test list', done => {
    
                    expect(testArr).to.be.an('array');
                    done();
            });
        });

        describe('Login API', function() {
            it('Should success if credential is valid', function(done) {
                superTest(app)
                   .post('/login')
                   .set('Accept', 'application/json')
                   .set('Content-Type', 'application/json')
                   .send({ username: 'username', password: 'password' })
                   .expect(200)
                   .expect('Content-Type', /json/)
                   .expect(response=> {
                      expect(response.body).not.to.be.empty;
                      expect(response.body).to.be.an('object');
                   })
                   .end(done);
            }); 
        });
});

