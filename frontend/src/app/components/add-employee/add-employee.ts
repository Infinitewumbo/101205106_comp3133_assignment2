import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { ADD_EMPLOYEE } from '../../graphql.operations';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './add-employee.html'
})
export class AddEmployee {
  employeeForm = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl('Male', [Validators.required]),
    designation: new FormControl('', [Validators.required]),
    salary: new FormControl(0, [Validators.required, Validators.min(1)]),
    department: new FormControl('', [Validators.required]),
    date_of_joining: new FormControl('', [Validators.required]),
    employee_photo: new FormControl('') 
});

  constructor(private apollo: Apollo, private router: Router) {}

  onSubmit() {
    if (this.employeeForm.valid) {
      this.apollo.mutate({
        mutation: ADD_EMPLOYEE,
        variables: this.employeeForm.value
      }).subscribe({
        next: (result) => {
          console.log('Employee Added:', result);
          this.router.navigate(['/employees']); 
        },
        error: (err) => alert('Error adding employee: ' + err.message)
      });
    }
  }
}