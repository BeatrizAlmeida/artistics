import { TestBed } from '@angular/core/testing';

import { FollowfunctionsService } from './followfunctions.service';

describe('FollowfunctionsService', () => {
  let service: FollowfunctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FollowfunctionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
