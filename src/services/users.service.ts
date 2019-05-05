import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';

import { JwtHelper } from 'angular2-jwt';
import { UserModelDTO } from '../models/usermodel.dto';

@Injectable()
export class UsersService {
  jwtHelper: JwtHelper = new JwtHelper();
  HttpClient: any;

  constructor(private _http: HttpClient) {}

  listUsers() {
    return this._http.get<UserModelDTO[]>(`${API_CONFIG.baseUrl}/OSFacil_Back/api/user/listarUser`);
  }
}
