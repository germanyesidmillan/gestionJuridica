import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/pages/home/home.component';
import { LoginComponent } from './modules/auth/pages/login/login.component';
import { WompiComponent } from './modules/home/pages/wompi/wompi.component';
import { CopropiedadComponent } from './modules/home/pages/copropiedad/copropiedad.component';
import { DemandadoComponent } from './modules/home/pages/demandado/demandado.component';
import { CarteraComponent } from './modules/home/pages/cartera/cartera.component';

export const routes: Routes = [
    
    {
        path:'',
        component:CarteraComponent,
        title:'Home page'
    },
    {
        path:'login',
        component:LoginComponent,
        title:'Login'
    },
    {
        path:'wompi',
        component:WompiComponent,
        title:'wompi',
    },
    {
        path:'copropiedad',
        component:CopropiedadComponent,
        title:'wompi',
    },
    {
        path:'demandado',
        component:DemandadoComponent,
        title:'wompi',
    },
];
