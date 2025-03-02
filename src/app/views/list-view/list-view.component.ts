import { Component } from '@angular/core';
import { CityListComponent } from "./city-list/city-list.component";

@Component({
  selector: 'app-list-view',
  imports: [CityListComponent],
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.scss'
})
export class ListViewComponent {

}
