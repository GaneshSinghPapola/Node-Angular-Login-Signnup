process.env.NODE_ENV = 'test';

import mongoose from "mongoose";
import superTest from 'supertest';
import validator from 'validator';
import chai from 'chai';

const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;

import {app} from '../server';

const testArr = [1,2,3,4,5,6];
const SuperTest = superTest(app);
let timeout = 30000;
describe('Unit test for Login & Registration', () => {

    // login tests 

        // describe('Login Email Validation', ()=> {
        //     it('Email should be valid string', done => {
        //         expect('email@test.com').to.be.a('string');
        //         done();
        //     }); 
        // })

    
        describe('Login with invalid email address', ()=> {
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
        });

        describe('Login with empty email address', ()=> {
            it('Should success if email is valid', done => {
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
        });

        describe('Login API with invalid credentials', ()=> {
            it('Should success if credentials are valid', done => {
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
        });

        describe('Login with valid credentials', ()=> {
            it('Should success if credentials are valid', done => {
                SuperTest.post('/login')
                   .set('Accept', 'application/json')
                   .set('Content-Type', 'application/json')
                   .send({ email: 'ganeshpapola@gmail.com', password: '11111' })
                   .expect(200)
                   .expect('Content-Type', /json/)
                   .expect(response=> {
                      expect(response.body).not.to.be.empty;
                      expect(response.body).to.be.an('object');
                   })
                   .end(done);
            }); 
        });


        //===============================================================================


        // describe('Signup if data is required', ()=> {
        //     it('Should success if provided a valid required data', done => {
        //         SuperTest.post('/register')
        //            .set('Accept', 'application/json')
        //            .set('Content-Type', 'application/json')
        //            .send({ email: 'ganeshpapola@gmail.com', password: 'test12345' })
        //            .expect(200)
        //            .expect('Content-Type', /json/)
        //            .expect(response=> {
        //               expect(response.body).not.to.be.empty;
        //               expect(response.body).to.be.an('object');
        //            })
        //            .end(done);
        //     }); 
        // });

});

