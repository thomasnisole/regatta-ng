/* tslint:disable:no-unused-variable */

import { async, inject, TestBed } from '@angular/core/testing';
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
