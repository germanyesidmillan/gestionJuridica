import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/pages/home/home.component';
import { LoginComponent } from './modules/auth/pages/login/login.component';
import { WompiComponent } from './modules/home/pages/wompi/wompi.component';
import { CopropiedadComponent } from './modules/home/pages/copropiedad/copropiedad.component';
import { DemandadoComponent } from './modules/home/pages/demandado/demandado.component';
import { CarteraComponent } from './modules/home/pages/cartera/cartera.component';
import { RadicadoComponent } from './modules/home/pages/radicado/radicados.component';
import { AutoComponent } from './modules/home/pages/auto/auto.component';
import { CronologiaComponent } from './modules/home/pages/cronologia/cronologia.component';

import { HonorariosComponent } from './modules/home/pages/honorarios/honorarios.component';
import { ReembolsosComponent } from './modules/home/pages/reembolsos/reembolsos.component';
import { RecaudosComponent } from './modules/home/pages/recaudos/recaudos.component';


export const routes: Routes = [
    
    {
        path:'',
        component:CarteraComponent,
        title:'Home page'
    },
    {
        path:'login',
        component:LoginComponent,
        title:'Registro'
    },
    {
        path:'wompi',
        component:WompiComponent,
        title:'wompi',
    },
    {
        path:'copropiedad',
        component:CopropiedadComponent,
        title:'copropiedades',
    },
    {
        path:'demandado',
        component:DemandadoComponent,
        title:'demandados',
    },
    {
        path:'radicado',
        component:RadicadoComponent,
        title:'radicados',
    },
    {
        path:'auto',
        component:AutoComponent,
        title:'autos',
    },
    {
        path:'cronologia',
        component:CronologiaComponent,
        title:'cronologia',
    },
    {
        path:'cartera',
        component:CarteraComponent,
        title:'cartera',
    },
    {
        path:'recaudo',
        component:RecaudosComponent,
        title:'recaudo',
    },
    {
        path:'honorarios',
        component:HonorariosComponent,
        title:'honorarios',
    },
    {
        path:'reembolsos',
        component:ReembolsosComponent,
        title:'reembolsos',
    },
];
