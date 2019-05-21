import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs';
import { API_CONFIG } from './../config/api.config';
import { LoginModelDTO } from '../models/loginModel.dto';
import { UserModelDTO } from './../models/usermodel.dto';

@Injectable()
export class ValidarService {
  url: string;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(public http: HttpClient) {}

  authenticate(creds: LoginModelDTO): Observable<UserModelDTO> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    /*.set('Access-Control-Allow-Origin', '*');

    this.url = `${API_CONFIG.baseUrl}/OSFacil_Back/api/login/validar`;
    console.log(this.url);
    return this.http
      .post<UserModelDTO>(this.url, JSON.stringify(creds), {
        headers
      })

      .catch(erro => this.tratarHttpStatusBack(erro));
  }
*/
    return this.http
      .post<UserModelDTO>(
        `${API_CONFIG.baseUrl}/OSFacil_Back/api/login/validar`,
        JSON.stringify(creds),
        {
          headers
        }
      )
      .catch(erro => this.tratarHttpStatusBack(erro));
  }
  logout() {
    console.log('entrou no logout');
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    return this.http
      .get(`${API_CONFIG.baseUrl}/OSFacil_Back/api/login/deslogar`, {
        headers
      })
      .catch(erro => this.tratarHttpStatusBack(erro));
  }

  //ESSE MÉTODO É ESPECÍFICO PARA CAPTURAR COISAS DIFERENTES DE 200, 201 E 204 DO HTTP
  // OU SEJA, QUANDO DÁ ALGUM ERRO...
  //QUANDO O CARA ERRAR O LOGIN, VC VAI RETORNAR UM OBSERVABLE DE NULO
  public tratarHttpStatusBack(erro) {
    console.log('TRATAMENTO DE EXCEÇÕES DO BACK');
    console.log(erro);
    if (erro.status != null) {
      if (erro.status == 401) {
        //401 é não autorizado, ou seja, o cara digitou login ou senha errados
        console.log('EXIBA UMA JANELA AQUI FALANDO Q O CARA ERROU A SENHA');
      }
    }

    return Observable.of(null);
  }
}
