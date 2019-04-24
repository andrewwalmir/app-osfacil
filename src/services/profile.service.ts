import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelper } from "angular2-jwt";

@Injectable()
export class ProfileService{

    jwtHelper: JwtHelper = new JwtHelper();
    constructor(private _http: HttpClient){

    }

    
}