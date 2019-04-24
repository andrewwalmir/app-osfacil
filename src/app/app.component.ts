import { ConfigService } from "./../services/config.service";
import { ValidarService } from "./../services/validar.service";
import { Component, ViewChild } from "@angular/core";
import { Nav, Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = "LoginPage";

  pages: Array<{ title: string; component: string }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public validar: ValidarService,
    public configService: ConfigService
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: "Dashboard", component: "DashboardPage" },
      { title: "Home", component: "HomePage" },
      { title: "Ordens de Serviço", component: "ListarOsPage" },
      { title: "Profile", component: "ProfilePage" },
      { title: "Logout", component: "" }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page: { title: string; component: string }) {
    switch (page.title) {
      case "Logout":
        this.validar.logout().subscribe(
          retorno => {
            this.configService.usuarioLogado = null;
            this.nav.setRoot("LoginPage");
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
