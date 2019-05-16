import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';

import { JwtHelper } from 'angular2-jwt';
import { UserModelDTO } from '../models/usermodel.dto';
import { Observable } from 'rxjs';

@Injectable()
export class UserDetailService {
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: HttpClient) {}

  editUser() {}

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
