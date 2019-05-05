import { NavLifecycles } from './../../../utils/ionic/nav/nav-lifecycles';
import { DashboardPage } from './../../dashboard/dashboard';
import { ConfigService } from './../../../services/config.service';
import { SectorService } from './../../../services/sector.service';
import { ServicesService } from './../../../services/services.service';
import { PriorityService } from './../../../services/priority.service';
import { UserModelDTO } from './../../../models/usermodel.dto';
import { StatusOsModelDTO } from './../../../models/statusOsModel.dto';
import { ServiceModelDTO } from './../../../models/serviceModel';
import { SectorModelDTO } from './../../../models/sectorModel.dto';
import { PriorityOSModel } from './../../../models/priorityOsModel.dto';
import { FormModelDTO } from './../../../models/formModel.dto';
import { CreateOrderService } from './../../../services/createOrder.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-create-order',
  templateUrl: 'create-order.html'
})
export class CreateOrderPage implements OnInit, NavLifecycles {
  // @ViewChild(Nav) nav: Nav;
  rootPage = DashboardPage.name;
  //Objetos
  private os: FormModelDTO;
  private listPriorities: PriorityOSModel[] = [];
  private listSectors: SectorModelDTO[] = [];
  private listServices: ServiceModelDTO[] = [];
  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public createOrderService: CreateOrderService,
    public priorityService: PriorityService,
    public servicesService: ServicesService,
    public sectorService: SectorService,
    public configService: ConfigService,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController
  ) {}

  
  ionViewDidLoad() {
    let loading = this._loadingCtrl.create({
      content: 'Carregando Pagina, Aguarde...'
    });
  }
  ngOnInit() {
    this.os = new FormModelDTO();
    this.carregarListaPrioridades();
    this.carregarListaSetores();
    this.carregarListaServicos();
  }

  carregarListaPrioridades() {
    this.priorityService.listarPrioridades().subscribe(
      lista => {
        this.listPriorities = lista;
      },
      error => {
        console.log('deu pau no listaPrioridades');
        console.log(error);
      }
    );
  }
  carregarListaSetores() {
    this.sectorService.listarSetores().subscribe(
      lista => {
        this.listSectors = lista;
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
  saveOrder(formulario) {
    //Colocando estatícamente objetos obrigatórios (NOT NULL) pra ver se a caralha pelo menos salva no banco

    let statusTemp = new StatusOsModelDTO();
    statusTemp.id = 1; //cria a OS com o status "Aberto"
    this.os.status = statusTemp;

    let requesterTemp = new UserModelDTO();
    requesterTemp.id = this.configService.usuarioLogado.id;
    this.os.userRequester = requesterTemp;

    //Colocando estatícamente objetos obrigatórios (NOT NULL) pra ver se a caralha pelo menos salva no banco

    console.log('vamos ver como estáá o objeto os:');
    console.log(this.os);

    this.createOrderService.saveOrder(this.os).subscribe(
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
