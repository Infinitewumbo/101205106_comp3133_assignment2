import { Routes } from '@angular/router';
import { EmployeeList } from './components/employee-list/employee-list';

export const routes: Routes = [
  { path: 'employees', component: EmployeeList },
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
];