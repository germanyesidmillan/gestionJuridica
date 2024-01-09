import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IGestionJuridica } from '../models/gestion-juridica-interface';

@Injectable({
  providedIn: 'root'
})
export class GestionJuridicaService {
  getNumJuzgados() {
    throw new Error('Method not implemented.');
  }
  getJuzgados() {
    throw new Error('Method not implemented.');
  }

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

  getDemandantes(){
    const url = `${this.URL_BASE}/demandantes`;
    return this.http.get(url);   
  }

  getEtapaDemandado(){
    const url = `${this.URL_BASE}/etapasdemandante`;
    return this.http.get(url);   
  }

  getInmuebles(){
    const url = `${this.URL_BASE}/inmuebles`;
    return this.http.get(url);   
  }

  getDemandados(){
    const url = `${this.URL_BASE}/demandados`;
    return this.http.get(url);   
  }
  getTipoInmueble(){
    const url = `${this.URL_BASE}/tipoInmueble`;
    return this.http.get(url);   
  }

  getJuzgado(){
    const url = `${this.URL_BASE}/juzgado`;
    return this.http.get(url);   
  }
  getNumJuzgado(){
    const url = `${this.URL_BASE}/numjuzgado`;
    return this.http.get(url);   
  }

}
