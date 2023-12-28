import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { CopropiedadComponent } from '../copropiedad/copropiedad.component';
import { RegisterComponent } from '../../../auth/pages/register/register.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatButtonModule, MatToolbarModule, 
            CopropiedadComponent, RouterLink, RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router: Router){
    console.log('router',router);
  }


}
