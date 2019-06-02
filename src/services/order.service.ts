import { ConfigService } from './config.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs';
import { FormModelDTO } from './../models/formModel.dto';
import { Platform } from 'ionic-angular/platform/platform';

@Injectable()
export class OrderService {
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private _platform: Platform
  ) {
    if (this._platform.is('cordova')) {
      API_CONFIG.baseUrl = API_CONFIG.apiUrl;
    }
  }

  listOrder() {
    return this.http.get<FormModelDTO[]>(
      `${API_CONFIG.baseUrl}/OSFacil_Back/api/form/listar?pagina=1&limitePorPagina=20`
    );
  }
  listTecnico(id: number = this.configService.usuarioLogado.id) {
    console.log('id do técnico logado : ' + id);
    return this.http.get<FormModelDTO[]>(
      `${
        API_CONFIG.baseUrl
      }/OSFacil_Back/api/form/listarPorStatusEUsuario?statusid=2&statusid1=3&usuarioid=${id}&pagina=1&limitePorPagina=20`
    );
  }
  listByStatus() {
    return this.http.get<FormModelDTO[]>(
      `${
        API_CONFIG.baseUrl
      }/OSFacil_Back/api/form/listarPorStatus?statusid=1&pagina=1&limitePorPagina=9`
    );
  }
  listEmployee(id: number = this.configService.usuarioLogado.id) {
    console.log('id do técnico logado : ' + id);
    return this.http.get<FormModelDTO[]>(
      `${
        API_CONFIG.baseUrl
      }/OSFacil_Back/api/form/listarPorFuncionario?id=${id}&pagina=1&limitePorPagina=9`
    );
  }
  saveOrder(os: FormModelDTO): Observable<boolean> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http
      .post<boolean>(`${API_CONFIG.baseUrl}/OSFacil_Back/api/form/salvar`, JSON.stringify(os), {
        headers: headers
      })
      .catch(erro => this.tratarHttpStatusBack(erro));
  }
  updateOrder(os: FormModelDTO): Observable<boolean> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http
      .put<boolean>(`${API_CONFIG.baseUrl}/OSFacil_Back/api/form/alterar`, JSON.stringify(os), {
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
