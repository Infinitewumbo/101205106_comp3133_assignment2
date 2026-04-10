import { Routes } from '@angular/router';
import { EmployeeList } from './components/employee-list/employee-list';
import { Signup } from './components/signup/signup';
import { Login } from './components/login/login';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'employees', component: EmployeeList },
  { path: '', redirectTo: '/login', pathMatch: 'full' } 
];