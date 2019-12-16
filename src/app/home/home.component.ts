import { Component, OnInit } from '@angular/core';
import {ConstService} from '../service/Const.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private constance: ConstService) { }

  ngOnInit() {
  }

}
