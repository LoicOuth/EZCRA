import { TestBed } from '@angular/core/testing';

import { PreventDirectNavigationGuardGuard } from './prevent-direct-navigation-guard.guard';

describe('PreventDirectNavigationGuardGuard', () => {
  let guard: PreventDirectNavigationGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PreventDirectNavigationGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
