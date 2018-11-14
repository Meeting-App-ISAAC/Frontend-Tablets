import { TestBed, inject } from '@angular/core/testing';

import { WebsocketConnectorService } from './websocket-connector.service';

describe('WebsocketConnectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebsocketConnectorService]
    });
  });

  it('should be created', inject([WebsocketConnectorService], (service: WebsocketConnectorService) => {
    expect(service).toBeTruthy();
  }));
});
