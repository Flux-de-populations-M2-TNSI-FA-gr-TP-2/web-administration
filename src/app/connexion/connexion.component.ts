import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ConstService} from '../service/Const.service';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  error: boolean = false;

  progressbar_status: boolean = false;

  constructor(private  router: Router
              , private httpClient: HttpClient
              , private authService: AuthService
              , private constance: ConstService) {

  }

  ngOnInit() {

  }



  onSubmit(form: NgForm) {
    this.progressbar_status = true;
    const url = 'https://fluxtnsi.ddns.net/api/user/login';
    this.httpClient
      .post(url, {'email': form.value['email'],'password': form.value['password']})
      .subscribe(
        (response) => {
          this.authService.sessions = response;
          if (this.authService.sessions.success == true) {
              this.progressbar_status = false;
              this.error = false;
              this.authService.signIn();
              this.router.navigate(['home']);
          }
          console.log(response);
          return response;
        },
        (error) => {
          this.progressbar_status = false;
          this.error = true;
        }
      );
  }



  Connexion(url: string) {



    /*this.httpClient
      .post(url,)
      .subscribe(
        (response) => {

          return response;
        },
        (error) => {*/
          /*console.log('Une erreur vient de se produire !!');*/
       /* }
      );*/
  }

}
