import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
//import { LoginComponent } from './modules/auth/pages/login/login.component';
import { HomeComponent } from './modules/home/pages/home/home.component';
import { CopropiedadComponent } from './modules/home/pages/copropiedad/copropiedad.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HomeComponent, CopropiedadComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demoAngular17';
  constructor(){

  }
}
