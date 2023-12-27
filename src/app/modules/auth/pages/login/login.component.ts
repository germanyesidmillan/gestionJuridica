import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule,MatInputModule,
    MatFormFieldModule,
    FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
  
})
export class LoginComponent {

}
