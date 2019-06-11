import { StatusOsModelDTO } from './../../../models/statusOsModel.dto';
import { UsersService } from './../../../services/user.service';
import { FormModelDTO } from './../../../models/formModel.dto';
import { NavLifecycles } from '../../../utils/ionic/nav/nav-lifecycles';
import { ConfigService } from '../../../services/config.service';
import { SectorService } from '../../../services/sector.service';
import { ServicesService } from '../../../services/services.service';
import { PriorityService } from '../../../services/priority.service';
import { UserModelDTO } from '../../../models/usermodel.dto';
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
import { StatusService } from '../../../services/status.service';

@IonicPage()
@Component({
  selector: 'page-orderDetail',
  templateUrl: 'orderDetail.component.html'
})
export class OrderDetailPage implements OnInit, NavLifecycles {
  public cargo: string = this.configService.usuarioLogado.function.nameFunction;
  rootPage = OrderPage.name;
  private os: FormModelDTO;
  private statusMati: StatusOsModelDTO;
  private user: UserModelDTO;
  private priority: PriorityOSModel[];
  private sectors: SectorModelDTO[];
  private services: ServiceModelDTO[];
  private status: StatusOsModelDTO[];
  private listPriorities: PriorityOSModel[] = [];
  private listSectors: SectorModelDTO[] = [];
  private listServices: ServiceModelDTO[] = [];
  private listUsers: UserModelDTO[] = [];
  private listStatus: StatusOsModelDTO[] = [];
  constructor(
    private navCtrl: NavController,
    private orderService: OrderService,
    private statusService: StatusService,
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
    if (this.os.status.id == 2 || this.os.status.id == 3) {
      console.log('deixando o StatusMati = 3');
      this.statusMati = new StatusOsModelDTO();
      this.statusMati.id = 3; //cria a OS com o status "Em Execução para tecnico poder alterar ordem"
      console.log(this.statusMati.id);
    } else if (this.os.status.id != 2 && this.os.status.id != 3) {
      console.log('deixando o StatusMati = 4');
      this.statusMati = new StatusOsModelDTO();
      this.statusMati.id = 4; //cria a OS com o status "Em Execução para tecnico poder alterar ordem"
      console.log(this.statusMati.id);
    }
  }

  ionViewDidLoad() {
    let loading = this._loadingCtrl.create({
      content: 'Carregando Pagina, Aguarde...'
    });
  }
  ngOnInit() {
    this.carregarListaSetores();
  }

  saveOrder(formulario) {
    if (this.os.status.id == 1) {
      let statusTemp = new StatusOsModelDTO();
      statusTemp.id = 2; //cria a OS com o status "Aberto"
      this.os.status = statusTemp;
    }
    this.orderService.updateOrder(this.os).subscribe(
      retorno => {
        this.navCtrl.setRoot(this.rootPage);
      },
      error => {
        console.log(error);
      }
    );
  }

  carregarListaPrioridades() {
    this.priorityService.listarPrioridades().subscribe(
      lista => {
        this.listPriorities = lista;
        this.carregarListaServicos();
      },
      error => {
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
        console.log(error);
      }
    );
  }
  carregarListaServicos() {
    this.servicesService.listarServicos().subscribe(
      lista => {
        this.listServices = lista;
        this.carregarListaStatus();
        if (this.os.status.id == 1 || this.os.status.id == 5 || this.os.status.id == 6) {
          //testa se estiver com status aberto carrega tecnicos
          this.carregarListaUsuariosPorFuncao();
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  carregarListaStatus() {
    this.statusService.listarStatus().subscribe(
      lista => {
        this.listStatus = lista;
      },
      error => {
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
