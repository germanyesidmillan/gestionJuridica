import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/pages/menu/home.component';
import { LoginComponent } from './modules/auth/pages/login/login.component';
import { WompiComponent } from './modules/home/pages/wompi/wompi.component';
import { CopropiedadComponent } from './modules/home/pages/copropiedad/copropiedad.component';
import { DemandadoComponent } from './modules/home/pages/demandado/demandado.component';
import { CarteraComponent } from './modules/home/pages/cartera/cartera.component';
import { RecaudoComponent } from './modules/home/pages/recaudo/recaudo.component';
import { RegisterComponent } from './modules/auth/pages/register/register.component';

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
        path:'registro',
        component:RegisterComponent,
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
        title:'copropiedad',
    },
    {
        path:'demandado',
        component:DemandadoComponent,
        title:'demandado',
    },
    {
        path:'cartera',
        component:CarteraComponent,
        title:'cartera',
    },
    {
        path:'recaudo',
        component:RecaudoComponent,
        title:'Recaudo',
    },
    
];
