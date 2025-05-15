import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BleChatComponent } from './ble-chat.component';

describe('BleChatComponent', () => {
  let component: BleChatComponent;
  let fixture: ComponentFixture<BleChatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BleChatComponent]
    });
    fixture = TestBed.createComponent(BleChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
