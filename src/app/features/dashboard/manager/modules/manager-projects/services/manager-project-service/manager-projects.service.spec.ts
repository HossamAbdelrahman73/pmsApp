import { TestBed } from '@angular/core/testing';

import { ManagerProjectsService } from './manager-projects.service';

describe('ManagerProjectsService', () => {
  let service: ManagerProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerProjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
