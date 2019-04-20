import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { ListarOsDTO } from "../../models/listar-os.dto";
import { Observable } from "rxjs/Rx";
import { JwtHelper } from "angular2-jwt";

@Injectable()
export class ListarOsService {
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private _http: HttpClient) {}

  listarForm() {
    //        let _http = new HttpHeaders()
    //      .set("Content-Type", "application/json");

    return this._http.get<ListarOsDTO[]>(
      `${API_CONFIG.baseUrl}/OSFacil_Back/api/status/listar`
    );
  }
}
