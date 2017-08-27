import { TestBed, inject } from '@angular/core/testing';

import { Apiv1Service } from './apiv1.service';

describe('Apiv1Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Apiv1Service]
    });
  });

  it('should be created', inject([Apiv1Service], (service: Apiv1Service) => {
    expect(service).toBeTruthy();
  }));
});
