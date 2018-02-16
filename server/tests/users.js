process.env.NODE_ENV = 'test';

import mongoose from "mongoose";
import superTest from 'supertest';
import validator from 'validator';
import chai from 'chai';

const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;

import {app} from '../server';

const SuperTest = superTest(app);
let timeout = 30000;
describe('Unit test for Login & Registration', () => {

    // login tests 


        //================================= sign up ==============================================


        describe('Signup tests ', ()=> {

            it('without everything', done => {
                SuperTest.post('/register')
                   .set('Accept', 'application/json')
                   .set('Content-Type', 'application/json')
                   .send({})
                   .expect(400)
                   .expect('Content-Type', /json/)
                   .expect(response=> {
                      expect(response.body).not.to.be.empty;
                      expect(response.body).to.be.an('object');
                   })
                   .end(done);
            });

            it('without password and name', done => {
                SuperTest.post('/register')
                   .set('Accept', 'application/json')
                   .set('Content-Type', 'application/json')
                   .send({ email: 'ganeshpapola@gmail.com', password: '' })
                   .expect(400)
                   .expect('Content-Type', /json/)
                   .expect(response=> {
                      expect(response.body).not.to.be.empty;
                      expect(response.body).to.be.an('object');
                   })
                   .end(done);
            });
            
            it('without email and name', done => {
                SuperTest.post('/register')
                   .set('Accept', 'application/json')
                   .set('Content-Type', 'application/json')
                   .send({ email: '', password: '11111' })
                   .expect(400)
                   .expect('Content-Type', /json/)
                   .expect(response=> {
                      expect(response.body).not.to.be.empty;
                      expect(response.body).to.be.an('object');
                   })
                   .end(done);
            });

            it('without name', done => {
                SuperTest.post('/register')
                   .set('Accept', 'application/json')
                   .set('Content-Type', 'application/json')
                   .send({ email: 'ganeshpapola@gmail.com', password: 'test12345' })
                   .expect(400)
                   .expect('Content-Type', /json/)
                   .expect(response=> {
                      expect(response.body).not.to.be.empty;
                      expect(response.body).to.be.an('object');
                   })
                   .end(done);
            });

            it('with invalid age', done => {
                SuperTest.post('/register')
                   .set('Accept', 'application/json')
                   .set('Content-Type', 'application/json')
                   .send({ email: 'ganeshpapola@gmail.com', password: '1111s', age:1 })
                   .expect(400)
                   .expect('Content-Type', /json/)
                   .expect(response=> {
                      expect(response.body).not.to.be.empty;
                      expect(response.body).to.be.an('object');
                   })
                   .end(done);
            });

            it('age as string', done => {
                SuperTest.post('/register')
                   .set('Accept', 'application/json')
                   .set('Content-Type', 'application/json')
                   .send({ email: 'ganeshpapola@gmail.com', password: 'test12345', age:'etrakwgk' })
                   .expect(400)
                   .expect('Content-Type', /json/)
                   .expect(response=> {
                      expect(response.body).not.to.be.empty;
                      expect(response.body).to.be.an('object');
                   })
                   .end(done);
            });

            it('with already registered email', done => {
                SuperTest.post('/register')
                   .set('Accept', 'application/json')
                   .set('Content-Type', 'application/json')
                   .send({ email: 'ganeshpapola1@gmail.com', password: 'test12345', age:12, name:'ganesh singh' })
                   .expect(400)
                   .expect('Content-Type', /json/)
                   .expect(response=> {
                      expect(response.body).not.to.be.empty;
                      expect(response.body).to.be.an('object');
                   })
                   .end(done);
            });

            it('with complete data', done => {
                SuperTest.post('/register')
                   .set('Accept', 'application/json')
                   .set('Content-Type', 'application/json')
                   .send({ email: 'ganeshpapola2623@gmail.com', password: 'test12345', age:12, name:'ganesh singh' })
                   .expect(200)
                   .expect('Content-Type', /json/)
                   .expect(response=> {
                      expect(response.body).not.to.be.empty;
                      expect(response.body).to.be.an('object');
                   })
                   .end(done);
            });

        });

        
// ===============login=============

describe('Login Tests', ()=> {

    it('Should success if email is valid', done => {
        SuperTest.post('/login')
           .set('Accept', 'application/json')
           .set('Content-Type', 'application/json')
           .send({ email: 'email@', password: 'password' })
           .expect(400)
           .expect('Content-Type', /json/)
           .expect(response=> {
              expect(response.body).not.to.be.empty;
              expect(response.body).to.be.an('object');
           })
           .end(done);
    }); 


    it('Should be failed with response code 400', done => {
        SuperTest.post('/login')
           .set('Accept', 'application/json')
           .set('Content-Type', 'application/json')
           .send({ email: '', password: 'password' })
           .expect(400)
           .expect('Content-Type', /json/)
           .expect(response=> {
              expect(response.body).not.to.be.empty;
              expect(response.body).to.be.an('object');
           })
           .end(done);
    }); 

    it('Should be failed with response code 400', done => {
        SuperTest.post('/login')
           .set('Accept', 'application/json')
           .set('Content-Type', 'application/json')
           .send({ email: 'email@test.com', password: 'password' })
           .expect(400)
           .expect('Content-Type', /json/)
           .expect(response=> {
              expect(response.body).not.to.be.empty;
              expect(response.body).to.be.an('object');
           })
           .end(done);
    }); 


    it('Should success if credentials are valid', done => {
        SuperTest.post('/login')
           .set('Accept', 'application/json')
           .set('Content-Type', 'application/json')
           .send({ email: 'ganeshpapola3@gmail.com', password: 'test12345' })
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

