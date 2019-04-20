import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelper } from "angular2-jwt";
import { Observable } from "rxjs";
import { API_CONFIG } from "./../config/api.config";
import { LocalUser } from "./../models/local_user";
import { LoginDTO } from "./../models/login.dto";
import { UserModelDTO } from "./../models/usermodel.dto";
import { StorageService } from "./storage.service";

@Injectable()
export class ValidarService {
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(public http: HttpClient, public storage: StorageService) {}

  authenticate(creds: LoginDTO): Observable<UserModelDTO> {
    //vai dar pau, pq seu UserModel tá cagado e não tá pronto...
    //vamos tentar na louca, mas vai dar pau... pq vc tem q fazer seu model ficar com todos os objetos internos e tals
    //perae vou abrir a porta aqui perae
    //voltei... vamos ver q merda dá....

    let headers = new HttpHeaders().set("Content-Type", "application/json");

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

  sucessfulLogin(JWTValue: string) {
    let tok = JWTValue;
    console.log(tok);
    let user: LocalUser = {
      token: tok
    };
    this.storage.setLocalUser(user);
  }

  logout() {
    this.storage.setLocalUser(null);

    console.log("entrou no logout");
    let headers = new HttpHeaders().set("Content-Type", "application/json");

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
    console.log("TRATAMENTO DE EXCEÇÕES DO BACK");

    if (erro.status != null) {
      if (erro.status == 401) {
        //401 é não autorizado, ou seja, o cara digitou login ou senha errados
        console.log("EXIBA UMA JANELA AQUI FALANDO Q O CARA ERROU A SENHA");
      }
    }

    return Observable.of(null);
  }
}
