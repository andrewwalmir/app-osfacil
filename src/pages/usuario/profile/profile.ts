
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ConfigService } from "../../../services/config.service";
import { NavLifecycles } from  '../../../utils/ionic/nav/nav-lifecycles';
@IonicPage()

@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage implements NavLifecycles{
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public configService: ConfigService
    
    ) {}

 ionViewDidLoad() {
    console.log("ionViewDidLoad ProfilePage");
  }

 
}
