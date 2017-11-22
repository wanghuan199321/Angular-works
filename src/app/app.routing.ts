import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { AboutComponent } from "./components/about/about.component"
import { BlogComponent } from "./components/blog/blog.component"
import { ContactComponent } from "./components/contact/contact.component"
import { TodoComponent } from "./components/todo/todo.component"
import { HomeComponent } from "./components/home/home.component";
import { NotFoundComponent } from "./components/not-found/not-found.component"
import { UsersListComponent } from "./components/users-list/users-list.component";
import { ProfileComponent } from "./components/profile/profile.component";
import {TestComponent} from "./components/test/test.component";

const AppRoutes: Routes = [
  {path:'', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'todo', component: TodoComponent},
  {path: 'users', component: UsersListComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'test', component: TestComponent},
  {path: '**', component: NotFoundComponent }
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(AppRoutes);
