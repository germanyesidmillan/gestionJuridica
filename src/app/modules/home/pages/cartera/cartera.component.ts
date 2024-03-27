import { Component, ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormBuilder, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { GestionJuridicaService } from '../../services/gestion-juridica.service';
import { MatCardModule } from '@angular/material/card';
import { UtilsService } from '@shared/services/utils.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AutocompletarComponent } from '../../components/autocompletar/autocompletar.component';
import { InputComponent } from '@shared/components/input/input.component';
import { StoreService } from '@shared/services/store.service';

export interface User {
  name: string;
}


@Component({
  selector: 'app-cartera',
  standalone: true,
  imports: [CommonModule,  ReactiveFormsModule ,MatFormFieldModule, MatInputModule, MatButtonModule,
             MatSelectModule,MatDatepickerModule, MatNativeDateModule, MatCardModule,MatAutocompleteModule, 
             AutocompletarComponent, InputComponent],
  templateUrl: './cartera.component.html',
  styleUrl: './cartera.component.css'
})
export class CarteraComponent {

  formCartera: FormGroup;
  etadaDemandados:any = [];
  inmueblesXdemandante:any = []; 
  inmuebleXdemandado:any = [];
  @ViewChild(FormGroupDirective) forDir!:FormGroupDirective;
  

  constructor(private fb: FormBuilder, private gjService: GestionJuridicaService,
              private utilService:UtilsService, public storeService:StoreService){
    this.formCartera = this.fb.group({
      demate: ['', [Validators.required]],
      inmueble: ['', [Validators.required]],
      demado: ['', [Validators.required]],
      cartera: ['', [Validators.required]],
      etapaDemado: ['', [Validators.required]],
      fechaCartera: ['', [Validators.required]],
    });
   
   
  }

  get copropiedades(){
    return this.storeService.copropiedadesSignal();
  }

  get inmuebles(){
    return this.storeService.inmueblesSignal();
  }

  get demandados(){
    return this.storeService.demandadosSignal();
  }

  get etapasDemandados(){
    return this.storeService.etapasDemandadosSignal();
  }

  onSubmit(){

    const fecha = new Date(this.formCartera.get('fechaCartera')?.value);
    const fecCartera = `${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}`;
    const inmueble = this.formCartera.get('inmueble')?.value;

    const payload = {
      fecha_cartera: fecCartera,
      valor_cartera: parseInt(this.formCartera.get('cartera')!.value) ,
      id_inmueble: inmueble.id_inmueble ,
      id_etapa_demandado:(this.formCartera.get('etapaDemado')?.value).id_etapa_demandado 
    };

    this.gjService.crearCartera(payload).subscribe((resp:any)=>{
      console.log('resp',resp);
      if(resp.state){ 
        this.utilService.showAlerta(resp.message);
        this.forDir.resetForm();
      }else{
        this.utilService.showAlerta(resp.message,"Error!","error");
      }
    },(error:HttpErrorResponse)=>{
      this.utilService.showAlerta(error.message);
    });

  }

  onChangeCopropiedad(event: any){
    
    this.limpiarDatos();
    if(!event.value.id_demandante){
      return;
    }

    let demandante = event.value.id_demandante;
    this.inmuebles.filter((inmueble:any)=>{
      if(inmueble.id_demandante == demandante){
        this.inmueblesXdemandante.push(inmueble)
      }
    });
 }

  onChangeInmueble(event: any){
    let inmueble = event.value.id_inmueble;
    this.formCartera.get("demado")?.setValue(null);
    this.inmuebleXdemandado = [];
    this.inmueblesXdemandante.filter((i:any)=>{
      if(i.id_inmueble == inmueble){
        this.inmuebleXdemandado.push(i);
      }
    });

    if(this.inmuebleXdemandado.length == 0){
      return;
    }

    let demandado = this.inmuebleXdemandado[0]["id_demandado"];
    this.demandados.filter( (dem:any)=>{
      if (dem.id_demandado == demandado){
        this.formCartera.get("demado")?.setValue(dem.nombre_demandado);
      }
    });

  }

  limpiarDatos(){
    this.inmuebleXdemandado = [];
    this.inmueblesXdemandante = [];
    this.formCartera.get("demado")?.setValue('');
    this.formCartera.get("inmueble")?.setValue('');
  }
  
  

  separadorMiles(){
    const valor = this.formCartera.get('cartera')?.value;
    
    if(!valor){
      console.log('valida')

      return;
    }

    const miles = parseFloat(valor).toLocaleString("es-CO").toString();
    this.formCartera.get('cartera')!.setValue(miles);

  }

}