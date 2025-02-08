import { TestBed } from '@angular/core/testing';

import { HttpConnectionHandlerService } from './http-connection-handler.service';

describe('HttpConnectionHandlerService', () => {
  let service: HttpConnectionHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpConnectionHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
