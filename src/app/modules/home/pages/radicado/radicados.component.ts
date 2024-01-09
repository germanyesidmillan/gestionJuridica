import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { GestionJuridicaService } from '../../services/gestion-juridica.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-radicados',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule ,MatFormFieldModule, MatInputModule, MatButtonModule,
    MatSelectModule,MatDatepickerModule, MatNativeDateModule, MatCardModule],
  templateUrl: './radicados.component.html',
  styleUrl: './radicados.component.css'
})
export class RadicadoComponent implements OnInit{

  formRadicado: FormGroup;

  demandantes:any = [];
  inmuebles:any = [];
  demandados:any = [];
  juzgados:any = [];
  numJuzgados:any = [];
  inmueblesXdemandante:any = []; 
  inmuebleXdemandado:any = [];
 
  

  constructor(private fb: FormBuilder, private gjService: GestionJuridicaService){
    this.formRadicado = this.fb.group({
      demate: ['', [Validators.required]],
      inmueble: ['', [Validators.required]],
      demado: ['', [Validators.required]],
      radicado: ['', [Validators.required]],
      fechaRadicado: ['', [Validators.required]],
      juzgado: ['', [Validators.required]],
      numJuzgado: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.getCopropiedad();
    this.getInmuebles();
    this.getDemandados();
    this.getJuzgados();
    this.getNumJuzgados();
  }
  onSubmit(){
  }

  onChangeCopropiedad(event: any){
    let demandante = event.value;
    this.limpiarDatos();
    //this.formRadicado.get("demado")?.setValue(null);
    this.inmuebles.filter((inmueble:any)=>{
      if(inmueble.id_demandante == demandante){
        this.inmueblesXdemandante.push(inmueble)
      }
    });
 }

 onChangeJuzgado(event: any){
  let juzgado = event.value;
  this.limpiarDatos();
  this.juzgados.filter((juzgado:any)=>{
    if(juzgado.id_juzgado == juzgado){
      this.inmueblesXdemandante.push(juzgado)
    }
  });
}

onChangeNumJuzgado(event: any){
  let numJuzgado = event.value;
  this.limpiarDatos();
  this.numJuzgados.filter((juzgado:any)=>{
    if(numJuzgado.id_num_juzgado == numJuzgado){
      this.inmueblesXdemandante.push(juzgado)
    }
  });
}

  onChangeInmueble(event: any){
    let inmueble = event.value;
    console.log('inmueble',inmueble);
    this.formRadicado.get("demado")?.setValue(null);
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
        this.formRadicado.get("demado")?.setValue(dem.nombre_demandado);
        console.log('dem==>',dem.nombre_demandado);
      }
    });

    console.log('demandado',demandado);

  }

  limpiarDatos(){
    this.inmuebleXdemandado = [];
    this.inmueblesXdemandante = [];
    this.formRadicado.get("demado")?.setValue(null);
  }
  
  getCopropiedad() {
    this.gjService.getDemandantes().subscribe((resp:any)=>{
      console.log("demandantes->",resp)
      this.demandantes = resp;
     }, error=>{
      console.log(error)
     });
  }
  
  getInmuebles() {
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

  getJuzgados() {
    this.gjService.getDemandados().subscribe((resp:any)=>{
      console.log("juzgado->",resp)
      this.juzgados = resp;
     }, error=>{
      console.log(error)
     });
  }

  getNumJuzgados() {
    this.gjService.getDemandados().subscribe((resp:any)=>{
      console.log("numjuzgado->",resp)
      this.numJuzgados = resp;
     }, error=>{
      console.log(error)
     });
  }
  
}