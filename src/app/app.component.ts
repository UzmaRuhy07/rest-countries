import { Component, OnDestroy, OnInit } from '@angular/core';
import { faMoon as farMoon } from '@fortawesome/free-regular-svg-icons';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { ThemeService } from './_services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'rest-countries';
  //**Icons**
  faMoon = faMoon;
  farMoon = farMoon;

  appliedTheme = '';
  themeSubscription: Subscription;

  constructor(public themeService: ThemeService){}

  ngOnInit() {
   this.themeSubscription = this.themeService.currentTheme$.subscribe((theme:string) => {
        this.appliedTheme = theme;
        console.log(theme);
    });
  }

  switchTheme() {
    console.log( this.appliedTheme);
      this.appliedTheme === 'theme-light' ? this.themeService.applyTheme('theme-dark') : this.themeService.applyTheme('theme-light');
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
