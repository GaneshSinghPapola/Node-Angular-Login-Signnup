import {UsersModel} from '../models';
const { check, oneOf, validationResult } = require('express-validator/check');
import bcrypt from 'bcryptjs';
const saltRounds = 10;
import chalk from 'chalk';
import jwt from 'jsonwebtoken';

const log = console.log;
const JWTMESSAGE = process.env.JWTMESSAGE;

log(chalk.blue('User controller called'));

exports.login = async (req, res, next) => {
    req.checkBody('email', 'Please provide an email').notEmpty();
    req.checkBody('email', 'Please provide a valid email').isEmail();
    req.checkBody('password', 'Please provide password').notEmpty();
    req.checkBody('password', 'passwords must be at least 5 to 30 chars long').isLength({ min: 5, max:30 })
    // .matches(/\d/)
    
     try {
        const error = await req.getValidationResult();
        if(!error.isEmpty()) return wrongValidation(error.mapped(),res);

        const { email, password } = req.body;
        const condition = { email, password };
        const fields = {};
        const user = await matchPassword({ condition, fields });
        if (user) {
            const { password, created_at, updated_at, __v, ...data } = user['_doc'];
            data.token = jwt.sign({ email: data.email, name: data.name, _id: data._id}, JWTMESSAGE)
            req.session.user = data;
            req.session.isLoggedIn = true;

            res.status(200).json({ error: null, res: 'user logged in successfully', data: data});
        } else {
            req.session.user = undefined;
            res.status(400).json({error:{custom:'email/password does not match.'}, res: null });
        }
     } catch (error) {
        res.status(400).json({error, res: null });
     }
    
}

exports.test = (req, res, next) => {
    res.status(200).json({ error: null, res: 'test' });
    }

exports.register = async (req, res) => {
    req.checkBody('password', 'passwords must be at least 5 chars long').isLength({ min: 5 })
    req.checkBody('name', 'Please provide a name').notEmpty();
    req.checkBody('email', 'Please provide an email').notEmpty();
    req.checkBody('email', 'Please provide a valid email').isEmail();
    if(req.body.hasOwnProperty('age'))req.checkBody('age', 'age must be between 10 to 120').isInt({ min: 10, max:120 });


    try {
        const error = await req.getValidationResult(); //validation errors..
        if(!error.isEmpty()) return wrongValidation(error.mapped(),res);

        const { email } = req.body;
        const condition = { email };
        const fields = { password: 0 }
        const user = await findOne({ condition, fields });
        if (user) {
            res.status(400).json({ error:{custom:'email already taken'},res: null});
        } else {
            await saveUser(req.body);
            res.status(200).json({ error: null, res: 'user saved successfully'});
        }
    } catch (error) {
        res.status(400).json({ error, res: null });
    }

}

exports.logOut = (req, res) => {
    res.clearCookie('LoginSignupCookie');
    
    req.session.destroy(function (err) {
        req.logout();
        // res.redirect('/');
    });
    req.logout();
    log(chalk.green(JSON.stringify(req.session)));
    res.status(200).json({ error: null, res: 'user logged out successfully' });

}


const wrongValidation = (error,res)=>{
    return res.status(400).json({ error, res: null });
}
const matchPassword = async ({ condition, fields }) => {
    const {password} = condition;
    const user = await findOne({ condition, fields });
    if (user) {
        const isMatched = await bcrypt.compare(password, user.password);
        return isMatched === true ? user : false;
    }
    return false;
}
const findOne = ({ condition, fields = {} }) => {
    if(condition.hasOwnProperty('password')) delete condition.password;
    return new Promise((resolve, reject) => {
        UsersModel.findOne(condition,fields, (err, user) => {
            if (err) return reject(err);
            else resolve(user);
        })
    })
}

const saveUser = (data) => {
    let newUser = UsersModel(data);
    return new Promise((resolve, reject) => {
        newUser.save((err, done) => {
            if (err) reject(err);
            resolve(done);
        });
    })
}