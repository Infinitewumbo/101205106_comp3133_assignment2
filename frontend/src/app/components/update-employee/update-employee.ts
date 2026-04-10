import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GET_EMPLOYEE_BY_ID, UPDATE_EMPLOYEE } from '../../graphql.operations';

@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './update-employee.html'
})
export class UpdateEmployee implements OnInit {
  eid: string = '';
  employeeForm = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl('Male'),
    designation: new FormControl('', [Validators.required]),
    salary: new FormControl(0, [Validators.required]),
    department: new FormControl('', [Validators.required]),
    date_of_joining: new FormControl('', [Validators.required]),
    employee_photo: new FormControl('')
  });

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eid = this.route.snapshot.params['id'];
    if (this.eid) {
      this.loadEmployeeData();
    }
  }

  loadEmployeeData() {
    this.apollo.query({
      query: GET_EMPLOYEE_BY_ID,
      variables: { eid: this.eid },
      fetchPolicy: 'network-only' // Always get fresh data
    }).subscribe({
      next: (result: any) => {
        const emp = result?.data?.searchEmployeeById;
        if (emp) {
          // Remove __typename if it exists to prevent form errors
          const { __typename, id, ...cleanData } = emp;
          this.employeeForm.patchValue(cleanData);
        }
      },
      error: (err) => console.error("Error fetching employee:", err)
    });
  }

  onSubmit() {
    if (this.employeeForm.valid && this.eid) {
      const rawValues = this.employeeForm.getRawValue();
      
      // Send all employee fields for update
      const variables = {
        eid: this.eid,
        first_name: rawValues.first_name,
        last_name: rawValues.last_name,
        email: rawValues.email,
        gender: rawValues.gender,
        date_of_joining: rawValues.date_of_joining,
        salary: parseFloat(rawValues.salary?.toString() ?? '0'),
        designation: rawValues.designation,
        department: rawValues.department,
        employee_photo: rawValues.employee_photo
      };

      console.log("Sending variables:", variables);

      this.apollo.mutate({
        mutation: UPDATE_EMPLOYEE,
        variables: variables
      }).subscribe({
        next: (result) => {
          alert('Update Successful!');
          this.router.navigate(['/employees']);
        },
        error: (err) => {
          console.error("Mutation Error:", err);
          alert("Update failed. Check console.");
        }
      });
    }
}
}