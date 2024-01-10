import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IGestionJuridica } from '../models/gestion-juridica-interface';

@Injectable({
  providedIn: 'root'
})
export class GestionJuridicaService {
  
  URL_BASE = 'http://localhost:1323';
  getEtapaDemandados: any;

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
    const url = `${this.URL_BASE}/etapaDemado`;
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
  getTipoInmuebles(){
    const url = `${this.URL_BASE}/tipoinmuebles`;
    return this.http.get(url);   
  }

  getJuzgados(){
    const url = `${this.URL_BASE}/juzgados`;
    return this.http.get(url);   
  }
  getNumJuzgados(){
    const url = `${this.URL_BASE}/numjuzgados`;
    return this.http.get(url);   
  }

  getCronologias(){
    const url = `${this.URL_BASE}/cronologias`;
    return this.http.get(url);   
  }

  getRadicados(){
    const url = `${this.URL_BASE}/radicados`;
    return this.http.get(url);   
  }

}
