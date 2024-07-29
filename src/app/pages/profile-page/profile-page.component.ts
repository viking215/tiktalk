import { switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { ProfileHeaderComponent } from '../../components/profile-header/profile-header.component';
import { ProfileService } from '../../data/services/profile.service';
import { AvatarPipe } from '../../helpers/pipes/avatar.pipe';
import { PostFeedComponent } from './components/post-feed/post-feed.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    AsyncPipe,
    RouterLink,
    AvatarPipe,
    PostFeedComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  profileService = inject(ProfileService);
  route = inject(ActivatedRoute);

  me$ = toObservable(this.profileService.me);
  subscribers$ = this.profileService.setSubscribersShortList(5);

  protected generalTags: string[] = ['TS', 'Angular', 'JS', 'React'];

  profile$ = this.route.params.pipe(
    switchMap(({ id }) => {
      if (id === 'me') {
        return this.me$;
      }

      return this.profileService.getAccount(id);
    })
  );
}
