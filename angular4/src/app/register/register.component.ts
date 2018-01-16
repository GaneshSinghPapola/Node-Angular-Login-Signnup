import { Component, OnInit } from '@angular/core';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[RegisterService]
})
export class RegisterComponent implements OnInit {
  user={}
  constructor(private service: RegisterService) { }

  ngOnInit() {
  }

  login(){
    this.service.register(this.user).then(res=>console.log(res));
    console.log(this.user)
  }

}
