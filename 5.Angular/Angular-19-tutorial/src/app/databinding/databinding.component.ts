import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-databinding',
  imports: [FormsModule],
  templateUrl: './databinding.component.html',
  styleUrl: './databinding.component.css',
})
export class DatabindingComponent {
  name: string = 'FEDLearning';
  topic: string = 'Databinding';
  image: string =
    'https://yt3googleusercontentcomfr2VOi_0xoR3JGdNGHRA5yaAf4KeXGZCWk0tl5oQ-m7pHgUh_iJCiNvmmxfEN0fNvjroIvKByw=s160-c-k-c0x00ffffff-no-rj';
  onSave() {
    alert('Data Saved Successfully!');
  }
  onChange() {
    alert('Country Has Changed');
  }
  random = '';
}
