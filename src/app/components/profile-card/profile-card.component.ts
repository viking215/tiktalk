import { Component, Input } from '@angular/core';

import { Profile } from '../../data/interfaces/profile.interface';
import { AvatarPipe } from '../../helpers/pipes/avatar.pipe';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [AvatarPipe],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
  protected generalTags: string[] = ['TS', 'Angular', 'JS', 'React'];
  @Input() profile!: Profile;
}
