import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { GestionJuridicaService } from '../../services/gestion-juridica.service';

@Component({
  selector: 'app-inmuebles',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ,MatFormFieldModule, MatInputModule, 
    MatButtonModule, MatSelectModule,MatDatepickerModule, MatNativeDateModule],
  templateUrl: './inmuebles.component.html',
  styleUrl: './inmuebles.component.css'
})
export class InmueblesComponent implements OnInit{
  formInmuebles: FormGroup;
  demandantes:any = [];  
  id_demandado!:number;
 

  constructor(private fb: FormBuilder, private gjService: GestionJuridicaService){
    this.formInmuebles = this.fb.group({
      ident: [''],
      nombre: ['', [Validators.required]],
      email: [''],
      copropiedad: ['',[Validators.required]],
      inmueble: ['',[Validators.required]],
      
      });
  }
  ngOnInit(): void {
    this.getDemandantes();
    
  }

  onSubmit(){

    const payload = {
        numero_inmueble: this.formInmuebles.get('inmueble')!.value,
        id_demandante:this.formInmuebles.get('copropiedad')!.value,
        id_etapa_demandado: 2,
        id_demandado: this.id_demandado,
        fecha_etapa_demandado: "2023-01-01"
    }

    console.log('payload',payload);

    this.gjService.crearInmueble(payload).subscribe((resp:any)=>{
      console.log('resp',resp);
      if( resp.state){
        alert("El inmueble se creo con exito");
        this.formInmuebles.reset();
      }
    }, error=>{
       console.log('error',error); 
    });

  }


  buscarDemandado(){
    const identi = this.formInmuebles.get('ident')!.value;
    console.log(identi)
    
    if (!identi){
      alert("Debe diligenciar identificación");
      return;
    }

    this.gjService.getDemandadoXidenti(identi).subscribe((resp:any)=>{
      console.log('resp',resp);
      
      if(!resp.state){
        alert("Deamandado no existe en la base de datos");
        this.formInmuebles.get('ident')?.setValue(null);
      }else{
        this.formInmuebles.get('nombre')?.setValue(resp.data.nombre_demandado);
        this.formInmuebles.get('email')?.setValue(resp.data.email_demandado);
        this.id_demandado = resp.data.id_demandado;
      }

    },err=>{
      console.log('Error',err);
    });

  }


  getDemandantes(){
    this.gjService.getDemandantes().subscribe((resp:any)=>{
     console.log("demandantes->",resp)
     this.demandantes = resp;


    }, error=>{
     console.log(error)
    });

 }
 
}

