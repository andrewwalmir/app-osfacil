import { SectorModelDTO } from './../models/sectorModel.dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { API_CONFIG } from '../config/api.config';
import { UserModelDTO } from '../models/usermodel.dto';
import { Observable } from 'rxjs';

@Injectable()
export class ProfileService {
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: HttpClient) {}

  editUser(user: UserModelDTO): Observable<boolean> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http
      .post<boolean>(`${API_CONFIG.baseUrl}/OSFacil_Back/api/user/alterar`, JSON.stringify(user), {
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
