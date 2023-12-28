import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IGestionJuridica } from '../models/gestion-juridica-interface';

@Injectable({
  providedIn: 'root'
})
export class GestionJuridicaService {

  URL_BASE = 'http://localhost:1323';

  constructor(private http: HttpClient) { }

  getMunicipios(){
    const url = `${this.URL_BASE}/city`;
    return this.http.get<IGestionJuridica>(url);
  }

  getBancos(){
    const url = `${this.URL_BASE}/bancos`;
    return this.http.get(url);
  }
  
  getTipoCuentas(){
    const url = `${this.URL_BASE}/tipocuentas`;
    return this.http.get(url);
  }
  
  getAdministradores(){
    const url = `${this.URL_BASE}/administradores`;
    return this.http.get(url);   
  }


}
