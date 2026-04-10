import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { GET_EMPLOYEE_BY_ID } from '../../graphql.operations';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-view-employee',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './view-employee.html'
})
export class ViewEmployee implements OnInit {
  employee: any = null;
  loading: boolean = true;
  error: string | null = null;
  eid: string = '';

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo,
    private location: Location,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.eid = this.route.snapshot.paramMap.get('id') || '';
    if (this.eid) {
      this.fetchDetails();
    } else {
      this.loading = false;
      this.error = 'Invalid employee id.';
    }
  }

  fetchDetails(): void {
    this.apollo.query({
      query: GET_EMPLOYEE_BY_ID,
      variables: { eid: this.eid },
      fetchPolicy: 'no-cache'
    }).pipe(
      timeout(7000)
    ).subscribe({
      next: (result: any) => {
        console.log("Full Result Data:", result.data);
        
        this.employee = result?.data?.searchEmployeeById; 
        
        this.loading = false;
        
        if (!this.employee) {
          this.error = "Employee not found in the database.";
        }

        this.cdr.detectChanges();
      },
      error: (err) => {
        this.loading = false;
        const msg = err?.name === 'TimeoutError'
          ? 'Request timed out. Backend is not responding.'
          : `Error: ${err?.message || 'Unknown error'}`;
        this.error = msg;
        console.error("Apollo Error:", err);
        
        this.cdr.detectChanges();
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}