import { TestBed, inject } from '@angular/core/testing';

import { GameFlowService } from './game-flow.service';

describe('GameFlowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameFlowService]
    });
  });

  it('should be created', inject([GameFlowService], (service: GameFlowService) => {
    expect(service).toBeTruthy();
  }));
});
