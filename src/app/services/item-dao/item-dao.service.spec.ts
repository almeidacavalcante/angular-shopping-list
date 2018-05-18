import { TestBed, inject } from '@angular/core/testing';

import { ItemDaoService } from './item-dao.service';

describe('ItemDaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemDaoService]
    });
  });

  it('should be created', inject([ItemDaoService], (service: ItemDaoService) => {
    expect(service).toBeTruthy();
  }));
});
