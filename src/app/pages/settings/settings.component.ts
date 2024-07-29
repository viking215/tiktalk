import { firstValueFrom } from 'rxjs';
import { Component, effect, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { AuthService } from '../../auth/auth.service';
import { ProfileHeaderComponent } from '../../components/profile-header/profile-header.component';
import { ProfileService } from '../../data/services/profile.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ProfileHeaderComponent, ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  profileService = inject(ProfileService);
  profile$ = toObservable(this.profileService.me);

  fb = inject(FormBuilder);

  authService = inject(AuthService);

  form = this.fb.group({
    firstName: [{ value: '' }, Validators.required],
    lastName: [{ value: '' }, Validators.required],
    username: [{ value: '', disabled: true }, Validators.required],
    description: [''],
    stack: [''],
  });

  constructor() {
    effect(() => {
      //@ts-ignore
      this.form.patchValue({
        ...this.profileService.me(),
        //@ts-ignore
        stack: this.mergeStack(this.profileService.me()?.stack),
      });
    });
  }

  handleLogOut = () => {
    this.authService.logout();
  };

  onSubmit() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;
    firstValueFrom(
      // @ts-ignore
      this.profileService.patchProfile({
        ...this.form.value,
        stack: this.splitStack(this.form.value.stack),
      })
    );
  }

  splitStack(stack: string | null | string[] | undefined): string[] {
    if (!stack) return [];
    if (Array.isArray(stack)) return stack;

    return stack.split(',');
  }

  mergeStack(stack: string | null | string[] | undefined): any {
    if (!stack) return '';
    if (Array.isArray(stack)) return stack.join(',');

    return stack;
  }
}
