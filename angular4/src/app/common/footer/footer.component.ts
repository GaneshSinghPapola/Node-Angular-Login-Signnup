import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  providers: [CommonService]
})
export class FooterComponent implements OnInit {
  constructor(private service: CommonService) { }

  ngOnInit() {
  }


}
