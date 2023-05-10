import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashNotesComponent } from './dash-notes.component';

describe('DashNotesComponent', () => {
  let component: DashNotesComponent;
  let fixture: ComponentFixture<DashNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DashNotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
