import { TestBed } from '@angular/core/testing';

import { StreamlinkService } from './streamlink.service';

describe('StreamlinkService', () => {
  let service: StreamlinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StreamlinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
