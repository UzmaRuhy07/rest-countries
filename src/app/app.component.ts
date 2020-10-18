import { Component, OnDestroy, OnInit } from '@angular/core';
import { faMoon as farMoon } from '@fortawesome/free-regular-svg-icons';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { ThemeService } from './_services/theme.service';
import { appConstants } from './_helpers/app-constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'rest-countries';
  //**Icons**
  faMoon = faMoon;
  farMoon = farMoon;

  appliedTheme = '';
  themeSubscription: Subscription;
  themeLight = appConstants.theme_light;

  constructor(public themeService: ThemeService) { }

  ngOnInit() {
    // Subscription to Theme Subject, which emits new theme value whenever user swtiches between themes
    this.themeSubscription = this.themeService.currentTheme$.subscribe((theme: string) => {
      this.appliedTheme = theme;
    });
  }

    /**
     * Toggles between Light and Dark Theme
     */
  switchTheme(): void{
    this.appliedTheme === `${appConstants.theme_light}` ? this.themeService.applyTheme(`${appConstants.theme_dark}`) : this.themeService.applyTheme(`${appConstants.theme_light}`);
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
