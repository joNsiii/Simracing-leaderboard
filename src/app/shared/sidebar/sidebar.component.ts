import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  public dataService = inject(DataService);
  regBtn:string = 'Register';

  driverData = {
    driver: '',
    time: '',
    car: '',
    track: '',
  };

  onSubmit(ngForm: NgForm): void {
    if (ngForm.valid && ngForm.submitted) {
      this.dataService.addNewTime(this.driverData.track, this.driverData.driver, this.driverData.time, this.driverData.car);
      this.regBtn = 'Time added';
      setInterval(() => {
        window.location.reload();
      },2000);
    }
  }

  onReset(ngForm:NgForm): void {
    ngForm.resetForm('');
    this.regBtn = 'Register';
  }
}
