import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TitleState {

  appTitle = signal("")

  setAppTitle(title: string) {
    this.appTitle.set(title)
  }

  resetAppTitle() {
    this.appTitle.set("")
  }
}
