import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecInQTableComponent } from './table.component';

describe('TableComponent', () => {
  let component: SecInQTableComponent;
  let fixture: ComponentFixture<SecInQTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecInQTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecInQTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
