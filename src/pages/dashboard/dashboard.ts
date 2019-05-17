import { UserPage } from '../user/user.component';
import { NavLifecycles } from './../../utils/ionic/nav/nav-lifecycles';
import { ConfigService } from './../../services/config.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserDetailPage } from '../user/userdetail/userdetail.component';

import { CreateOrderPage } from '../order/create-order/create-order';
import { ListarOsPage } from '../order/listar-os/listar-os';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage implements NavLifecycles {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public configService: ConfigService
  ) {}

  ionViewDidLoad;
  metodo() {
    this.navCtrl.push(ListarOsPage.name);
  }
  metodoUserDetail() {
    this.navCtrl.push(UserDetailPage.name);
  }
  addOrder() {
    this.navCtrl.push(CreateOrderPage.name);
  }
  listarUsuarios() {
    this.navCtrl.push(UserPage.name);
  }
}
