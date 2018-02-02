import chalk from 'chalk';
import jwt from 'jsonwebtoken';

const log = console.log;
const JWTMESSAGE = process.env.JWTMESSAGE;

log(chalk.green('Middleware controller called'));

exports.varifyToken = (req, res, next) => {
    const {token}= req.headers;
    if(req.session.user)
    jwt.verify(token, JWTMESSAGE,(err, decoded)=> {
        if (err)return res.status(500).json({ error: { custom: 'unauthorized user' }, res: null });
        next();
      });
      else return res.status(500).json({ error: { custom: 'please login first to continue' }, res: null });
}