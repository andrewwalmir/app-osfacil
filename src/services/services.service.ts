import { ServiceModelDTO } from '../models/serviceModel';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs';

@Injectable()
export class ServicesService {
  jwtHelper: JwtHelper = new JwtHelper();
  constructor(private http: HttpClient) {}

  listarServicos(): Observable<ServiceModelDTO[]> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json');

    return this.http
      .get<ServiceModelDTO[]>(`${API_CONFIG.baseUrl}/OSFacil_Back/api/service/listar`, {
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
