import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ConstService} from '../service/Const.service';
import {AuthService} from '../service/auth.service';
import {MatSnackBar} from '@angular/material';

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
              , public snackBar: MatSnackBar
              , private authService: AuthService
              , private constance: ConstService) {

  }

  ngOnInit() {

  }



  onSubmit(form: NgForm) {
    this.progressbar_status = true;
    const url = 'https://fluxtnsi.ddns.net/api/user/login';//'http://localhost/Apifcm/push_boss.php';//this.constance.dns.concat('/user/login');
    this.httpClient
      .post(url, {'email': form.value['email'],'password': form.value['password']})
      .subscribe(
        (response) => {
          //console.log(response);
          this.authService.sessions = response;
          if (this.authService.sessions.user.role === 'admin') {
              this.progressbar_status = false;
              this.error = false;
              this.authService.signIn();
              this.router.navigate(['home']);
          } else {
            this.progressbar_status = false;
            this.openSnackBar("Connexion échouée, votre compte n'est pas un compte administrateur ", "erreur");
          }
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

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
