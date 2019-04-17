import { StorageService } from './storage.service';
import { LocalUser } from './../models/local_user';
import { LoginDTO } from './../models/login.dto';
import { API_CONFIG } from './../config/api.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelper } from 'angular2-jwt';



@Injectable()
export class ValidarService{

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(public http : HttpClient,
                public storage:StorageService){
        
    }

    authenticate(creds : LoginDTO){ 

        let headers = new HttpHeaders()
            .set("Content-Type", "application/json");
            
      return this.http.post(`${API_CONFIG.baseUrl}login/validar`, 
      JSON.stringify(creds), 
        {
            headers,
            observe: 'response',
            responseType: 'text'
        }).catch( erro => this.tratarHttpStatusBack(erro) );
    }


    sucessfullLogin(authorizationValue: string){
        let tok = authorizationValue.substring(7);
        console.log(tok);
        let user: LocalUser = {
            token : tok
        };
        this.storage.setLocalUser(user);
    }
        logout(){
            this.storage.setLocalUser(null);
        }

    //ESSE MÉTODO É ESPECÍFICO PARA CAPTURAR COISAS DIFERENTES DE 200, 201 E 204 DO HTTP
    // OU SEJA, QUANDO DÁ ALGUM ERRO...
    //QUANDO O CARA ERRAR O LOGIN, VC VAI RETORNAR UM OBSERVABLE DE NULO
    public tratarHttpStatusBack(erro){
        console.log('TRATAMENTO DE EXCEÇÕES DO BACK');

        if(erro.status != null){
            if(erro.status == 401){
                //401 é não autorizado, ou seja, o cara digitou login ou senha errados
                console.log('EXIBA UMA JANELA AQUI FALANDO Q O CARA ERROU A SENHA');
            }
        }


        return Observable.of(null);
    }


}