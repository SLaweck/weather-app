import { Routes } from '@angular/router';
import { ListViewComponent } from './views/list-view/list-view.component';
import { TabsViewComponent } from './views/tabs-view/tabs-view.component';
import { AccordionViewComponent } from './views/accordion-view/accordion-view.component';

export const routes: Routes = [
  {
    path: 'list',
    component: ListViewComponent,
  },
  {
    path: 'tabs',
    component: TabsViewComponent,
  },
  {
    path: 'accordion',
    component: AccordionViewComponent,
  },
  {
    path: '', 
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
