import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-demandado',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ,MatFormFieldModule, MatInputModule, 
    MatButtonModule, MatSelectModule,MatDatepickerModule, MatNativeDateModule],
  templateUrl: './demandado.component.html',
  styleUrl: './demandado.component.css'
})
export class DemandadoComponent {
  formDemandado: FormGroup;
  demandantes:any=[]
 

  constructor(private fb: FormBuilder){
    this.formDemandado = this.fb.group({
      identificacion: [''],
      nombre: ['', [Validators.required]],
      email: [''],

      });
  }

  onSubmit(){

  }

}
