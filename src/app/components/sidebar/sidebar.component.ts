import { firstValueFrom } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../auth/auth.service';
import { Profile } from '../../data/interfaces/profile.interface';
import { ProfileService } from '../../data/services/profile.service';
import { AvatarPipe } from '../../helpers/pipes/avatar.pipe';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SvgIconComponent,
    SubscriberCardComponent,
    RouterLink,
    AsyncPipe,
    JsonPipe,
    AvatarPipe,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  authService = inject(AuthService);
  profileService = inject(ProfileService);

  subscribers$ = this.profileService.setSubscribersShortList();
  me = this.profileService.me;

  menuItems = [
    {
      src: '/assets/icons/home.svg',
      label: 'Моя страница',
      position: 1,
      href: '',
    },
    {
      src: '/assets/icons/chat.svg',
      label: 'Чаты',
      position: 2,
      href: '/chats',
    },
    {
      src: '/assets/icons/search.svg',
      label: 'Поиск',
      position: 3,
      href: '/search',
    },
  ];

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
  }

  handleLogOut = () => {
    //debugger;
    this.authService.logout();
  };
}
