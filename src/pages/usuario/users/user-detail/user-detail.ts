import { SectorService } from './../../../../services/sector.service';
import { UserModelDTO } from './../../../../models/usermodel.dto';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../../../dashboard/dashboard';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { FunctionService } from '../../../../services/function.service';
import { FunctionModelDTO } from '../../../../models/functionModel.dto';
import { SectorModelDTO } from '../../../../models/sectorModel.dto';

@IonicPage()
@Component({
  selector: 'user-detail',
  templateUrl: 'user-detail.html'
})
export class UserDetailPage implements OnInit {
  editUser: FormGroup;
  rootPage = DashboardPage.name;
  user: UserModelDTO;
  private listFunctions: FunctionModelDTO[] = [];
  private listSectors: SectorModelDTO[] = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public sectorService: SectorService,
    public functionService: FunctionService
  ) {}

  ionViewDidLoad() {}


  ngOnInit() {
    this.carregarListaFuncoes();
    this.carregarListaSetores();
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
  carregarListaFuncoes() {
    this.functionService.listarFunction().subscribe(
      lista => {
        this.listFunctions = lista;
      },
      error => {
        console.log('deu pau no listaFunction');
        console.log(error);
      }
    );
  }


}
