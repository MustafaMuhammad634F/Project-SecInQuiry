import { TestBed } from '@angular/core/testing';

import { SubmitCallbackService } from './submit-callback.service';

describe('SubmitCallbackService', () => {
  let service: SubmitCallbackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubmitCallbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
