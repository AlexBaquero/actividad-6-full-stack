import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { UserViewComponent } from './pages/user-view/user-view.component';

export const routes: Routes = [ 
 { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "home", component: HomeComponent },
  { path: 'user/:id', component: UserViewComponent },
  { path: 'newuser', component: UserFormComponent },
  { path: 'updateuser/:id', component: UserFormComponent },
  { path: '**', redirectTo: 'home' }
];
