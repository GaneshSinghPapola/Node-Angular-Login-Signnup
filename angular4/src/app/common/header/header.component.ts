import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [CommonService]
})
export class HeaderComponent implements OnInit {
  constructor(private service: CommonService) { }

  ngOnInit() {
  }


}
