import { FormModelDTO } from "../../../models/formModel.dto";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  AlertController
} from "ionic-angular";
import { ListarOsService } from "../../../services/domain/listar-os.services";
import { HttpErrorResponse } from "@angular/common/http";
import { NavLifecycles } from "../../../utils/ionic/nav/nav-lifecycles";

@IonicPage()
@Component({
  selector: "page-listar-os",
  templateUrl: "listar-os.html"
})
export class ListarOsPage implements NavLifecycles {
  public forms: FormModelDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public listarOsService: ListarOsService,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController
  ) {}
  ionViewDidLoad() {
    let loading = this._loadingCtrl.create({
      content: "Carregando Ordens de Serviços..."
    });

    loading.present();

    this.listarOsService.listarForm().subscribe(
      forms => {
        this.forms = forms;
        loading.dismiss();//sumir o loading quando carregar o componente por completo
      },
      (err: HttpErrorResponse) => {
        console.log(err);

        loading.dismiss(); 

        this._alertCtrl
          .create({
            title: "Falha na conexão",
            subTitle:
              "Não foi possível carregar a lista de Ordem de Serviços. Tente novamente mais tarde!",
            buttons: [{ text: "Ok" }]
          })
          .present();
      }
    );
  }

  selecionaForm(form: FormModelDTO) {
    console.log(form);
    this.navCtrl.push(ListarOsPage.name, {
      selecionaForm: form
    });
  }
}
