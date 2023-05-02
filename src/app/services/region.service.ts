import { Injectable } from '@angular/core';
import { Region } from '../models/types/user';

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  recruitmentRegion = [Region.AFRICA, Region.EU];
  constructor() {}

  GetRegions() {
    return this.recruitmentRegion;
  }
}
