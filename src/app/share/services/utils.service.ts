import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {


  public spinner = new BehaviorSubject(false);

  constructor() { }

  showAlerta(msg:string, title:title ='Exito!', icon:icon='success') {
    Swal.fire(title, msg, icon);
  }

  cargando(value: boolean){
    this.spinner.next(value);
  }

}

type title = 'Exito!' | 'Advertencia!' | 'Error!' | 'info!' | 'Pregunta?';
type icon = 'success' | 'error' | 'warning' | 'info' | 'question';
