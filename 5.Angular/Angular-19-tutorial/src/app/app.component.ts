import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserComponent } from './user/user.component';
import { DatabindingComponent } from './databinding/databinding.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DatabindingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Angular-19-tutorial';
}
