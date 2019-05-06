import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';

import { JwtHelper } from 'angular2-jwt';
import { UserModelDTO } from '../models/usermodel.dto';
import { Observable } from 'rxjs';

@Injectable()
export class UsersService {
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: HttpClient) {}

  listUsers() {
    return this.http.get<UserModelDTO[]>(`${API_CONFIG.baseUrl}/OSFacil_Back/api/user/listarUser`);
  }

  saveUser(user: UserModelDTO): Observable<boolean> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http
      .post<boolean>(`${API_CONFIG.baseUrl}/OSFacil_Back/api/user/salvar`, JSON.stringify(user), {
        headers
      })
      .catch(erro => this.tratarHttpStatusBack(erro));
  }
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
