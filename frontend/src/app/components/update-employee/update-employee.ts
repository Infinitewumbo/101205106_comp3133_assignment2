import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { GET_EMPLOYEE_BY_ID, UPDATE_EMPLOYEE, GET_ALL_EMPLOYEES } from '../../graphql.operations';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './update-employee.html'
})
export class UpdateEmployee implements OnInit {
  id: string = '';
  submitted = false;
  employeeName: string = 'Employee'; // Default name

  updateForm = new FormGroup({
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

  constructor(
    private apollo: Apollo, 
    private router: Router, 
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    if (this.id) {
      this.loadEmployeeData();
    }
  }

  loadEmployeeData() {
    this.apollo.query({
      query: GET_EMPLOYEE_BY_ID,
      variables: { eid: this.id },
      fetchPolicy: 'no-cache'
    }).subscribe({
      next: ({ data }: any) => {
        const emp = data?.searchEmployeeById;
        
        if (emp) {
          this.employeeName = `${emp.first_name} ${emp.last_name}`;
          
          let formattedDate = '';
          if (emp.date_of_joining) {
            formattedDate = new Date(emp.date_of_joining).toISOString().split('T')[0];
          }

          this.updateForm.patchValue({
            first_name: emp.first_name,
            last_name: emp.last_name,
            email: emp.email,
            gender: emp.gender,
            designation: emp.designation,
            salary: emp.salary,
            department: emp.department,
            date_of_joining: formattedDate,
            employee_photo: emp.employee_photo
          });
        }
      },
      error: (err) => {
        console.error("GraphQL Error:", err);
        alert("Could not find employee data.");
      }
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.updateForm.get(controlName);
    if (control && control.invalid && (control.touched || this.submitted)) {
      if (control.errors?.['required']) return 'Required';
      if (control.errors?.['email']) return 'Invalid email';
    }
    return '';
  }

  onSubmit() {
    this.submitted = true;
    if (this.updateForm.valid) {
      this.apollo.mutate({
        mutation: UPDATE_EMPLOYEE,
        variables: { eid: this.id, ...this.updateForm.value },
        refetchQueries: [{ query: GET_ALL_EMPLOYEES }]
      }).subscribe({
        next: () => this.router.navigate(['/employees']),
        error: (err) => alert('Update failed: ' + err.message)
      });
    } else {
      this.updateForm.markAllAsTouched();
    }
  }
}