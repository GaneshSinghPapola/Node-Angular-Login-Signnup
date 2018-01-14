import {usersController} from '../controllers';

export default (server ) => {
    server.post("/login", usersController.login);
    server.post("/register",  usersController.register);

}