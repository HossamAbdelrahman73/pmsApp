import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerfiyComponent } from './verfiy.component';

describe('VerfiyComponent', () => {
  let component: VerfiyComponent;
  let fixture: ComponentFixture<VerfiyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerfiyComponent]
    });
    fixture = TestBed.createComponent(VerfiyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
