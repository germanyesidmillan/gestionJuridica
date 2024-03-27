import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormBuilder, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { AutocompletarComponent } from '@home/components/autocompletar/autocompletar.component';
import { InputComponent } from '@shared/components/input/input.component';
import { StoreService } from '@shared/services/store.service';

@Component({
  selector: 'app-radicados',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule ,MatFormFieldModule, MatInputModule, MatButtonModule,
            MatSelectModule,MatDatepickerModule, MatNativeDateModule, MatCardModule, 
            AutocompletarComponent, InputComponent],
  templateUrl: './radicados.component.html',
  styleUrl: './radicados.component.css'
})
export class RadicadoComponent implements OnInit{

  formRadicado: FormGroup;
  inmueblesXdemandante:any = []; 
  inmuebleXdemandado:any = [];
  numJuzgadosXjuzgado: any = [];
 
  @ViewChild(FormGroupDirective)
  private forDir!:FormGroupDirective
  
  constructor(private fb: FormBuilder, private gjService: GestionJuridicaService, 
              private utilService:UtilsService, public storeService: StoreService){
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
    this.getJuzgados();
    this.getNumJuzgados();
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

  get juzgados(){
    return this.storeService.juzgadosSignal();
  }
  get numJuzgados(){
    return this.storeService.numJuzgadosSignal();
  }
  
  
  onSubmit(){

    const fecha = new Date (this.formRadicado.get('fechaRadicado')?.value);
    const fecRadicado = `${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}`;

    const payload = {
      num_radicado:this.formRadicado.get('radicado')!.value,
      id_inmueble:(this.formRadicado.get('inmueble')!.value).id_inmueble,
      id_num_juzgado:(this.formRadicado.get('numJuzgado')!.value).id_num_juzgado,
      fecha_radicado: fecRadicado
    }

    this.gjService.crearRadicado(payload).subscribe((resp:any)=>{
      if(resp.state){
        this.utilService.showAlerta("Radicado creado")
        this.forDir.resetForm();
      }
    }, (error:HttpErrorResponse)=>{
      console.log('Error',error);
      alert(error.message);
    });
    
  }

  onChangeCopropiedad(event: any){
    let demandante = event.value.id_demandante;
    this.limpiarDatos();
    if(!event.value.id_demandante){
      return;
    }
    this.inmuebles.filter((inmueble:any)=>{
      if(inmueble.id_demandante == demandante){
        this.inmueblesXdemandante.push(inmueble)
      }
    });
 }

 onChangeJuzgado(event: any){
  let juzgado = event.value.id_juzgado;

  this.limpiarJuzgados();
  if (!event.value.id_juzgado){
    return;
  }

  this.numJuzgados.filter((numJuzgado:any)=>{
    if(numJuzgado.id_juzgado == juzgado){
      this.numJuzgadosXjuzgado.push(numJuzgado)
    }
  });

}

onChangeNumJuzgado(event: any){
  let numJuzgado = event.value;
  //this.limpiarDatos();
  this.storeService.cancelNumJuzgado.set(true);
  this.numJuzgados.filter((juzgado:any)=>{
    if(numJuzgado.id_num_juzgado == numJuzgado){
      this.inmueblesXdemandante.push(juzgado)
    }
  });
}

  onChangeInmueble(event: any){
    let inmueble = event.value.id_inmueble;

    this.formRadicado.get("demado")?.setValue(null);
    this.inmuebleXdemandado = [];

    if(!event.value.id_inmueble){
      return;
    }

    this.storeService.cancelInmueble.set(true);

    this.inmueblesXdemandante.filter((i:any)=>{
      if(i.id_inmueble == inmueble){
        this.inmuebleXdemandado.push(i);
      }
    });

    let demandado = this.inmuebleXdemandado[0]["id_demandado"];

    this.demandados.filter( (dem:any)=>{
      if (dem.id_demandado == demandado){
        this.formRadicado.get("demado")?.setValue(dem.nombre_demandado);
      }
    });

  }

  limpiarDatos(){
    this.storeService.cancelInmueble.set(false);
    this.inmuebleXdemandado = [];
    this.inmueblesXdemandante = [];
    this.formRadicado.get("inmueble")?.setValue(null);
    this.formRadicado.get("demado")?.setValue(null);
  }

  limpiarJuzgados(){
    this.storeService.cancelNumJuzgado.set(false);
    this.storeService.cancelJuzgado.set(true);
    this.numJuzgadosXjuzgado = [];
    this.formRadicado.get("numJuzgado")?.setValue(null);
  }
  

  getJuzgados() {

    if( this.storeService.juzgadosSignal().length > 0 ){
      return;
    }

    this.gjService.getJuzgados().subscribe((resp:any)=>{
      this.storeService.juzgadosSignal.set(resp);
     }, error=>{
      console.log(error)
     });
  }

  getNumJuzgados() {

    if( this.storeService.numJuzgadosSignal().length > 0 ){
      return;
    }

    this.gjService.getNumJuzgados().subscribe((resp:any)=>{
      this.storeService.numJuzgadosSignal.set(resp);
     }, error=>{
      console.log(error)
     });
  }
  
}