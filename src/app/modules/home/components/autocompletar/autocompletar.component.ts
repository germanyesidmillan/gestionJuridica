import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable, map, startWith } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { StoreService } from '@shared/services/store.service';

@Component({
  selector: 'app-autocompletar',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatAutocompleteModule, 
            ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatInputModule,MatIconModule
           ],
  templateUrl: './autocompletar.component.html',
  styleUrl: './autocompletar.component.css'
})
export class AutocompletarComponent implements OnChanges  {
 
  gservice = inject(StoreService)

  filteredOptions?: Observable<any[]>;
  @Input() seleccionado = false;
  @Input() title = '';
  @Input() msgError = '';
  @Input() options!:any[];
  @Input() optionId!:string;
  @Input() cmbDescripcion!:string;
  @Input() myInputComplete:any = new FormControl();
  @Output()  onChangeSelection = new EventEmitter();
  
  ngOnChanges(): void {
      this.filtrar();
  }
 
  filtrar(){
    this.filteredOptions = this.myInputComplete?.valueChanges.pipe(
      startWith(''),
      map((value:any) => {
       
        if(value){
          const name = typeof value === 'string' ? value : value[this.cmbDescripcion];
          return name ? this._filter(name as string) : this.options.slice();
        }else{
          return this.options;
        }
      }),
    );
  }

  displayFn = (data: any)=>{
      return data && data[this.cmbDescripcion] ? data[this.cmbDescripcion] : '';
  }
  
  _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.options.filter((option:any) => option[this.cmbDescripcion].toLowerCase().includes(filterValue));
  }

  seleccionar(){
    this.seleccionado = true;
    this.onChangeSelection.emit(this.myInputComplete)
  }

  resetCombo(){
    this.myInputComplete.setValue('');
    this.seleccionado = false;
    this.onChangeSelection.emit(this.myInputComplete)
  }

}