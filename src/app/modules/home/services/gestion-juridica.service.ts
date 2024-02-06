import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IGestionJuridica } from '../models/gestion-juridica-interface';
import { catchError, throwError } from 'rxjs';

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

  errorHandler(error:HttpErrorResponse){
    console.log('error',error.error);
    console.log('message',error.message);
    console.log('statusText',error.statusText);
    console.log('name',error.name);
    
    console.log('ok',error.ok);
    console.log('status',error.status);
    console.log('errorResp',error);
    return throwError(error.message)
  }

  getDemandadoXidenti(payload:any){
    const url = `${this.URL_BASE}/buscarDemandadoId/${payload}`;
    return this.http.get(url);
    //.pipe(catchError(this.errorHandler));  
  }

  getEtapasDemandado(){
    const url = `${this.URL_BASE}/etapasdemandado`;
    return this.http.get(url);   
  }

  getInmuebles(){
    const url = `${this.URL_BASE}/inmuebles`;
    return this.http.get(url);   
  }

  crearInmueble(payload:any){
    const url = `${this.URL_BASE}/inmueble`;
    return this.http.post(url,payload);  
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

  getRadicadosPorInmueble(payload:any){
    const url = `${this.URL_BASE}/radicadosPorInmueble/${payload}`;
    return this.http.get(url);   
  }
  
  getNumeroRadicado(payload:any){
    const url = `${this.URL_BASE}/numradicado/${payload}`;
    return this.http.get(url);   
  }
  
  crearDemandante(payload:any){
    const url = `${this.URL_BASE}/demandante`;
    return this.http.post(url, payload);   
  }

  crearDemandado(payload:any){
    const url = `${this.URL_BASE}/demandado`;
    return this.http.post(url, payload);   
  }
  
  crearRadicado(payload:any){
    const url = `${this.URL_BASE}/radicado`;
    return this.http.post(url, payload);   
  }

  crearAuto(payload:any){
    const url = `${this.URL_BASE}/auto`;
    return this.http.post(url, payload);   
  }
  
  crearCartera(payload:any){
    const url = `${this.URL_BASE}/cartera`;
    return this.http.post(url, payload);   
  }

  crearCronologiaInmueble(payload:any){
    console.log('payload-service',payload);
    const url = `${this.URL_BASE}/cronoinmueble`;
    return this.http.post(url, payload);   
  }
  
  crearRecaudo(payload:any){
    const url = `${this.URL_BASE}/recaudo`;
    return this.http.post(url, payload);   
  }
  
  crearHonorario(payload:any){
    const url = `${this.URL_BASE}/honorario`;
    return this.http.post(url, payload);   
  }
  
  crearReembolso(payload:any){
    const url = `${this.URL_BASE}/reembolso`;
    return this.http.post(url, payload);   
  }

}
