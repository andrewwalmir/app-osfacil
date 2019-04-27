import { SectorModelDTO } from "./../models/sectorModel.dto";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelper } from "angular2-jwt";
import { FunctionModelDTO } from "../models/functionModel.dto";
import { API_CONFIG } from "../config/api.config";

@Injectable()
export class ProfileService {
  jwtHelper: JwtHelper = new JwtHelper();
  get: any;

  constructor(private _http: HttpClient) {}

  listarFunction() {
    return this._http.get<FunctionModelDTO[]>(
      `${API_CONFIG.baseUrl}/OSFacil_Back/api/function/listarFunction`
    );
  }
  listarSector() {
    return this._http.get<SectorModelDTO[]>(
      `${API_CONFIG.baseUrl}/OSFacil_Back/api/sector/listar`
    );
  }
}
