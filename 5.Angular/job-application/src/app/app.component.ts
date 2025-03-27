import { Component } from '@angular/core';
import { JobApplicationFormComponent } from './job-application-form/job-application-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [JobApplicationFormComponent],
  template: `<app-job-application-form></app-job-application-form>`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
