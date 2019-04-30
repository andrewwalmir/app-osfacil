import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { FormModelDTO } from "../../models/formModel.dto";
import { JwtHelper } from "angular2-jwt";

@Injectable()
export class ListarOsService {
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private _http: HttpClient) {}

  listarForm() {
   
    return this._http.get<FormModelDTO[]>(
      `${API_CONFIG.baseUrl
      }/OSFacil_Back/api/form/listar?pagina=1&limitePorPagina=9`
    );
  }
}
