import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { JwtHelper } from 'angular2-jwt';
import { FunctionModelDTO } from '../models/functionModel.dto';
import { Observable } from 'rxjs';
import { Platform } from 'ionic-angular';

@Injectable()
export class FunctionService {
  jwtHelper: JwtHelper = new JwtHelper();
  constructor(
    private http: HttpClient,
    private _platform: Platform
    ) {
      if (this._platform.is("cordova")) {
        API_CONFIG.baseUrl = API_CONFIG.apiUrl;
      }
    }

  listarFunction(): Observable<FunctionModelDTO[]> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http
      .get<FunctionModelDTO[]>(`${API_CONFIG.baseUrl}/OSFacil_Back/api/function/listarFunction`, {
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
