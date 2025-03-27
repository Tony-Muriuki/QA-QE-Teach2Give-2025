import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-application-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './job-application-form.component.html',
  styleUrls: ['./job-application-form.component.css'],
})
export class JobApplicationFormComponent {
  jobApplicationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.jobApplicationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      skills: this.fb.array([]), // FormArray for dynamic skills
    });
  }

  // Get the skills FormArray
  get skills(): FormArray {
    return this.jobApplicationForm.get('skills') as FormArray;
  }

  // Add a new skill field
  addSkill(): void {
    this.skills.push(new FormControl('', Validators.required));
  }

  // Remove a skill field
  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }

  // Submit the form
  onSubmit(): void {
    if (this.jobApplicationForm.valid) {
      console.log('Form Submitted', this.jobApplicationForm.value);
      alert('Application submitted successfully!');
      this.jobApplicationForm.reset();
    }
  }
}
