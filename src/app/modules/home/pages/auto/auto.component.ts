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
  selector: 'app-auto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ,MatFormFieldModule, MatInputModule, MatButtonModule,
    MatSelectModule,MatDatepickerModule, MatNativeDateModule, MatCardModule],
  templateUrl: './auto.component.html',
  styleUrl: './auto.component.css'
})
export class AutoComponent implements OnInit{
juzgados: any;
onChangeJuzgado($event: MatSelectChange) {
throw new Error('Method not implemented.');
}
radicados: any;
onChangeRadicado($event: MatSelectChange) {
throw new Error('Method not implemented.');
}

  formAuto: FormGroup;

  demandantes:any = [];
  inmuebles:any = [];
  demandados:any = [];
  numJuzgado:any = [];
  
  inmueblesXdemandante:any = []; 
  inmuebleXdemandado:any = [];
 
  

  constructor(private fb: FormBuilder, private gjService: GestionJuridicaService){
    this.formAuto = this.fb.group({
      juzgado: ['', [Validators.required]],
      numjuzgado: ['', [Validators.required]],
      demate: ['', [Validators.required]],
      inmueble: ['', [Validators.required]],
      demado: ['', [Validators.required]],
      radicado: ['', [Validators.required]],
      fechaAuto: ['', [Validators.required]],
      Auto: ['', [Validators.required]],
      });
  }
  ngOnInit(): void {
    this.getJuzgado();
    this.getNumJuzgado();
    this.getCopropiedad();
    this.getInmueble();
    this.getDemandados();
    this.radicados();
  }
  onSubmit(){
  }

   onChangeCopropiedad(event: any){
    let demandante = event.value;
    this.limpiarDatos();
    //this.formAuto.get("demado")?.setValue(null);
    this.inmuebles.filter((inmueble:any)=>{
      if(inmueble.id_demandante == demandante){
        this.inmueblesXdemandante.push(inmueble)
      }
    });
 }

  onChangeInmueble(event: any){
    let inmueble = event.value;
    console.log('inmueble',inmueble);
    this.formAuto.get("demado")?.setValue(null);
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
        this.formAuto.get("demado")?.setValue(dem.nombre_demandado);
        console.log('dem==>',dem.nombre_demandado);
      }
    });

    console.log('demandado',demandado);

  }

  limpiarDatos(){
    this.inmuebleXdemandado = [];
    this.inmueblesXdemandante = [];
    this.formAuto.get("demado")?.setValue(null);
  }

  getJuzgado() {
    this.gjService.getDemandantes().subscribe((resp:any)=>{
      console.log("juzgado->",resp)
      this.juzgados = resp;
     }, error=>{
      console.log(error)
     });
  }

  getNumJuzgado() {
    this.gjService.getDemandantes().subscribe((resp:any)=>{
      console.log("numJuzgado->",resp)
      this.getNumJuzgado = resp;
     }, error=>{
      console.log(error)
     });
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

  getRadicados() {
    this.gjService.getDemandados().subscribe((resp:any)=>{
      console.log("radicado->",resp)
      this.radicados = resp;
     }, error=>{
      console.log(error)
     });
  }

}