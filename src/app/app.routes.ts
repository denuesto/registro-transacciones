import { Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";0
import {DashboardComponent} from "./components/dashboard/dashboard.component";

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: '**', redirectTo: 'login'}

];
