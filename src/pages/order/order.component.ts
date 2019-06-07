import { StatusOsModelDTO } from './../../models/statusOsModel.dto';
import { ConfigService } from './../../services/config.service';
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
  private forms: FormModelDTO[];
  private cargo: string = this.configService.usuarioLogado.function.nameFunction;
  public recvData: string;
  public recvData1: string;
  public recvData2: string;
  constructor(
    private navCtrl: NavController,
    public navParams: NavParams,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private orderService: OrderService,
    private configService: ConfigService
  ) {
    this.recvData = this.navParams.get('data');
    this.recvData1 = this.navParams.get('data1');
    this.recvData2 = this.navParams.get('data2');
  }
  ionViewDidLoad() {
    let loading = this._loadingCtrl.create({
      content: 'Carregando Ordens de Serviços...'
    });

    loading.present();

    switch (this.cargo) {
      case 'SUPERVISOR': {
        if (this.recvData == 'assignTechnical') {
          this.orderService.listOrderByStatus().subscribe(
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
          break;
        } else {
          console.log('switchcase Supervisor');
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
          break;
        }
      }
      case 'TECNICO': {
        console.log('switchcase Tecnico');
        if (this.recvData1 == 'listMyOrdersGeneric') {
          console.log('botaoMinhasOrdensTecnicoOK');
          this.orderService.listEmployee().subscribe(
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
          break;
        } else if (this.recvData2 == 'tratarOrdemTecnico') {
          console.log('entrou no tratarOrdemTecnico');
          this.orderService.listTecnico().subscribe(
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
        } else {
          console.log('entrou no else normal');
          this.orderService.listTecnico().subscribe(
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
        break;
      }
      case 'FUNCIONARIO': {
        console.log('switchcase Funcionario');
        if (this.recvData1 == 'listMyOrdersGeneric') {
          console.log('botaoMinhasOrdensFuncionarioOK');
          this.orderService.listEmployee().subscribe(
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
          break;
        }
      }
      default: {
        console.log('entrou no switch default');
        break;
      }
    }
  }

  selecionaForm(form: FormModelDTO) {
    this.navCtrl.push(OrderDetailPage.name, form);
    console.log('dentro do SelecionaForm' + this.cargo);
    console.log('selecionando Form : ' + form);
  }

  closeModal() {
    this.navCtrl.setRoot(DashboardPage.name);
  }
}
