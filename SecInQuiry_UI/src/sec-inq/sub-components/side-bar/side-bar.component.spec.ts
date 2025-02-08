import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecInQ_SideBarComponent } from './side-bar.component';

describe('SideBarComponent', () => {
  let component: SecInQ_SideBarComponent;
  let fixture: ComponentFixture<SecInQ_SideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecInQ_SideBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecInQ_SideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
