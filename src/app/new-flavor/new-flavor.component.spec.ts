import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFlavorComponent } from './new-flavor.component';

describe('NewFlavorComponent', () => {
  let component: NewFlavorComponent;
  let fixture: ComponentFixture<NewFlavorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewFlavorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewFlavorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
