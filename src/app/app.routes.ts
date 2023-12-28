import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/pages/home/home.component';
import { LoginComponent } from './modules/auth/pages/login/login.component';
import { WompiComponent } from './modules/home/pages/wompi/wompi.component';
import { CopropiedadComponent } from './modules/home/pages/copropiedad/copropiedad.component';
import { RegisterComponent } from './modules/auth/pages/register/register.component';

export const routes: Routes = [
    
    {
        path:'',
        component:HomeComponent,
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
        title:'wompi',
    },

];
