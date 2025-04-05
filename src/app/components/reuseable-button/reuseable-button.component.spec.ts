import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReuseableButtonComponent } from './reuseable-button.component';

describe('ReuseableButtonComponent', () => {
  let component: ReuseableButtonComponent;
  let fixture: ComponentFixture<ReuseableButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReuseableButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReuseableButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
