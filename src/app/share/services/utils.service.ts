import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  showAlerta(msg:string, title:string='Exito', icon: any='success') {
    Swal.fire(title, msg, icon);
  }

}
