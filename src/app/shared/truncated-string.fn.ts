import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TruncatedStringFn {
  getTruncatedTitle(title: string): string {
    // Check if it's a mobile screen (typically 768px or less)
    const isMobile = window.innerWidth <= 768;

    if (isMobile && title.length > 30) {
      return title.substring(0, 30) + '...';
    }
    return title;
  }
}
