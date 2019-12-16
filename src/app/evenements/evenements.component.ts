import { Component, OnInit } from '@angular/core';
import {ConstService} from '../service/Const.service';

@Component({
  selector: 'app-evenements',
  templateUrl: './evenements.component.html',
  styleUrls: ['./evenements.component.scss']
})
export class EvenementsComponent implements OnInit {

  constructor(private constance: ConstService) { }

  ngOnInit() {
  }

}
