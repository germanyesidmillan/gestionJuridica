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
import { IGestionJuridica } from '../../models/gestion-juridica-interface';
import { MatCardModule } from '@angular/material/card';

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

  municipios:any = [];
  bancos:any = [];
  tipoCuentas:any = [];
  administradores:any = [];
  tipoInmuebles: any = [];

  constructor(private fb: FormBuilder, private gestJur: GestionJuridicaService){
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

  }

  getMunicipios(){

    this.gestJur.getMunicipios().subscribe((resp:IGestionJuridica)=>{
      this.municipios = resp;
      console.log('municipios',this.municipios);
    }, error=>{
      console.log('error',error);
    }); 

  }
  
  getBancos(){
    this.gestJur.getBancos().subscribe((resp:any)=>{
      this.bancos = resp;
      console.log('bancos',this.bancos);
    }, error=>{
      console.log('error',error);
    }); 
  }

  getTipoCuentas(){
    this.gestJur.getTipoCuentas().subscribe((resp:any)=>{
      this.tipoCuentas = resp;
      console.log('tipoCuentas',this.tipoCuentas);
    }, error=>{
      console.log('error',error);
    }); 
  }
  
  getAdministradores(){
    this.gestJur.getAdministradores().subscribe((resp:any)=>{
      this.administradores = resp;
      console.log('admnin',this.administradores);
    }, error=>{
      console.log('error',error);
    }); 
  }

  getTipoInmuebles(){
    this.gestJur.getTipoInmuebles().subscribe((resp:any)=>{
      this.tipoInmuebles = resp;
      console.log('tipoInmueble',this.tipoInmuebles);
      
    }, error=>{
      console.log('error',error);
    }); 
  }


}
