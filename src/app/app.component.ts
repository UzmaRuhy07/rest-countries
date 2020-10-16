import { Component } from '@angular/core';
import { faMoon as farMoon } from '@fortawesome/free-regular-svg-icons';
import { faMoon } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rest-countries';
  //**Icons**
  faMoon = faMoon;
  farMoon = farMoon;
}
