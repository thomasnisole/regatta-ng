/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CastSenderService } from './cast-sender.service';

describe('Service: CastSender', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CastSenderService]
    });
  });

  it('should ...', inject([CastSenderService], (service: CastSenderService) => {
    expect(service).toBeTruthy();
  }));
});