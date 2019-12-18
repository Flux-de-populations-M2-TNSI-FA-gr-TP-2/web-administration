import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-listeutilisateurs',
  templateUrl: './listeutilisateurs.component.html',
  styleUrls: ['./listeutilisateurs.component.scss']
})
export class ListeutilisateursComponent implements OnInit {

  @Input() index: number;
  @Input() firstname: string;
  @Input() lastname: string;
  @Input() email: string;
  @Input() password: string;
  @Input() birthday: string;
  @Input() role: string;


  constructor() { }

  ngOnInit() {
  }

}
