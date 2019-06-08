import { OrderGenericPage } from './../order/orderGeneric/orderGeneric.component';
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

  /* BUTTON SUPERVISOR*/
  metodoUserDetail() {
    this.navCtrl.push(UserDetailPage.name);
  }
  listarUsuarios() {
    this.navCtrl.push(UserPage.name);
  }
  assignTechnical() {
    //this.navCtrl.push(OrderPage.name);
    this.navCtrl.push(OrderPage.name, { data: 'assignTechnical' });
  }
  listarPorStatusPendenteSupenso() {
    this.navCtrl.push(OrderPage.name, { data4: 'listarPorStatusPendenteSupenso' });
  }
  /* BUTTON TECNICO*/
  listTecnico() {
    this.navCtrl.push(OrderGenericPage.name);
  }
  ordersFinalizedByMe() {
    this.navCtrl.push(OrderPage.name, { data3: 'ordersFinalizedByMe' });
  }
  tratarOrdem() {
    this.navCtrl.push(OrderPage.name, { data2: 'tratarOrdemTecnico' });
  }
  /* BUTTON FUNCIONARIO*/
  listEmployee() {
    this.navCtrl.push(OrderPage.name);
  }
  /* BUTTON GENERICO*/
  metodo() {
    this.navCtrl.push(OrderPage.name);
  }

  addOrder() {
    // this.navCtrl.push(OrderDetailPage.name);
    this.navCtrl.push(OrderGenericPage.name);
    console.log('aaaddOrder');
  }
  listMyOrders() {
    this.navCtrl.push(OrderPage.name, { data1: 'listMyOrdersGeneric' });
  }
}
