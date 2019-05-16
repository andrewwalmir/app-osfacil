import { ProfilePage } from './profile/profile';
import { UserDetailPage } from './user-detail/user-detail';
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
import { UserModelDTO } from '../../../models/usermodel.dto';
import { UserDetailService } from '../../../services/userdetail.service';

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html'
})
export class UsersPage {
  public users: UserModelDTO[];
  user: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public usersService: UsersService,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    public userDetailService: UserDetailService
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

  selecionaUser(user: UserModelDTO) {
    this.navCtrl.push(ProfilePage.name, user);
    console.log('listando user no selecionaUser' + user);
  }
}
