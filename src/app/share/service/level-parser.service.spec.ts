import { inject, TestBed } from '@angular/core/testing';

import { LevelParserService } from './level-parser.service';

describe('LevelParserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LevelParserService]
    });
  });

  it('should be created', inject([LevelParserService], (service: LevelParserService) => {
    expect(service).toBeTruthy();
  }));
});
