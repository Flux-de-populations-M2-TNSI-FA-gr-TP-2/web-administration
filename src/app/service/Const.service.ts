export  class ConstService {
  
  /*ces variables sont utilisées au
   niveau du menu afin de dynamiser la vue du menu*/
  active_evenement:string = '';
  active_monitoring:string = 'active';
  active_utilisateur:string = '';
  active_etablissement:string = '';
  

  //la barre de progression de la déconnexion
  progressbar_deconnexion: boolean = false;

  //Value Date picker
  value_datePicker:string = '';


}
