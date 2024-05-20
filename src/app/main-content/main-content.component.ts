import { Component, inject } from '@angular/core';
import { AllTracksComponent } from './all-tracks/all-tracks.component';
import { DataService } from '../data.service';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [AllTracksComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {
  public service = inject(DataService);

  constructor() {
  }
}
