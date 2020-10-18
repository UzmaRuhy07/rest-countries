import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { appConstants } from '../_helpers/app-constants';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private currentTheme = new BehaviorSubject(localStorage.getItem('rc-theme') || appConstants.theme_light);

  currentTheme$: Observable<string> = this.currentTheme.asObservable();

  constructor() { }

  applyTheme(theme: string): void {
    this.currentTheme.next(theme);
    // Persisting theme selected by user, so that when user runs app gets the last applied theme
    localStorage.setItem('rc-theme', theme);
  }

}
