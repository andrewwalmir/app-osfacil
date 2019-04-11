import { LoginDTO } from './../models/login.dto';
import { API_CONFIG } from './../config/api.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable()
export class ValidarService{

    constructor(public http : HttpClient){
        
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

        //TÁ VENDO AQUI?to
        return Observable.of(null);
    }

//ta caindo o teamviewer, mas enfim... testa aí pra ver se dá erro de cors ainda...
}