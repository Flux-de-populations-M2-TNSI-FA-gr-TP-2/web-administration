import { Component, OnInit } from '@angular/core';
import {ConstService} from '../service/Const.service';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.scss']
})
export class UtilisateursComponent implements OnInit {

  constructor(private constance: ConstService) { }

  ngOnInit() {
  }

}
