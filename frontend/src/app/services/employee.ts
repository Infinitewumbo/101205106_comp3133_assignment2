import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_ALL_EMPLOYEES, DELETE_EMPLOYEE } from '../graphql.operations';


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

  deleteEmployee(id: string) {
    return this.apollo.mutate({
      mutation: DELETE_EMPLOYEE,
      variables: {
        eid: id 
      }
    });
  }
}