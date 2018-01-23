import {UsersModel} from '../models';
import bcrypt from 'bcryptjs';
const saltRounds = 10;

exports.login = async (req, res, next) => {
    //TODO not working ?
    req.checkBody('email', 'Please provide an email').isEmpty();
    req.checkBody('email', 'Please provide a valid email').isEmail();
    req.checkBody('password', 'Please provide a password').notEmpty();
    req.checkBody('password', 'passwords must be at least 5 chars long').isLength({ min: 5 })
    // .matches(/\d/)

    const { email, password } = req.body;
    const condition = { email, password };
    const fields = {};
    const user = await matchPassword({ condition, fields });
    if (user) {
        const { password, created_at, updated_at, __v, ...data } = user['_doc'];
        req.session.user = data;
        req.session.user.isLoggedIn = true;
        res.status(200).json({ error: null, res: 'user logged in successfully', data: data });
    } else {
        req.session.user = undefined;
        res.status(400).json({ error: 'please try again later', res: null });
    }
}

exports.register = async (req, res) => {
    // validate first
    try {
        const { email } = req.body;
        const condition = { email };
        const fields = { password: 0 }
        const user = await findOne({ condition, fields });
        if (user) {
            res.status(400).json({ error: 'email already taken', res: null });
        } else {
            await saveUser(req.body);
            res.status(200).json({ error: null, res: 'user saved successfully' });
        }
    } catch (error) {
        res.status(400).json({ error: 'there is some problem occured, please try again later', res: null });
    }

}

exports.logOut = async (req, res) => {
    res.clearCookie('LoginSignupCookie');
    // req.session.destroy(function (err) {
    //     req.logout();
    //     res.redirect('/');
    // });
    req.logout();
    res.status(200).json({ error: null, res: 'user logged out successfully' });

}


const matchPassword = async ({ condition, fields }) => {
    const user = await findOne({ condition, fields });
    if (user) {
        const isMatched = await bcrypt.compare(condition.password, user.password);
        return isMatched === true ? user : false;
    }
    return false;
}
const findOne = ({ condition, fields = {} }) => {
    return new Promise((resolve, reject) => {
        UsersModel.findOne({}, (err, user) => {
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