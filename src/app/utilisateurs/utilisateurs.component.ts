import { Component, OnInit } from '@angular/core';
import {ConstService} from '../service/Const.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../service/auth.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.scss']
})
export class UtilisateursComponent implements OnInit {

   utilisateurslists: any;
   ourobject:any;
  progressbar_display_utilisateur: boolean = false;
  //datepicker libelle
  datepicker_birth="Date de naissance";
   ourobject: any;
   progressbar_display_utilisateur : boolean = true;


  constructor(private constance: ConstService
    , private httpClient: HttpClient
    , private authService: AuthService) { }

  ngOnInit() {
    this.getListeUtilisateurs();
  }

  getListeUtilisateurs() {
    const url = 'https://fluxtnsi.ddns.net/api/user';
    this.progressbar_display_utilisateur = true;

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
          this.ourobject = response;
          this.utilisateurslists = this.ourobject.data;
          this.progressbar_display_utilisateur = false;
          return response;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onUpdate(form: NgForm) {

  }

  onaddUser(form: NgForm) {
    const url = 'https://fluxtnsi.ddns.net/api/user/register';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.authService.sessions.access_token
      })
    };

    /*const lastname = form.value['lastname_create'];
    const  firstname = form.value['firstname_create'];
    const email = form.value['email_create'];
    const birthday = form.value['birthdate_create'];
    const role = form.value['role_create'];
    const password = form.value['password_create'];*/

    this.httpClient
      .post(url,{'lastname': form.value['lastname_create'],
        'firstname': form.value['firstname_create'],
        'email': form.value['email_create'],
        'password': form.value['password_create'],
        'password_confirm': form.value['password_create']})
      .subscribe(
        (response) => {
          console.log(response);
          /*this.authService.sessions = response;
          if (this.authService.sessions.success == true) {
            this.progressbar_status = false;
            this.error = false;
            this.authService.signIn();
            this.router.navigate(['home']);
          }
          console.log(response);*/
          return response;
        },
        (error) => {
          /*this.progressbar_status = false;
          this.error = true;*/
        }
      );
  }
  // get utilisateur by ID
  getUserById(index) {

  }

}
