import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResuableCardComponent } from './resuable-card.component';

describe('ResuableCardComponent', () => {
  let component: ResuableCardComponent;
  let fixture: ComponentFixture<ResuableCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResuableCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResuableCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
