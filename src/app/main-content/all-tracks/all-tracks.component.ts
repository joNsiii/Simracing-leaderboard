import { Component, inject } from '@angular/core';
import { SingleCardComponent } from './single-card/single-card.component';
import { DataService } from 'src/app/data.service';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-all-tracks',
  standalone: true,
  imports: [SingleCardComponent, RouterOutlet, FormsModule, DecimalPipe],
  templateUrl: './all-tracks.component.html',
  styleUrl: './all-tracks.component.scss',
})
export class AllTracksComponent {
  public service = inject(DataService);
  flipped = false;
  

  toogleFlip() {
    this.flipped = !this.flipped;
  }
}
