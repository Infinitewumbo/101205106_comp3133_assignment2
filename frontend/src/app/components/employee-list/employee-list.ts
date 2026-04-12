import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList implements OnInit {
  employees: any[] = [];
  searchTerm: string = '';
  loading: boolean = true; 
  error: string | null = null; 

  constructor(
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef 
  ) {}

  get filteredEmployees() {
    return this.employees.filter(emp => 
      emp.designation?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      emp.department?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.loading = true;
    this.employeeService.getEmployees().subscribe({
      next: (result: any) => {
        const data = result?.data?.getAllEmployees;
        if (data) {
          this.employees = [...data];
          this.error = null;
        } else {
          this.employees = [];
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Connection Error:', err);
        this.error = err.message;
        this.loading = false;
        this.employees = []; 
        this.cdr.detectChanges();
      }
    });
  }

  deleteEmployee(id: string) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: (result: any) => {
          this.employees = this.employees.filter(emp => emp.id !== id);
          this.cdr.detectChanges();
        },
        error: (err: any) => {
          console.error('Delete failed:', err);
          alert('Error deleting: ' + err.message);
        }
      });
    }
  }
}