import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { GestionJuridicaService } from '../../services/gestion-juridica.service';
import { MatCardModule } from '@angular/material/card';

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
  etadaDemandados:any = [];
  radicados:any = [];
  cronologias:any =[];
  inmueblesXdemandante:any = []; 
  inmuebleXdemandado:any = [];
  inmuebleXetapaDemandado:any = [];
  inmuebleXradicado:any = [];

  constructor(private fb: FormBuilder, private gjService: GestionJuridicaService){
    this.formCronologia = this.fb.group({
      demate: ['', [Validators.required]],
      inmueble: ['', [Validators.required]],
      demado: ['', [Validators.required]],
      etapaDemado: ['', [Validators.required]],
      radicado: ['', [Validators.required]],
      cronologia: ['', [Validators.required]],
      fechaCronologia: ['', [Validators.required]],
      diasalerta: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.getCopropiedad();
    this.getInmueble();
    this.getDemandados();
    this.getEtapaDemandado();
    this.getRadicados();
    this.getCronologias();
    }
  
  
   onSubmit(){
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

    this.demandados.filter( (dem:any)=>{
      if (dem.id_demandado == demandado){
        this.formCronologia.get("demado")?.setValue(dem.nombre_demandado);
        console.log('dem==>',dem.nombre_demandado);
      }
    });

     
   // console.log('inmuebleXetapaDemandado',this.inmuebleXetapaDemandado);

   // let etapaDemandado = this.inmuebleXetapaDemandado[0]["id_etapa_demandado"];

   // this.etadaDemandados.filter( (etadem:any)=>{
    //  if (etadem.id_etapa_demandado == etapaDemandado){
     //   this.formCronologia.get("etapaDemado")?.setValue(etadem.nombre_etapa_demandado);
    //    console.log('etadem==>',etadem.nombre_etapa_demandado);
     // }
  //  });

    console.log('inmuebleXradicado',this.inmuebleXradicado);

    let radicados = this.inmuebleXradicado[0]["id_radicado"];

    this.radicados.filter( (r:any)=>{
      if (radicados.id_radicado == radicados){
        this.formCronologia.get("radicados")?.setValue(r.num_radicado);
        console.log('r==>',r.num_radicado);
      }
    });

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

  getRadicados() {
    this.gjService.getRadicados().subscribe((resp:any)=>{
     console.log("radicados->",resp)
      this.radicados = resp;
     }, error=>{
      console.log(error)
     });
  }

  getEtapaDemandado() {
    this.gjService.getEtapaDemandado().subscribe((resp:any)=>{
     console.log("etapaDemado->",resp)
      this.etadaDemandados = resp;
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
