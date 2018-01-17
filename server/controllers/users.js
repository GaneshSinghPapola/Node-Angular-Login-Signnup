import {
    UsersModel
} from '../models';


export default {
    login(req, res) {
        // todo validate first here
        res.json({'test':'test'})
    },

    register(req, res) {
        res.json({'test':'test'})
    }
}

const saveUser = (data) => {
    let newUser = UsersModel(data);
    new Promise((resolve, reject) =>{
        newUser.save((err, done) => {
            if (err) reject(err);
            resolve(done);
        });
    })

}