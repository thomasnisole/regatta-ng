import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveMapRemoteComponent } from './move-map-remote.component';

describe('MoveMapRemoteComponent', () => {
  let component: MoveMapRemoteComponent;
  let fixture: ComponentFixture<MoveMapRemoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveMapRemoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveMapRemoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
