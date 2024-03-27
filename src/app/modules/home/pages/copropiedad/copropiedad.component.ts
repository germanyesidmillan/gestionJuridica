import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';

import { GestionJuridicaService } from '../../services/gestion-juridica.service';
import { UtilsService } from '@shared/services/utils.service';
import { HttpErrorResponse } from '@angular/common/http';
import { StoreService } from '@shared/services/store.service';
import { InputComponent } from "@shared/components/input/input.component";
import { AutocompletarComponent } from '@home/components/autocompletar/autocompletar.component';

@Component({
  selector: 'app-copropiedad',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ,MatFormFieldModule, MatInputModule, MatButtonModule,
             MatSelectModule,MatDatepickerModule, MatNativeDateModule, MatCardModule, InputComponent, AutocompletarComponent],
  templateUrl: './copropiedad.component.html',
  styleUrl: './copropiedad.component.css'
})
export class CopropiedadComponent implements OnInit {


  formCopropiedad: FormGroup;
  @ViewChild(FormGroupDirective)
  private formDir!:FormGroupDirective;  

  constructor(private fb: FormBuilder, private utilService: UtilsService , 
              private gjService: GestionJuridicaService, private storeService: StoreService){
    this.formCopropiedad = this.fb.group({
      nit: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      tipoInmueble: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      municipio: ['', [Validators.required]],
      banco: ['', [Validators.required]],
      tipoCuenta: ['', [Validators.required]],
      numCuenta: ['', [Validators.required]],
      admin: ['', [Validators.required]],
      fechaPersoneria: ['', [Validators.required]],
    });
  }

  get municipios(){
    return this.storeService.municipiosSignal();
  }
  get bancos(){
    return this.storeService.bancosSignal();
  }
  get tipoCuentas(){
    return this.storeService.tipoCuentaSignal();
  }
  get administradores(){
    return this.storeService.administradoresSignal();
  }
  get tipoInmuebles(){
    return this.storeService.tipoInmueblesSignal();
  }

  ngOnInit(): void {
    this.getMunicipios();
    this.getTipoCuentas();
    this.getBancos();
    this.getAdministradores();
    this.getTipoInmuebles();
  }

  onSubmit(){

    this.utilService.cargando(true);
    let fec = new Date(this.formCopropiedad.get('fechaPersoneria')!.value); 
    const fecPer = `${fec.getFullYear()}-${fec.getMonth()+1}-${fec.getDate()}`;

    const payload = {
      identificacion_demandante: this.formCopropiedad.get('nit')!.value,
      nombre_demandante: this.formCopropiedad.get('nombre')!.value,
      direccion_demandante:this.formCopropiedad.get('direccion')!.value,
      id_municipio: (this.formCopropiedad.get('municipio')!.value).id_municipio,
      id_tipo_cuenta:(this.formCopropiedad.get('tipoCuenta')!.value).id_tipo_cuenta,
      num_cuenta:this.formCopropiedad.get('numCuenta')!.value,
      id_admin_copropiedad: (this.formCopropiedad.get('admin')!.value).id_admin_copropiedad,
      fecha_personeria: fecPer,
      id_banco:(this.formCopropiedad.get('banco')!.value).id_banco,
      id_tipo_inmuebles:(this.formCopropiedad.get('tipoInmueble')!.value).id_tipo_inmueble 
    }

    this.gjService.crearDemandante(payload).subscribe((resp:any)=>{
      this.utilService.cargando(false);
      if (resp.state){
        this.utilService.showAlerta('Se ha creado el demandante');
        this.formDir.resetForm();
        this.storeService.copropiedadesSignal.update(current=>[...current, resp.data] );
      }
    }, (error:HttpErrorResponse)=>{
      this.utilService.cargando(false);
      this.utilService.showAlerta(error.message, 'Error!','error');
      console.log('err',error);
    });

  }

  getMunicipios(){

    if(this.storeService.municipiosSignal().length > 0){
      return;
    }

    this.gjService.getMunicipios().subscribe((resp:any)=>{
      this.storeService.municipiosSignal.set(resp);
    }, error=>{
      console.log('error',error);
    }); 

  }
  
  getBancos(){
    
    if(this.storeService.bancosSignal().length > 0){
      return;
    }

    this.gjService.getBancos().subscribe((resp:any)=>{
      this.storeService.bancosSignal.set(resp);
    }, error=>{
      console.log('error',error);
    }); 
  }

  getTipoCuentas(){

    if(this.storeService.tipoCuentaSignal().length > 0){
      return;
    }

    this.gjService.getTipoCuentas().subscribe((resp:any)=>{
      this.storeService.tipoCuentaSignal.set(resp);
    }, error=>{
      console.log('error',error);
    }); 
  }
  
  getAdministradores(){

    if(this.storeService.administradoresSignal().length > 0){
      return;
    }

    this.gjService.getAdministradores().subscribe((resp:any)=>{
      this.storeService.administradoresSignal.set(resp);
    }, error=>{
      console.log('error',error);
    }); 
  }

  getTipoInmuebles(){

    if(this.storeService.tipoInmueblesSignal().length > 0){
      return;
    }

    this.gjService.getTipoInmuebles().subscribe((resp:any)=>{
      this.storeService.tipoInmueblesSignal.set(resp);
      
    }, error=>{
      console.log('error',error);
    }); 
  }

}
