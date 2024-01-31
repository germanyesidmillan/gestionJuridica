import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormBuilder, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { GestionJuridicaService } from '../../services/gestion-juridica.service';
import { MatCardModule } from '@angular/material/card';
import { UtilsService } from '../../../../share/services/utils.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cartera',
  standalone: true,
  imports: [CommonModule,  ReactiveFormsModule ,MatFormFieldModule, MatInputModule, MatButtonModule,
    MatSelectModule,MatDatepickerModule, MatNativeDateModule, MatCardModule],
  templateUrl: './cartera.component.html',
  styleUrl: './cartera.component.css'
})
export class CarteraComponent implements OnInit{

  formCartera: FormGroup;
  demandantes:any = [];
  inmuebles:any = [];
  demandados:any = [];
  etadaDemandados:any = [];
  inmueblesXdemandante:any = []; 
  inmuebleXdemandado:any = [];
  etapasDemandados:any = [];
  @ViewChild(FormGroupDirective) forDir!:FormGroupDirective;
  

  constructor(private fb: FormBuilder, private gjService: GestionJuridicaService,
              private utilService:UtilsService){
    this.formCartera = this.fb.group({
      demate: ['', [Validators.required]],
      inmueble: ['', [Validators.required]],
      demado: ['', [Validators.required]],
      cartera: ['', [Validators.required]],
      etapaDemado: ['', [Validators.required]],
      fechaCartera: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getCopropiedad();
    this.getInmueble();
    this.getDemandados();
    this.getEtapasDemandado();
  }

  
  
  onSubmit(){

    const fecha = new Date(this.formCartera.get('fechaCartera')?.value);
    const fecCartera = `${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}`;


    const payload = {
      fecha_cartera: fecCartera,
      valor_cartera: this.formCartera.get('cartera')?.value ,
      id_inmueble:this.formCartera.get('inmueble')?.value ,
      id_etapa_demandado:this.formCartera.get('etapaDemado')?.value 
    };

    console.log('payload',payload);

    this.gjService.crearCartera(payload).subscribe((resp:any)=>{
      console.log('resp',resp);
      if(resp.state){ 
        this.utilService.showAlerta(resp.message);
        this.forDir.resetForm();
      }else{
        this.utilService.showAlerta(resp.message,"Error","error");
      }
    },(error:HttpErrorResponse)=>{
      this.utilService.showAlerta(error.message);
    });

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

  getEtapasDemandado() {
    this.gjService.getEtapasDemandado().subscribe((resp:any)=>{
      console.log("etapaDemado->",resp)
      this.etapasDemandados = resp;
     }, error=>{
      console.log(error)
     });
  }

}