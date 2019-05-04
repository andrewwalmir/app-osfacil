import { ProfilePage } from './../pages/usuario/profile/profile';
import { ListarOsPage } from './../pages/order/listar-os/listar-os';
import { ConfigService } from './../services/config.service';
import { ValidarService } from './../services/validar.service';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';

import { DashboardPage } from '../pages/dashboard/dashboard';

@Component({
  selector: 'myapp',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = LoginPage.name;
  // CreateOrderPage.name;

  pages: Array<{ title: string; component: string }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public validar: ValidarService,
    public configService: ConfigService
  ) {
    this.initializeApp();

    this.pages = [
      { title: 'Dashboard', component: DashboardPage.name },
      { title: 'Home', component: HomePage.name },
      { title: 'Ordens de Serviço', component: ListarOsPage.name },
      { title: 'Profile', component: ProfilePage.name },
      { title: 'Logout', component: '' }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page: { title: string; component: string }) {
    switch (page.title) {
      case 'Logout':
        this.validar.logout().subscribe(
          retorno => {
            this.configService.usuarioLogado = null;
            this.nav.setRoot(this.rootPage);
            //LoginPage.name);
          },
          error => {
            console.log(error);
          }
        );
        break;

      default:
        this.nav.setRoot(page.component);
    }
  }
}
