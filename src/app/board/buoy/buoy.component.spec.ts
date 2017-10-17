import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuoyComponent } from './buoy.component';

describe('BuoyComponent', () => {
  let component: BuoyComponent;
  let fixture: ComponentFixture<BuoyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuoyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuoyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
