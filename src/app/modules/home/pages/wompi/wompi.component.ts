import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-wompi',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wompi.component.html',
  styleUrl: './wompi.component.css'
})
export class WompiComponent implements AfterViewInit  {
  
  @ViewChild('frmWompi') frmWompi!:ElementRef ;
  
  MONTO_EN_CENTAVOS = 1000000;
  MONEDA= "CO";
  REFERENCIA_DE_PAGO= "12345";
  FIRMA_DE_INTEGRIDAD= "454544SDFSDFSD45444S";

  constructor(private ngZone: NgZone){}
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
    const formularioid = window.document.getElementById("frmWompi");
    const formulario = this.frmWompi.nativeElement;

    console.log('html', formularioid);
    console.log('html', formulario);

    if(formulario){
      formulario.addEventListener("submit", this.onSubmit.bind(this))
      //formulario.onsubmit(event)
    }

  }
  
  ngOnInit(): void {
    console.log('ngOnInit');

    /*document.addEventListener('DOMContentLoaded',(event)=>{
      
      const formulario = window.document.getElementById("frmWompi");
      if(formulario){
        formulario.addEventListener("submit", (event)=>{
          console.log('event', event);
          this.onSubmit(event)
        })
        //formulario.onsubmit(event)
        
        console.log('html', formulario);
      }

    })*/

    //console.log('frm', window.document.getElementById("frmWompi") as HTMLElement);
  }

  onSubmit(event: Event){
    console.log("onSubmit==>")
    this.ngZone.run(()=>{
      
          console.log('event',event);
          event.preventDefault();

    });
  }
  
}
