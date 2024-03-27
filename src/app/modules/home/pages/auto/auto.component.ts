import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { GestionJuridicaService } from '../../services/gestion-juridica.service';
import { MatCardModule } from '@angular/material/card';
import { UtilsService } from '../../../../shared/services/utils.service';
import { InputComponent } from '@shared/components/input/input.component';
import { StoreService } from '../../../../shared/services/store.service';

@Component({
  selector: 'app-auto',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    InputComponent,
  ],
  templateUrl: './auto.component.html',
  styleUrl: './auto.component.css',
})
export class AutoComponent implements OnInit {
  id_inmueble: any;
  id_demandante: any;
  id_demandado: any;
  radicados: any = [];
  formAuto: FormGroup;
  inmuebleXJuzgado: any = [];
  numJuzgadosPorRadicado: any = [];
  juzgadosXradicado:any = [];
  numJuzgadosXjuzgado:any =[];
  inmueblesXdemandante: any = [];
  inmuebleXdemandado: any = [];
  onChangeNumJuzgado: any;

  @ViewChild(FormGroupDirective)
  private forDir!:FormGroupDirective;

  constructor(
    private fb: FormBuilder,
    private gjService: GestionJuridicaService,
    private utilService: UtilsService,
    private storeService: StoreService 
  ) {
    this.formAuto = this.fb.group({
      juzgado: ['', [Validators.required]],
      numJuzgado: ['', [Validators.required]],
      demate: ['', [Validators.required]],
      inmueble: ['', [Validators.required]],
      demado: ['', [Validators.required]],
      radicado: ['', [Validators.required]],
      fechaAuto: ['', [Validators.required]],
      auto: ['', [Validators.required]],
    });
  }
  
  ngOnInit(): void {
    this.getJuzgados();
    this.getNumJuzgado();
    this.getDemandados();
  }

  //signal
  get juzgados(){
    return this.storeService.juzgadosSignal()
  }

  get demandantes(){
    return this.storeService.copropiedadesSignal();
  }

  get inmuebles(){
    return this.storeService.inmueblesSignal();
  }
  
  get numJuzgado(){
    return this.storeService.numJuzgadosSignal();
  }

  get demandados(){
    return this.storeService.demandadosSignal();
  }
  
  onSubmit(){

    const fec = new Date(this.formAuto.get('fechaAuto')!.value);
    const fecAuto = `${fec.getFullYear()}-${fec.getMonth()+1}-${fec.getDate()}`;

    const payload = {
      fecha_auto: fecAuto,
      descrip_auto:this.formAuto.get('auto')!.value,
      id_radicado:this.radicados[0].id_radicado,
      id_num_juzgado:this.formAuto.get('numJuzgado')!.value
    }

    this.gjService.crearAuto(payload).subscribe((resp:any)=>{

      if(resp.state){
        this.utilService.showAlerta(resp.message);
        this.forDir.resetForm();
      }

    },err=>{
      console.log('Error',err);
    });

  }

  onChangeJuzgado(event: any) {
    let juzgadoSel = event.value;
  
    this.numJuzgadosPorRadicado.filter((n:any)=>{
      if (n.id_juzgado == juzgadoSel){
        this.numJuzgadosXjuzgado.push(n);
        this.formAuto.get('numJuzgado')?.setValue(n.id_num_juzgado)
      }
    });

    let inmueble = this.radicados[0].id_inmueble;
    this.inmuebles.filter((i:any)=>{
      if (inmueble == i.id_inmueble){
        this.inmuebleXJuzgado.push(i);
        this.id_inmueble = i.id_inmueble;
        this.formAuto.get('inmueble')?.setValue(i.id_inmueble)
      }
    });

    this.inmuebles.filter((i:any)=>{
      if( this.id_inmueble == i.id_inmueble ){
        this.id_demandante = i.id_demandante;
        this.id_demandado = i.id_demandado;
      }
    });

    this.demandantes.filter((dte:any)=>{
      if(dte.id_demandante == this.id_demandante){
        this.formAuto.get('demate')?.setValue(dte.nombre_demandante);
      }
    });

    this.demandados.filter((ddo:any)=>{
      if(ddo.id_demandado == this.id_demandado){
        this.formAuto.get('demado')?.setValue(ddo.nombre_demandado);
      } 
    });

  }
  
  onChangeCopropiedad(event: any) {
    let demandante = event.value;
    this.limpiarDatos();
    //this.formAuto.get("demado")?.setValue(null);
    this.inmuebles.filter((inmueble: any) => {
      if (inmueble.id_demandante == demandante) {
        this.inmueblesXdemandante.push(inmueble);
      }
    });
  }

  onChangeInmueble(event: any) {
    let inmueble = event.value;
    console.log('inmueble', inmueble);
    this.formAuto.get('demado')?.setValue(null);
    this.inmuebleXdemandado = [];

    this.inmueblesXdemandante.filter((i: any) => {
      if (i.id_inmueble == inmueble) {
        this.inmuebleXdemandado.push(i);
      }
    });

    let demandado = this.inmuebleXdemandado[0]['id_demandado'];

    this.demandados.filter((dem: any) => {
      if (dem.id_demandado == demandado) {
        this.formAuto.get('demado')?.setValue(dem.nombre_demandado);
      }
    });

  }

  limpiarDatos() {
    this.inmuebleXdemandado = [];
    this.inmueblesXdemandante = [];
    this.formAuto.get('demado')?.setValue(null);
  }

  getJuzgados() {
    
    if(this.storeService.juzgadosSignal().length > 0){
      return;
    } 

    this.gjService.getJuzgados().subscribe((resp: any) => {
        this.storeService.juzgadosSignal.set(resp);
      },(error) => {
        console.log(error);
      }
    );
  } 

  getNumJuzgado() {

    if(this.storeService.numJuzgadosSignal().length > 0){
      return;
    }

    this.gjService.getNumJuzgados().subscribe((resp: any) => {
        this.storeService.numJuzgadosSignal.set(resp);
      },(error) => {
        console.log(error);
      }
    );
  } 

  getDemandados() {

    if(this.storeService.demandadosSignal().length > 0){
      return;
    }

    this.gjService.getDemandados().subscribe((resp: any) => {
        this.storeService.demandadosSignal.set(resp);
      },(error) => {
        console.log(error);
      }
    );
  } 


  buscarNumRadicado(event: any){
    const numRadicado = event.target.value;
    if (numRadicado == ''){
      this.utilService.showAlerta("Digite el número de radicado","Advertencia!","warning");
      return;
    }
    this.radicados = [];
    this.juzgadosXradicado = [];
    this.forDir.resetForm();
    this.getNumRadicado(numRadicado);

  }

  getNumRadicado(numRadicado:any) {
    this.radicados=[]; 
    this.numJuzgadosPorRadicado = [];
    this.formAuto.get('radicado')?.setValue(numRadicado)
    
    this.gjService.getNumeroRadicado(numRadicado).subscribe((resp: any) => {
        
        console.log('resp--->',resp);
        //TODO: Colocar validacion de registros

        if(resp.state){
          this.radicados = resp.data;
          this.numJuzgado.filter((nj:any)=>{
            this.radicados.filter((rad:any, i:number)=>{
             if(nj.id_num_juzgado == rad.id_num_juzgado){
               this.numJuzgadosPorRadicado.push(nj);
              }
            });
          });
  
          this.juzgados.filter((j:any)=>{
            this.numJuzgadosPorRadicado.filter((jr:any)=>{
              if(j.id_juzgado == jr.id_juzgado){
                this.juzgadosXradicado.push(j);
              }
            })
          })
        }else{
          this.utilService.showAlerta(resp.message,"Advertencia!",'warning')
        }

      },
      (error) => {
        console.log(error);
        this.utilService.showAlerta(error.message,"Error!",'error')
      }
    );
  }
}
