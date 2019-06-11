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
import { OrderVisualizationPage } from './orderVisualization/orderVisualization.component';

@IonicPage()
@Component({
  selector: 'page-order.component',
  templateUrl: 'order.component.html'
})
export class OrderPage {
  private order: FormModelDTO;
  private forms: FormModelDTO[];
  private cargo: string = this.configService.usuarioLogado.function.nameFunction;
  public recvData: string;

  constructor(
    private navCtrl: NavController,
    public navParams: NavParams,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private orderService: OrderService,
    private configService: ConfigService
  ) {
    this.recvData = this.navParams.get('data');
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
        } else if (this.recvData == 'listarPorStatusPendenteSupenso') {
          console.log('switchcase listarPorStatusPendenteSupenso');
          this.orderService.listPorStatusPendenteSupenso().subscribe(
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

        if (this.recvData == 'listMyOrdersGeneric') {
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
        } else if (this.recvData == 'tratarOrdemTecnico') {
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
        } else if (this.recvData == 'ordersFinalizedByMe') {
          console.log('entrou no ordersFinalizedByMe');
          this.orderService.listFinalizadasPorTecnico().subscribe(
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
          this.orderService.listEmployee().subscribe(
            //this.orderService.listTecnico().subscribe(
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
        if (this.recvData == 'listMyOrdersGeneric') {
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
        } else {
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
        }
        break;
      }

      default: {
        console.log('erro no switch case do Order.ts');
        break;
      }
    }
  }

  selecionaForm(form: FormModelDTO) {
    this.order = form;
    if (this.cargo == 'FUNCIONARIO' && this.order.status.id != 1) {
      console.log('this.os.status.id' + this.order.status.id);
      console.log('deu certo funcionario + status.id!=1 orderVisualization');
      this.navCtrl.push(OrderVisualizationPage.name, form);
    } else if (
      this.recvData == 'listMyOrdersGeneric' &&
      this.cargo == 'TECNICO' &&
      this.order.status.id == 1
    ) {
      console.log('entrou no elseif selecionaForm tecnico');
      this.navCtrl.push(OrderDetailPage.name, form);
    } else if (this.cargo == 'TECNICO' && this.order.status.id == 4) {
      console.log('entrou no elseif selecionaForm executado id=4');
      this.navCtrl.push(OrderVisualizationPage.name, form);
    } else {
      console.log('deu else no funcionario + status.id=1 orderDetailPage');
      this.navCtrl.push(OrderDetailPage.name, form);
    }

    console.log('dentro do SelecionaForm' + this.cargo);
    console.log('selecionando Form : ' + form);
  }

  closeModal() {
    this.navCtrl.setRoot(DashboardPage.name);
  }
}
