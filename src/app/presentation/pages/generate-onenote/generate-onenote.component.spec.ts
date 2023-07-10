import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateOnenoteComponent } from './generate-onenote.component';

describe('GenerateOnenoteComponent', () => {
  let component: GenerateOnenoteComponent;
  let fixture: ComponentFixture<GenerateOnenoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateOnenoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateOnenoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
