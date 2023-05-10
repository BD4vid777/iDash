import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashBudgetComponent } from './dash-budget.component';

describe('DashBudgetComponent', () => {
  let component: DashBudgetComponent;
  let fixture: ComponentFixture<DashBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DashBudgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
