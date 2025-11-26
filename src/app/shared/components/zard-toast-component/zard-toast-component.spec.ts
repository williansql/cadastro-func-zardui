import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZardToastComponent } from './zard-toast-component';

describe('ZardToastComponent', () => {
  let component: ZardToastComponent;
  let fixture: ComponentFixture<ZardToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZardToastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZardToastComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
