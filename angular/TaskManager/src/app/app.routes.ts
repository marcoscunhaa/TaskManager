import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
    {path:'login', component: LoginComponent},
    {path:'register', component: RegisterComponent},
    {path:'home', component: HomeComponent, canActivate: [AuthGuard]},
    {path:'', redirectTo:'/login', pathMatch:'full'}
];
