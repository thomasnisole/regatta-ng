/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuitGameComponent } from './quit-game.component';

describe('QuitGameComponent', () => {
  let component: QuitGameComponent;
  let fixture: ComponentFixture<QuitGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuitGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuitGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
