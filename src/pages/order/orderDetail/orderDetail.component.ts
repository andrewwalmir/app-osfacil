import { UsersService } from './../../../services/user.service';
import { FormModelDTO } from './../../../models/formModel.dto';
import { NavLifecycles } from '../../../utils/ionic/nav/nav-lifecycles';
import { ConfigService } from '../../../services/config.service';
import { SectorService } from '../../../services/sector.service';
import { ServicesService } from '../../../services/services.service';
import { PriorityService } from '../../../services/priority.service';
import { UserModelDTO } from '../../../models/usermodel.dto';
import { StatusOsModelDTO } from '../../../models/statusOsModel.dto';
import { ServiceModelDTO } from '../../../models/serviceModel';
import { SectorModelDTO } from '../../../models/sectorModel.dto';
import { PriorityOSModel } from '../../../models/priorityOsModel.dto';

import { OrderService } from '../../../services/order.service';
import { Component, OnInit } from '@angular/core';
import {
  IonicPage,
  NavController,
  AlertController,
  LoadingController,
  NavParams
} from 'ionic-angular';
import { OrderPage } from '../order.component';
import { DashboardPage } from '../../dashboard/dashboard';

@IonicPage()
@Component({
  selector: 'page-orderDetail',
  templateUrl: 'orderDetail.component.html'
})
export class OrderDetailPage implements OnInit, NavLifecycles {
  public cargo: string = this.configService.usuarioLogado.function.nameFunction;
  rootPage = OrderPage.name;
  private os: FormModelDTO;
  private user: UserModelDTO;
  private priority: PriorityOSModel[];
  private sectors: SectorModelDTO[];
  private services: ServiceModelDTO[];
  private listPriorities: PriorityOSModel[] = [];
  private listSectors: SectorModelDTO[] = [];
  private listServices: ServiceModelDTO[] = [];
  private listUsers: UserModelDTO[] = [];
  constructor(
    private navCtrl: NavController,
    private orderService: OrderService,
    private priorityService: PriorityService,
    private servicesService: ServicesService,
    private usersService: UsersService,
    private navParams: NavParams,
    private sectorService: SectorService,
    private configService: ConfigService,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController
  ) {
    this.os = this.navParams.data;
    if (this.os.id == null) {
      console.log('modo novo order');
      this.os = new FormModelDTO(); //se NULL recebe nova intancia
      console.log('modo novo order2');
      //console.log(this.os.status.id);
    } else {
      console.log('modo edição de order');
      this.os = this.navParams.data;
    }
  }

  ionViewDidLoad() {
    let loading = this._loadingCtrl.create({
      content: 'Carregando Pagina, Aguarde...'
    });
  }
  ngOnInit() {
    if (this.os.status.id == 1) {
      console.log('entrou if this.os.status.id == 1 ');
      this.carregarListaUsuariosPorFuncao();
      console.log('entrou if this.os.status.id == 1 dpois carregarListaUsuariosPorFunção ');
    }
    console.log('entrou ngOnInit antes carregarListaSetores');
    this.carregarListaSetores();
    console.log('entrou ngOnInit depois carregarListaSetores');
  }

  saveOrder(formulario) {
    if (this.os.id > 0) {
      //alterando ordem
      if (this.os.userRequester.id != null) {
        let statusTemp = new StatusOsModelDTO();
        statusTemp.id = 2; //cria a OS com o status "Aberto"
        this.os.status = statusTemp;
      }
      this.orderService.updateOrder(this.os).subscribe(
        retorno => {
          console.log('deu certo o subscribe do updateOrder:');
          console.log(retorno);
          this.navCtrl.setRoot(this.rootPage);
        },
        error => {
          console.log('deu pau no updateOrder');
          console.log(error);
        }
      );
    } else {
      console.log('else do saveOrder ');
      // Else para criar Ordem
      let statusTemp = new StatusOsModelDTO();
      statusTemp.id = 1; //cria a OS com o status "Aberto"
      this.os.status = statusTemp;
      let requesterTemp = new UserModelDTO();
      requesterTemp.id = this.configService.usuarioLogado.id;
      this.os.userRequester = requesterTemp;

      //Colocando estatícamente objetos obrigatórios (NOT NULL) pra ver se a caralha pelo menos salva no banco

      this.orderService.saveOrder(this.os).subscribe(
        retorno => {
          console.log('deu certo o subscribe do saveOrder:');
          console.log(retorno);
          this.navCtrl.setRoot(this.rootPage);
        },
        error => {
          console.log('deu pau no saveOrder');
          console.log(error);
        }
      );
    }
  }

  carregarListaPrioridades() {
    this.priorityService.listarPrioridades().subscribe(
      lista => {
        this.listPriorities = lista;
        this.carregarListaServicos();
      },
      error => {
        console.log('deu pau no listaPrioridades');
        console.log(error);
      }
    );
  }
  carregarListaUsuariosPorFuncao() {
    this.usersService.listUsersByFunction().subscribe(
      lista => {
        this.listUsers = lista;
      },
      error => {
        console.log('deu pau no listaUsuarios');
        console.log(error);
      }
    );
  }

  carregarListaSetores() {
    this.sectorService.listarSetores().subscribe(
      lista => {
        this.listSectors = lista;
        this.carregarListaPrioridades();
      },
      error => {
        console.log('deu pau no listaSetores');
        console.log(error);
      }
    );
  }
  carregarListaServicos() {
    this.servicesService.listarServicos().subscribe(
      lista => {
        this.listServices = lista;
      },
      error => {
        console.log('deu pau no listaServicos');
        console.log(error);
      }
    );
  }
  comparacaoDeIdOrder(c1, c2): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  closeModal() {
    this.navCtrl.setRoot(DashboardPage.name);
  }
}
