import { SectorModelDTO } from './../models/sectorModel.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { FunctionModelDTO } from '../models/functionModel.dto';
import { API_CONFIG } from '../config/api.config';
import { UserModelDTO } from '../models/usermodel.dto';

@Injectable()
export class ProfileService {
  jwtHelper: JwtHelper = new JwtHelper();
  get: any;

  constructor(private _http: HttpClient) {}

  listUsers() {
    return this._http.get<UserModelDTO[]>(`${API_CONFIG.baseUrl}/OSFacil_Back/api/user/listarUser`);
  }

  listarFunction() {
    return this._http.get<FunctionModelDTO[]>(
      `${API_CONFIG.baseUrl}/OSFacil_Back/api/function/listarFunction`
    );
  }
  listarSector() {
    return this._http.get<SectorModelDTO[]>(`${API_CONFIG.baseUrl}/OSFacil_Back/api/sector/listar`);
  }
}
