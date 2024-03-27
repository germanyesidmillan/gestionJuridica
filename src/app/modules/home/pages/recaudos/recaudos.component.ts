import { Component, ViewChild } from '@angular/core';
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
import { UtilsService } from '@shared/services/utils.service';
import { HttpErrorResponse } from '@angular/common/http';
import { StoreService } from '@shared/services/store.service';
import { InputComponent } from '@shared/components/input/input.component';
import { AutocompletarComponent } from '@home/components/autocompletar/autocompletar.component';

@Component({
  selector: 'app-recaudos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ,MatFormFieldModule, MatInputModule, MatButtonModule,
    MatSelectModule,MatDatepickerModule, MatNativeDateModule, MatCardModule, InputComponent, AutocompletarComponent],
  templateUrl: './recaudos.component.html',
  styleUrl: './recaudos.component.css'
})
export class RecaudosComponent {

  formRecaudo: FormGroup;
  inmueblesXdemandante:any = []; 
  inmuebleXdemandado:any = [];

  @ViewChild(FormGroupDirective) formDir!: FormGroupDirective;
 
  constructor(private fb: FormBuilder, private gjService: GestionJuridicaService, 
              private utilService:UtilsService, public storeService: StoreService){
    this.formRecaudo = this.fb.group({
      demate: ['', [Validators.required]],
      inmueble: ['', [Validators.required]],
      demado: ['', [Validators.required]],
      recaudo: ['', [Validators.required]],
      fechaRecaudo: ['', [Validators.required]],
    });
  }

  get demandantes(){
    return this.storeService.copropiedadesSignal();
  }
  get inmuebles(){
    return this.storeService.inmueblesSignal();
  }
  get demandados(){
    return this.storeService.demandadosSignal();
  }


  ngOnInit(): void {
    this.getDemandados();
  }
  
  onSubmit(){
    
    const fecha = new Date (this.formRecaudo.get('fechaRecaudo')?.value);
    const fecRecaudo = `${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}`;

    const payload = {
      fecha_recaudo: fecRecaudo,
      valor_recaudo: this.formRecaudo.get('recaudo')!.value,
      id_inmueble: (this.formRecaudo.get('inmueble')!.value).id_inmueble
    }
   
    this.gjService.crearRecaudo(payload).subscribe((resp:any)=>{
      if(resp.state){
        this.utilService.showAlerta(resp.message);
        this.formDir.resetForm();
      }else{
        this.utilService.showAlerta(resp.message, "Error!","error");
      }
    }, (error:HttpErrorResponse)=>{
      console.log('Error',error);
      this.utilService.showAlerta(error.message, "Error!","error");
    });
  }

  onChangeCopropiedad(event: any){
    let demandante = event.value.id_demandante;
    this.limpiarDatos();
    this.inmuebles.filter((inmueble:any)=>{
      if(inmueble.id_demandante == demandante){
        this.inmueblesXdemandante.push(inmueble)
      }
    });
  }
 
  onChangeInmueble(event: any){
    let inmueble = event.value.id_inmueble;
    this.storeService.cancelInmueble.set(true);
    this.formRecaudo.get("demado")?.setValue(null);
    this.inmuebleXdemandado = [];

    this.inmueblesXdemandante.filter((i:any)=>{
      if(i.id_inmueble == inmueble){
        this.inmuebleXdemandado.push(i);
      }
    });

    let demandado = this.inmuebleXdemandado[0]["id_demandado"];

    this.demandados.filter( (dem:any)=>{
      if (dem.id_demandado == demandado){
        this.formRecaudo.get("demado")?.setValue(dem.nombre_demandado);
      }
    });

  }

  limpiarDatos(){
    this.inmuebleXdemandado = [];
    this.inmueblesXdemandante = [];
    this.storeService.cancelInmueble.set(false);
    this.formRecaudo.get("demado")?.setValue(null);
    this.formRecaudo.get("inmueble")?.setValue(null);
  }

  getDemandados() {
    if(this.storeService.demandadosSignal().length > 0){
      return;
    }
    this.gjService.getDemandados().subscribe((resp:any)=>{
      this.storeService.demandadosSignal.set(resp);
    }, error=>{
      console.log(error)
    });
  }

}
