import { TestBed } from '@angular/core/testing';

import { InterComponentHandlerService } from './inter-component-handler.service';

describe('InterComponentHandlerService', () => {
  let service: InterComponentHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterComponentHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
