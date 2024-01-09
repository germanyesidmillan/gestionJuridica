import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
//import { LoginComponent } from './modules/auth/pages/login/login.component';
import { HomeComponent } from './modules/home/pages/menu/home.component';
import { CopropiedadComponent } from './modules/home/pages/copropiedad/copropiedad.component';


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
