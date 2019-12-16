export  class ConstService {
  dns = 'https://fluxtnsi.ddns.net/api';

  /*ces variables sont utilisées au
   niveau du menu afin de dynamiser la vue du menu*/
  active_evenement:string = '';
  active_monitoring:string = 'active';
  active_utilisateur:string = '';
  active_etablissement:string = '';

  //la barre de progression de la déconnexion
  progressbar_deconnexion: boolean = false;
}
