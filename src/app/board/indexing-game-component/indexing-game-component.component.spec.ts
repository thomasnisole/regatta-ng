/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IndexingGameComponentComponent } from './indexing-game-component.component';

describe('IndexingGameComponentComponent', () => {
  let component: IndexingGameComponentComponent;
  let fixture: ComponentFixture<IndexingGameComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexingGameComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexingGameComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
