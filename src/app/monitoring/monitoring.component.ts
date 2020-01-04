import { Component, OnInit } from '@angular/core';
import {ConstService} from '../service/Const.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit {
  progressbar_display_establishment: boolean = false;
  ourobject: any;
  batimentlist: any;

  constructor(private constance: ConstService
              , private authService: AuthService
              , private httpClient: HttpClient) { }

  ngOnInit() {
    this.getListebatiment();
  }


  getListebatiment() {
    //this.addroom_display = 'block';
    const url = 'https://fluxtnsi.ddns.net/api/location';
    this.progressbar_display_establishment = true;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.authService.sessions.access_token
      })
    };

    this.httpClient
      .get(url, httpOptions)
      .subscribe(
        (response) => {
          this.ourobject = response;
          this.progressbar_display_establishment = false;
          this.batimentlist = this.ourobject.data;
          console.log(this.batimentlist);
          /*this.progressbar_display_establishment = false;
          this.ourobject = response;
          this.batimentlist = this.ourobject.data;
          console.log(this.batimentlist);*/
          console.log(response);
          return response;
        },
        (error) => {
          console.log(error);
        }
      );
  }

}
