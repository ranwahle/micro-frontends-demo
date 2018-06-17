import { TestBed, inject } from '@angular/core/testing';

import { ShellClientService } from './shell-client.service';

describe('ShellClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShellClientService]
    });
  });

  it('should be created', inject([ShellClientService], (service: ShellClientService) => {
    expect(service).toBeTruthy();
  }));
});
