import { TestBed } from '@angular/core/testing';

import { IsPopulatedService } from './is-populated.service';

describe('IsPopulatedService', () => {
  let service: IsPopulatedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsPopulatedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
