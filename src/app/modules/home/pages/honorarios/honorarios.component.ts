import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { GestionJuridicaService } from '../../services/gestion-juridica.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-honorarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ,MatFormFieldModule, MatInputModule, MatButtonModule,
    MatSelectModule,MatDatepickerModule, MatNativeDateModule, MatCardModule],
  templateUrl: './honorarios.component.html',
  styleUrl: './honorarios.component.css'
})
export class HonorariosComponent implements OnInit{

  formHonorarios: FormGroup;

  demandantes:any = [];
  inmuebles:any = [];
  demandados:any = [];
  inmueblesXdemandante:any = []; 
  inmuebleXdemandado:any = [];
formCartera: any;
  
  constructor(private fb: FormBuilder, private gjService: GestionJuridicaService){
    this.formHonorarios = this.fb.group({
      demate: ['', [Validators.required]],
      inmueble: ['', [Validators.required]],
      demado: ['', [Validators.required]],
      cartera: ['', [Validators.required]],
      fechaCartera: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.getCopropiedad();
    this.getInmueble();
    this.getDemandados();
  }

  onSubmit(){
  }

  onChangeCopropiedad(event: any){
    let demandante = event.value;
    this.limpiarDatos();
    //this.formCartera.get("demado")?.setValue(null);
    this.inmuebles.filter((inmueble:any)=>{
      if(inmueble.id_demandante == demandante){
        this.inmueblesXdemandante.push(inmueble)
      }
    });
 }

 onChangeInmueble(event: any){
  let inmueble = event.value;
  console.log('inmueble',inmueble);
  this.formCartera.get("demado")?.setValue(null);
  this.inmuebleXdemandado = [];

  this.inmueblesXdemandante.filter((i:any)=>{
    if(i.id_inmueble == inmueble){
      this.inmuebleXdemandado.push(i);
    }
  });

  console.log('inmuebleXdemandado',this.inmuebleXdemandado);

  let demandado = this.inmuebleXdemandado[0]["id_demandado"];

  this.demandados.filter( (dem:any)=>{
    if (dem.id_demandado == demandado){
      this.formCartera.get("demado")?.setValue(dem.nombre_demandado);
      console.log('dem==>',dem.nombre_demandado);
    }
  });

  console.log('demandado',demandado);

}

limpiarDatos(){
  this.inmuebleXdemandado = [];
  this.inmueblesXdemandante = [];
  this.formCartera.get("demado")?.setValue(null);
}

getCopropiedad() {
  this.gjService.getDemandantes().subscribe((resp:any)=>{
    console.log("demandantes->",resp)
    this.demandantes = resp;
   }, error=>{
    console.log(error)
   });
}

getInmueble() {
  this.gjService.getInmuebles().subscribe((resp:any)=>{
    console.log("inmuebles->",resp)
    this.inmuebles = resp;
   }, error=>{
    console.log(error)
   });
}

getDemandados() {
  this.gjService.getDemandados().subscribe((resp:any)=>{
    console.log("demandados->",resp)
    this.demandados = resp;
   }, error=>{
    console.log(error)
   });
}

}


