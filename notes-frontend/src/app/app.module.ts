import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NotesListComponent } from './pages/notes-list/notes-list.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { NoteCardComponent } from './note-card/note-card.component';
import { NoteDetailsComponent } from './note-details/note-details.component';
import { HomeComponent } from './pages/home/home.component';

import { FormsModule } from '@angular/forms';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';

const routes: Routes = [
  { path:"login", component: LoginComponent },
  { path:"register", component: RegisterComponent },
  { path:"", redirectTo: '/login', pathMatch: 'full'},
  { path: "home",component: HomeComponent,
  children:[
  { path: "main",component: MainLayoutComponent},
  { path: "notes-list",component: NotesListComponent},
  //{ path: "new",component: NoteDetailsComponent},
  //{ path: "selected-note",component: NoteCardComponent},
  ]},
 { path: "new",component: NoteDetailsComponent,},
  //{path: ":id",component: NoteDetailsComponent},
  { path: "selected-note",component: NoteCardComponent},
  
];

/* for login functionality:

{ path:"login", component: LoginComponent },
{ path:"register", component: RegisterComponent },
{ path:"", redirectTo: '/login', pathMatch: 'full'},
*/








    
@NgModule({
  declarations: [
    AppComponent,
    NotesListComponent,
    MainLayoutComponent,
    NoteCardComponent,
    NoteDetailsComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
  ],
  imports:[
  BrowserModule,
  ReactiveFormsModule,
  HttpClientModule,
  RouterModule.forRoot(routes),
  FormsModule
],
  exports:[RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
