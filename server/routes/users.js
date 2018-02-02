import {usersController, middleware} from '../controllers';
import passport from "passport";
import { Strategy } from "passport-local";





export default (server ) => {
    server.post("/login", usersController.login);
    server.post("/register",  usersController.register);
    server.post("/logout",  usersController.logOut);
    server.get("/test", middleware.varifyToken,  usersController.test);
    
}