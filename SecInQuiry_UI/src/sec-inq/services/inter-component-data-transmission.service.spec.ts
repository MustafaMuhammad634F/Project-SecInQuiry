import { TestBed } from '@angular/core/testing';

import { InterComponentDataTransmissionService } from './inter-component-data-transmission.service';

describe('InterComponentDataTransmissionService', () => {
  let service: InterComponentDataTransmissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterComponentDataTransmissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
