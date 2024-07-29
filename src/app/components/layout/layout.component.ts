import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ProfileService } from '../../data/services/profile.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  profileService = inject(ProfileService);

  // constructor() {
  //   this.profileService.getMe().subscribe((response) => {
  //     console.log(response);
  //   });
  // }

  // ngOnInit() {
  //   this.profileService.getMe().subscribe((response) => {
  //     console.log(response);
  //   });
  // }
}