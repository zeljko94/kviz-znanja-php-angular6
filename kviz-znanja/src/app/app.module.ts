import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routes';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { KvizComponent } from './components/kviz/kviz.component';
import { PitanjaComponent } from './components/pitanja/pitanja.component';
import { RezultatiComponent } from './components/rezultati/rezultati.component';
import { LoginComponent } from './components/login/login.component';
import { AddKvizComponent } from './components/add-kviz/add-kviz.component';
import { AddPitanjeComponent } from './components/add-pitanje/add-pitanje.component';
import { EditKvizComponent } from './components/edit-kviz/edit-kviz.component';
import { IgraComponent } from './components/igra/igra.component';
import { PrikazRezultataComponent } from './components/prikaz-rezultata/prikaz-rezultata.component';
import { UsersComponent } from './components/users/users.component';
import { AddUserComponent } from './components/add-user/add-user.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    KvizComponent,
    PitanjaComponent,
    RezultatiComponent,
    LoginComponent,
    AddKvizComponent,
    AddPitanjeComponent,
    EditKvizComponent,
    IgraComponent,
    PrikazRezultataComponent,
    UsersComponent,
    AddUserComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
