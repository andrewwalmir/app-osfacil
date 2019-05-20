import { NavLifecycles } from './../../utils/ionic/nav/nav-lifecycles';
import { ConfigService } from './../../services/config.service';
import { ValidarService } from './../../services/validar.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { LoginModelDTO } from '../../models/loginModel.dto';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements NavLifecycles {
  creds: LoginModelDTO = new LoginModelDTO();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    public validar: ValidarService,
    public configService: ConfigService
  ) {}

  ionViewDidLoad;

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  gologin() {
    //esse observable vai chegar aqui pra quem subscribe pra ele.. sacas?si
    console.log('aaaa');
    this.validar.authenticate(this.creds).subscribe(
      usuarioRetornado => {
        console.log('bbbbb');
        if (usuarioRetornado == null) {
          alert('o usuário digitou usuario ou senha errado');
        } else {
          console.log('cccccc');
          this.configService.usuarioLogado = usuarioRetornado;
          console.log('testando' + this.configService.usuarioLogado);
          //this.validar.sucessfulLogin(response.headers.get('Authorization'));
          this.navCtrl.setRoot('DashboardPage');
          console.log('segue usuarioRetornado' + usuarioRetornado);
        }
      },
      error => {
        console.log('adddddaaa');
        console.log(this.creds);
        console.log('printou o erro do gologin()');
      }
    );

    //console.log(this.creds);
  }
}
