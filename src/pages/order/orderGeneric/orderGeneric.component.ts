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
import { StatusOsModelDTO } from '../../../models/statusOsModel.dto';
import { OrderService } from '../../../services/order.service';
import { PriorityService } from '../../../services/priority.service';
import { UsersService } from '../../../services/user.service';
import { SectorService } from '../../../services/sector.service';
import { ServicesService } from '../../../services/services.service';

@IonicPage()
@Component({
  selector: 'page-orderGeneric',
  templateUrl: 'orderGeneric.component.html'
})
export class OrderGenericPage implements OnInit, NavLifecycles {
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

  ngOnInit() {
    this.carregarListaSetores();
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private orderService: OrderService,
    private priorityService: PriorityService,
    private usersService: UsersService,
    private servicesService: ServicesService,

    private sectorService: SectorService,
    private configService: ConfigService
  ) {
    this.os = new FormModelDTO(); //se NULL recebe nova intancia
    console.log('modo novo order2');
    //console.log(this.os.status.id);
  }
  ionViewDidLoad?;
  saveOrder(formulario) {
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
