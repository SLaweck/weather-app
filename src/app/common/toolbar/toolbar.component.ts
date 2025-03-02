import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { defaultWeatherUnits, MainView, WeatherUnits } from '../../config';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  imports: [RouterLink, RouterLinkActive, MatToolbarModule, MatIconModule, MatMenuModule, MatButtonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  weatherUnits = defaultWeatherUnits;

  onRefreshClicked() {
    console.log('Toolbar: refresh clicked!');
  }

  onViewMenuClicked(view: MainView) {
    console.log('Toolbar: switch main view to:', view);
  }

  onUnitsMenuClicked(units: WeatherUnits) {
    console.log('Toolbar: switch weather and forecast units to:', units);
  }
}
