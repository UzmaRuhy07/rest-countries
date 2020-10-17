import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private currentTheme = new BehaviorSubject('theme-light');

  currentTheme$: Observable<string> = this.currentTheme.asObservable();

  constructor() { }

  applyTheme(theme:string) : void {
      this.currentTheme.next(theme);
  }

}
