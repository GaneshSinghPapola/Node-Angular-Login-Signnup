import {UsersModel} from '../models';
import bcrypt from 'bcryptjs';
const saltRounds = 10;





export default {
    async login(req, res, next) {
        // todo validate first here

        const { email, password } = req.body;
        const condition = { email, password };
        const fields = { }
        const user = await matchPassword({condition, fields});

        if (user) {
            res.status(200).json({ error: null, res: 'user logged in successfully', data:user});
        } else {
            res.status(400).json({ error: 'please try again later', res: null });
        }
    },



    async register(req, res) {
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
}

const matchPassword = async ({ condition, fields }) => {
    const user = await findOne({ condition, fields });
    
    if (user) {
        const isMatched = await bcrypt.compare(password, user.password);
        return isMatched === true ? user : false;
    }
    return false;
}
const findOne = ({condition, fields={}}) => {
    return new Promise((resolve, reject) => {
        UsersModel.findOne(condition, fields, (err, user) => {
            if (err) return reject(err);
            else resolve(user);
        })
    })
}

const saveUser = (data) => {
    let newUser = UsersModel(data);
    return new Promise((resolve, reject) =>{
        newUser.save((err, done) => {
            if (err) reject(err);
            resolve(done);
        });
    })

}