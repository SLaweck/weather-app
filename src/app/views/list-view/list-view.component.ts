import { Component } from '@angular/core';
import { CityListComponent } from "./city-list/city-list.component";
import { ForecastTableComponent } from "../../common/forecast-table/forecast-table.component";

@Component({
  selector: 'app-list-view',
  imports: [CityListComponent, ForecastTableComponent],
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.scss'
})
export class ListViewComponent {

}
