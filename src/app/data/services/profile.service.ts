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
  subscribersCount = signal<number>(0);

  getTestAccounts() {
    return this.http.get<Profile[]>(this.baseApiUrl + 'account/test_accounts');
  }

  getMe() {
    return this.http
      .get<Profile>(this.baseApiUrl + 'account/me')
      .pipe(tap((res) => this.me.set(res)));
  }

  getAccount(id: string) {
    return this.http.get<Profile>(`${this.baseApiUrl}account/${id}`);
  }

  setSubscribersShortList(limit = 3) {
    return this.http
      .get<Pageble<Profile>>(this.baseApiUrl + 'account/subscribers/')
      .pipe(
        map((res) => {
          this.subscribersCount.set(res.total);
          return res.items.slice(0, limit);
        })
      );
  }
}
