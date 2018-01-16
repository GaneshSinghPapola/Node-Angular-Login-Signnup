import { NgModule, Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable()
export class LoginService {
  constructor(
    private _router: Router,
    public http: Http) {
  }

  login(obj) {
    return this.http.post('http://localhost:3000/login', obj)
                    .toPromise().then(response => response)
  }
}
