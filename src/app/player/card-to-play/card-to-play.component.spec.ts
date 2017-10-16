import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardToPlayComponent } from './card-to-play.component';

describe('CardToPlayComponent', () => {
  let component: CardToPlayComponent;
  let fixture: ComponentFixture<CardToPlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardToPlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardToPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
