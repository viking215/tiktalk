import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avatar',
  standalone: true,
})
export class AvatarPipe implements PipeTransform {
  transform(url: string | null): string | null {
    if (url) {
      return 'https://icherniakov.ru/yt-course/' + url;
    }
    return 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png';
  }
}
