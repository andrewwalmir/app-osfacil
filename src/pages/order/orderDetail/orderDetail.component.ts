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
import { FormModelDTO } from '../../../models/formModel.dto';
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
  rootPage = OrderPage.name;
  //Objetos
  private os: FormModelDTO;
  private priority: PriorityOSModel[];
  private sectors: SectorModelDTO[];
  private services: ServiceModelDTO[];
  private listPriorities: PriorityOSModel[] = [];
  private listSectors: SectorModelDTO[] = [];
  private listServices: ServiceModelDTO[] = [];
  constructor(
    private navCtrl: NavController,
    private orderService: OrderService,
    private priorityService: PriorityService,
    private servicesService: ServicesService,
    private navParams: NavParams,
    private sectorService: SectorService,
    private configService: ConfigService,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {
    let loading = this._loadingCtrl.create({
      content: 'Carregando Pagina, Aguarde...'
    });
  }
  ngOnInit() {
    console.log('tá chegando assim:');
    console.log(this.navParams.data);
    if (this.navParams.data) {    //testa se o objeto possui valor
      console.log('modo edição de order');
      this.os = this.navParams.data;
    } else {
      console.log('modo novo  order');
      this.os = new FormModelDTO(); //se NULL recebe nova intancia
    }

    this.carregarListaPrioridades();
    this.carregarListaSetores();
    this.carregarListaServicos();
  }

  saveOrder(formulario) {
    //Colocando estatícamente objetos obrigatórios (NOT NULL) pra ver se a caralha pelo menos salva no banco
    console.log('vamos ver como estáá o objeto os:');
    console.log(this.os);
    if (this.os.id > 0) {
      //alteração
      let statusTemp = new StatusOsModelDTO();
      statusTemp.id = 1; //cria a OS com o status "Aberto"
      this.os.status = statusTemp;

      let requesterTemp = new UserModelDTO();
      requesterTemp.id = this.configService.usuarioLogado.id;
      this.os.userRequester = requesterTemp;
      console.log('alterando Order no bd');
      this.orderService.updateOrder(this.os).subscribe(
        retorno => {
          console.log('deu certo o subscribe do updateOrder:');
          console.log(retorno);
          this.navCtrl.setRoot(this.rootPage);
        },
        error => {
          console.log('deu pau no saveUser');
          console.log(error);
        }
      );
    } else {
      let statusTemp = new StatusOsModelDTO();
      statusTemp.id = 1; //cria a OS com o status "Aberto"
      this.os.status = statusTemp;

      let requesterTemp = new UserModelDTO();
      requesterTemp.id = this.configService.usuarioLogado.id;
      this.os.userRequester = requesterTemp;

      //Colocando estatícamente objetos obrigatórios (NOT NULL) pra ver se a caralha pelo menos salva no banco

      console.log('vamos ver como estáá o objeto os:');
      console.log(this.os);

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
  comparacaoDeIdOrder(c1, c2): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  closeModal() {
    this.navCtrl.setRoot(DashboardPage.name);
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
}
