import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LosserComponent } from './losser.component';

describe('LosserComponent', () => {
  let component: LosserComponent;
  let fixture: ComponentFixture<LosserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LosserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LosserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
