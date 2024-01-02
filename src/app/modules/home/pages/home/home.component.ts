import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { RegisterComponent } from '../../../auth/pages/register/register.component';
import { CopropiedadComponent } from '../copropiedad/copropiedad.component';
import { RecaudoComponent } from '../recaudo/recaudo.component';
import { CarteraComponent } from '../cartera/cartera.component';
import { DemandadoComponent } from '../demandado/demandado.component';
import { ReembolsosComponent } from '../reembolsos/reembolsos.component';
import { CronologiaComponent } from '../cronologia/cronologia.component';
import { HonorariosComponent } from '../honorarios/honorarios.component';
import { AutoComponent } from '../auto/auto.component';
import { RadicadoComponent } from '../radicado/radicados.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatButtonModule, MatToolbarModule, 
             RouterLink, RegisterComponent, CopropiedadComponent, DemandadoComponent, RadicadoComponent,
             AutoComponent,CarteraComponent, RecaudoComponent, HonorariosComponent, 
              ReembolsosComponent, CronologiaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router: Router){
    console.log('router',router);
  }


}
