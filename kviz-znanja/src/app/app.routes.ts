import {Routes, RouterModule} from '@angular/router';
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




const APP_ROUTES: Routes = [
    //{path: '', component: DashboardComponent},
    {path: '', component: LoginComponent},
    {path: 'pitanje', component: PitanjaComponent},
    {path: 'add-pitanje', component: AddPitanjeComponent},


    {path: 'rezultati', component: RezultatiComponent},
    {path: 'prikaz-rezultata', component: PrikazRezultataComponent},
    
    {path: 'users', component: UsersComponent},
    {path: 'add-user', component: AddUserComponent},
    
    {path: 'igra', component: IgraComponent},

    {path: 'kvizovi', component: KvizComponent},
    {path: 'add-kviz', component: AddKvizComponent},
    {path: 'edit-kviz', component: EditKvizComponent},

    {path: 'login', component: LoginComponent},
 

    
    {path: '**', redirectTo: '', pathMatch: 'full'}
];

export const routing = RouterModule.forRoot(APP_ROUTES);

