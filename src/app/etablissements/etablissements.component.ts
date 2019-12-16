import { Component, OnInit } from '@angular/core';
import {ConstService} from '../service/Const.service';

@Component({
  selector: 'app-etablissements',
  templateUrl: './etablissements.component.html',
  styleUrls: ['./etablissements.component.scss']
})
export class EtablissementsComponent implements OnInit {

  constructor(private constance: ConstService) { }

  ngOnInit() {
  }

}
