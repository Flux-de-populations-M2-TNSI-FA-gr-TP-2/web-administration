import { Component, OnInit } from '@angular/core';
import {ConstService} from '../service/Const.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-evenements',
  templateUrl: './evenements.component.html',
  styleUrls: ['./evenements.component.scss']
})
export class EvenementsComponent implements OnInit {

  ourObject : any;
  evenements : any;
  constructor(private constance: ConstService
              , private httpClient: HttpClient
              , private authService: AuthService) { }

  ngOnInit() {
    this.getListEvent();
  }

   getListEvent() {
     console.log(this.authService.sessions.access_token);
    const url = 'https://fluxtnsi.ddns.net/api/event';

    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer ' + this.authService.sessions.access_token
      })
    };

    this.httpClient
      .get(url,httpOptions)
      .subscribe(
        (response) => {
          this.ourObject = response;
          this.evenements = this.ourObject.data;
          console.log(this.evenements);
          return response;
        },
        (error) => {
           console.log(error);
        }
      );
    }

}


