import { Routes } from '@angular/router';
import { EmployeeList } from './components/employee-list/employee-list';
import { Signup } from './components/signup/signup';
import { Login } from './components/login/login';
import { AddEmployee } from './components/add-employee/add-employee';
import { authGuard } from './auth/auth-guard';
import { UpdateEmployee} from './components/update-employee/update-employee'
import { ViewEmployee} from './components/view-employee/view-employee'


export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { 
    path: 'employees', 
    component: EmployeeList,
    canActivate: [authGuard]
   },
  { path: 'add-employee', component: AddEmployee, canActivate: [authGuard] },
  { path: 'update-employee/:id', component: UpdateEmployee, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'view-employee/:id', component: ViewEmployee }
];