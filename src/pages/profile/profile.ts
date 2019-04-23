import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ConfigService } from "../../services/config.service";

@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public configService: ConfigService) {}

    ionViewDidLoad() {
      console.log("ionViewDidLoad DashboardPage");
    }

  metodoProfile(){
   this.navCtrl.setRoot("ProfilePage");
    console.log('metodoProfile( )direcionando pra pagina ');
  }
}
