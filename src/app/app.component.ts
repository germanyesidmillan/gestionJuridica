import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from './modules/home/pages/menu/home.component';
import { CopropiedadComponent } from './modules/home/pages/copropiedad/copropiedad.component';
import { GestionJuridicaService } from './modules/home/services/gestion-juridica.service';
import { StoreService } from './shared/services/store.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UtilsService } from '@shared/services/utils.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HomeComponent, CopropiedadComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'demoAngular17';
  constructor(private gjService: GestionJuridicaService , private storeService: StoreService, 
              private utilsService:UtilsService){}
 
  ngOnInit(): void {
    this.getCopropiedad();
    this.getInmueble();
    this.getDemandados();
    this.getEtapasDemandado();
  }

  getCopropiedad() {

    if(this.storeService.copropiedadesSignal().length > 0){
      return;
    }

    this.gjService.getDemandantes().subscribe((resp:any)=>{
      this.storeService.copropiedadesSignal.set(resp);
      
    }, (error:HttpErrorResponse)=>{
      console.log(error);
      this.utilsService.showAlerta(error.message, 'Error!','error');

    });
  }
  
  getInmueble() {
    if(this.storeService.inmueblesSignal().length > 0){
      return;
    }

    this.gjService.getInmuebles().subscribe((resp:any)=>{
      this.storeService.inmueblesSignal.set(resp);
     }, (error:HttpErrorResponse)=>{
      console.log(error);
      this.utilsService.showAlerta(error.message, 'Error!','error');
     });
  }

  getDemandados() {
    if(this.storeService.demandadosSignal().length > 0){
      return;
    }

    this.gjService.getDemandados().subscribe((resp:any)=>{
      this.storeService.demandadosSignal.set(resp);
     }, (error:HttpErrorResponse)=>{
      console.log(error);
      this.utilsService.showAlerta(error.message, 'Error!','error');
     });
  }

  getEtapasDemandado() {
    if(this.storeService.etapasDemandadosSignal().length > 0){
      return;
    }
    
    this.gjService.getEtapasDemandado().subscribe((resp:any)=>{
      this.storeService.etapasDemandadosSignal.set(resp);
     }, (error:HttpErrorResponse)=>{
      console.log(error);
      this.utilsService.showAlerta(error.message, 'Error!','error');
     });
  }

}
