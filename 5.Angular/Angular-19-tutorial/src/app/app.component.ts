import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserComponent } from './user/user.component';
import { DatabindingComponent } from './databinding/databinding.component';
import { DirectivesComponent } from './directives/directives.component';
import { StructuralDirectiveNgIfVsIfComponent } from './structural-directive-ng-if-vs-if/structural-directive-ng-if-vs-if.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    // DirectivesComponent,
    StructuralDirectiveNgIfVsIfComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Angular-19-tutorial';
}
