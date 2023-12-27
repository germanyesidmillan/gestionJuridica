import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopropiedadComponent } from './copropiedad.component';

describe('CopropiedadComponent', () => {
  let component: CopropiedadComponent;
  let fixture: ComponentFixture<CopropiedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CopropiedadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CopropiedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
