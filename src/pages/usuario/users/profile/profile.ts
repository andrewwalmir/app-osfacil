import { UsersService } from './../../../../services/users.service';
import { Component, OnInit } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  LoadingController
} from 'ionic-angular';

import { ProfileService } from '../../../../services/profile.service';

import { FunctionModelDTO } from '../../../../models/functionModel.dto';
import { ConfigService } from '../../../../services/config.service';
import { SectorModelDTO } from '../../../../models/sectorModel.dto';
import { UserModelDTO } from '../../../../models/usermodel.dto';
import { NavLifecycles } from '../../../../utils/ionic/nav/nav-lifecycles';
import { HttpErrorResponse } from '@angular/common/http';
import { SectorService } from '../../../../services/sector.service';
import { FunctionService } from '../../../../services/function.service';
import { DashboardPage } from '../../../dashboard/dashboard';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage implements OnInit, NavLifecycles {
  rootPage = DashboardPage.name;
  public functions: FunctionModelDTO[];
  public sectors: SectorModelDTO[];
  private userform: UserModelDTO;
  private listFunctions: FunctionModelDTO[] = [];
  private listSectors: SectorModelDTO[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public profileService: ProfileService,
    public sectorService: SectorService,
    public functionService: FunctionService,
    public userService: UsersService,
    public configService: ConfigService,
    private _loadingCtrl: LoadingController
  ) {}
  //https://cursos.alura.com.br/course/ionic3-parte1/task/33246
  ionViewDidLoad() {
    let loading = this._loadingCtrl.create({
      content: 'Carregando Funções...'
    });
  }

  ngOnInit() {
    this.userform = new UserModelDTO();
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
  editUser(formulario) {
    console.log('vamos ver como estáá o objeto os:');
    console.log(this.userform);

    this.profileService.editUser(this.userform).subscribe(
      retorno => {
        console.log('deu certo o subscribe do saveOrder:');
        console.log(retorno);
        this.navCtrl.setRoot(this.rootPage);
      },
      error => {
        console.log('deu pau no editUser');
        console.log(error);
      }
    );
  }
  saveUser(formulario) {
    console.log('vamos ver como estáá o objeto os:');
    console.log(this.userform);

    this.userService.saveUser(this.userform).subscribe(
      retorno => {
        console.log('deu certo o subscribe do saveUser:');
        console.log(retorno);
        this.navCtrl.setRoot(this.rootPage);
      },
      error => {
        console.log('deu pau no saveUser');
        console.log(error);
      }
    );
  }
}
