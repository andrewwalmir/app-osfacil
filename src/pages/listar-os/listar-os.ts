import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListarOsService } from '../../services/domain/listar-os.services';

@IonicPage()
@Component({
  selector: 'page-listar-os',
  templateUrl: 'listar-os.html',
})
export class ListarOsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public listarOsService: ListarOsService) {
  }

  ionViewDidLoad() {
    this.listarOsService.findAll().subscribe(response => {
      console.log(response);
    },
      error => {
        console.log(error);
      });
  }

}
