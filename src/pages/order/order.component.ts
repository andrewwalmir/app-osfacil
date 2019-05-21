import { OrderService } from './../../services/order.service';
import { FormModelDTO } from '../../models/formModel.dto';
import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  AlertController
} from 'ionic-angular';
import { HttpErrorResponse } from '@angular/common/http';
import { OrderDetailPage } from './orderDetail/orderDetail.component';
import { DashboardPage } from '../dashboard/dashboard';

@IonicPage()
@Component({
  selector: 'page-order.component',
  templateUrl: 'order.component.html'
})
export class OrderPage {
  public forms: FormModelDTO[];
  form: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private orderService: OrderService
  ) {}
  ionViewDidLoad() {
    let loading = this._loadingCtrl.create({
      content: 'Carregando Ordens de Serviços...'
    });

    loading.present();

    this.orderService.listOrder().subscribe(
      forms => {
        this.forms = forms;
        loading.dismiss(); //sumir o loading quando carregar o componente por completo
      },
      (err: HttpErrorResponse) => {
        console.log(err);

        loading.dismiss();

        this._alertCtrl
          .create({
            title: 'Falha na conexão',
            subTitle:
              'Não foi possível carregar a lista de Ordem de Serviços. Tente novamente mais tarde!',
            buttons: [{ text: 'Ok' }]
          })
          .present();
      }
    );
  }

  selecionaForm(form: FormModelDTO) {
    this.navCtrl.push(OrderDetailPage.name, form);
    console.log('selecionando Form : ' + form);
  }
  closeModal() {
    this.navCtrl.setRoot(DashboardPage.name);
  }
}
