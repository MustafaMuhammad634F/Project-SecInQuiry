import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IscoreTableComponent } from './table.component';

describe('TableComponent', () => {
  let component: IscoreTableComponent;
  let fixture: ComponentFixture<IscoreTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IscoreTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IscoreTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
