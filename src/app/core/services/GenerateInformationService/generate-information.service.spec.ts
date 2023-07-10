import { TestBed } from '@angular/core/testing';

import { GenerateInformationService } from './generate-information.service';

describe('GenerateInformationService', () => {
  let service: GenerateInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
