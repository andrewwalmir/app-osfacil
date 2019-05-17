import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  AlertController,
  ViewController
} from 'ionic-angular';

import { UsersService } from '../../services/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserModelDTO } from '../../models/usermodel.dto';
import { UserDetailPage } from './userdetail/userdetail.component';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.component.html'
})
export class UserPage {
  public users: UserModelDTO[];
  user: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public usersService: UsersService,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private viewCtrl : ViewController
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
    this.navCtrl.push(UserDetailPage.name, user);
    console.log('listando user no selecionaUser' + user);
  }
  closeModal() {
    //declarar ViewController no construtor
    this.viewCtrl.dismiss();
  }
}
