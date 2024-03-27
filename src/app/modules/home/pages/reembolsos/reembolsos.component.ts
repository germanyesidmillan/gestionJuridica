import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { GestionJuridicaService } from '../../services/gestion-juridica.service';
import { MatCardModule } from '@angular/material/card';
import { HttpErrorResponse } from '@angular/common/http';
import { UtilsService } from '@shared/services/utils.service';
import { InputComponent } from '@shared/components/input/input.component';
import { AutocompletarComponent } from '@home/components/autocompletar/autocompletar.component';
import { StoreService } from '@shared/services/store.service';
@Component({
  selector: 'app-reembolsos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ,MatFormFieldModule, MatInputModule, MatButtonModule,
    MatSelectModule,MatDatepickerModule, MatNativeDateModule, MatCardModule, InputComponent, AutocompletarComponent],
  templateUrl: './reembolsos.component.html',
  styleUrl: './reembolsos.component.css'
})
export class ReembolsosComponent{

  formReembolso: FormGroup;
  inmueblesXdemandante:any = []; 
  inmuebleXdemandado:any = [];
 
  @ViewChild(FormGroupDirective) formDir!:FormGroupDirective;

  constructor(private fb: FormBuilder, private gjService: GestionJuridicaService, private utilService:UtilsService, public storeService: StoreService){
    this.formReembolso = this.fb.group({
      demate: ['', [Validators.required]],
      inmueble: ['', [Validators.required]],
      demado: ['', [Validators.required]],
      cuecobro: ['', [Validators.required]],
      reembolso: ['', [Validators.required]],
      fechaReembolso: ['', [Validators.required]],
    });
  }

  get demandantes(){
    return this.storeService.copropiedadesSignal();  
  }
  get inmuebles(){
    return this.storeService.inmueblesSignal();  
  }
  get demandados(){
    return this.storeService.demandadosSignal();  
  }
  
  onSubmit(){
    const fecha = new Date (this.formReembolso.get('fechaReembolso')?.value);
    const fecReembolso = `${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}`;

    const payload = {
      fecha_reembolsos: fecReembolso,
      valor_reembolsos: this.formReembolso.get('reembolso')!.value,
      id_inmueble: (this.formReembolso.get('inmueble')!.value).id_inmueble,
      num_c_cobro: this.formReembolso.get('cuecobro')!.value,
    }
    
    this.gjService.crearReembolso(payload).subscribe((resp:any)=>{
      if(resp.state){
        this.utilService.showAlerta(resp.message);
        this.formDir.resetForm();
      }else{
        this.utilService.showAlerta(resp.message, "Error!","error");
      }
    }, (error:HttpErrorResponse)=>{
      console.log('Error',error);
      alert(error.message);
    });
  }

  onChangeCopropiedad(event: any){
    let demandante = event.value.id_demandante;
    this.limpiarDatos();
    this.formReembolso.get("demado")?.setValue(null);
    this.inmuebles.filter((inmueble:any)=>{
      if(inmueble.id_demandante == demandante){
        this.inmueblesXdemandante.push(inmueble)
      }
    });
 }

  onChangeInmueble(event: any){
    let inmueble = event.value.id_inmueble;
    this.storeService.cancelInmueble.set(true);
    this.formReembolso.get("demado")?.setValue(null);
    this.inmuebleXdemandado = [];

    this.inmueblesXdemandante.filter((i:any)=>{
      if(i.id_inmueble == inmueble){
        this.inmuebleXdemandado.push(i);
      }
    });

    let demandado = this.inmuebleXdemandado[0]["id_demandado"];

    this.demandados.filter( (dem:any)=>{
      if (dem.id_demandado == demandado){
        this.formReembolso.get("demado")?.setValue(dem.nombre_demandado);
      }
    });

  }

  limpiarDatos(){
    this.inmuebleXdemandado = [];
    this.inmueblesXdemandante = [];
    this.storeService.cancelInmueble.set(false);
    this.formReembolso.get("demado")?.setValue(null);
    this.formReembolso.get("inmueble")?.setValue(null);
  }

}
