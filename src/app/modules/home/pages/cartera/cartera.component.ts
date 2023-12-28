import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

@Component({
  selector: 'app-cartera',
  standalone: true,
  imports: [CommonModule,  ReactiveFormsModule ,MatFormFieldModule, MatInputModule, MatButtonModule,
    MatSelectModule,MatDatepickerModule, MatNativeDateModule],
  templateUrl: './cartera.component.html',
  styleUrl: './cartera.component.css'
})
export class CarteraComponent {

  formCartera: FormGroup;

  municipios:any = [];
  bancos:any = [];
  tipoCuentas:any = [];
  administradores:any = [];
  demandados:any = [];

  constructor(private fb: FormBuilder){
    this.formCartera = this.fb.group({
      nit: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      dir: ['', [Validators.required]],
      municipio: ['', [Validators.required]],
      banco: ['', [Validators.required]],
      tipoCuenta: ['', [Validators.required]],
      numCuenta: ['', [Validators.required]],
      admin: ['', [Validators.required]],
      fechaPersoneria: ['', [Validators.required]],
    });
  }

  onSubmit(){

    let banco = this.formCartera.get('banco')?.value;
    console.log('formulario',this.formCartera, banco);

  }


}
