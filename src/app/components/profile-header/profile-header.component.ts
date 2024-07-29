import { Component, input } from '@angular/core';
import { Profile } from '../../data/interfaces/profile.interface';
import { AvatarPipe } from '../../helpers/pipes/avatar.pipe';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [AvatarPipe],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
})
export class ProfileHeaderComponent {
  profile = input<Profile>();
}
