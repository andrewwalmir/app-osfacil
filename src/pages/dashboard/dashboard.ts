import { NavLifecycles } from './../../utils/ionic/nav/nav-lifecycles';
import { ConfigService } from "./../../services/config.service";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ListarOsPage } from "../formulario/listar-os/listar-os";
import { ProfilePage } from '../usuario/profile/profile';

@IonicPage()
@Component({
  selector: "page-dashboard",
  templateUrl: "dashboard.html"
})
export class DashboardPage implements NavLifecycles{
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public configService: ConfigService
  ) {
    
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad DashboardPage");
  }

  metodo() {
    this.navCtrl.push(ListarOsPage.name);
    }
  metodoProfile() {
    this.navCtrl.push(ProfilePage.name);
  }
}
