import { Injectable, signal } from '@angular/core';
import * as i from '../../modules/home/models/gestion-juridica-interface';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  //combos
  cancelCopropiedad     = signal(false);
  cancelInmueble        = signal(false);
  cancelJuzgado         = signal(false);
  cancelNumJuzgado      = signal(false);

  copropiedadesSignal = signal<i.IDemandante[]>([]);
  inmueblesSignal     = signal([]);
  demandadosSignal    = signal<i.IDemandado[]>([]);
  bancosSignal        = signal<i.IBanco[]>([]);
  municipiosSignal    = signal<i.IMunicipio[]>([]);
  tipoCuentaSignal    = signal<i.ITipoCuenta[]>([]);
  tipoInmueblesSignal = signal<i.ITipoInmueble[]>([]);
  juzgadosSignal      = signal<i.IJuzgado[]>([]);
  numJuzgadosSignal   = signal<i.INumJuzgado[]>([]);
  cronologiasSignal   = signal<i.ICronologia[]>([]);
  administradoresSignal   = signal<i.IAdministrador[]>([]);
  etapasDemandadosSignal  = signal<i.IEtapaDemandado[]>([]);


  constructor() { }

}
