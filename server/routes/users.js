import {usersController, matchPassword} from '../controllers';
import passport from "passport";
import { Strategy } from "passport-local";





export default (server ) => {
    server.post("/login", usersController.login);
    server.post("/register",  usersController.register);
    server.get("/test", usersController.varifyToken,  usersController.test);
    
}