import { Component, OnInit } from '@angular/core';
import {ConstService} from '../service/Const.service';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit {

  constructor(private constance: ConstService) { }

  ngOnInit() {
  }

}
