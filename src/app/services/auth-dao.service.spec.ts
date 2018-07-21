import { TestBed, inject } from '@angular/core/testing';

import { AuthDaoService } from './auth-dao.service';

describe('AuthDaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthDaoService]
    });
  });

  it('should be created', inject([AuthDaoService], (service: AuthDaoService) => {
    expect(service).toBeTruthy();
  }));
});
