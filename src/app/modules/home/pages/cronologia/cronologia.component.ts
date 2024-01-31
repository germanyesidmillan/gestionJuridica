import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormBuilder, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { GestionJuridicaService } from '../../services/gestion-juridica.service';
import { MatCardModule } from '@angular/material/card';
import { UtilsService } from '../../../../share/services/utils.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cronologia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ,MatFormFieldModule, MatInputModule, MatButtonModule,
    MatSelectModule,MatDatepickerModule, MatNativeDateModule, MatCardModule],
  templateUrl: './cronologia.component.html',
  styleUrl: './cronologia.component.css'
})
export class CronologiaComponent implements OnInit{
  
  formCronologia: FormGroup;  
  cronologia: any;  
  demandantes:any = [];
  inmuebles:any = [];
  demandados:any = [];
  etapaDemandados:any = [];
  radicados:any = [];
  cronologias:any =[];
  inmueblesXdemandante:any = []; 
  inmuebleXdemandado:any = [];
  inmuebleXetapaDemandado:any = [];
  inmuebleXradicado:any = [];

  @ViewChild(FormGroupDirective) forDir!:FormGroupDirective;

  constructor(private fb: FormBuilder, private gjService: GestionJuridicaService,
              private utilService:UtilsService   ){
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
  ngOnInit(): void {
    this.getCopropiedad();
    this.getInmueble();
    this.getDemandados();
    this.getEtapasDemandado();
    //this.getRadicados();
    this.getCronologias();
    }
  
  
  onSubmit(){


    const fecha = new Date(this.formCronologia.get('fechaCronologia')?.value);
    const fecCrono = `${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}`; 

    const payload = {
      id_cronologia: this.formCronologia.get('cronologia')?.value,
      id_inmueble: this.formCronologia.get('inmueble')?.value,
      dias_alerta: parseInt(this.formCronologia.get('diasalerta')?.value),
      fecha_cronologia: fecCrono
    }
    
    console.log('payload',payload);

    this.gjService.crearCronologiaInmueble(payload).subscribe((resp:any)=>{

      if(resp.state){
        
        this.utilService.showAlerta(resp.message);
        this.forDir.resetForm();

      }else{
        this.utilService.showAlerta(resp.message,"Error", "error");
      }

    }, (error:HttpErrorResponse)=>{
      console.log('error',error);
      this.utilService.showAlerta(error.message,"Error", "error");
    })

  }

  onChangeCopropiedad(event: any){
    let demandante = event.value;
    this.limpiarDatos();
    this.formCronologia.get("demado")?.setValue(null);
    this.inmuebles.filter((inmueble:any)=>{
      if(inmueble.id_demandante == demandante){
        this.inmueblesXdemandante.push(inmueble)
      }
    });
 }

  onChangeInmueble(event: any){
    let inmueble = event.value;
    console.log('inmueble',inmueble);
    this.formCronologia.get("demado")?.setValue(null);
    this.inmuebleXdemandado = [];

    this.inmueblesXdemandante.filter((i:any)=>{
      if(i.id_inmueble == inmueble){
        this.inmuebleXdemandado.push(i);
      }
    });

    console.log('inmuebleXdemandado',this.inmuebleXdemandado);
    let demandado = this.inmuebleXdemandado[0]["id_demandado"];
    
    let id_etapa = this.inmuebleXdemandado[0].id_etapa_demandado;


    this.etapaDemandados.filter((ed:any)=>{
      if(ed.id_etapa_demandado == id_etapa){
        this.formCronologia.get("etapaDemado")?.setValue(ed.nombre_etapa_demandado);
      }
    });
    
    console.log('id_etapa',this.inmuebleXdemandado[0].id_etapa_demandado);

    this.demandados.filter( (dem:any)=>{
      if (dem.id_demandado == demandado){
        this.formCronologia.get("demado")?.setValue(dem.nombre_demandado);
      }
    });

    this.getRadicadosPorInmueble(inmueble);

  }

  limpiarDatos(){
    this.inmuebleXdemandado = [];
    this.inmueblesXdemandante = [];
    this.formCronologia.get("demado")?.setValue(null);
  }
  
  getCopropiedad() {
    this.gjService.getDemandantes().subscribe((resp:any)=>{
    //  console.log("demandantes->",resp)
      this.demandantes = resp;
     }, error=>{
      console.log(error)
     });
  }
  
  getInmueble() {
    this.gjService.getInmuebles().subscribe((resp:any)=>{
    //  console.log("inmuebles->",resp)
      this.inmuebles = resp;
     }, error=>{
      console.log(error)
     });
  }

  getDemandados() {
    this.gjService.getDemandados().subscribe((resp:any)=>{
    //  console.log("demandados->",resp)
      this.demandados = resp;
     }, error=>{
      console.log(error)
     });
  }

  getRadicadosPorInmueble(id_inmueble:any) {
    this.gjService.getRadicadosPorInmueble(id_inmueble).subscribe((resp:any)=>{
     console.log("radicados->",resp)
      this.formCronologia.get("radicado")?.setValue(resp[0].num_radicado);
      this.radicados = resp;
     }, error=>{
      console.log(error)
     });
  }

  getEtapasDemandado() {
    this.gjService.getEtapasDemandado().subscribe((resp:any)=>{
     console.log("etapaDemado->",resp)
      this.etapaDemandados = resp;
     }, error=>{
      console.log(error)
     });
  }

  getCronologias() {
    this.gjService.getCronologias().subscribe((resp:any)=>{
    //  console.log("cronologias->",resp)
      this.cronologias = resp;
     }, error=>{
      console.log(error)
     });
  }

}
