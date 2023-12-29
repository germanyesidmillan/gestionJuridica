import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

@Component({
  selector: 'app-recaudo',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule ,MatFormFieldModule, MatInputModule, MatButtonModule,
    MatSelectModule,MatDatepickerModule, MatNativeDateModule],
  templateUrl: './recaudo.component.html',
  styleUrl: './recaudo.component.css'
})
export class RecaudoComponent {
  formRecaudo: FormGroup;

  demandantes:any = [];
  inmuebles:any = [];
  demandados:any = [];
 
  

  constructor(private fb: FormBuilder){
    this.formRecaudo = this.fb.group({
      demate: ['', [Validators.required]],
      inmueble: ['', [Validators.required]],
      demado: ['', [Validators.required]],
      recaudo: ['', [Validators.required]],
      fechaRecaudo: ['', [Validators.required]],
    });
  }
  onSubmit(){
  }
}
