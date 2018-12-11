import { TestBed, inject } from '@angular/core/testing';

import { CurrentRoomSettingsService } from './current-room-settings.service';

describe('CurrentRoomSettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrentRoomSettingsService]
    });
  });

  it('should be created', inject([CurrentRoomSettingsService], (service: CurrentRoomSettingsService) => {
    expect(service).toBeTruthy();
  }));
});
