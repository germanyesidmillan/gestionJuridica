import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { IGestionJuridica } from '../../models/gestion-juridica-interface';
import { MatCardModule } from '@angular/material/card';

import { GestionJuridicaService } from '../../services/gestion-juridica.service';
import { UtilsService } from '../../../../shared/services/utils.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-copropiedad',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ,MatFormFieldModule, MatInputModule, MatButtonModule,
             MatSelectModule,MatDatepickerModule, MatNativeDateModule, MatCardModule],
  templateUrl: './copropiedad.component.html',
  styleUrl: './copropiedad.component.css'
})
export class CopropiedadComponent implements OnInit {


  formCopropiedad: FormGroup;
  @ViewChild(FormGroupDirective)
  private formDir!:FormGroupDirective;  

  municipios:any = [];
  bancos:any = [];
  tipoCuentas:any = [];
  administradores:any = [];
  tipoInmuebles: any = [];

  constructor(private fb: FormBuilder, private utilService: UtilsService , 
              private gjService: GestionJuridicaService){
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
  ngOnInit(): void {
   
    this.getMunicipios();
    this.getTipoCuentas();
    this.getBancos();
    this.getAdministradores();
    this.getTipoInmuebles();
  }

  onSubmit(){

    let banco = this.formCopropiedad.get('banco')?.value;
    console.log('formulario',this.formCopropiedad, banco);

    this.utilService.cargando(true);

    let fec = new Date(this.formCopropiedad.get('fechaPersoneria')!.value); 

    const fecPer = `${fec.getFullYear()}-${fec.getMonth()+1}-${fec.getDate()}`;

    const payload = {
      identificacion_demandante: this.formCopropiedad.get('nit')!.value,
      nombre_demandante: this.formCopropiedad.get('nombre')!.value,
      direccion_demandante:this.formCopropiedad.get('direccion')!.value,
      id_municipio: this.formCopropiedad.get('municipio')!.value,
      id_tipo_cuenta:this.formCopropiedad.get('tipoCuenta')!.value,
      num_cuenta:this.formCopropiedad.get('numCuenta')!.value,
      id_admin_copropiedad:this.formCopropiedad.get('admin')!.value,
      fecha_personeria: fecPer,
      id_banco:this.formCopropiedad.get('banco')!.value,
      id_tipo_inmuebles:this.formCopropiedad.get('tipoInmueble')!.value 
    }

    this.gjService.crearDemandante(payload).subscribe((resp:any)=>{
      this.utilService.cargando(false);
      if (resp.state){
        console.log('resp',resp);
        this.utilService.showAlerta('Se ha creado el demandante');
        this.formDir.resetForm();
      }
    }, (error:HttpErrorResponse)=>{
      this.utilService.cargando(false);
      this.utilService.showAlerta(error.message);
      console.log('err',error);
    });


  }

  getMunicipios(){

    this.gjService.getMunicipios().subscribe((resp:IGestionJuridica)=>{
      this.municipios = resp;
      console.log('municipios',this.municipios);
    }, error=>{
      console.log('error',error);
    }); 

  }
  
  getBancos(){
    this.gjService.getBancos().subscribe((resp:any)=>{
      this.bancos = resp;
      console.log('bancos',this.bancos);
    }, error=>{
      console.log('error',error);
    }); 
  }

  getTipoCuentas(){
    this.gjService.getTipoCuentas().subscribe((resp:any)=>{
      this.tipoCuentas = resp;
      console.log('tipoCuentas',this.tipoCuentas);
    }, error=>{
      console.log('error',error);
    }); 
  }
  
  getAdministradores(){
    this.gjService.getAdministradores().subscribe((resp:any)=>{
      this.administradores = resp;
      console.log('admnin',this.administradores);
    }, error=>{
      console.log('error',error);
    }); 
  }

  getTipoInmuebles(){
    this.gjService.getTipoInmuebles().subscribe((resp:any)=>{
      this.tipoInmuebles = resp;
      console.log('tipoInmueble',this.tipoInmuebles);
      
    }, error=>{
      console.log('error',error);
    }); 
  }


}
