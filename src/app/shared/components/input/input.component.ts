import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule,  } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ,MatFormFieldModule, MatInputModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {

  @Input() inputControl:any = new FormControl();
  @Input() msgError = '';
  @Input() label = '';
  @Input() type = 'text';
  @Input() evento= 'keyup';
  @Input() readonly?:boolean ;
  @Output() keyup = new EventEmitter<any>();
  @Output() blur = new EventEmitter<any>();

  onKeyUp(event:any){
    this.keyup.emit(event);
  }

  onBlur(event: Event){
    this.blur.emit(event);
  }
  
}
