import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeaElementComponent } from './sea-element.component';

describe('SeaElementComponent', () => {
  let component: SeaElementComponent;
  let fixture: ComponentFixture<SeaElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeaElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeaElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
