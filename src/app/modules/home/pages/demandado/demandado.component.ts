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
import { UtilsService } from '../../../../shared/services/utils.service';
import { MatCardModule } from '@angular/material/card';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-demandado',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ,MatFormFieldModule, MatInputModule, 
    MatButtonModule, MatSelectModule,MatDatepickerModule, MatNativeDateModule, MatCardModule],
  templateUrl: './demandado.component.html',
  styleUrl: './demandado.component.css'
})
export class DemandadoComponent {
  formDemandado: FormGroup;
  demandantes:any = [];  
  @ViewChild(FormGroupDirective)
  private formDir!: FormGroupDirective;

  constructor(private fb: FormBuilder, private gjService: GestionJuridicaService, private utilsService:UtilsService){
    this.formDemandado = this.fb.group({
      ident: [''],
      nombre: ['', [Validators.required]],
      email: ['',[Validators.email]],
      });
  }
 

  onSubmit(){

    this.utilsService.cargando(true);

    const payload = {
      identificacion_demandado: this.formDemandado.get('ident')!.value,
      nombre_demandado:this.formDemandado.get('nombre')!.value,
      email_demandado:this.formDemandado.get('email')!.value
    }

    this.gjService.crearDemandado(payload).subscribe((resp:any)=>{
      console.log('resp',resp);
      this.utilsService.cargando(true);

      if(resp.state){
        this.utilsService.showAlerta('Se ha creado el Demandado');
        this.formDir.resetForm();
      }
    }, (error:HttpErrorResponse)=>{
      this.utilsService.cargando(false);
      this.utilsService.showAlerta(error.message,"Error!","error");
      console.log('err',error);
    });

  }


  buscarDemandado(){
    const identi = this.formDemandado.get('ident')!.value;
   
    console.log(identi)
    if (!identi){
      this.utilsService.showAlerta('Debe diligenciar identificación',"Advertencia!","warning");
      return;
    }
    //this.utilsService.cargando(true);
    this.gjService.getDemandadoXidenti(identi).subscribe((resp:any)=>{
      console.log('resp-service',resp);
      //this.utilsService.cargando(false);
      if(resp.State){
        alert("Deamandado ya existe en la base de datos");
        this.formDemandado.get('ident')?.setValue(null);
      }

    },(error:HttpErrorResponse)=>{
      //this.utilsService.cargando(false);
      this.utilsService.showAlerta(error.message,"Error!","error");
      console.log('err-service',error);
    });

  }
 
}
