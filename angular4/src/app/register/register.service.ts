import { NgModule, Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable()
export class RegisterService {
  constructor(
    private _router: Router,
    public http: Http) {
  }

  register(obj) {
    return this.http.post('http://localhost:3000/register', obj)
                    .toPromise().then(response => response);
  }
}
