import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlavorManagementComponent } from './flavor-management.component';

describe('FlavorManagementComponent', () => {
  let component: FlavorManagementComponent;
  let fixture: ComponentFixture<FlavorManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlavorManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlavorManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
