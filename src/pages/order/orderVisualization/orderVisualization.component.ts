import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
import { StatusOsModelDTO } from '../../../models/statusOsModel.dto';
import { StatusService } from '../../../services/status.service';

@IonicPage()
@Component({
  selector: 'page-orderVisualization',
  templateUrl: 'orderVisualization.component.html'
})
export class OrderVisualizationPage implements OnInit, NavLifecycles {
  public cargo: string = this.configService.usuarioLogado.function.nameFunction;
  rootPage = OrderPage.name;
  private os: FormModelDTO;
  private statusMati: StatusOsModelDTO;
  private user: UserModelDTO;
  private priority: PriorityOSModel[];
  private sectors: SectorModelDTO[];
  private services: ServiceModelDTO[];
  private listPriorities: PriorityOSModel[] = [];
  private listSectors: SectorModelDTO[] = [];
  private listServices: ServiceModelDTO[] = [];
  private listUsers: UserModelDTO[] = [];
  private listStatus: StatusOsModelDTO[] = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private statusService: StatusService,
    private priorityService: PriorityService,
    private servicesService: ServicesService,
    private sectorService: SectorService,
    private configService: ConfigService,
    private _loadingCtrl: LoadingController
  ) {
    this.os = this.navParams.data;
    if (this.os.status.id != 2 && this.os.status.id != 3) {
      console.log('deixando o StatusMati = 3');
      this.statusMati = new StatusOsModelDTO();
      this.statusMati.id = 3; //cria a OS com o status "Em Execução para tecnico poder alterar ordem"
    }
  }
  ngOnInit() {
    this.carregarListaSetores();
    console.log('orderVisualization');
  }

  ionViewDidLoad() {
    let loading = this._loadingCtrl.create({
      content: 'Carregando Pagina, Aguarde...'
    });
  }
  saveOrder(formulario) {
    if (this.os.status.id == 4 && this.cargo == 'TECNICO') {
      console.log('entrou onde eu queria');
      this.navCtrl.push(OrderPage.name, { data: 'ordersFinalizedByMe' });
    } else {
      this.navCtrl.push(OrderPage.name);
      console.log('entrou onde eu nao queria');
    }

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
        console.log('carregou listastatus');
        this.carregarListaStatus();
      },
      error => {
        console.log('deu pau no listaServicos');
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
