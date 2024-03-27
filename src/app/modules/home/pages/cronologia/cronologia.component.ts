import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormBuilder, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { GestionJuridicaService } from '../../services/gestion-juridica.service';
import { MatCardModule } from '@angular/material/card';
import { UtilsService } from '@shared/services/utils.service';
import { HttpErrorResponse } from '@angular/common/http';
import { InputComponent } from '@shared/components/input/input.component';
import { AutocompletarComponent } from '@home/components/autocompletar/autocompletar.component';
import { StoreService } from '@shared/services/store.service';

@Component({
  selector: 'app-cronologia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ,MatFormFieldModule, MatInputModule, MatButtonModule,
    MatSelectModule,MatDatepickerModule, MatNativeDateModule, MatCardModule, InputComponent, AutocompletarComponent],
  templateUrl: './cronologia.component.html',
  styleUrl: './cronologia.component.css'
})
export class CronologiaComponent implements OnInit{
  
  formCronologia: FormGroup;  
  cronologia: any;  
  radicados:any = [];
  inmueblesXdemandante:any = []; 
  inmuebleXdemandado:any = [];
  inmuebleXetapaDemandado:any = [];
  inmuebleXradicado:any = [];

  @ViewChild(FormGroupDirective) forDir!:FormGroupDirective;

  constructor(private fb: FormBuilder, private gjService: GestionJuridicaService,
              private utilService:UtilsService, public storeService: StoreService   ){
    this.formCronologia = this.fb.group({
      demate: ['', [Validators.required]],
      inmueble: ['', [Validators.required]],
      demado: ['', [Validators.required]],
      etapaDemado: ['', [Validators.required]],
      radicado: [''],
      cronologia: ['', [Validators.required]],
      fechaCronologia: ['', [Validators.required]],
      diasalerta: ['', [Validators.required]],
    });
  }

  get demandantes(){
    return this.storeService.copropiedadesSignal(); 
  }
  
  get demandados(){
    return this.storeService.demandadosSignal(); 
  }
  
  get inmuebles(){
    return this.storeService.inmueblesSignal(); 
  }
  
  get etapaDemandados(){
    return this.storeService.etapasDemandadosSignal(); 
  }
  
  get cronologias(){
    return this.storeService.cronologiasSignal(); 
  }

  ngOnInit(): void {
    this.getDemandados();
    this.getEtapasDemandado();
    this.getCronologias();
  }
  
  
  onSubmit(){

    const fecha = new Date(this.formCronologia.get('fechaCronologia')?.value);
    const fecCrono = `${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}`; 

    const payload = {
      id_cronologia: (this.formCronologia.get('cronologia')?.value).id_cronologia,
      id_inmueble: (this.formCronologia.get('inmueble')?.value).id_inmueble,
      dias_alerta: parseInt(this.formCronologia.get('diasalerta')?.value),
      fecha_cronologia: fecCrono
    }

    this.gjService.crearCronologiaInmueble(payload).subscribe((resp:any)=>{

      if(resp.state){
        
        this.utilService.showAlerta(resp.message);
        this.forDir.resetForm();

      }else{
        this.utilService.showAlerta(resp.message,"Error!", "error");
      }

    }, (error:HttpErrorResponse)=>{
      console.log('error',error);
      this.utilService.showAlerta(error.message,"Error!", "error");
    })

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
    this.formCronologia.get("demado")?.setValue(null);
    this.formCronologia.get("etapaDemado")?.setValue(null);
    this.formCronologia.get("radicado")?.setValue(null);
    this.inmuebleXdemandado = [];

    if(!event.value.id_inmueble){
      return;
    }

    this.inmueblesXdemandante.filter((i:any)=>{
      if(i.id_inmueble == inmueble){
        this.inmuebleXdemandado.push(i);
      }
    });

    let demandado = this.inmuebleXdemandado[0]["id_demandado"];
    let id_etapa = this.inmuebleXdemandado[0].id_etapa_demandado;

    this.etapaDemandados.filter((ed:any)=>{
      if(ed.id_etapa_demandado == id_etapa){
        this.formCronologia.get("etapaDemado")?.setValue(ed.nombre_etapa_demandado);
      }
    });

    this.demandados.filter( (dem:any)=>{
      if (dem.id_demandado == demandado){
        this.formCronologia.get("demado")?.setValue(dem.nombre_demandado);
      }
    });

    this.getRadicadosPorInmueble(inmueble);
  }

  limpiarDatos(){
    this.storeService.cancelCopropiedad.set(false);
    this.storeService.cancelInmueble.set(false);
    
    this.formCronologia.get("etapaDemado")?.setValue(null);
    this.formCronologia.get("radicado")?.setValue(null);
    this.formCronologia.get("inmueble")?.setValue(null);

    this.inmuebleXdemandado = [];
    this.inmueblesXdemandante = [];
    this.formCronologia.get("demado")?.setValue(null);
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

  getRadicadosPorInmueble(id_inmueble:any) {
    this.gjService.getRadicadosPorInmueble(id_inmueble).subscribe((resp:any)=>{
      this.formCronologia.get("radicado")?.setValue(resp[0].num_radicado);
      this.radicados = resp;
    }, error=>{
      console.log(error)
    });
  }

  getEtapasDemandado() {
    if(this.storeService.etapasDemandadosSignal().length > 0){
      return;
    }

    this.gjService.getEtapasDemandado().subscribe((resp:any)=>{
      this.storeService.etapasDemandadosSignal.set(resp);
    }, error=>{
      console.log(error)
    });
  }

  getCronologias() {
    if(this.storeService.cronologiasSignal().length > 0){
      return;  
    }
    this.gjService.getCronologias().subscribe((resp:any)=>{
      this.storeService.cronologiasSignal.set(resp);
    }, error=>{
      console.log(error)
    });
  }

}