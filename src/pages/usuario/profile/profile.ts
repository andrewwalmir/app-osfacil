import { UserModelDTO } from './../../../models/usermodel.dto';
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  LoadingController
} from "ionic-angular";
import { ConfigService } from "../../../services/config.service";
import { NavLifecycles } from "../../../utils/ionic/nav/nav-lifecycles";
import { ProfileService } from "../../../services/profile.service";
import { HttpErrorResponse } from "@angular/common/http";
import { SectorModelDTO } from "../../../models/sectorModel.dto";
import { FunctionModelDTO } from "./../../../models/functionModel.dto";
@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage implements NavLifecycles {
  public functions: FunctionModelDTO[];
  public sectors: SectorModelDTO[];
  public alterarUsuario : UserModelDTO;  
  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public profileService: ProfileService,
    public configService: ConfigService,
    private _alertCtrl: AlertController,
    private _loadingCtrl: LoadingController
  ) {}
  //https://cursos.alura.com.br/course/ionic3-parte1/task/33246
  ionViewDidLoad() {
    let loading = this._loadingCtrl.create({
      content: "Carregando Funções..."
    });

    this.profileService.listarFunction().subscribe(
      functions => {
        this.functions = functions;
        loading.dismiss(); //sumir o loading quando carregar o componente por completo
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        this._alertCtrl
          .create({
            title: "Falha na conexão",
            subTitle:
              "Não foi possível carregar a lista de funções. Tente novamente mais tarde!",
            buttons: [{ text: "Ok" }]
          })
          .present();
      }
    );

    this.profileService.listarSector().subscribe(
      sectors => {
        this.sectors = sectors;
        loading.dismiss(); //sumir o loading quando carregar o componente por completo
      },
      (err: HttpErrorResponse) => {
        this._alertCtrl
          .create({
            title: "Falha na conexão",
            subTitle:
              "Não foi possível carregar a lista de funções. Tente novamente mais tarde!",
            buttons: [{ text: "Ok" }]
          })
          .present();
      }
    );
      
    }
//https://www.udemy.com/spring-boot-ionic/learn/v4/t/lecture/8926788?start=0
    //changeUser(){
      //  console.log(this.)
   // }

  }

