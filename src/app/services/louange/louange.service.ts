import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LouangeService {
  louangeSig = signal<boolean>(false);

  setLouangeSig(value: boolean): void {
    this.louangeSig.set(value);
  }
}
