import { NgModule, Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable()
export class FooterService {
  constructor(
    private _router: Router,
    public http: Http) {
  }

}
