import { map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

import { Pageble } from '../interfaces/pageble.interface';
import { Profile } from '../interfaces/profile.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http = inject(HttpClient);
  constructor() {}

  private baseApiUrl = 'https://icherniakov.ru/yt-course/';

  //me!: Profile;
  me = signal<Profile | null>(null);

  getTestAccounts() {
    return this.http.get<Profile[]>(this.baseApiUrl + 'account/test_accounts');
  }

  getMe() {
    return this.http
      .get<Profile>(this.baseApiUrl + 'account/me')
      .pipe(tap((res) => this.me.set(res)));
  }

  setSubscribersShortList() {
    return this.http
      .get<Pageble<Profile>>(this.baseApiUrl + 'account/subscribers/')
      .pipe(map((res) => res.items.slice(0, 3)));
  }
}
