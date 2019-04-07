import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { ListarOsDTO } from "../../models/listar-os.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class ListarOsService {

    constructor(public http: HttpClient){

    }

    findAll(): Observable<ListarOsDTO[]> {
        return this.http.get<ListarOsDTO[]>(`${API_CONFIG.baseUrl}/listarOs`);
    }

}