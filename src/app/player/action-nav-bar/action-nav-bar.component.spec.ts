import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionNavBarComponent } from './action-nav-bar.component';

describe('ActionNavBarComponent', () => {
  let component: ActionNavBarComponent;
  let fixture: ComponentFixture<ActionNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
