/*
*Angular
*/


import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';


/*
* Components
*/

import { AppRouting } from "./app.routing";
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { BackToTopComponent } from './components/back-to-top/back-to-top.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { TodoComponent } from './components/todo/todo.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HttpModule } from '@angular/http';
import { UsersListComponent } from './components/users-list/users-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { RedBgDirective } from './directive/red-bg.directive';
import { TestComponent } from './components/test/test.component';
import { StrucDirectiveDirective } from './directive/struc-directive.directive';

/*
* 注解/标注/装饰/修饰器/宏定义
*/
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavigationComponent,
    BackToTopComponent,
    ContactComponent,
    AboutComponent,
    HomeComponent,
    BlogComponent,
    SignInComponent,
    SignUpComponent,
    TodoComponent,
    NotFoundComponent,
    UsersListComponent,
    ProfileComponent,
    UploadFileComponent,
    RedBgDirective,
    TestComponent,
    StrucDirectiveDirective
  ],
  imports: [
    BrowserModule,
    AppRouting,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
