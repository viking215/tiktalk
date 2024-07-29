import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { Profile } from './data/interfaces/profile.interface';
import { ProfileService } from './data/services/profile.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProfileCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
