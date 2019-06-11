import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavLifecycles } from '../../../utils/ionic/nav/nav-lifecycles';
import { DashboardPage } from '../../dashboard/dashboard';
import { FormModelDTO } from '../../../models/formModel.dto';
import { UserModelDTO } from '../../../models/usermodel.dto';
import { PriorityOSModel } from '../../../models/priorityOsModel.dto';
import { SectorModelDTO } from '../../../models/sectorModel.dto';
import { ServiceModelDTO } from '../../../models/serviceModel';
import { OrderPage } from '../order.component';
import { ConfigService } from '../../../services/config.service';
import { PriorityService } from '../../../services/priority.service';

import { SectorService } from '../../../services/sector.service';
import { ServicesService } from '../../../services/services.service';

@IonicPage()
@Component({
  selector: 'page-orderVisualization',
  templateUrl: 'orderVisualization.component.html'
})
export class OrderVisualizationPage implements OnInit, NavLifecycles {
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
    public navCtrl: NavController,
    public navParams: NavParams,
    private priorityService: PriorityService,
    private servicesService: ServicesService,
    private sectorService: SectorService,
    private configService: ConfigService
  ) {
    this.os = this.navParams.data;
  }
  ngOnInit() {
    this.carregarListaSetores();
    console.log('orderVisualization');
  }

  ionViewDidLoad?;

  saveOrder(formulario) {
    this.navCtrl.push(OrderPage.name);
    console.log('dentro do saindoDoVisualizationForm' + this.cargo);
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
