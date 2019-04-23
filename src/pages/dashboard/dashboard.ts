import { ConfigService } from "./../../services/config.service";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-dashboard",
  templateUrl: "dashboard.html"
})
export class DashboardPage {
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
    this.navCtrl.setRoot("ListarOsPage");
    console.log("método fazendo algo");
  }
}
