import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceBoatRemoteComponent } from './place-boat-remote.component';

describe('PlaceBoatRemoteComponent', () => {
  let component: PlaceBoatRemoteComponent;
  let fixture: ComponentFixture<PlaceBoatRemoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceBoatRemoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceBoatRemoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
