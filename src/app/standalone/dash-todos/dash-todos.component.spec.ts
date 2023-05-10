import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashTodosComponent } from './dash-todos.component';

describe('DashTodosComponent', () => {
  let component: DashTodosComponent;
  let fixture: ComponentFixture<DashTodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DashTodosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
