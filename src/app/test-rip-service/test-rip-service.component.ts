import { RipServiceService } from './../rip-service.service';
import { Component, OnInit } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-test-rip-service',
  templateUrl: './test-rip-service.component.html',
  styleUrls: ['./test-rip-service.component.css']
})
export class TestRipServiceComponent implements OnInit {

  constructor(private service: RipServiceService) { }

  ngOnInit() {

  }

  sendData() {
    console.log(this.service.storeServers([
      { 'name': 'rip', 'surename': 'sumbadze' },
      { 'name': 'rip2', 'surename': 'sumbadze2' },
    ]).subscribe());
  }

  getData() {
      this.service.getServers().subscribe(
        // aq vichert monacemebs romelic map-idan aris gamogzavnili
        (data:any)=>{
          console.log(data);
        }
      )
  }

}
