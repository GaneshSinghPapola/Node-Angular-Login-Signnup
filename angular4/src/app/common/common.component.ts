import { Component, OnInit } from '@angular/core';
import { CommonService } from './common.service';

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.css'],
  providers:[CommonService]
})
export class CommonComponent implements OnInit {
  constructor(private service: CommonService) { }

  ngOnInit() {
  }


}
