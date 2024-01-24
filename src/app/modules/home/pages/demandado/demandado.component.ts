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
  selector: 'app-demandado',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ,MatFormFieldModule, MatInputModule, 
    MatButtonModule, MatSelectModule,MatDatepickerModule, MatNativeDateModule],
  templateUrl: './demandado.component.html',
  styleUrl: './demandado.component.css'
})
export class DemandadoComponent implements OnInit{
  formDemandado: FormGroup;
  demandantes:any = [];  
 

  constructor(private fb: FormBuilder, private gjService: GestionJuridicaService){
    this.formDemandado = this.fb.group({
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
      identificacion_demandado: this.formDemandado.get('ident')!.value,
      nombre_demandado:this.formDemandado.get('nombre')!.value,
      email_demandado:this.formDemandado.get('email')!.value
    }

    this.gjService.crearDemandado(payload).subscribe((resp:any)=>{

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
