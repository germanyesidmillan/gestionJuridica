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
    this.getInmuebles();
    
  }

  onSubmit(){

    const payload = {
      identificacion_demandado: this.formInmuebles.get('ident')!.value,
      nombre_demandado:this.formInmuebles.get('nombre')!.value,
      email_demandado:this.formInmuebles.get('email')!.value
    }

    this.gjService.crearDemandado(payload).subscribe((resp:any)=>{

    });

  }
  getInmuebles(){
     this.gjService.getInmuebles().subscribe((resp:any)=>{
      console.log("demandantes->",resp)
      this.demandantes = resp;


     }, error=>{
      console.log(error)
     });

  }
 
}

