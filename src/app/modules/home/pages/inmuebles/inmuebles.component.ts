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
import { InputComponent } from '@shared/components/input/input.component';
import { AutocompletarComponent } from '@home/components/autocompletar/autocompletar.component';

@Component({
  selector: 'app-inmuebles',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ,MatFormFieldModule, MatInputModule, 
    MatButtonModule, MatSelectModule,MatDatepickerModule, MatNativeDateModule, MatCardModule, InputComponent, AutocompletarComponent],
  templateUrl: './inmuebles.component.html',
  styleUrl: './inmuebles.component.css'
})
export class InmueblesComponent implements OnInit{
  formInmuebles: FormGroup;
  demandantes:any = [];  //copropiedades
  id_demandado!:number;
  readonly=true;

  @ViewChild(FormGroupDirective)
  private formDir!:FormGroupDirective; 
  constructor(private fb: FormBuilder, private gjService: GestionJuridicaService, private utilService:UtilsService){
    this.formInmuebles = this.fb.group({
      ident: [''],
      nombre: ['', [Validators.required]],
      email: [''],
      copropiedad: ['',[Validators.required]],
      inmueble: ['',[Validators.required]],
      fechaEtapaDemandado: ['', [Validators.required]],
      
      });
  }
  ngOnInit(): void {
    this.getDemandantes();
        
  }

  onSubmit(){

    const fecha = new Date(this.formInmuebles.get('fechaEtapaDemandado')!.value);
    const fecEtapa = `${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}`;

    const payload = {
        numero_inmueble: this.formInmuebles.get('inmueble')!.value,
        id_demandante:(this.formInmuebles.get('copropiedad')!.value).id_demandante,
        id_etapa_demandado: 2,
        id_demandado: this.id_demandado,
        fecha_etapa_demandado: fecEtapa
    }
   
    this.gjService.crearInmueble(payload).subscribe((resp:any)=>{
      console.log('resp',resp);
      if( resp.state){
        this.utilService.showAlerta("Inmueble crado")
        this.formDir.resetForm();
      }
    }, error=>{
       console.log('error',error); 
    });

  }


  buscarDemandado(event:any){
    const identi = this.formInmuebles.get('ident')!.value;
    console.log(identi);
    if (!identi){
      this.utilService.showAlerta("Debe diligenciar identificación","Advertencia!","warning");
      return;
    }

    this.gjService.getDemandadoXidenti(identi).subscribe((resp:any)=>{
      console.log('resp',resp);
    
      if(!resp.state){
        this.utilService.showAlerta("Deamandado no existe en la base de datos","Advertencia!","warning");
        this.formInmuebles.get('ident')?.setValue(null);
      }else{
        this.formInmuebles.get('nombre')?.setValue(resp.data.nombre_demandado);
        this.formInmuebles.get('email')?.setValue(resp.data.email_demandado);
        this.id_demandado = resp.data.id_demandado;
      }

    }, (error:HttpErrorResponse)=>{
      this.utilService.showAlerta(error.message,"Error!","error");
      console.log('err',error);
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

