import { Component, Input } from '@angular/core';
import { Profile } from '../../../data/interfaces/profile.interface';
import { AvatarPipe } from '../../../helpers/pipes/avatar.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-subscriber-card',
  standalone: true,
  imports: [AvatarPipe, RouterLink],
  templateUrl: './subscriber-card.component.html',
  styleUrl: './subscriber-card.component.scss',
})
export class SubscriberCardComponent {
  @Input() profile!: Profile;
}
