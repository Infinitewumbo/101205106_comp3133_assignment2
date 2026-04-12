import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { ADD_EMPLOYEE, GET_ALL_EMPLOYEES } from '../../graphql.operations';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './add-employee.html'
})
export class AddEmployee {
  submitted = false;

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

  getErrorMessage(controlName: string): string {
    const control = this.employeeForm.get(controlName);
    if (control && control.errors && (control.touched || this.submitted)) {
      if (control.errors['required']) return 'This field is required';
      if (control.errors['email']) return 'Please enter a valid email address';
      if (control.errors['min']) return 'Value must be greater than 0';
    }
    return '';
  }

  onSubmit() {
    this.submitted = true;
    
    if (this.employeeForm.valid) {
      this.apollo.mutate({
        mutation: ADD_EMPLOYEE,
        variables: this.employeeForm.value,
        refetchQueries: [{ query: GET_ALL_EMPLOYEES }]
      }).subscribe({
        next: (result) => {
          console.log('Employee Added:', result);
          this.router.navigate(['/employees']); 
        },
        error: (err) => alert('Error adding employee: ' + err.message)
      });
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }
}