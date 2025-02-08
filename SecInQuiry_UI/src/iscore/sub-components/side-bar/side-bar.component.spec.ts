import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Iscore_SideBarComponent } from './side-bar.component';

describe('SideBarComponent', () => {
  let component: Iscore_SideBarComponent;
  let fixture: ComponentFixture<Iscore_SideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Iscore_SideBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Iscore_SideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
