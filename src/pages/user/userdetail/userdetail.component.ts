import { UserModelDTO } from '../../../models/usermodel.dto';
import { UsersService } from '../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FunctionModelDTO } from '../../../models/functionModel.dto';
import { ConfigService } from '../../../services/config.service';
import { SectorModelDTO } from '../../../models/sectorModel.dto';
import { NavLifecycles } from '../../../utils/ionic/nav/nav-lifecycles';
import { SectorService } from '../../../services/sector.service';
import { FunctionService } from '../../../services/function.service';
import { UserPage } from '../user.component';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DashboardPage } from '../../dashboard/dashboard';
@IonicPage()
@Component({
  selector: 'page-userdetail',
  templateUrl: 'userdetail.component.html'
})
export class UserDetailPage implements OnInit, NavLifecycles {
  rootPage = UserPage.name;
  private userform: UserModelDTO;
  private functions: FunctionModelDTO[];
  private sectors: SectorModelDTO[];
  private listFunctions: FunctionModelDTO[] = [];
  private listSectors: SectorModelDTO[] = [];

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private sectorService: SectorService,
    private functionService: FunctionService,
    private userService: UsersService,
    private configService: ConfigService,
    private _loadingCtrl: LoadingController
  ) {}
  //https://cursos.alura.com.br/course/ionic3-parte1/task/33246
  ionViewDidLoad() {
    let loading = this._loadingCtrl.create({
      content: 'Carregando Funções...'
    });
  }

  ngOnInit() {
    console.log('tá chegando assim:');
    console.log(this.navParams.data);
    if (this.navParams.data) {
      console.log('modo edição de usuário');
      this.userform = this.navParams.data;
    } else {
      console.log('modo novo  usuário');
      this.userform = new UserModelDTO();
    }

    this.carregarListaSetores();
  }

  carregarListaSetores() {
    this.sectorService.listarSetores().subscribe(
      lista => {
        this.listSectors = lista;
        this.carregarListaFuncoes();
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

  saveUser(formulario) {
    console.log('vamos ver como estáá o objeto user:');
    console.log(this.userform);
    if (this.userform.id > 0) {
      //alteração
      console.log('alterando no bd');
      this.userService.updateUser(this.userform).subscribe(
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
    } else {
      console.log('salvando novo no bd');
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
  closeModal() {
    this.navCtrl.setRoot(DashboardPage.name);
  }

  comparacaoDeId(c1, c2): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  //pra poder rolar o select mostrar o que veio no json
}
