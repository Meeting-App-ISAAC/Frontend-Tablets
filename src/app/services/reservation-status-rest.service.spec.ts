import { TestBed, inject } from '@angular/core/testing';

import { ReservationStatusRESTService } from './reservation-status-rest.service';

describe('ReservationStatusRESTService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReservationStatusRESTService]
    });
  });

  it('should be created', inject([ReservationStatusRESTService], (service: ReservationStatusRESTService) => {
    expect(service).toBeTruthy();
  }));
});
