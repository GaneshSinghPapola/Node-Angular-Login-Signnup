import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
user= { };
  constructor(
    private service: LoginService
  ) { }

  ngOnInit() {
  }

  login(){
    this.service.login(this.user).then(res=>console.log(res));
    console.log(this.user)
  }

}
