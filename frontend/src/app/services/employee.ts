import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_ALL_EMPLOYEES } from '../graphql.operations';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private apollo: Apollo) {}

  getEmployees() {
    return this.apollo.watchQuery({
      query: GET_ALL_EMPLOYEES,
    }).valueChanges;
  }
}