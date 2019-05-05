import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  AlertController
} from 'ionic-angular';

import { UsersService } from '../../../services/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProfilePage } from './profile/profile';
import { UserModelDTO } from '../../../models/usermodel.dto';

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html'
})
export class UsersPage {
  public users: UserModelDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public usersService: UsersService,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController
  ) {}
  ionViewDidLoad() {
    let loading = this._loadingCtrl.create({
      content: 'Carregando Usuarios...'
    });

    loading.present();

    this.usersService.listUsers().subscribe(
      users => {
        this.users = users;
        loading.dismiss(); //sumir o loading quando carregar o componente por completo
      },
      (err: HttpErrorResponse) => {
        console.log(err);

        loading.dismiss();

        this._alertCtrl
          .create({
            title: 'Falha na conexão',
            subTitle: 'Não foi possível carregar a lista de Usuarios. Tente novamente mais tarde!',
            buttons: [{ text: 'Ok' }]
          })
          .present();
      }
    );
  }

  selecionaForm(user: UserModelDTO) {
    console.log(user);
    this.navCtrl.push(ProfilePage.name, {
      selecionaUser: user
    });
  }
}
