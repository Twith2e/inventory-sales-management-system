import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IsPopulatedService {
  isPopulated = false;
  constructor() {}
}
