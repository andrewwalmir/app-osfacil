import { Observable } from 'rxjs/Rx';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { UserModelDTO } from './../models/usermodel.dto';

import { Injectable, OnInit } from '@angular/core';

import { API_CONFIG } from './../config/api.config';

@Injectable()
export class ConfigService implements OnInit {
  usuarioLogado: UserModelDTO = null;

  ngOnInit() {
    console.log('entrou aqui ngOnInit');
  }

  constructor(private http: HttpClient) {
    console.log('entrou constructor config.service');

    //essa chamada é necessária para o caso do usuário abrir outra aba
    //ou dar um refresh da app... pois os objetos q são injetados, são desalocados em refresh
    //e, ao serem instanciados novamente, precisam passar por uma checagem no sentido de
    //recarregar os objetos q já estavam dentro dele anteriormente...
    if (this.usuarioLogado == null) {
      this.verificarUsuarioLogado().subscribe(
        retorno => {
          this.usuarioLogado = retorno;
          console.log();
        },
        error => {
          console.log(error);
        }
      );
    } else {
      console.log(this.usuarioLogado + 'usuario não logou');
    }
  }

  verificarUsuarioLogado() {
    console.log('entrou no verificarUsuarioLogado');
    let headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Origin', '*');

    return this.http
      .get<UserModelDTO>(`${API_CONFIG.baseUrl}/OSFacil_Back/api/login/checar`, {
        headers: headers
      })
      .catch(erro => this.tratarHttpStatusBack(erro));
  }

  //ESSE MÉTODO É ESPECÍFICO PARA CAPTURAR COISAS DIFERENTES DE 200, 201 E 204 DO HTTP
  // OU SEJA, QUANDO DÁ ALGUM ERRO...
  //QUANDO O CARA ERRAR O LOGIN, VC VAI RETORNAR UM OBSERVABLE DE NULO
  public tratarHttpStatusBack(erro) {
    console.log('TRATAMENTO DE EXCEÇÕES DO BACK');

    if (erro.status != null) {
      if (erro.status == 401) {
        //401 é não autorizado, ou seja, o cara digitou login ou senha errados
        console.log('EXIBA UMA JANELA AQUI FALANDO Q O CARA ERROU A SENHA');
      }
    }

    return Observable.of(null);
  }
}
