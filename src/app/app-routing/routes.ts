import { Routes } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { DishdetailComponent } from '../menu/dishdetail/dishdetail.component';

import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { HomeComponent } from '../home/home.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'menu', component: MenuComponent},
    {path: 'dishdetail/:id', component: DishdetailComponent},
    {path: 'contactus', component: ContactComponent},
    {path: 'about', component: AboutComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'}
];


