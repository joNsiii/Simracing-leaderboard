import { Component, Input, inject } from '@angular/core';
import { DataService } from 'src/app/data.service';
@Component({
  selector: 'app-single-card',
  standalone: true,
  imports: [],
  templateUrl: './single-card.component.html',
  styleUrl: './single-card.component.scss',
})
export class SingleCardComponent {
  @Input() singleTrack: any;
  @Input() cardFlipped: boolean = false;
  public service = inject(DataService);

  
  
}
