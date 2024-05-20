import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from './data.service';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { MainContentComponent } from './main-content/main-content.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, MainContentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'iracing-leaderboard';
  public service = inject(DataService);
  constructor() {
    this.service.getAllData();
  }
}
