import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
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
export class DemandadoComponent {
  formDemandado: FormGroup;
  demandantes:any = [];  
  @ViewChild(FormGroupDirective)
  private formDir!: FormGroupDirective;

  constructor(private fb: FormBuilder, private gjService: GestionJuridicaService){
    this.formDemandado = this.fb.group({
      ident: [''],
      nombre: ['', [Validators.required]],
      email: ['',[Validators.email]],
      });
  }
 

  onSubmit(){

    const payload = {
      identificacion_demandado: this.formDemandado.get('ident')!.value,
      nombre_demandado:this.formDemandado.get('nombre')!.value,
      email_demandado:this.formDemandado.get('email')!.value
    }

    this.gjService.crearDemandado(payload).subscribe((resp:any)=>{
      console.log('resp',resp);
      if(resp.state){
        alert("Demandado creado..");
        this.formDir.resetForm();
      }
    }, error=>{
      console.log('error',error);
    });

  }


  buscarDemandado(){
    const identi = this.formDemandado.get('ident')!.value;
    console.log(identi)
    if (!identi){
      alert("Debe diligenciar identificación");
      return;
    }

    this.gjService.getDemandadoXidenti(identi).subscribe((resp:any)=>{
      console.log('resp',resp);
      if(resp.State){
        alert("Deamandado ya existe en la base de datos");
        this.formDemandado.get('ident')?.setValue(null);
      }

    },err=>{
      console.log('Error',err);
    });

  }
 
}
