import { TestBed, inject } from '@angular/core/testing';

import { LocalDeviceDataService } from './local-device-data.service';

describe('LocalDeviceDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalDeviceDataService]
    });
  });

  it('should be created', inject([LocalDeviceDataService], (service: LocalDeviceDataService) => {
    expect(service).toBeTruthy();
  }));
});
