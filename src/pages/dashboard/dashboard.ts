import { UserModelDTO } from './../../models/usermodel.dto';
import { FunctionModelDTO } from './../../models/functionModel.dto';
import { UserPage } from '../user/user.component';
import { NavLifecycles } from './../../utils/ionic/nav/nav-lifecycles';
import { ConfigService } from './../../services/config.service';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Config } from 'ionic-angular';

import { UserDetailPage } from '../user/userdetail/userdetail.component';

import { OrderDetailPage } from '../order/orderDetail/orderDetail.component';
import { OrderPage } from '../order/order.component';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage implements OnInit, NavLifecycles {
  parametro: string = this.configService.usuarioLogado.function.nameFunction;

  ngOnInit(): void {
    console.log(this.parametro);
  }
  // this.configService.usuarioLogado.function.nameFunction;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public configService: ConfigService
  ) {}

  ionViewDidLoad;
  metodo() {
    this.navCtrl.push(OrderPage.name);
  }
  listEmployee() {
    this.navCtrl.push(OrderPage.name);
  }
  listTecnico() {
    this.navCtrl.push(OrderDetailPage.name);
  }
  metodoUserDetail() {
    this.navCtrl.push(UserDetailPage.name);
  }
  addOrder() {
    this.navCtrl.push(OrderDetailPage.name);
  }

  listarUsuarios() {
    this.navCtrl.push(UserPage.name);
  }
  assignTechnical() {
    this.navCtrl.push(OrderPage.name, { 'data' : 'assignTechnical' });
  }
}
