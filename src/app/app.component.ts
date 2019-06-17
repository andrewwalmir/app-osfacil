import { UserDetailPage } from './../pages/user/userdetail/userdetail.component';
import { ConfigService } from './../services/config.service';
import { ValidarService } from './../services/validar.service';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';

@Component({
  selector: 'myapp',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = LoginPage.name;
  //rootPage = DashboardPage;

  pages: Array<{ title: string; component: string }>;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private validar: ValidarService,
    private configService: ConfigService
  ) {
    this.initializeApp();

    this.pages = [
      { title: 'Dashboard', component: DashboardPage.name },
      { title: 'Alterar Senha', component: UserDetailPage.name },
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
            this.nav.setRoot(this.rootPage);
            //this.configService.usuarioLogado = null;
          },
          error => {
            console.log(error);
          }
        );
        break;
      case 'Alterar Senha':
        this.nav.setRoot(page.component, { data: 'alterarSenha' });

        break;
      default:
        this.nav.setRoot(page.component);

        break;
    }
  }
}
