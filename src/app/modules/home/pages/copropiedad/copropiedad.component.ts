import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-copropiedad',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ,MatFormFieldModule, MatInputModule, MatButtonModule,
             MatSelectModule,MatDatepickerModule, MatNativeDateModule],
  templateUrl: './copropiedad.component.html',
  styleUrl: './copropiedad.component.css'
})
export class CopropiedadComponent {


  formCopropiedad: FormGroup;


  municipios:any = [
    {
      id_municipio: 1,
      nombre_municipio: "Cali"
    },
    {
      id_municipio: 2,
      nombre_municipio: "Palmira"
    },
    {
      id_municipio: 3,
      nombre_municipio: "Jamundi"
    }
  ];

  bancos:any = [
    {id_banco: 1,
      nombre_banco:"AV Villas"
    },
    {id_banco: 2,
      nombre_banco:"Davivienda"
    },
  ];
  tipoCuentas:any = [
    {id_tipo_cuenta: 1,
      nombre_tipo_cuenta:"Ahorros"
    },
    {id_tipo_cuenta: 1,
      nombre_tipo_cuenta:"Corriente"
    },
   
  ];
  administradores:any = [
    {id_admin_copropiedad: 1,
      nombre_admin_copropiedad:"Carlos"
    },
    {id_admin_copropiedad: 2,
      nombre_admin_copropiedad:"Juan"
    },
   
  ];

  constructor(private fb: FormBuilder){
    this.formCopropiedad = this.fb.group({
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

    let banco = this.formCopropiedad.get('banco')?.value;
    console.log('formulario',this.formCopropiedad, banco);

  }

}
