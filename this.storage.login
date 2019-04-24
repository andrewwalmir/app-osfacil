
import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/do'

import { Usuario } from '../models/usuario'

import { API } from './api.config'

@Injectable()
export class LoginService{

  private usuario: Usuario;

  constructor(private http:HttpClient, private storage: Storage){}

  today():Date{
    return new Date();
  }

  estaLogado():boolean{
    return this.usuario !== undefined;
  }

  getUsuarioLogado():Usuario{
    this.storage.get('loggedUser').then(user =>{
        this.usuario = JSON.parse(user);
        var agora = Date.now() / 1000;
        if(this.usuario === null || agora > this.usuario.exp){
          this.logout();
        }
    });
    return this.usuario;

  }

  login (username: string, password:string): Observable<Usuario>{
    let headers = new HttpHeaders();
    headers = headers.append('Content-type', 'application/json');
    return this.http.post<Usuario>(
      `${API}/api/auth/login`,
      {username: username, password:password, grant_type: 'password'},
      {headers: headers}).do(user => {

        let data = user.token.toString().split('.');
        let userTemp = JSON.parse(atob(data[1]));
        this.usuario = userTemp;
        this.usuario.token = user.token.toString();
        console.log(this.usuario);
        this.storage.set('loggedUser', JSON.stringify(this.usuario));
        console.log("Usuario Salvo na localStorage");
      });

    }

    cadastrar(usuario: Usuario): Observable<Usuario>{

      let headers = new HttpHeaders();
      headers = headers.append('Content-type', 'application/json');

      return this.http.post<Usuario>(
        `${API}/api/usuario`,
        {usuario}, {headers: headers});
      }

      reenviar(): Observable<any>{

        let headers = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer '+this.getUsuarioLogado().token);
        return this.http.get<any>(
          `${API}/api/usuario/reenviar/`,
          {headers: headers});
        }


      logout(){
        // window.sessionStorage.removeItem('usuario');
        this.storage.remove('loggedUser').then(() => console.log("Deslogado!"));
        this.usuario = null;

      }

  }

