import { ConfigService } from "./../../services/config.service";
import { ValidarService } from "./../../services/validar.service";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { MenuController } from "ionic-angular/components/app/menu-controller";
import { LoginDTO } from "../../models/login.dto";

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  creds: LoginDTO = new LoginDTO();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    public validar: ValidarService,
    public configService: ConfigService
  ) {}

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad LoginPage');
  // }

  gologin() {
    //esse observable vai chegar aqui pra quem subscribe pra ele.. sacas?si
    this.validar.authenticate(this.creds).subscribe(
      usuarioRetornado => {
        if (usuarioRetornado == null) {
          alert("o usuário digitou usuario ou senha errado");
        } else {
          this.configService.usuarioLogado = usuarioRetornado;
          //this.validar.sucessfulLogin(response.headers.get('Authorization'));
          this.navCtrl.setRoot("DashboardPage");
        }
      },
      error => {
        console.log(this.creds);
      }
    );

    //console.log(this.creds);
  }
}
