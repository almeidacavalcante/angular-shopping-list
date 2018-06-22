import { TestBed, inject } from '@angular/core/testing';

import { MarketDaoService } from './market-dao.service';

describe('MarketDaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarketDaoService]
    });
  });

  it('should be created', inject([MarketDaoService], (service: MarketDaoService) => {
    expect(service).toBeTruthy();
  }));
});
