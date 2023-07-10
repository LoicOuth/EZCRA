import { TestBed } from '@angular/core/testing';

import { OneNoteService } from './one-note.service';

describe('OneNoteService', () => {
  let service: OneNoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OneNoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
