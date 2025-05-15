import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MtComponent } from './mt.component';

describe('MtComponent', () => {
  let component: MtComponent;
  let fixture: ComponentFixture<MtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MtComponent]
    });
    fixture = TestBed.createComponent(MtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
